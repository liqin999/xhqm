<template>
    <div class="user-manager">
        <el-dialog title="角色管理" 
         custom-class="roleMyClass"
        :visible.sync="propsData.userManageShow"
         width="300px">
            <!-- <div class="white-list">
                <span>白名单</span>
			    <el-switch 
                    v-model="propsData.changeActive" 
                    active-color="#13ce66" 
                    inactive-color="#ff4949" 
                    @change="changeSwitch">
                </el-switch>
            </div> -->
            
            <div class="role-manage">

                  


                <!-- <span>角色管理</span> -->
                <div class="management" style="word-wrap: break-word; word-break: normal;" v-loading="propsData.getRolesLoading">
                    <el-checkbox-group v-model="propsData.checkedrole" @change="checkedRoleChange">
                        <el-checkbox class="che" v-for="item in propsData.allRoles" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.userManageShow = false">取 消</el-button>
                <el-button type="primary" @click="roleManageConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object
    },
    methods: {
        // 开关change事件
        changeSwitch(val) {
            this.$emit('changeSwitch',val);
        },
        // 多选按钮change事件
        checkedRoleChange(value){
            this.$emit('checkedRoleChange',value)
        },
        // 弹框确认按钮
        roleManageConfirm(){
            this.$emit('roleManageConfirm');
        }
    }
}
</script>

<style scoped >
    .user-manager .el-dialog .white-list {
        margin-bottom: 10px;
        margin-left: 15px;
    }
    .user-manager .el-dialog .white-list span {
        padding-right: 18px;
    }
    .user-manager .el-dialog .role-manage {
        margin-left: 15px;
    }
    .user-manager .el-dialog .role-manage .management {
        padding-top: 10px;
    }
    .user-manager .el-dialog .role-manage .management .che{
        height: 30px;
        line-height: 30px;
        display: block;
        margin-left: 20px;
    }
    
</style>

<style lang="scss">
    .roleMyClass{
        .el-dialog__body{
            padding-top: 0px;
            padding-bottom: 0px;
            margin:0;
        }
    }
</style>

