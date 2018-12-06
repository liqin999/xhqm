<template>
    <div class="reset-space">
        <span @click.stop="resetSpace(thisSpace)" title="设为默认" class="old-space">
            <i class="el-icon-ump-zhongzhi"></i>
            <slot name="iconName"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        thisSpace: [Object, Array],
        listParam: Object
    },
    data(){
        return {
            modifySpaceParam: {             // 修改空间参数
                attachmentLimit: '1',       // 默认容量为1GB
                spaceType: "",
                id: ""
            }
        }
    },
    methods: {
        // 重置按钮 点击事件
        resetSpace(thisSpace){
            console.log('使用情况',thisSpace);
            this.$confirm('是否确认设置为默认容量?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.listParam.spaceType == 1){
                    this.modifySpaceParam.id = this.thisSpace.object.userId;     // 修改参数id 赋值
                } else {
                    this.modifySpaceParam.id = this.thisSpace.object.tid;           // 修改参数id 赋值
                }
                this.modifySpaceParam.spaceType = this.listParam.spaceType;         // 修改参数spaceType 赋值
                this.modifySpace(this.modifySpaceParam);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消设置'
                })
            })
        },

        // 修改空间 接口
        modifySpace(reqData) {
            this.$api.modifySpace(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.$message({
                        type: 'success',
                        message: '设置成功!'
                    });
                    this.$emit('spaceLimitSuccess');       // 修改成功 回调函数
                });
            });
        }
    }

}
</script>

<style scoped>
    .reset-space {
        display: inline-block;
        cursor: pointer;
        margin-left: 8px;
    }
    .reset-space:hover .old-space {
        color: #409eff;
    }
</style>
