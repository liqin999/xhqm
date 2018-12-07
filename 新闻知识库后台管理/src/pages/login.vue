<template>
    <!-- 国际化
    <span @click="changeLang">{{ $t("message.title") }}</span> -->
    <div>
       <HeaderCon></HeaderCon>
       <div class="login">
            <!-- <h1>Login</h1> -->
            <input type="text" v-model="userForm.userName" placeholder="用户名" required="required" />
            <input type="password" v-model="userForm.password" placeholder="密码" required="required" />
            <button type="button" @click="login()" class="btn btn-primary btn-block btn-large" >login</button>
        </div>
        <div>
            <!-- 弹框的内容start -->
             <el-dialog title="" 
              :visible.sync="dialogFormVisible"
              custom-class="dialogClass"
              width="400px">
                <el-form :form="roleForm">
                    <el-form-item label="选择部门/组室" >
                    <el-select v-model="roleForm.region" placeholder="请选择">
                          <el-option-group
                                v-for="group in regionOpt"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.orgId"
                                    :label="item.deptname||item.groupName "
                                    :value="item.orgId">
                                </el-option>
                         </el-option-group>
                    </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="doLogin()">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
                </el-dialog>
            <!-- 弹框的内容end -->
        </div>
    </div>
   
</template>
<script>
// import { isNotBlank } from "../../util/common.js";
import HeaderCon from '@/components/HeaderCon.vue'
export default {
    data() {
        return {
            // 用户数据
            userForm: {
                userName: "",
                password: ""
            },
            dialogFormVisible:false,//权限弹框
            roleForm:{
                region:'',
            },
            regionOpt: [
                   {
                    label: '部门',
                    options: []
                    },
                   {
                    label: '组室',
                    options: []
                    }
               ],
              userId:'',//用户id 
              flag:null,//判读是部门或者组室
              deptMap:[],//部门下拉
              groupMap:[],//组织下拉
            
        };
    },
    computed: {
    },
    components: {
        HeaderCon
    },
    methods: {

        login(){
            if (this.userForm.userName.length == 0 || this.userForm.password.length == 0){
                this.$message({
                    message: '用户名密码必须输入',
                    type: 'warning'
                });
            } else {
                let reqData = {
                    loginName: this.userForm.userName,
                    password: this.userForm.password
                }
                this.userLogin(reqData);
            }
        },
        userLogin(reqData){
            this.$api.userLogin(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.dialogFormVisible = true;
                    let deptMap = res.data.deptMap;
                    let groupMap = res.data.groupMap;
                    this.regionOpt[0].options = res.data.deptMap;
                    this.regionOpt[1].options = res.data.groupMap;
                    this.deptMap = res.data.deptMap;
                    this.groupMap = res.data.groupMap;
                    this.userId = res.data.userMap.userId;
                    localStorage.setItem("xuserId",res.data.userMap.userId);

                })
            })
        },
        doLogin(){//选择下拉进入系统
                if(!this.roleForm.region){
                      this.$message({
                        message: '请选择身份',
                        type: 'warning'
                      });
                      return;
                }


                this.deptMap.forEach((item)=>{//部门
                        if(item.orgId == this.roleForm.region){
                            this.flag = 1
                        }
                })
                this.groupMap.forEach((item)=>{//组织
                   if(item.orgId == this.roleForm.region){
                         this.flag = 2
                    }
                })
                let reqData ={
                    userId:this.userId,
                    orgId:this.roleForm.region,
                    flag:this.flag,
                }
                 this.$api.authorityManager(reqData).then(res => {
                       this.$Fn.errorCode(res.result).then(() => {
                           if(res.code == "user"){
                                this.$message({
                                    showClose: true,
                                    message: "你没有权限",
                                    type: "error"
                                });
                                setTimeout(()=>{
                                    this.dialogFormVisible = false;
                                },2000)
                                return
                            }
                           localStorage.setItem("xidentityId",res.code);
                           localStorage.setItem("xorgId",this.roleForm.region);
                           localStorage.setItem("xflag", this.flag);
                            this.$router.push({
                                path:'/userList'
                            })
                       })
                   })
  
        },





        // 改变语言，国际化相关
        // changeLang() {
        //   this.$i18n.locale = "zh";
        // },
        // 登陆执行函数
        // login() {
        //     //   路由传参
        //     // this.$router.push({
        //     // 	path: "/home",
        //     // 	query: {
        //     // 	phone: "二狗",
        //     // 	name: "杨二狗"
        //     // 	}
        //     // });
        //     // 用户输入非空判断
        //     if (isNotBlank(this.userForm.userName) && isNotBlank(this.userForm.password)) {
        //         this.$router.push({
        //             path: "/home/hometable"
        //         });
        //         // 保存登录名
        //         // this.$store.commit("setUser", this.userForm.userName);
        //     } else {
        //         alert("用户名密码必须输入");
        //     }
        // }
    },
    mounted() {
    }
};
</script>


