<template>
    <div class="create-authority">
        <span @click="createAuthority()" class="new-authority" title="新增权限">
            <i class="el-icon-ump-tianjia"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 新建权限弹框 -->
        <create-authority-message-box 
            :propsData="createAuthorityData" 
            :addAuthorityParame="addAuthorityParame"
            @addAuthorityConfirm="addAuthorityConfirm"></create-authority-message-box>
    </div>
</template>

<script>
// libs
import createAuthorityMessageBox from "./libs/createAuthorityMessageBox"
export default {
    components: {
        createAuthorityMessageBox
    },
    data(){
        return {
            createAuthorityData: {
                addAuthorityShow: false         // 新建权限弹框show
            },
            addAuthorityParame: {           // 新建权限 接口请求参数
                authorityName: "",      // 权限名称
                desc: "",       // 权限描述
                authority: "ROLE_ADD"       // 权限标识
            }
        }
    },
    methods: {
        createAuthority(){
            this.addAuthorityParame = {};
            this.createAuthorityData.addAuthorityShow = true;       // 新建权限弹框show
        },
        // 新建权限弹框确认按钮 点击事件
        addAuthorityConfirm(){
            if (this.addAuthorityParame.authority != 'ROLE_ADD'){
                this.addAuthorityParame.authority = "ROLE_ADD";
                this.addAuthority(this.addAuthorityParame);         // 新建权限 接口调用
            } else {
                this.addAuthority(this.addAuthorityParame);         // 新建权限 接口调用
            }
        },

        // 新建权限 接口
        addAuthority(reqData) {
            this.$api.addAuthority(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                   this.createAuthorityData.addAuthorityShow = false;        // 弹框关闭
                    this.$message({
                        message: '新增权限成功',
                        type: 'success'
                    });
                    this.$emit('createAuthoritySuccess');        // 回调函数 上级
                });
            });
        }
    }
}
</script>

<style scoped>
    .new-authority {
        font-size: 14px;
        cursor: pointer;
        transition: all 0.1s;
    }
    .create-authority {
        display: inline-block;
        margin-right: 13px;
    }
    .create-authority:hover .new-authority {
        color: #409eff;
    }
</style>
