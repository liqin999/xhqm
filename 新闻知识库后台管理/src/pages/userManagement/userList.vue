<template>
    <div>
        <!-- 左侧菜单栏 -->
        <!-- <div>
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div> -->
        <div class="list-content">
            <!-- <div class="add-list">
                    <span @click.stop="addUser" class="old-space">
                        <i class="el-icon-ump-tianjia"></i>
                        <span>新增用户</span>
                     </span>
            </div> -->
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
                                 <i class="el-icon-edit-outline"></i>
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="组室" >
                         <template slot-scope="scope">
                            <span @click="editGroup(scope.row)">
                                 <i class="el-icon-edit-outline"></i>
                            </span>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                             <i class="el-icon-delete" @click="delUser(scope.row)"></i>
                        </template>
                    </el-table-column> -->
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
       
        <!-- 部门弹框 start -->
        <template>
            <el-dialog title="部门信息" 
            class="deptDialog"
            v-if="deptDialog"
            :visible.sync="deptDialog"
             width="300px">
                <div v-loadmore:dept="loadMore">
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
                    <el-button type="primary" @click="updateUserDepOrGropFn('dept')">确 定</el-button>
                </div>
                </el-dialog>
        </template>   
        <!-- 部门弹框 end --> 

         <!-- 组室弹框 start --> 
         <template>
            <el-dialog title="组室信息" 
            class="deptDialog"
            v-if="groupDialog"
            :visible.sync="groupDialog"
             width="300px">
                <div v-loadmore:group="loadMore">
                    <div class="select">
                        <el-input v-model="groupvalue" 
                        suffix-icon="el-icon-search" 
                        @keyup.enter.native="searchUser('group')"
                        placeholder="搜索组室信息" >
                    </el-input>
                    </div>
                    <div class="list">
                        <el-scrollbar>
                            <el-checkbox-group v-model="groupCheckList">
                                        <el-checkbox 
                                        v-for="item in groupAllList"
                                        :key="item.orgId" 
                                        class="che" 
                                        :label="item.orgId">{{item.groupName}}</el-checkbox>
                            </el-checkbox-group>
                        </el-scrollbar>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="deptDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updateUserDepOrGropFn('group')">确 定</el-button>
                </div>
                </el-dialog>
        </template>  
         <!-- 组室弹框 start -->   
    </div>
</template>

