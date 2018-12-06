<template>
    <div>
        <el-dialog title="权限修改" class="modify-message" :visible.sync="propsData.modifyAuthorityShow" width="30%">
            <el-form :model="propsData">
                <el-form-item label="权限名称" label-width="90px">
                    <el-input v-model="modifyAuthorityParame.authorityName" placeholder="添加角色名称" @keyup.enter.native='alterAuthorityConfirm()'></el-input>
                </el-form-item>
                <el-form-item label="权限描述" label-width="90px">
                    <el-input v-model="modifyAuthorityParame.desc" placeholder="描述内容" @keyup.enter.native='alterAuthorityConfirm()'></el-input>
                </el-form-item>
                <!-- <el-form-item label="权限标识" label-width="90px">
                    <el-input v-model="modifyAuthorityParame.authority" placeholder="标识内容" @keyup.enter.native='alterAuthorityConfirm()'></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.modifyAuthorityShow = false">取 消</el-button>
                <el-button type="primary" @click="alterAuthorityConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        modifyAuthorityParame: Object
    },
    methods: {
        // 修改权限弹框确认按钮 点击事件
        alterAuthorityConfirm(){
            this.$emit('alterAuthorityConfirm');
        }
    }
}
</script>

<style>
    .modify-message .el-dialog__title{
        font-size: 16px;
    }
    .modify-message .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .modify-message .el-dialog__body{
        padding: 10px 15px 0;
    }
    .modify-message .el-select{
        width: 100%;
    }
    .modify-message .el-form-item{
        margin-bottom: 15px;
    }
</style>
