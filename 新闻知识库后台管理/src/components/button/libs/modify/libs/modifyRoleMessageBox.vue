<template>
    <div>
        <el-dialog title="角色修改" class="modify-box" :visible.sync="propsData.modifyRoleShow" width="30%">
            <el-form :model="propsData">
                <el-form-item label="角色名称" label-width="90px">
                    <el-input v-model="modifyRoleParam.roleName" placeholder="添加角色名称" @keyup.enter.native='alterRoleConfirm()'></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="90px">
                    <el-input v-model="modifyRoleParam.roleDesc" placeholder="描述内容" @keyup.enter.native='alterRoleConfirm()'></el-input>
                </el-form-item>
                <!-- <el-form-item label="选择权限" label-width="90px">
                    <el-checkbox-group v-model="propsData.checkedRole" @change="checkRoleChange">
                        <el-checkbox v-for="item in propsData.roles" :label="item.authorityId" :key="item.authorityId">{{item.authorityName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.modifyRoleShow = false">取 消</el-button>
                <el-button type="primary" @click="alterRoleConfirm()">确 定</el-button>
            </span>
        </el-dialog>

    
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        modifyRoleParam: Object
    },
    methods: {
        // 选中权限改变事件
        checkRoleChange(value){
            this.$emit('checkRoleChange',value);
        },
        // 修改角色 确认按钮
        alterRoleConfirm(){
            this.$emit('alterRoleConfirm');
        }
    }
}
</script>

<style>
    .modify-box .el-dialog__title{
        font-size: 16px;
    }
    .modify-box .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .modify-box .el-dialog__body{
        padding: 10px 15px 0;
    }
    .modify-box .el-select{
        width: 100%;
    }
    .modify-box .el-form-item{
        margin-bottom: 15px;
    }
</style>
