<template>
    <div>
        <el-dialog title="空间容量设置" :visible.sync="propsData.modifyBatchShow" width="30%" class="modify-batch">
            <el-form>
                <el-form-item label="设置容量值" label-width="90px">
                    <el-input v-model="modifySpaceBatchParam.attachmentLimit" placeholder="100"></el-input>GB
                </el-form-item>
                <el-form-item>
                    <el-button round @click="resetBatch">设为默认容量</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propsData.modifyBatchShow = false">取 消</el-button>
                <el-button type="primary" @click="modifyBatchConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        propsData: Object,
        modifySpaceBatchParam: Object
    },
    methods: {
        // 设为默认容量
        resetBatch(){
            this.$emit('resetBatch');
        },
        // 批量编辑弹框确认按钮 点击事件
        modifyBatchConfirm(){
            this.$emit('modifyBatchConfirm');
        }
    }
}
</script>

<style>
    .modify-batch .el-dialog__title{
        font-size: 16px;
    }
    .modify-batch .el-dialog__header{
        padding: 15px 20px 10px;
    }
    .modify-batch .el-dialog__body{
        padding: 10px 15px 0;
    }
    .modify-batch .el-select{
        width: 100%;
    }
    .modify-batch .el-form-item{
        margin-bottom: 15px;
    }
    .modify-batch .el-form-item .el-input{
        width: 70%;
        padding-right: 8px;
    }
</style>
