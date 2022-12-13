<template>
  <div class="container">
    <div class="main">
      <a-grid :cols="24" :col-gap="16" :row-gap="16">
        <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }">
          <a-typography-text style="display: inline-block">
            标题
          </a-typography-text>
          <a-input v-model="title"></a-input>
        </a-grid-item>
        <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }">
          <a-typography-text style="display: inline-block">
            栏目
          </a-typography-text>
          <a-select v-model="channel">
            <a-option v-for="item in channels" :key="item.id" :value="item.id">
              {{ item.name }}
            </a-option>
          </a-select>
        </a-grid-item>
        <a-grid-item :span="24">
          <a-typography-text style="display: inline-block">
            内容
          </a-typography-text>
          <md-editor v-model="content" @on-upload-img="onUploadImg"></md-editor>
        </a-grid-item>
        <a-grid-item>
          <a-button @click="submitInfo">提交</a-button>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive, watchEffect, onMounted } from 'vue';
  import { useUserStore } from '@/store';
  import { addBlogs, Blog, uploadImage, getChannels } from '@/api/blog';
  import mdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { filterXSS } from 'xss';
  import { Message } from '@arco-design/web-vue';

  const title = ref('');
  const channel = ref('');
  const content = ref('');
  const channels: any = reactive([]);
  const userInfo = useUserStore();

  onMounted(() => {
    const channelParams = {
      userId: userInfo.id,
    };
    getChannels(channelParams).then((res) => {
      if (res.status === 1) {
        channels.splice(0, -1);
        res?.data.data.forEach(
          (item: { id: string; name: string; serialNumber: number }) => {
            channels.push(item);
          }
        );
      }
    });
  });

  const blogData: Blog = reactive({
    id: undefined,
    userId: userInfo.id,
    title: '111',
    content: '',
    channelId: channel,
    annexes: [],
  });

  function submitInfo() {
    if (content.value === '') {
      Message.error('请填写内容');
    }
    addBlogs(blogData).then((data) => {
      if (data.status === 1) {
        Message.success('博客已更新');
      }
    });
  }

  const onUploadImg = (
    files: Array<File>,
    callback: (urls: Array<string>) => void
  ) => {
    Promise.all(
      files.map((item) => {
        return uploadImage(userInfo.id, item);
      })
    ).then((res: Array<any>) => {
      const resUrls: Array<string> = [];

      res.forEach(
        (item: {
          data: {
            dirPath: string;
            name: string;
            path: string;
            status: number;
            type: string;
          };
          status: number;
        }) => {
          if (item.status === 1) {
            resUrls.push(item?.data.path);
          }
        }
      );
      callback(resUrls);
    });
  };

  watchEffect(() => {
    blogData.content = filterXSS(unref(content));
    blogData.channelId = channel.value;
  });
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
  }

  .main {
    width: 100%;
    padding: 20px;
    background-color: var(--color-bg-2);
  }
</style>
