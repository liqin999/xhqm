<template>
    <div>
        <!-- 左侧菜单栏 -->
        <!-- <div>
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div> -->
        <div class="list-content">
            <!-- 模糊搜索 -->

            <div class="add-list">
                    <span @click.stop="addUser" class="old-space">
                        <i class="el-icon-ump-tianjia"></i>
                        <span>新增用户</span>
                     </span>
            </div>
            <div class="select">
                <el-input v-model="value" 
                suffix-icon="el-icon-search" 
                placeholder="搜索用户" 
                @keyup.enter.native="searchUser('user')">
                </el-input>
            </div>
            <div class="user-list clearfix">
                <el-table :data="userData"  style="width: 100%" v-loading="getUserLoading">
                    <el-table-column prop="userName" label="用户名"></el-table-column>

                    <el-table-column prop="loginName" label="登录名"></el-table-column>

                    <el-table-column prop="enabled" label="白名单" v-if="isSuperAdmin">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.enabled" 
                            @change="switchEnabledFn(scope.row)"
                            active-color="#13ce66" 
                            inactive-color="#ff4949"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色" v-if="isSuperAdmin">
                        <template slot-scope="scope">
                            <role-manager :role="scope.row" @roleManagement="roleManagement" class="role-manager"></role-manager>
                        </template>
                    </el-table-column>

                    <el-table-column label="部门">
                        <template slot-scope="scope">
                            <span @click="editDept(scope.row)">
                                 <i class="el-icon-ump-tianjia"></i>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="组室" >
                         <template slot-scope="scope">
                            <span @click="editGroup">
                                 <i class="el-icon-ump-tianjia"></i>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                             <i class="el-icon-delete" @click="delUser(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="user-paging">
                    <!-- 分页 -->
                    <el-pagination
                        @size-change="selectPageNumber"
                        @current-change="selectPaging"
                        :current-page="userCurrentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="getListData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="userTotalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- <template>
                <el-dialog title="新增用户" :visible.sync="adduserDialog" width="700px" 
                custom-class="addUserDialogStyle">
                    <el-form :inline="true"  :model="addUserForm" class="demo-form-inline">
                        <el-form-item label="用户名:">
                            <el-input size="small"  @keyup.enter.native="searchUser()"  v-model="addUserForm.keywords" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  size="small" @click="searchUser()">查询</el-button>
                        </el-form-item>
                    </el-form>
                   <el-table :data="allUserData"   max-height="250" style="width: 100%"  @selection-change="handleSelectionChangeUser">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="userName" label="用户名"></el-table-column>
                            <el-table-column prop="loginName" label="登录名"></el-table-column>
                            <el-table-column prop="enabled" label="白名单" v-if="isSuperAdmin">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.enabled" 
                                    @change="switchEnabledFn(scope.row)"
                                    active-color="#13ce66" 
                                    inactive-color="#ff4949"
                                    >
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="角色" v-if="isSuperAdmin">
                                <template slot-scope="scope">
                                    <role-manager :role="scope.row" @roleManagement="roleManagement" class="role-manager"></role-manager>
                                </template>
                            </el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                        <span class="fl">已选择:{{selectUserNum}}个</span>
                        <el-button @click="adduserDialog = false">取 消</el-button>
                        <el-button type="primary" @click="saveAddUser">确 定</el-button>
                    </div>
                    </el-dialog>
        </template> -->

        <template>
            <el-dialog title="部门信息" 
            lock-scroll="true" 
            class="deptDialog"
            :visible.sync="deptDialog"
             width="300px">
                <div v-loadmore="loadMore">
                    <div class="select">
                        <el-input v-model="deptvalue" 
                        suffix-icon="el-icon-search" 
                        @keyup.enter.native="searchUser('dept')"
                        placeholder="搜索部门信息" >
                    </el-input>
                    </div>
                    <div class="list">
                        <el-scrollbar>
                            <el-checkbox-group v-model="deptCheckList">
                                        <el-checkbox 
                                        v-for="item in deptAllList"
                                        :key="item.orgId" 
                                        class="che" 
                                        :label="item.orgId">{{item.deptname}}</el-checkbox>
                            </el-checkbox-group>
                        </el-scrollbar>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="deptDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addDeptFn">确 定</el-button>
                </div>
                </el-dialog>
        </template>    
    </div>
</template>

