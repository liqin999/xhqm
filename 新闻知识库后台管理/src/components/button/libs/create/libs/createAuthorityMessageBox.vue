<template>
    <div>
        <el-dialog title="新增权限" :visible.sync="propsData.addAuthorityShow" width="30%" class="create-new">
            <el-form :model="propsData">
                <el-form-item label="权限名称" label-width="90px">
                    <el-input v-model="addAuthorityParame.authorityName" placeholder="添加权限名称" @keyup.enter.native='addAuthorityConfirm()'></el-input>
                </el-form-item>
                <el-form-item label="权限描述" label-width="90px">
                    <el-input v-model="addAuthorityParame.desc" placeholder="描述内容" @keyup.enter.native='addAuthorityConfirm()'></el-input>
                </el-form-item>
                <el-form-item label="权限标识" label-width="90px">
                    <el-input v-model="addAuthorityParame.authority" placeholder="标识内容" @keyup.enter.native='addAuthorityConfirm()'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.addAuthorityShow = false">取 消</el-button>
                <el-button type="primary" @click="addAuthorityConfirm()">确 定</el-button>
            </span>
		</el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        addAuthorityParame: Object
    },
    methods: {
        // 新建权限弹框确认按钮 点击事件
        addAuthorityConfirm(){
            this.$emit('addAuthorityConfirm');
        }
    }
}
</script>

<style>
    .create-new .el-dialog__title{
        font-size: 16px;
    }
    .create-new .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .create-new .el-dialog__body{
        padding: 10px 15px 0;
    }
    .create-new .el-select{
        width: 100%;
    }
    .create-new .el-form-item{
        margin-bottom: 15px;
    }
</style>
