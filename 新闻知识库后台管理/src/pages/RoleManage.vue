<template>
    <div>
        <!-- 左侧菜单 -->
        <div >
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div>
        <div class="role-manage">
            <create-new-role @createRoleSuccess="createRoleSuccess" class="create-new-role">
                <span slot="iconName">新增角色</span>
            </create-new-role>
            <div class="role-table">
                <el-table :data="roleData" style="width: 100%" v-loading="getRoleLoading">
                    <el-table-column prop="roleName" label="角色名称" ></el-table-column>
                    <el-table-column prop="roleDesc" label="描述信息" ></el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <modify-role :thisRole="scope.row" @modifyRoleSuccess="modifyRoleSuccess"></modify-role>
                            <delete-role :thisRole="scope.row" @deleteRoleSuccess="deleteRoleSuccess"></delete-role>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
// libs
import menuNav from "@/pages/libs/menu/menuNav"

// button
import createNewRole from "@/components/button/libs/create/createNewRole"
import modifyRole from "@/components/button/libs/modify/modifyRole"
import deleteRole from "@/components/button/libs/delete/deleteRole"

export default {
    components: {
        menuNav,
        createNewRole,
        modifyRole,
        deleteRole
    },
    data() {
        return {
            menuLinkActive: 1,          // 菜单高亮
            getRoleLoading: false,      // 表格加载loading
            roleData: []               // 表格数据
        }
    },
    mounted() {
        this.getRoleLoading = true;     // 表格加载loading打开
        this.getAllRoleList();      // 获取全部角色 接口调用
    },
    methods: {
        // 新建角色成功的回调函数
        createRoleSuccess(){
            this.getAllRoleList();      // 刷新列表
        },
        // 修改角色成功的回调函数
        modifyRoleSuccess(){
            this.getAllRoleList();      // 刷新列表
        },
        //删除角色成功的回调函数
        deleteRoleSuccess(){
            this.getAllRoleList();      // 刷新列表
        },

        // 获取全部角色 接口
        getAllRoleList() {
            this.$api.getAllRoleList({
              userId:-1  
            }).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    console.log(res.data);
                    this.roleData = res.data;       // 表格赋值
                    this.getRoleLoading = false;    // 表格加载loading关闭
                });
            });
        }
    }
}
</script>

<style scoped>
    .role-manage {
        /* float: left; */
        margin-left: 260px;
    }
    /* .menu-bar {
        position: relative;
        float: left;
        width: 260px;
        background:#f2f7f9;
    } */
    .role-manage .create-new-role{
        padding: 15px 0 15px 20px;
    }
    .role-manage .role-table .el-table {
        border: 1px solid #ebeef5;
        padding: 0 20px 0 20px;
    }
</style>

