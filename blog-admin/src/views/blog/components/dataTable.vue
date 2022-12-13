<template>
  <a-table
    :data="tableData"
    :bordered="true"
    :row-selection="rowSelection"
    :pagination="pagination"
    @page-change="pageChange"
  >
    <template #columns>
      <a-table-column
        :width="300"
        title="标题"
        data-index="title"
        fixed="left"
      ></a-table-column>
      <a-table-column
        :width="150"
        title="栏目"
        data-index="channelName"
      ></a-table-column>
      <a-table-column
        :width="150"
        title="发布人"
        data-index="nickName"
      ></a-table-column>
      <a-table-column :width="200" title="发布时间">
        <template #cell="{ record }">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm') }}
        </template>
      </a-table-column>
      <a-table-column :width="250" title="操作">
        <template #cell="{ record }">
          <a-button type="text" @click="edit(record)">修改</a-button>
          <a-button type="text" @click="controlComment(record)"
            >评论管理</a-button
          >
          <a-button type="text" status="danger" @click="deleteRecord(record)"
            >删除</a-button
          >
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { onMounted, ref, reactive } from 'vue';
  import dayjs from 'dayjs';
  import { Blog, QueryBlogsData, getBlogs } from '@/api/blog';
  import { TableRowSelection } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';

  import { Pagination } from '@/types/global';

  const userInfo = useUserStore();
  const props = defineProps({
    filters: {
      type: Object,
      default() {
        return {
          searchType: '',
          keywords: '',
          sortOrder: 1,
        };
      },
    },
  });

  const tableData = ref<Blog[]>();
  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    checkStrictly: true,
  });
  // Arco pro分页选像
  const pagination = reactive<Pagination>({
    pageSize: 10,
    current: 1,
    total: 0,
  });

  async function loadBlogs() {
    const querydata: QueryBlogsData = {
      userId: userInfo.id,
      searchType: props.filters.searchType,
      keywords: props.filters.keywords,
      publisher: props.filters.publisher,
      currentPage: pagination.current,
      everyPage: pagination.pageSize,
    };

    const res = await getBlogs(querydata);
    pagination.total = res.data.total;
    tableData.value = res.data.results;
    // Arco pro需要有key属性作为标识符
    tableData.value.forEach((item: Blog) => {
      item.key = item.id;
    });
  }

  // // 根据条件获取数据
  // function reloadBlogs() {
  //   console.log(props.filters);

  // }

  function pageChange(current: number) {
    pagination.current = current;
    loadBlogs();
  }

  function edit(blog: Blog) {
    // 修改blog
  }

  function controlComment(blog: Blog) {
    // 管理评论
  }

  function deleteRecord(blog: Blog) {
    // 删除博客
  }

  onMounted(() => {
    loadBlogs();
  });

  defineExpose({ loadBlogs });
</script>

<style lang="less" scoped></style>
