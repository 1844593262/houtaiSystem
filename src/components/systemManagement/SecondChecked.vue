<template>
    <div class="SecondChecked">
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"> </el-checkbox> -->
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <div class="checkbox" style="margin-left:120px;">
              <el-checkbox   v-model="checkAll" @change="handleCheckAllChange" v-for="city in cities" :label="city" :key="city" style="display:block;margin-top:20px;margin-left: 16px;">{{city}}

              </el-checkbox>
          </div>
         </el-checkbox-group>
   </div>
</template>
<script>
 const cityOptions = ['系统配置', '基础数据', '创意管理', '用户管理',"用户举报","意见反馈"];
 export default {
   data() {
     return {
       checkAll: true,
       checkedCities: ['上海', '北京'],
       cities: cityOptions,
       isIndeterminate: true
     };
   },
   methods: {
     handleCheckAllChange(event) {
       this.checkedCities = event.target.checked ? cityOptions : [];
       this.isIndeterminate = false;
     },
     handleCheckedCitiesChange(value) {
       let checkedCount = value.length;
       this.checkAll = checkedCount === this.cities.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
     }
   }
 };
</script>
