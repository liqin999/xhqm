<template>
    <div class="menu-bar" ref="menuBar">
        <template v-for="(link,index) in menuNav">
            <router-link :to="link.linkPath" tag="div" class="menu-link" :key="index">
                <i :class="link.iconName">{{ link.linkName }}</i>
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        menuLinkActive: Number
    },
    mounted(){
        const that = this;
        let winH = document.documentElement.clientHeight;
        that.$refs.menuBar.style.height = winH-80+"px";
        window.onresize = () => {
            return (() => {
                let winH = document.documentElement.clientHeight;
                 setTimeout(function() {
                      that.$refs.menuBar.style.height = winH-80+"px";
                 },300)
            })()
        }

    },
    beforeMount(){
        let xidentityId = localStorage.getItem("xidentityId");
        if(xidentityId == "deptAdmin" || xidentityId == "groupAdmin"){
             this.menuNav=[//部分和组室做限制
                {
                    iconName: 'el-icon-ump-yonghuguanli',
                    linkName: '用户管理',
                    linkPath: "/userList"
                },
                {
                    iconName: 'el-icon-ump-tijikongjian-xianxing',
                    linkName: '空间限制',
                    linkPath: "/spaceLimit"
                }
            ]
        }
    },
    data () {
        return {
            // 菜单导航按钮
            menuNav: [
                {
                    iconName: 'el-icon-ump-yonghuguanli',
                    linkName: '用户管理',
                    linkPath: "/userList"
                },
                {
                    iconName: 'el-icon-ump-erji-jiaoseguanli',
                    linkName: '角色管理',
                    linkPath: "/roleManage"
                },
                {
                    iconName: 'el-icon-ump-erji-quanxianguanli',
                    linkName: '权限管理',
                    linkPath: '/authority'
                },
                {
                    iconName: 'el-icon-ump-tijikongjian-xianxing',
                    linkName: '空间限制',
                    linkPath: "/spaceLimit"
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    .menu-bar {
        position: relative;
        float: left;
        width: 220px;
        background:#f2f7f9;
        border-right:1px solid #ebeef5;
        .menu-link{
                 text-align: center;
                 padding: 10px 0;
                 cursor: pointer;
        }
        .menu-link.router-link-active{
            background: #ffffff;
            i{
                color: #0682c8;
            }
          
        }
   
    }
    
    // .menu-bar{
    //     .menu-link.active {
    //        background: #ffffff;
    //     }
    // }
    
    .menu-bar{
        .menu-link i {
            font-size: 16px;
            color: #4b4b4c;
            margin-top: 15px;
            margin-bottom: 15px;
            display: block;
         }
    } 
</style>
