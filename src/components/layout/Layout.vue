<template>
    <div class="layout">
        <div class="layout-sider">
            <LayoutSider></LayoutSider>
        </div>
        <div class="layout-container">
            <div class="layout-header">
                <!-- <h2 class="logo">logo</h2> -->
                <LayoutHeader></LayoutHeader>
            </div>
            <div class="layout-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import LayoutHeader from './Header';
import LayoutSider from './Sider';

export default {
    computed: {
    },
    components: {
        LayoutHeader,
        LayoutSider,
    }
}
</script>
<style lang="less" scoped>
.layout {
    position: relative;
}
.layout-sider {
    position:fixed;
    top: 56px;
    left:0;
    bottom: 0;
    z-index: 100;
    width:200px;
    background-color: #26344b;
    /*transition: .9s width ease-in-out;*/
}
.layout-container {
    margin-left: 200px;
    transition: .9s margin-left ease-in-out;
    .layout-header {
        position: fixed;
        top: 0;
        left:0;
        z-index: 101;
        width: 100%;
        height: 64px;
        background: #26344b;
        padding-left: 20px;
    }
    .layout-content {
        margin-top: 64px;
        // padding: 20px;
        background: #ffffff;
        min-height: 83vh;
    }

}
</style>
