<template>
    <div class="modify-space">
        <span @click.stop="alterSpace(thisSpace)" title="编辑" class="old-space">
            <i class="el-icon-edit-outline"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 修改空间弹框 -->
        <modify-space-message-box 
            :propsData="modifySpaceData"
            :modifySpaceParam="modifySpaceParam"
            @modifySpaceLimit="modifySpaceLimit"></modify-space-message-box>
    </div>
</template>

<script>
// libs
import modifySpaceMessageBox from "./libs/modifySpaceMessageBox"

export default {
    components: {
        modifySpaceMessageBox
    },
    props: {
        thisSpace: [Object, Array],
        listParam: Object
    },
    data(){
        return {
            modifySpaceData: {
                modifySpaceShow: false          // 修改空间弹框show
            },
            modifySpaceParam: {             // 修改空间参数
                attachmentLimit: "",
                spaceType: "",
                id: ""
            }
        }
    },
    methods: {
        // 编辑按钮 点击事件
        alterSpace(thisSpace){
            this.modifySpaceParam.attachmentLimit = '';         // 每次点击编辑 清空上次输入
            this.modifySpaceData.modifySpaceShow = true;        // 修改空间弹框打开
        },
        // 修改空间弹框确认按钮 点击事件
        modifySpaceLimit(){
            if (this.listParam.spaceType == 1){
                this.modifySpaceParam.id = this.thisSpace.object.userId;     // 修改参数id 赋值
            } else {
                this.modifySpaceParam.id = this.thisSpace.object.orgId;           // 修改参数id 赋值
            }
            this.modifySpaceParam.spaceType = this.listParam.spaceType;     // 修改参数spaceType 赋值
            this.modifySpace(this.modifySpaceParam);    // 修改空间 接口调用
        },

        // 修改空间 接口
        modifySpace(reqData) {
            this.$api.modifySpace(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.modifySpaceData.modifySpaceShow = false;        // 修改空间弹框关闭
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                    this.$emit('spaceLimitSuccess');       // 修改成功 回调函数
                });
            });
        }
    }
}
</script>

<style scoped>
    .modify-space {
        display: inline-block;
        cursor: pointer;
    }
    .modify-space:hover .old-space {
        color: #409eff;
    }
</style>
