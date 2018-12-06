<template>
    <div class="modify-batch">
        <span @click.stop="alterSpaceBatch()" title="批量编辑" class="old-batch">
            <i class="el-icon-ump-tianjia"></i>
            <slot name="iconName"></slot>
        </span>
        <modify-batch-message-box
            :propsData="modifyBatchData"
            :modifySpaceBatchParam="modifySpaceBatchParam"
            @modifyBatchConfirm="modifyBatchConfirm"
            @resetBatch="resetBatch"></modify-batch-message-box>
    </div>
</template>

<script>
// libs
import modifyBatchMessageBox from "./libs/modifyBatchMessageBox"

export default {
    components: {
        modifyBatchMessageBox
    },
    props: {
        selectAnyData: Array,
        listParam: Object
    },
    data(){
        return {
            modifyBatchData: {
                modifyBatchShow: false      // 批量编辑弹框show
            },
            modifySpaceBatchParam: {        // 多选修改空间参数
                attachmentLimit: "",
                spaceType: "",
                ids: []
            }
        }
    },
    methods: {
        // 批量编辑点击事件
        alterSpaceBatch(){
            this.modifySpaceBatchParam.attachmentLimit = "";
            this.modifyBatchData.modifyBatchShow = true;    // 批量编辑弹框打开
        },
        // 设为默认容量点击事件
        resetBatch(){
            this.modifySpaceBatchParam.attachmentLimit = '1';       // 默认容量为1GB 赋值给input框
        },
        // 批量编辑弹框确认按钮 点击事件
        modifyBatchConfirm(){
            if (this.selectAnyData.length != 0){
                this.modifySpaceBatchParam.spaceType = this.listParam.spaceType;
                this.modifySpaceBatchParam.ids = this.selectAnyData;
                this.modifySpaceBatch(this.modifySpaceBatchParam);
            } else {
                this.$message({
                    type: 'warning',
                    message: '请至少选择一条数据'
                });
                this.modifyBatchData.modifyBatchShow = false;
            }
        },
        modifySpaceBatch(reqData) {
            this.$api.modifySpaceBatch(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.modifyBatchData.modifyBatchShow = false;
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                   this.$emit('spaceLimitSuccess');
                });
            });
        }
    }
}
</script>

<style scoped>
    .old-batch {
        font-size: 14px;
        cursor: pointer;
        transition: all 0.1s;
    }
    .modify-batch {
        display: inline-block;
        margin-right: 13px;
    }
    .modify-batch:hover .old-batch {
        color: #409eff;
    }
</style>
