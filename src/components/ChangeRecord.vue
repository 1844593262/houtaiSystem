<template>
    <el-table  :data="tableData"  border fit>
        <el-table-column  prop="date"  label="版本号"  width="360"  align="center">
        </el-table-column>
        <el-table-column  prop="time"  label="发布时间"  width="360" align="center">
        </el-table-column>
        <el-table-column  prop="change"  label="变更内容" width="360" align="center">
        </el-table-column>
    </el-table>
</template>
<style scoped>
    .el-table {
       width:1081px;
       max-width:none;
       margin-top:90px;
       margin-left:40px;
     }
</style>
<script>
export default {
    data() {
      return {
        tableData: [
          {
          date: '1.1',
          time: '2017-10-09',
          change: '1、创意增加浏览数；2、创意迭代增加隐藏、取消隐藏操作；3、用户管理增加用户举报信息；4、增加消息推送；5、增加用户须知管理；6、其它； '
          },
          {
          date: '1.0',
          time: '2017-9-28',
          change: '全部'
          },
          {
          date: '',
          time: '',
          change: ''
          },
        ]
      }
    }
}
</script>
