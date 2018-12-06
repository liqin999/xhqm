<template>
    <div class="create-role">
        <span @click="createNewRole()" class="new-role" title="新增角色">
            <i class="el-icon-ump-tianjia"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 新建角色弹框 -->
        <create-role-message-box 
            :propsData="createRoleData" 
            :addRoleParame="addRoleParame" 
            @authorityChange="authorityChange"
            @addRoleConfirm="addRoleConfirm"></create-role-message-box>
    </div>
</template>

<script>
// libs
import createRoleMessageBox from "./libs/createRoleMessageBox"

export default {
    components: {
        createRoleMessageBox
    },
    data (){
        return {
            createRoleData: {
                addRoleShow: false,         // 新增角色弹框show
                checkedAuthority: [],       // 选中的权限
                authorities: []             // 全部权限
            },
            checkAll: false,
            isIndeterminate: true,
            addRoleParame: {            // 新增角色 请求参数
                roleName: "",       // 角色名称
                roleDesc: "",       // 角色描述
                authorites: []      // 赋予权限
            }
        }
    },
    methods: {
        // 新建角色按钮 点击事件
        createNewRole(){
            this.addRoleParame.authorites = [];             // 清空参数中上次选中权限
            this.addRoleParame.roleName = '';               // 角色名称清空
            this.addRoleParame.roleDesc = '';               // 角色描述清空
            this.createRoleData.authorities = [];           // 全部权限清空 重新赋值
            this.createRoleData.checkedAuthority = [];      // 选中的权限清空
            this.getAllAuthorityList();     // 查询全部权限 接口调用
            this.createRoleData.addRoleShow = true;        // 新建角色弹框show
        },
        // 权限多选 change事件
        authorityChange(value){
            console.log('选中的权限',value);
            this.addRoleParame.authorites = value;      // 赋值给请求参数
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.createRoleData.authorities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.createRoleData.authorities.length;
        },
        // },
        // 新增角色弹框 确认按钮
        addRoleConfirm(){
            if (this.addRoleParame.roleName != ''){     // 角色名称为必填
                if (this.addRoleParame.authorites.length != 0){     // 权限选择不能为空
                    this.addRole(this.addRoleParame);       // 新增角色 接口调用
                } else {
                    this.$message({
                        message: '请至少选择一个权限',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: '请输入角色名称',
                    type: 'warning'
                });
            }
        },

        // 获取全部的权限 接口
        getAllAuthorityList() {
            this.$api.getAllAuthorityList().then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    res.data.forEach((item, key) => {
                        this.createRoleData.authorities.push(item);         // 弹框中全部权限 赋值
                    });
                });
            });
        },
        // 新增角色 接口
        addRole(reqData) {
            this.$api.addRole(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.createRoleData.addRoleShow = false;        // 弹框关闭
                    this.$message({
                        message: '新增角色成功',
                        type: 'success'
                    });
                    this.$emit('createRoleSuccess');        // 回调函数 上级
                });
            });
        }
    }
}
</script>

<style scoped>
    .new-role {
        font-size: 14px;
        cursor: pointer;
        transition: all 0.1s;
    }
    .create-role {
        display: inline-block;
        margin-right: 13px;
    }
    .create-role:hover .new-role {
        color: #409eff;
    }
</style>