<script>
// import menuNav from "@/pages/libs/menu/menuNav"
import roleManager from "@/components/button/libs/userManagement/roleManager"
import addDepOrGroup from "@/components/button/libs/userManagement/addDepOrGroup"

import { userMixins } from "./mixins/index.js"
export default {
    mixins: [userMixins],
    components: {
        roleManager,
        addDepOrGroup
    },
    data() {
        return {
            menuLinkActive: 0,          // 菜单高亮
            getListData: {            // 获取用户列表接口请求参数
                flag: 0,
                pageSize: 10,
                PageNo: 1,
                keywords: '',
                userId:localStorage.getItem("xuserId"),
                xflag:localStorage.getItem("xflag"),
            },
            getUserLoading: false,      // 表格加载loading
            userData: [],           // 列表展示用户信息
            userTotalCount: 0,          // 总条数
            userCurrentPage: 1,         // 当前页
            value: '',
            adduserDialog:false,//新增用户的弹框
            selectUserNum:0,//选中的用户数
            allUserData:[//用户列表
                {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
                , {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
                , {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
                , {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
                , {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
              ],

            userformLabelWidth:"120px",
            /* 部门或者组室的权限控制 */
            isSuperAdmin:true,//是否是管理员
             multipleSelection: [],
             addUserForm: {
                flag: 0,
                pageSize:10,
                PageNo:1,
                keywords:'',
             },
             page:1,
             loadSign:true,
             deptDialog:false,//部门弹框
             deptCheckList:[],//部门选中的值
             deptAllList:[],
             deptvalue:'',//部门搜索
             deptForm:{
                 flag : 1,
                 pageSize:20,
                 PageNo:1,
                 keywords:'',
             },
             deptTotalPage:10,//部门的总页数

             groupForm:{
                flag : 1,
                 pageSize:20,
                 PageNo:1,
                 keywords:'',
             },

             tempUserId:null,//弹框临时的用户id

            

        





        };
    },
    mounted() {
        this.getUserLoading = true;         // 表格加载loading打开
         if(localStorage.getItem("xidentityId") == "deptAdmin" || localStorage.getItem("xidentityId") =="groupAdmin"){
            this.isSuperAdmin = false
        }else{
             this.isSuperAdmin = true
        }
        this.getUserLists(this.getListData);        // 查询全部用户 接口调用

        this.findDeptFn(this.deptForm);

    },
    directives:{
        loadmore(el,binding) {
            const selectWrap = el.querySelector('.list')
            selectWrap && selectWrap.addEventListener('scroll', function() {
                   let sign = 200;
                   const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
                    if( this.scrollTop + this.offsetHeight + sign >= this.scrollHeight){
                        binding.value()
                    }
                })
            }
    },
    methods: {
        //查询部门后者组室
        findDeptFn(paramData){
             this.$api.findDepOrGroup(paramData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.deptAllList = res.data.dataList;
                    this.deptTotalPage = res.data.totalPage;
                    this.loadSign = true;
                });
            });
        },
        loadMore () {
            let _this = this;
            if (this.loadSign) {
                this.loadSign = false
                this.deptForm.PageNo++
                if (this.deptForm.PageNo >  this.deptTotalPage) {
                   return
                }
                this.$api.findDepOrGroup(this.deptForm).then(res => {
                    this.$Fn.errorCode(res.result).then(() => {
                        res.data.dataList.forEach(function(val,index){
                            if( _this.deptAllList.indexOf(val) == -1){
                                  _this.deptAllList.push(val);
                            }
                        });
                        _this.loadSign = true;
                    });
                });
            }
        },
        //部门弹框
        editDept(row){
            this.deptForm.keywords = "";
            this.deptForm.PageNo = 1;
            this.deptvalue= "";
            this.findDeptFn(this.deptForm);
            this.deptDialog = true;
            this.tempUserId = row.userId;
            this.deptCheckList =[];//弹框的部门选中的值清空
            this.$api.findAlreadyDept({ //匹配已有的部门信息
                userId:row.userId
            }).then(res => {
                    let data = res.code;
                    if(data.length > 0){
                        data.forEach((item,index)=>{
                          this.deptCheckList.push(item.orgId)
                        })
                    }
            });
        },

        addDeptFn(){
            let params = {
                userId:this.tempUserId,
                ids:this.deptCheckList,
                flag:1
            }
             this.$api.updateUserDepOrGrop(params).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                       if(res.result.code == "0000"){
                             this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                       }
                      this.getUserLists(this.getListData);// 刷新列表
                });
            });

        
            this.deptDialog = false
        },
        //组室弹框
        editGroup(){

        },

        handleSelectionChangeUser(val){//保存值
            this.multipleSelection = val;
            this.selectUserNum = val.length;
        },
        addUser(){ //新增用户弹框
           this.adduserDialog = true;
           this.getRemainUserList(this.addUserForm);
        },
        saveAddUser(){
            console.log(this.multipleSelection);
        },
        delUser(row){//删除用户
                this.$confirm('是否删除此用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //调用ajax的方式 进行删除


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                }); 
        },

        //切换黑白名单
        switchEnabledFn(row){
            let params= {
                    enabled: row.enabled,
                    roles: row.roles,
                    userId:row.userId,
            }
             this.$api.modifyUser(params).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                       if(res.result.code == "0000"){
                             this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                       }
                      this.getUserLists(this.getListData);// 刷新列表
                });
            });

        },
        // 当前展示条数改变
        selectPageNumber(val,param){
            this.getListData.pageSize = val;
            this.getUserLists(this.getListData);        // 刷新列表
        },
        // 当前页数改变
        selectPaging(val){
            this.getListData.PageNo = val;
            this.getUserLists(this.getListData);        // 刷新列表
        },
        // 模糊查询
        searchUser(arg1){ // 刷新列表
            if(arg1 == "dept"){
                if(!this.deptvalue){
                    this.deptForm.PageNo = 1 
                }
                this.deptForm.keywords = this.deptvalue;
                this.findDeptFn(this.deptForm)
                
            }else if(arg1 == "user"){
                 this.getListData.keywords = this.value;
                 this.getUserLists(this.getListData);  
            }
                
        },
        // 角色管理的回调函数
        roleManagement(){
            this.getUserLists(this.getListData);        // 刷新列表
        },

        // 查询全部用户 接口
        getUserLists(reqData) {
            this.$api.getUserLists(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.userData = res.data.dataList;  // 表格数据赋值
                    this.getUserLoading = false;        // 表格加载loading关闭
                    this.userTotalCount = res.data.totalRecord;
                });
            });
        },
        //查询剩余的用户信息
        getRemainUserList(reqData){
             this.$api.getUserLists(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.allUserData = res.data.dataList;  // 表格数据赋值
                     this.getUserLoading = false;        // 表格加载loading关闭
                     this.allUserTotalCount = res.data.totalRecord;
                });
            });
        },
      
    }
};
</script>

