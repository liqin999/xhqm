<template>
    <div>
       <HeaderCon></HeaderCon>
       <div id="container-wrap" class="container-wrap" ref="containerWrap">
        <!-- 侧边栏 -->
        <menu-nav></menu-nav>
        <div class="main-container">
            <transition name="router-anim">
                    <div class="content">
                        <router-view></router-view>
                    </div>
            </transition>
        </div>
      </div>
    </div>
</template>

<script>
import menuNav from "@/pages/libs/menu/menuNav"
import HeaderCon from '@/components/HeaderCon.vue'

export default {
  data() {
    return {};
  },
  updated: function() {},
  mounted() {},
  components: {
    menuNav,
     HeaderCon
  },
  computed: {},
  methods: {}
};
</script>

        
<style lang="scss">

.container-wrap {
  overflow: hidden;
  // background-color: #fbfbfb;
  height: calc(100% - 80px);
}
.main-container {
  margin-left: 220px;
  background-color: #fbfbfb;
  min-height: 100%;
  overflow-y: hidden;
  .content {
    margin: 10px 15px;
    font-size: 14px;
    display: block;
    
  }
}
.el-main {
  padding: 0px;
}
#app {
  height: 100%;
}
</style>