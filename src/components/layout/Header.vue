<template>
  <el-row>
      <el-col :span="24">
        <div class="header">
            <h2 class="logo" style="display:inline-block;">logo</h2>
            <div class="wel" style="display:inline-block;">
                <el-button type="text">您好:<span>xxx</span></el-button>
                <el-button type="text">修改密码</el-button>
                <el-button type="text" @click="logout">退出</el-button>
            </div>
        </div>
      </el-col>
  </el-row>
</template>
<script>
export default {
    data() {
        return {
            status: false
        }
    },
    methods: {
        logout(){
            window.sessionStorage.removeItem('$LoginUser');
            this.$router.push('/login')
        }
    },

}
</script>

<style  lang="css" scoped>
.header {
    line-height: 64px;
    text-align: right;
    margin-right: 260px;
}
.logo {
    width: 168px;
    height: 32px;
    margin: 16px;
    float:left;
    /*background: #e4e4e4;*/
    color: #fff;
    line-height: 32px;
    text-align:left;
    border-radius: 10px;
    transition: .9s width ease-in-out;
}
</style>
