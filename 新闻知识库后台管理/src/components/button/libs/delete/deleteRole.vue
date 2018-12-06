<template>
    <div class="delete-role">
        <span @click.stop="deleteRole(thisRole)" title="删除角色" class="die-role">
            <i class="el-icon-delete"></i>
            <slot name="iconName"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        thisRole: [Object, Array]
    },
    methods: {
        deleteRole(thisRole){
            console.log('该角色',thisRole);
            this.$confirm('是否删除此角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delRole(thisRole.roleId);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            });
        },
        // 删除接口以及点击事件
        delRole(reqData) {
            this.$api.delRole(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$emit('deleteRoleSuccess');        // 删除成功 回调函数
                });
            });
        }
    }
}
</script>

<style scoped>
    .delete-role {
        display: inline-block;
        cursor: pointer;
        margin-left: 8px;
    }
    .delete-role:hover .die-role {
        color: #409eff;
    }
</style>
