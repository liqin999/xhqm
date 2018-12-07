<template>
    <div>
        <!-- 左侧菜单 -->
        <!-- <div>
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div> -->
        <div class="authority">
            <add-authority @createAuthoritySuccess="createAuthoritySuccess" class="add-authority">
                <span slot="iconName">新增权限</span>
            </add-authority>
			<div class="authority-table">
				<el-table :data="authorityData" style="width: 100%" v-loading="getAuthorityLoading">
					<el-table-column prop="authorityName" label="权限名称" >
					</el-table-column>
					<el-table-column prop="desc" label="描述信息" >
					</el-table-column>
					<el-table-column label="操作" >
						<template slot-scope="scope">
                            <modify-authority :thisAuthority="scope.row" @modifyAuthoritySuccess="modifyAuthoritySuccess"></modify-authority>
							<!-- <el-button type="text" size="small" @click="delauthority(scope.row.authorityId)">删除</el-button> -->
                            <delete-authority :thisAuthority="scope.row" @deleteAuthoritySuccess="deleteAuthoritySuccess"></delete-authority>
						</template>
					</el-table-column>
				</el-table>
			</div>
	    </div>
    </div>
</template>

<script>
// libs
// import menuNav from "@/pages/libs/menu/menuNav"

// button
import addAuthority from "@/components/button/libs/create/addAuthority"
import modifyAuthority from "@/components/button/libs/modify/modifyAuthority"
import deleteAuthority from "@/components/button/libs/delete/deleteAuthority"

export default {
    components: {
        // menuNav,
        addAuthority,
        modifyAuthority,
        deleteAuthority
    },
    data() {
        return {
            menuLinkActive: 2,    // 菜单高亮
            getAuthorityLoading: false,      // 表格加载loading
            authorityData: []           // 表格数据
        }
    },
    mounted() {
        this.getAuthorityLoading = true;        // 表格加载loading打开
        this.getAllAuthorityList();     // 获取全部权限 接口调用
    },
    methods: {
        // 新建权限成功 回调函数
        createAuthoritySuccess(){
            this.getAllAuthorityList();        // 刷新列表
        },
        // 修改权限成功 回调函数
        modifyAuthoritySuccess(){
            this.getAllAuthorityList();        // 刷新列表
        },
        // 删除权限成功 回调函数
        deleteAuthoritySuccess(){
            this.getAllAuthorityList();        // 刷新列表
        },

        // 获取全部权限 接口
        getAllAuthorityList(reqData) {
            this.$api.getAllAuthorityList(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.authorityData = res.data;      // 表格数据 赋值
                    this.getAuthorityLoading = false;        // 表格加载loading关闭
                });
            });
        }
    }
};
</script>

<style scoped>
    .authority {
        /* float: left; */
        /* margin-left: 260px; */
    }
  
    .authority .add-authority {
        padding: 15px 0 15px 20px;
    }
    .authority .authority-table .el-table {
        border: 1px solid #ebeef5;
        padding: 0 20px 0 20px;
    }


    .authority .inputLine {
        margin-bottom: 10px;
    }
    .authority .inputName {
        display: inline-block;
        width: 70px;
    }
    .authority .el-input {
        display: inline-block;
        width: 250px;
    }
</style>
