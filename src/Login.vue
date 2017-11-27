<template>
    <div class="login-box">
        <h2 class="text-center">后台登录系统</h2>
        <el-form :model="value">
            <el-form-item>
                <el-input v-model="value.loginName" auto-complete="off"  placeholder="账号"></el-input>
            </el-form-item>
            <template v-if="!autoComplete">
                <el-form-item hidden>
                    <el-input name="username"
                      auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item hidden>
                    <el-input type="password"
                              name="password"
                              auto-complete="off"></el-input>
                </el-form-item>
            </template>
            <el-form-item>
                <el-input type="password"
                          v-model="value.loginPwd"
                          auto-complete="off"
                          placeholder="密码"></el-input>
            </el-form-item>
            <el-button type="success"
                       @click="submit">登录
            </el-button>
        </el-form>
    </div>
</template>
<style scoped>
    .login-box {
        width: 300px;
        margin: 30vh auto;
    }
</style>
<script>
   import {loginApi} from '@/api/api'
    import {user as UserLogic, site as SiteLogic} from '@/logic';
    export default {
        props: {
            autoComplete: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: {
                    loginName: '',
                    loginPwd: ''
                },
            }
        },
        mounted() {
            // this.createCaptcha();
        },
        methods: {
            submit() {
              var self = this;
              // console.log(UserApi);
              // loginApi(this.value).then(data => {
              //     UserLogic.setLoginUser(data.data);
              //     self.$router.push('/SystemManagement/SystemManagement');
              // }).catch((err) => {
              //     self.$message.error(err.message);
              // })
              loginApi(this.value).then(data => {
                  UserLogic.setLoginUser(data.data);
                  self.$router.push('/SystemManagement/SystemManagement');
              }).catch((err) => {
                  self.$message.error(err.message);
              })
            }
        }
    }
</script>
<style scoped>
    img{
        position: absolute;
        top: 0;
        right: 0;
        height: 36px;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
