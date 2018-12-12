<template>
    <div class="modify-authority">
        <span @click.stop="alterAuthority(thisAuthority)" title="权限修改" class="old-authority">
            <i class="el-icon-edit-outline"></i>
            <slot name="iconName"></slot>
        </span>
        <!-- 修改权限弹框 -->
        <modify-authority-message-box 
            :propsData="modifyAuthorityData" 
            :modifyAuthorityParame="modifyAuthorityParame"
            @alterAuthorityConfirm="alterAuthorityConfirm"></modify-authority-message-box>
    </div>
</template>

<script>
// libs
import modifyAuthorityMessageBox from "./libs/modifyAuthorityMessageBox"
export default {
    components: {
        modifyAuthorityMessageBox
    },
    props: {
        thisAuthority: [Object, Array]
    },
    data(){
        return {
            modifyAuthorityData: {
                modifyAuthorityShow: false      // 修改权限弹框show
            },
            modifyAuthorityParame: {        // 修改权限 请求参数
                authorityId: "",        // 该权限的authorityId
                authorityName: "",      // 新的权限名称
                desc: "",               // 新的权限描述
                authority: "ROLE_ADD"   // 新的权限标识
            }
        }
    },
    methods: {
        // 修改权限按钮 点击事件
        alterAuthority(thisAuthority){
           // console.log('该权限',thisAuthority);
            this.getAuthorityByAuthorityId(thisAuthority.authorityId);      // 获取该条权限的信息 接口调用
        },
        // 修改权限弹框确认按钮 点击事件
        alterAuthorityConfirm(){
            if (this.modifyAuthorityParame.authorityName != '') {       // 权限名称不能为空
                this.modifyAuthority(this.modifyAuthorityParame);       // 修改权限 接口调用
            } else {
                this.$message({
                    message: '权限名称不能为空',
                    type: 'warning'
                });
            }
        },

        // 获取该条权限的信息 接口
        getAuthorityByAuthorityId(reqData) {
            console.log(reqData);
            this.$api.getAuthorityByAuthorityId(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.modifyAuthorityParame.authorityId = res.data.authorityId;      // 参数authorityId 赋值
                    this.modifyAuthorityParame.authorityName = res.data.authorityName;      // 参数authorityName 赋值
                    this.modifyAuthorityParame.desc = res.data.desc;        // 参数desc 赋值
                    this.modifyAuthorityData.modifyAuthorityShow = true;        // 弹框打开
                });
            });
        },
        // 修改权限 接口
        modifyAuthority(reqData) {
            this.$api.modifyAuthority(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.modifyAuthorityData.modifyAuthorityShow = false;        // 弹框关闭
                    this.$message({
                        message: '修改权限成功',
                        type: 'success'
                    });
                    this.$emit('modifyAuthoritySuccess');    // 回调函数 上级
                });
            });
        }
    }
}
</script>

<style scoped>
    .modify-authority {
        display: inline-block;
        cursor: pointer;
    }
    .modify-authority:hover .old-authority {
        color: #409eff;
    }
</style>
