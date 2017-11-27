<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>问卷调查</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
       </el-row>
       <div class="classify">
           <!-- <el-form :inline="true" :model="queryParams">
               <el-row>
                      <el-form-item label="手机号码">
                          <el-input  placeholder="请输入" v-model="queryParams.telephone" ></el-input>
                      </el-form-item>
                      <el-form-item>
                             <el-button type="primary" @click="search">搜索</el-button>
                             <el-button type="default" @click="reset">重置</el-button>
                      </el-form-item>
              </el-row>
           </el-form> -->
           <el-row>
                <el-table  :data="tableData" border>
                    <el-col :span="9">
                        <el-table-column align="center" label="问卷调查的答案" >
                            <template scope="scope">
                                  {{scope.row.answerStr}}
                            </template>
                        </el-table-column>
                    </el-col>
                      <!-- <el-col :span="5">
                          <el-table-column align="center" label="手机号码">
                                <template scope="scope">
                                  {{scope.row.telphone}}
                                </template>
                          </el-table-column>
                      </el-col> -->
                      <el-col :span="5">
                          <el-table-column align="center" label="填写日期">
                                <template scope="scope">
                                    {{scope.row.createTime|dateFilter}}
                                </template>
                          </el-table-column>
                     </el-col>

                  </el-col>
                  </el-table>
           </el-row>
           <el-row>
              <el-col :span='24'>
                  <div class="block" style="width:100%;">
                      <el-pagination
                              @current-change="handleCurrentChange"
                              :current-page="tableParams.page"
                              layout="prev, pager, next"
                              :page-size = 16
                              :total="total">
                      </el-pagination>
                  </div>
              </el-col>
           </el-row>
        </div>
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
      background-color:none;
}
.classify{
    padding:20px 20px;
}
#bod{
   border-color:#fff !important;
   overflow:hidden;
}
.el-table--border td, .el-table--border th {
     border-right: 1px solid #fff !important;
}
.el-table td, .el-table th.is-leaf {
     border-bottom:1px solid #fff !important;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import {questionSurveryApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
  //  function StrAndbr(str){
  //       return   str.replace(/\;/g,"\n");
  //  }

    export  default{
        mixins:[mixin],
        data(){
          return{
              total:0,
              id:"",
              tableData:[],
              kzData:{},
              dialogVisible: false,
              title:"",
//              currentPage3: 1,
              queryParams:{
                  telephone:""
              },
              tableParams:{
                page:1,
                limit:16
              }
          }
        },
        filters:{
             dateFilter,date
         },
        mounted(){
             /*var vm=this;
             var list=[];
             questionSurveryApi().then(data => {
                 data.data.items.forEach(function(value){
                    //  console.log("afafafafaf",value);
                     value.answerList.forEach(function(v){
                          Object.assign(v,value.archive);
                          list.push(v);
                     })
                     vm.tableData=list;
                 })
             }).catch((err) => {
                  vm.$message.error(err.message);
             })*/
        },
        components:{
           Page
        },
        methods: {
          handleCurrentChange(page){
              var vm=this;
              this.tableParams.page=page;
              this.getList(vm.tableParams);
          },
          getList(){
              var vm=this;
              var list=[];
              questionSurveryApi(vm.tableParams).then(data => {
                  data.data.items.forEach(function(value){
                      // var arr=[];
                      value.answerList.forEach(function(v){
                          //  arr.push(v.answerStr)
                          //  console.log(arr);
                          //  arr.forEach(function(value){
                          //      console.log(value);
                          //      var strconvert=value.replace(/\;/g,"\n");
                          //  })
                           Object.assign(v,value.archive);
                           list.push(v);
                      })
                      vm.tableData=list;
                  })
                    vm.total=data.data.total;
              }).catch((err) => {
                   vm.$message.error(err.message);
              })
          },
        }
      }
</script>
<style lang="css" type="text/css" scoped>
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
    .el-table .cell{
       padding: 10px !important;
    }
    .el-table--fit {
        margin:10px auto;
    }
</style>
