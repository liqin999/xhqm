<template>
    <div>
        <span @click.stop="roleManage(role)">
            <i class="el-icon-ump-zhanghaoquanxianguanli" title="角色管理"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 弹框 -->
        <role-management-message-box
            :propsData="userManageData" 
            @roleManageConfirm="roleManageConfirm"
            @changeSwitch="changeSwitch"
            @checkedRoleChange="checkedRoleChange"></role-management-message-box>
    </div>
</template>

<script>
// libs
import roleManagementMessageBox from "./libs/roleManagementMessageBox"
export default {
    components: {
        roleManagementMessageBox
    },
    props: {
        role: [Object, Array]
    },
    data() {
        return {
            userManageData: {           // 用户管理数据 - 弹框
                userManageShow: false,      // 弹框打开|关闭
                changeActive: false,        // 弹框 白名单开关
                checkedrole: [],             // 弹框 角色选择
                allRoles: [],                // 全部角色
                getRolesLoading: false      // 弹框数据加载loading
            },
            modifyuserParam: {              // 更改用户角色接口参数
                userId: "",     // 该用户userId
                roles: [],      // 该用户的角色
                enabled: false  // 该用户是否在白名单
            },
            checkAll: false,
            isIndeterminate: true
        }
    },
    methods: {
        // 用户管理图标按钮点击事件
        roleManage(role){
            console.log('当前用户',role);
            this.modifyuserParam.userId = role.userId;      // userId 更改用户角色接口参数修改
            this.userManageData.checkedrole = role.roles;   // 弹框数据 角色选择赋值
            this.userManageData.changeActive = role.enabled;    // 弹框数据 白名单开关赋值
            this.userManageData.userManageShow = true;          // 用户管理弹框打开
            this.userManageData.getRolesLoading = true;
            this.getAllRoleList();    // 查询全部角色 接口调用
        },
        // =====================================================================
        // =========================用户管理弹框中的事件==========================
        // 用户管理弹框开关change事件
        changeSwitch(val){
            console.log('白名单',val);
            this.modifyuserParam.enabled = val;         // 白名单开关改变 => 更改用户角色参数修改
        },
        // 用户管理弹框多选按钮change事件
        checkedRoleChange(value){
            console.log('角色',value);
            this.modifyuserParam.roles = value;         // 角色改变 => 更改用户角色参数修改
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.userManageData.allRoles.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.userManageData.allRoles.length;
        },
        // 用户管理弹框确认按钮点击事件
        roleManageConfirm(){
            if (this.modifyuserParam.enabled != this.userManageData.changeActive){      // 未改变白名单开关的值时，需保持参数与该用户白名单的值一致
                this.modifyuserParam.enabled = this.userManageData.changeActive;
            }
            this.userManageData.userManageShow = false;     // 用户管理弹框关闭
            this.modifyUser(this.modifyuserParam);          // 更改用户角色  接口调用
        },
        // =======================================================================

        // =======================================================================
        // ================================接口====================================
        // 更改用户角色 接口
        modifyUser(reqData) {
            this.$api.modifyUser(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.$emit('roleManagement')
                });
            });
        },
        // 查询全部角色 接口
        getAllRoleList() {
            this.$api.getAllRoleList().then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    console.log('全部角色',res.data);
                    this.userManageData.allRoles = res.data;
                    this.userManageData.getRolesLoading = false;
                });
            });
        }
        // ========================================================================
    }
}
</script>

<style>

</style>