<style scoped>
    .list-content{
        overflow: hidden;
    }
    .list-content .select{
        margin: 13px 20px 13px 0;
        display: block;
        float: right;
    }

    .list-content .user-list .el-table {
        border: 1px solid #ebeef5;
        padding: 0 20px 0 20px;
    }
    .list-content .user-list .el-table .role-manager {
        cursor: pointer;
    }
    
    .user-paging {
        float: right;
        margin-right: 12px;
    }
    .add-list{
        float:left;
        padding:15px 0 15px 20px;
        cursor: pointer;
    }
    .add-list:hover{
         color:#0682c8
    }
   
</style>

<style lang="scss">
    .list-content .select .el-input__inner{
        height: 30px;
        line-height: 25px;
        border-radius: 15px;
        font-size:13px;
    }
    .list-content .select .el-input{
        width: 230px;
    }
    .list-content .select .el-input__icon{
        line-height: 25px;
    }
    .addUserDialogStyle{
        .el-dialog__body{
            padding-top: 0px;
           
        }
        .fl{
            float: left;
        }
    }
    .deptDialog{
        .el-dialog__body{
            padding-top: 0px;
            padding-bottom: 0px;
        }
        .che{
            height: 30px;
            line-height: 30px;
            display: block;
            margin-left: 20px;
        }
        .list{
            height: 300px;
            overflow-y: auto;
           
        }
        .select {
            margin-top: 5px;
            margin-bottom: 5px;
            .el-input__inner{
                height: 30px;
                line-height: 25px;
                border-radius: 15px;
                font-size:13px;
            }
            .el-input{
               width: 230px;
             }
             .el-input__icon{
              line-height: 25px;
            }
        }
    }
    .el-scrollbar__wrap {
         overflow-x: hidden;
    }
</style>