<script>
// import menuNav from "@/pages/libs/menu/menuNav"
import roleManager from "@/components/button/libs/userManagement/roleManager"
// import addDepOrGroup from "@/components/button/libs/userManagement/addDepOrGroup"
import { userMixins } from "./mixins/index.js"
export default {
    mixins: [userMixins],
    components: {
        roleManager,
        // addDepOrGroup
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
            
            userformLabelWidth:"120px",
            /* 部门或者组室的权限控制 */
            isSuperAdmin:true,//是否是管理员
          
             page:1,
             loadSignDept:true,//滚动加载部门或者组室
             loadSignGroup:true,
             deptDialog:false,//部门弹框
             deptCheckList:[],//部门选中的值
             deptAllList:[],//所有的部门信息
             deptvalue:'',//部门搜索
             deptForm:{
                 flag : 1,
                 pageSize:20,
                 PageNo:1,
                 keywords:'',
             },
             deptTotalPage:10,//部门的总页数
             tempUserId:null,//弹框临时的用户id
            groupDialog:false,
            groupvalue:'',
            groupCheckList:[],
            groupAllList:[],
            groupForm:{
                 flag : 2,
                 pageSize:20,
                 PageNo:1,
                 keywords:'',
             },
            groupTotalPage:10,//组室的总页数

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
    },
    directives:{
        loadmore(el,binding) {
            const selectWrap = el.querySelector('.list')
            selectWrap && selectWrap.addEventListener('scroll', function() {
                   let sign = 200;
                   const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
                    if( this.scrollTop + this.offsetHeight + sign >= this.scrollHeight){
                        binding.value(binding.arg)
                    }
                })
            }
    },
    methods: {
        //查询部门后者组室
        findDeptFn(paramData,str){
             this.$api.findDepOrGroup(paramData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    if(str == 'dept'){
                         this.deptAllList = res.data.dataList;
                         this.deptTotalPage = res.data.totalPage;
                       
                    }else if(str == 'group'){
                         this.groupAllList = res.data.dataList;
                         this.groupTotalPage = res.data.totalPage;
                       
                    }
                   
                });
            });
        },
        loadMore (str) {
            let _this  = this;
            if(str == 'dept'){
                if(this.loadSignDept){
                    this.loadSignDept = false
                    this.deptForm.PageNo++
                    if (this.deptForm.PageNo >  this.deptTotalPage) {
                       return;
                    }
                    this.$api.findDepOrGroup(this.deptForm).then(res => {
                        this.$Fn.errorCode(res.result).then(() => {
                            res.data.dataList.forEach(function(val,index){
                                if( _this.deptAllList.indexOf(val) == -1){
                                    _this.deptAllList.push(val);
                                }
                            });
                            _this.loadSignDept = true;
                        });
                    });

                }
            }else if(str == 'group'){
                if(this.loadSignGroup){
                    this.loadSignGroup = false;
                    this.groupForm.PageNo++;
                    if (this.groupForm.PageNo >  this.groupTotalPage) {
                       return;
                    }
                    this.$api.findDepOrGroup(this.groupForm).then(res => {
                        this.$Fn.errorCode(res.result).then(() => {
                            res.data.dataList.forEach(function(val,index){
                                if( _this.groupAllList.indexOf(val) == -1){
                                    _this.groupAllList.push(val);
                                }
                            });
                            _this.loadSignGroup = true;
                        });
                    });
                }
            }

        },
        //部门弹框
        editDept(row){
            this.deptForm.keywords = "";
            this.deptForm.PageNo = 1;
            this.deptvalue= "";
            this.findDeptFn(this.deptForm,'dept');
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

        //组室弹框
        editGroup(row){
            this.groupForm.keywords = "";
            this.groupForm.PageNo = 1;
            this.groupvalue= "";
            this.findDeptFn(this.groupForm,'group');
            this.groupDialog = true;
            this.tempUserId = row.userId;
            this.groupCheckList =[];//弹框的部门选中的值清空
            this.$api.findAlreadyGroup({ //匹配已有的部门信息
                userId:row.userId
            }).then(res => {
                    let data = res.code;
                    if(data.length > 0){
                        data.forEach((item,index)=>{
                          this.groupCheckList.push(item.orgId)
                        })
                    }
            });
        },

        updateUserDepOrGropFn(str){
            let params ={
                  userId:this.tempUserId,
            }
            if(str == 'dept'){
                params.ids = this.deptCheckList;
                params.flag = 1;
            }else if(str == 'group'){
                params.ids = this.groupCheckList;
                params.flag = 2;
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
            this.groupDialog = false
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
                this.findDeptFn(this.deptForm,"dept")
                
            }else if(arg1 == "user"){
                 this.getListData.keywords = this.value;
                 this.getUserLists(this.getListData);  
            }else if(arg1 == "group"){
                 if(!this.groupvalue){
                    this.groupForm.PageNo = 1 
                 }
                this.groupForm.keywords = this.groupvalue;
                this.findDeptFn(this.groupForm,"group")
            }
                
        },
        // 角色管理的回调函数
        roleManagement(){
            this.getUserLists(this.getListData);        // 刷新列表
        },

        // 查询全部用户 接口
        getUserLists(reqData) {
            this.getUserLoading = true;
            this.$api.getUserLists(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    this.userData = res.data.dataList;  // 表格数据赋值
                    this.getUserLoading = false;        // 表格加载loading关闭
                    this.userTotalCount = res.data.totalRecord;
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