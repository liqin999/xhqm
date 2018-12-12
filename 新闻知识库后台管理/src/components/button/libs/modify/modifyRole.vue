<template>
    <div class="modify-role">
        <span @click.stop="alterRole(thisRole)" title="角色修改" class="old-role">
            <i class="el-icon-edit-outline"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 修改角色弹框 -->
        <modify-role-message-box 
            :propsData="modifyRoleData"
            :modifyRoleParam="modifyRoleParam"
            @checkRoleChange="checkRoleChange"
            @alterRoleConfirm="alterRoleConfirm"></modify-role-message-box>
    </div>
</template>

<script>
// libs
import modifyRoleMessageBox from "./libs/modifyRoleMessageBox"

export default {
    components: {
        modifyRoleMessageBox
    },
    props: {
        thisRole: [Object, Array]
    },
    data (){
        return {
            modifyRoleData: {
                modifyRoleShow: false,      // 修改角色弹框show
                checkedRole: [],            // 选中的权限
                roles: []       // 全部权限
            },
            modifyRoleParam: {          // 修改角色 请求参数
                roleId: "",         // 当前角色id
                roleName: "",       // 新的角色名称
                roleDesc: "",       // 新的角色描述
                //authorites: []      // 新的角色权限
            }
        }
    },
    methods: {
        // 修改角色 点击事件
        alterRole(thisRole){
            console.log('该角色',thisRole);
            this.modifyRoleData.roles = [];         // 清空全部权限 重新赋值
           // this.modifyRoleParam.authorites = thisRole.authorites;
            this.modifyRoleParam.roleId = thisRole.roleId;      // 参数：当前角色id 赋值
            this.modifyRoleParam.roleName = thisRole.roleName;      // 参数：旧的角色名称 赋值
            this.modifyRoleParam.roleDesc = thisRole.roleDesc;      // 参数：旧的角色描述 赋值
            this.modifyRoleData.checkedRole = thisRole.authorites;      // 当前选中的权限 赋值
            this.modifyRoleData.modifyRoleShow = true;      // 修改角色弹框show
            this.getAllAuthorityList();     // 获取全部权限 接口调用
        },
        // 选中权限改变事件
        checkRoleChange(value){
            console.log('选中的权限',value);
            this.modifyRoleParam.authorites = value;
        },
        // 修改角色弹框 确认按钮
        alterRoleConfirm(){
            if (this.modifyRoleParam.roleName != ''){     // 角色名称为必填
                // if (this.modifyRoleParam.authorites.length != 0){    // 权限选择不能为空
                //     this.modifyRole(this.modifyRoleParam);       // 修改角色 接口调用
                // } else {
                //     this.$message({
                //         message: '权限选择不能为空',
                //         type: 'warning'
                //     });
                // }
                this.modifyRole(this.modifyRoleParam);       // 修改角色 接口调用

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
                    res.data.forEach(item => {
                        this.modifyRoleData.roles.push(item);         // 弹框中全部权限 赋值
                    });
                });
            });
        },
        // 修改角色 接口
        modifyRole(reqData) {
            this.$api.modifyRole(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.modifyRoleData.modifyRoleShow = false;     // 修改角色弹框关闭
                    this.$message({
                        message: '修改角色成功',
                        type: 'success'
                    });
                    this.$emit('modifyRoleSuccess');    // 回调函数 上级
                });
            });
        }
    }
}
</script>

<style scoped>
    .modify-role {
        display: inline-block;
        cursor: pointer;
    }
    .modify-role:hover .old-role {
        color: #409eff;
    }
</style>
