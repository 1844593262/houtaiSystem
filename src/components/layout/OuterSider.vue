<template>
  <div class="OuterSider">
      <div class="OuterTop">
          <h5 class="pages">pages</h5>
          <h3 class="pages">后台管理</h3>
      </div>
      <el-input v-model="input" placeholder="Search"></el-input>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
   </div>
</template>
<script>
export default {
  data() {
    return {
      input:"",
      data: [{
        label: '后台管理',
        children: [{
          label: '系统管理',
          children: [{
            label: '角色管理',
            children: [{
              label: '新增'
            }]
          }]
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style>
  .OuterSider{
      width:200px;

  }
</style>
