<template>
    <div class="delete-authority">
        <span @click.stop="deleteAuthority(thisAuthority)" title="删除权限" class="die-authority">
            <i class="el-icon-delete"></i>
            <slot name="iconName"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        thisAuthority: [Object, Array]
    },
    methods: {
        deleteAuthority(thisAuthority){
            console.log('该权限',thisAuthority);
            this.$confirm('是否删除此权限?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delAuthority(thisAuthority.authorityId);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            });
        },
        delAuthority(reqData) {
            console.log(reqData);
            this.$api.delAuthority(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$emit('deleteAuthoritySuccess');        // 删除成功 回调函数
                });
            });
        }
    }
}
</script>

<style scoped>
    .delete-authority {
        display: inline-block;
        cursor: pointer;
        margin-left: 8px;
    }
    .delete-authority:hover .die-authority {
        color: #409eff;
    }
</style>
