<template>
    <div>
        <el-dialog title="空间容量设置" :visible.sync="propsData.modifySpaceShow" width="30%" class="modify-limit">
            <el-form>
                <el-form-item label="设置容量值" label-width="90px">
                    <el-input v-model="modifySpaceParam.attachmentLimit" placeholder="100"></el-input>GB
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.modifySpaceShow = false">取 消</el-button>
                <el-button type="primary" @click="modifySpaceLimit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        modifySpaceParam: Object
    },
    methods: {
        // 修改空间弹框确认按钮 点击事件
        modifySpaceLimit(){
            this.$emit('modifySpaceLimit');
        }
    }
}
</script>

<style>
    .modify-limit .el-dialog__title{
        font-size: 16px;
    }
    .modify-limit .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .modify-limit .el-dialog__body{
        padding: 10px 15px 0;
    }
    .modify-limit .el-select{
        width: 100%;
    }
    .modify-limit .el-form-item{
        margin-bottom: 15px;
    }
    .modify-limit .el-form-item .el-input{
        width: 70%;
        padding-right: 8px;
    }
</style>
