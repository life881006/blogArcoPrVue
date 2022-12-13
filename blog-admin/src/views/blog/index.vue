<template>
  <div class="container">
    <div class="mainList">
      <a-row :cols="24" :gutter="16" :col-gap="16" align="center">
        <a-col :span="22">
          <a-grid :cols="24" :row-gap="16" :col-gap="16" class="searchArea">
            <a-grid-item
              :span="{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }"
            >
              <a-typography-text style="display: inline-block">
                搜索类型
              </a-typography-text>
              <a-select
                v-model="searchFilters.searchType"
                placeholder="请输入栏目名称"
              >
                <a-option key="channelName" value="channelName">栏目</a-option>
                <a-option key="title" value="title">文章标题</a-option>
              </a-select>
            </a-grid-item>
            <a-grid-item
              :span="{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }"
            >
              <a-typography-text style="display: inline-block">
                关键字
              </a-typography-text>
              <a-input
                v-model="searchFilters.keywords"
                placeholder="请输入要查询的关键字"
              >
              </a-input>
            </a-grid-item>
            <a-grid-item
              :span="{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }"
            >
              <a-typography-text style="display: inline-block">
                发布人
              </a-typography-text>
              <a-input
                v-model="searchFilters.publisher"
                placeholder="请输入发布人"
              >
              </a-input>
            </a-grid-item>
          </a-grid>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="goSearch">检索</a-button>
        </a-col>
      </a-row>

      <div class="funs">
        <a-button type="primary" @click="goAdd">添加 +</a-button>
      </div>
      <!-- 主表 -->
      <dataTable ref="mainDataTable" :filters="searchFilters"></dataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import dataTable from '@/views/blog/components/dataTable.vue';
  import { useRouter } from 'vue-router';

  const searchFilters = reactive({
    searchType: '',
    keywords: '',
    publisher: '',
    sortOrder: 1,
  });

  const mainDataTable = ref();
  const router = useRouter();

  function goSearch() {
    mainDataTable.value.loadBlogs();
  }

  function goAdd() {
    router.push('/blog/blog_add');
  }
</script>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
  }

  .mainList {
    width: 100%;
    padding: 20px;
    background-color: var(--color-bg-2);
  }

  .searchArea {
    margin-bottom: 20px;
  }

  .funs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>
