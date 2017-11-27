<template>
    <div class="com-page">
        <div class="com-page-header">
            <slot name="header"></slot>
        </div>
        <div class="com-page-body">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
    .com-page-header{
        padding: 10px 15px;
        background-color: #EDF2FC;
    }
    /*.com-page-body{
        padding:0 36px 18px;
        background-color:#EFF2F7;
        margin-top:20px;
    }*/
</style>
<script>
    export default{
        name:'page'

    }
</script>
