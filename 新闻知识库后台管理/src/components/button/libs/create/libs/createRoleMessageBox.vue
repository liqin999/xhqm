<template>
    <div class="create-role">
        <el-dialog title="新增角色" class="add-newRole" :visible.sync="propsData.addRoleShow" width="30%">
            <el-form :model="propsData">
                <el-form-item label="角色名称" label-width="90px">
                    <el-input v-model="addRoleParame.roleName" placeholder="添加角色名称" @keyup.enter.native='addRoleConfirm()'></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="90px">
                    <el-input v-model="addRoleParame.roleDesc" placeholder="描述内容" @keyup.enter.native='addRoleConfirm()'></el-input>
                </el-form-item>
                <!-- <el-form-item label="选择权限" label-width="90px">
                    <el-checkbox-group v-model="propsData.checkedAuthority" @change="authorityChange">
                        <el-checkbox v-for="item in propsData.authorities" :label="item.authorityId" :key="item.authorityId">{{item.authorityName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.addRoleShow = false">取 消</el-button>
                <el-button type="primary" @click="addRoleConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        addRoleParame: Object
    },
    data(){
        return {
        }
    },
    methods: {
        authorityChange(value){
            this.$emit('authorityChange',value);
        },
        addRoleConfirm(){
            this.$emit('addRoleConfirm');
        }
    }
}
</script>

<style>
    .add-newRole .el-dialog__title{
        font-size: 16px;
    }
    .add-newRole .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .add-newRole .el-dialog__body{
        padding: 10px 15px 0;
    }
    .add-newRole .el-select{
        width: 100%;
    }
    .add-newRole .el-form-item{
        margin-bottom: 15px;
    }
</style>
