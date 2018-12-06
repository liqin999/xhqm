<template>
    <div>
        <!-- 左侧菜单栏 -->
        <div class="menu-bar">
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div>
        <div class="list-content">
            <!-- 模糊搜索 -->
            <div class="select">
                <el-input v-model="value" suffix-icon="el-icon-search" placeholder="搜索用户" @keyup.enter.native="searchUser()"></el-input>
            </div>
            <div class="user-list clearfix">
                <el-table :data="userData" style="width: 100%" v-loading="getUserLoading">
                    <el-table-column prop="username" label="用户名" width="510"></el-table-column>
                    <el-table-column prop="enabled" label="白名单" width="200">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#ff4949" disabled>
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色" width="200">
                        <template slot-scope="scope">
                            <role-manager :role="scope.row" @roleManagement="roleManagement" class="role-manager"></role-manager>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="user-paging">
                    <!-- 分页 -->
                    <el-pagination
                        @size-change="selectPageNumber"
                        @current-change="selectPaging"
                        :current-page="userCurrentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="getListData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="userTotalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// libs
import menuNav from "@/pages/libs/menu/menuNav"
// button
import roleManager from "@/components/button/libs/userManagement/roleManager"
// mixins
import { userMixins } from "./mixins/index.js"

export default {
    mixins: [userMixins],
    components: {
        roleManager,
        menuNav
    },
    data() {
        return {
            menuLinkActive: 0,          // 菜单高亮
            getListData: {            // 获取用户列表接口请求参数
                flag: 0,
                pageSize: 20,
                PageNo: 1,
                keywords: ''
            },
            getUserLoading: false,      // 表格加载loading
            userData: [],           // 列表展示用户信息
            userTotalCount: 0,          // 总条数
            userCurrentPage: 1,         // 当前页
            value: ''
        };
    },
    mounted() {
        this.getUserLoading = true;         // 表格加载loading打开
        this.getUserLists(this.getListData);        // 查询全部用户 接口调用
    },
    methods: {
        // 当前展示条数改变
        selectPageNumber(val){
            console.log('当前展示条数',val);
            this.getListData.pageSize = val;
            this.getUserLists(this.getListData);        // 刷新列表
        },
        // 当前页数改变
        selectPaging(val){
            this.getListData.PageNo = val;
            this.getUserLists(this.getListData);        // 刷新列表
        },
        // 模糊查询
        searchUser(){
            this.getListData.keywords = this.value;
            this.getUserLists(this.getListData);        // 刷新列表
        },
        // 角色管理的回调函数
        roleManagement(){
            this.getUserLists(this.getListData);        // 刷新列表
        },

        // 查询全部用户 接口
        getUserLists(reqData) {
            this.$api.getUserLists(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    console.log('用户信息',res.data.dataList);
                    this.userData = res.data.dataList;  // 表格数据赋值
                    this.getUserLoading = false;        // 表格加载loading关闭
                    this.userTotalCount = res.data.totalRecord;
                });
            });
        }
    }
};
</script>

<style scoped>
    .list-content .select{
        margin: 13px 20px 13px 0;
        display: block;
        float: right;
    }
    .list-content .user-list {
        float: left;
        margin-left: 18px;
    }
    .list-content .user-list .el-table {
        border: 1px solid #ebeef5;
        padding: 0 20px 0 20px;
    }
    .list-content .user-list .el-table .role-manager {
        cursor: pointer;
    }
    .menu-bar {
        position: relative;
        float: left;
        width: 260px;
        background:#f2f7f9;
        border-right: 1px solid #ebeef5; 
    }
    .user-paging {
        float: right;
        margin-right: 12px;
    }
</style>

<style>
    .list-content .select .el-input__inner{
        height: 30px;
        line-height: 25px;
        border-radius: 15px;
        font-size:13px;
    }
    .list-content .select .el-input{
        width: 230px;
    }
    .list-content .select .el-input__icon{
        line-height: 25px;
    }
</style>