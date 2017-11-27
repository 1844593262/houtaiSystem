<template>
    <el-menu default-active="2" unique-opened mode="vertical" theme="dark" router fixed>
         <el-submenu index="/systemManagement/systemManagement">
               <template slot="title">系统管理</template>
                <el-menu-item-group>
                  <el-menu-item index="/systemManagement/systemManagement">
                      <router-link to="/systemManagement/systemManagement" tag="span">系统管理</router-link>
                  </el-menu-item>
                   <el-menu-item index="/systemManagement/Character">
                       <router-link to="/systemManagement/Character" tag="span">角色权限</router-link>
                   </el-menu-item>
                   <el-menu-item index="/systemManagement/OperationManagement">
                       <router-link to="/systemManagement/OperationManagement" tag="span">运营管理员</router-link>
                   </el-menu-item>
               </el-menu-item-group>
           </el-submenu>
           <el-submenu index="/basicData/CreativityClassify">
                 <template slot="title">基础数据</template>
                  <el-menu-item-group>
                     <el-menu-item index="/basicData/CreativityClassify">
                          <router-link to="/basicData/CreativityClassify" tag="span">创意分类</router-link>
                     </el-menu-item>
                     <el-menu-item index="/basicData/ReportOption">
                         <router-link to="/basicData/ReportOption" tag="span">举报类型维护</router-link>
                     </el-menu-item>
                     <el-menu-item index="/basicData/ArticleManagement">
                         <router-link to="/basicData/ArticleManagement" tag="span">文章管理</router-link>
                     </el-menu-item>
                     <el-menu-item index="/basicData/ProductCase">
                         <router-link to="/basicData/ProductCase" tag="span">推荐案例</router-link>
                     </el-menu-item>
                 </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/CreativityManagement/CreativityManagement">
                   <template slot="title">创意管理</template>
                   <el-menu-item-group>
                       <el-menu-item index="/CreativityManagement/CreativityManagement">
                             <router-link to="/CreativityManagement/CreativityManagement" tag="span">
                               创意管理
                             </router-link>
                       </el-menu-item>
                   </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/UserManagement/UserManagement">
                  <template slot="title">用户管理</template>
                  <el-menu-item-group>
                      <el-menu-item index="/UserManagement/UserManagement">
                            <router-link to="/UserManagement/UserManagement" tag="span">用户管理</router-link>
                      </el-menu-item>
                  </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/UserReport/UserReport">
                  <template slot="title">用户举报</template>
                  <el-menu-item-group>
                      <el-menu-item index="/UserReport/UserReport">
                            <router-link to="/UserReport/UserReport" tag="span">用户举报</router-link>
                      </el-menu-item>
                  </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/Advicefeedback/Advicefeedback">
                  <template slot="title">意见反馈</template>
                  <el-menu-item-group>
                      <el-menu-item index="/Advicefeedback/Advicefeedback">
                            <router-link to="/Advicefeedback/Advicefeedback" tag="span">意见反馈</router-link>
                      </el-menu-item>
                  </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/InvitationCode/InvitationCode">
                  <template slot="title">邀请码</template>
                  <el-menu-item-group>
                      <el-menu-item index="/InvitationCode/InvitationCode">
                            <router-link to="/InvitationCode/InvitationCode" tag="span">邀请码</router-link>
                      </el-menu-item>
                  </el-menu-item-group>
             </el-submenu>
             <el-submenu index="/Questionsurvery/Questionsurvery">
                  <template slot="title">问卷调查</template>
                  <el-menu-item-group>
                      <el-menu-item index="/Questionsurvery/Questionsurvery">
                            <router-link to="/Questionsurvery/Questionsurvery" tag="span">问卷调查</router-link>
                      </el-menu-item>
                  </el-menu-item-group>
             </el-submenu>
    </el-menu>
</template>
<style>
.el-submenu__icon-arrow{
   display:none;
}
.el-menu-item-group__title {
   padding-top:0;
 }

</style>
<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {

    }
}
</script>