<style scoped>
    .btn {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        padding: 4px 10px 4px;
        margin-bottom: 0;
        font-size: 13px;
        line-height: 18px;
        color: #333333;
        text-align: center;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
        vertical-align: middle;
        background-color: #f5f5f5;
        background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: -webkit-gradient(
            linear,
            0 0,
            0 100%,
            from(#ffffff),
            to(#e6e6e6)
        );
        background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
        background-image: linear-gradient(top, #ffffff, #e6e6e6);
        background-repeat: repeat-x;
        filter: progid:dximagetransform.microsoft.gradient(startColorstr=#ffffff, endColorstr=#e6e6e6, GradientType=0);
        border-color: #e6e6e6 #e6e6e6 #e6e6e6;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
        border: 1px solid #e6e6e6;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        *margin-left: 0.3em;
    }
    .btn:hover,
    .btn:active,
    .btn.active,
    .btn.disabled,
    .btn[disabled] {
        background-color: #e6e6e6;
    }
    .btn-large {
        padding: 9px 14px;
        font-size: 15px;
        line-height: normal;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .btn:hover {
        color: #333333;
        text-decoration: none;
        background-color: #e6e6e6;
        background-position: 0 -15px;
        -webkit-transition: background-position 0.1s linear;
        -moz-transition: background-position 0.1s linear;
        -ms-transition: background-position 0.1s linear;
        -o-transition: background-position 0.1s linear;
        transition: background-position 0.1s linear;
    }
    .btn-primary,
    .btn-primary:hover {
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        color: #ffffff;
    }
    .btn-primary.active {
        color: rgba(255, 255, 255, 0.75);
    }
    .btn-primary {
        background-color: #4a77d4;
        background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4);
        background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4);
        background-image: -webkit-gradient(
            linear,
            0 0,
            0 100%,
            from(#6eb6de),
            to(#4a77d4)
        );
        background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
        background-image: -o-linear-gradient(top, #6eb6de, #4a77d4);
        background-image: linear-gradient(top, #6eb6de, #4a77d4);
        background-repeat: repeat-x;
        filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);
        border: 1px solid #3762bc;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.5);
    }
    .btn-primary:hover,
    .btn-primary:active,
    .btn-primary.active,
    .btn-primary.disabled,
    .btn-primary[disabled] {
        filter: none;
        background-color: #4a77d4;
    }
    .btn-block {
        width: 100%;
        display: block;
    }

    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -o-box-sizing: border-box;
        box-sizing: border-box;
    }

    /* html { width: 100%; height:100%; overflow:hidden; } */

    /* body { 
        width: 100%;
        height:100%;
        font-family: 'Open Sans', sans-serif;
        background: #092756;
        background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
        background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
        background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
        background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
        background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
    } */
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        /* margin: -150px 0 0 -150px; */
        width: 300px;
        /* height: 300px; */
        /* background-color: #333; */
        transform: translate(-50%,-50%)
    }
    .login h1 {
        color: #3c5942;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        letter-spacing: 1px;
        text-align: center;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.3);
        border: none;
        outline: none;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
            0 1px 1px rgba(255, 255, 255, 0.2);
        -webkit-transition: box-shadow 0.5s ease;
        -moz-transition: box-shadow 0.5s ease;
        -o-transition: box-shadow 0.5s ease;
        -ms-transition: box-shadow 0.5s ease;
        transition: box-shadow 0.5s ease;
    }
    input:focus {
    box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
        0 1px 1px rgba(255, 255, 255, 0.2);
    }
    .dialog-footer{
        text-align:center
    }
    .dialogClass .el-dialog__body{
        padding-bottom: 10px;
    }
</style>
