<template>
    <div>
        <!-- 左侧菜单 -->
        <!-- <div>
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div> -->
        <div class="space-limit">
            <div class="space-wrap">
                    <modify-space-batch 
                    v-if="isSuperAdmin"
                    :selectAnyData="selectAnyData" 
                    :listParam="listParam"
                    @spaceLimitSuccess="spaceLimitSuccess" 
                    class="modify-space-batch">
                        <span slot="iconName">批量设置容量</span>
                    </modify-space-batch>
                      <div class="add-list">
                        <span @click.stop="addMoreThreshold" class="old-space">
                            <i class="el-icon-ump-tianjia"></i>
                            <span>批量设置阈值</span>
                        </span>
                       </div>

                    <div class="selectSearch">
                        <el-input v-model="listParam.keywords"
                        suffix-icon="el-icon-search" 
                        :placeholder="placeholdertip" 
                        @keyup.enter.native="searchUser(listParam.keywords)"></el-input>
                    </div>

            </div>
           

            <div class="total-space" v-if="occupy">
                <el-progress :percentage="occupy" class="processBar" ></el-progress>
                  <span>总占用</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="spaceTabsClick" v-loading="getSpaceLoading">
                <el-tab-pane label="个人" name="1" v-if="personTab">
                    <el-table ref="multipleTable" :data="personListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="45"  v-if="isSuperAdmin">
                        </el-table-column>
                        <el-table-column prop="object.userName" label="名称">
                        </el-table-column>
                        <el-table-column label="空间容量(GB)" >
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <span style="margin-left:3px">{{scope.row.GB}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况">
                            <template slot-scope="scope" >
                                <el-progress 
                                :percentage="scope.row.scale"
                                :color="scope.row.yuJing == '是' ? '#ea7a7a':'#0682c8'"
                                 ></el-progress>
                            </template>
                        </el-table-column>
                         <el-table-column label="阈值(%)" >
                              <template slot-scope="scope">
                                   <span @click="editThreshold(scope.row.object)">
                                        <i class="el-icon-edit-outline"></i>
                                  </span>
                                   <span>
                                       {{scope.row.object.threshold}}
                                   </span>
                              </template>
                        </el-table-column>
                        <el-table-column label="是否满报警">
                            <template slot-scope="scope">
                                    <span v-bind:style="{'color':scope.row.yuJing == '是' ? '#ea7a7a':'#606266'}" >{{scope.row.yuJing}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="操作" width="80" style="display:none">
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="组室" name="2" v-if="groupTab">
                    <el-table ref="multipleTable" :data="roomListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="45"  v-if="isSuperAdmin">
                        </el-table-column>
                        <el-table-column prop="object.groupName" label="组室" >
                        </el-table-column>
                       <el-table-column label="空间容量(GB)" >
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <span style="margin-left:3px">{{scope.row.GB}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况" >
                            <template slot-scope="scope">
                                <el-progress 
                                :color="scope.row.yuJing == '是' ? '#ea7a7a':'#0682c8'"
                                :percentage="scope.row.scale" ></el-progress>
                            </template>
                        </el-table-column>
                         <el-table-column label="阈值(%)" >
                              <template slot-scope="scope">
                                   <span @click="editThreshold(scope.row.object)">
                                        <i class="el-icon-edit-outline"></i>
                                  </span>
                                   <span>
                                        {{scope.row.object.threshold}}
                                   </span>
                              </template>
                        </el-table-column>
                       <el-table-column label="是否满报警">
                            <template slot-scope="scope">
                                    <span v-bind:style="{'color':scope.row.yuJing == '是' ? '#ea7a7a':'#606266'}" >{{scope.row.yuJing}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="操作"  v-if="isSuperAdmin" style="display:none">
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="部门" name="3" v-if="departTab">
                    <el-table ref="multipleTable" :data="partListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="45"  v-if="isSuperAdmin">
                        </el-table-column>
                        <el-table-column prop="object.deptname" label="部门" >
                        </el-table-column>
                        <el-table-column  label="空间容量(GB)" >
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <span style="margin-left:3px">{{scope.row.GB}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况" >
                            <template slot-scope="scope">
                                <el-progress 
                                 :color="scope.row.yuJing == '是' ? '#ea7a7a':'#0682c8'"
                                 :percentage="scope.row.scale"
                                 ></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column label="阈值(%)" >
                              <template slot-scope="scope">
                                   <span @click="editThreshold(scope.row.object)">
                                        <i class="el-icon-edit-outline"></i>
                                  </span>
                                   <span>
                                        {{scope.row.object.threshold}}
                                   </span>
                              </template>
                        </el-table-column>
                       <el-table-column label="是否满报警">
                            <template slot-scope="scope">
                                    <span v-bind:style="{'color':scope.row.yuJing == '是' ? '#ea7a7a':'#606266'}" >{{scope.row.yuJing}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="操作"  v-if="isSuperAdmin" style="display:none">
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <div class="space-paging">
                <!-- 分页 -->
                <el-pagination
                    @size-change="selectPageNumber"
                    @current-change="selectPaging"
                    :current-page="spaceCurrentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="listParam.pageTotal"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="spaceTotalCount">
                </el-pagination>
            </div>
	    </div>

        <!-- 设置阈值弹框 threshold  start -->
        <template>
             <el-dialog title="阈值大小设置" :visible.sync="thresholdDialogFormVisible" width="350px" custom-class="thresholdDialogForm">
                <el-form :model="thresholdForm" label-width="80px">
                    <el-form-item label="设置阈值" label-width="90px"> 
                       <el-input style="width:170px" v-model="thresholdForm.value" autocomplete="off"></el-input>
                       <template>
                           %
                       </template>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="thresholdDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditThresholdFn">确 定</el-button>
                </div>
            </el-dialog>
        </template>
        <!-- 设置阈值弹框 end -->
    </div>
</template>

<script>
// button
import modifySpaceLimit from "@/components/button/libs/modify/modifySpaceLimit"
import resetSpace from "@/components/button/libs/modify/resetSpace"
import modifySpaceBatch from "@/components/button/libs/modify/modifySpaceBatch"

export default {
    components: {
        // menuNav,
        modifySpaceLimit,
        resetSpace,
        modifySpaceBatch
    },
    beforeMount(){ },
    data() {
        return {
            placeholdertip:'个人名称',
            personTab:true,//个人 根据登录时候不同用户身份，显示个人，组室，部门的页签
            groupTab:true,//组室
            departTab:true,//部门
            menuLinkActive: 3,      // 菜单高亮
            partListData: [],        // 部门 表格数据
            personOriginListData:[],
            roomListData: [],       // 组室 表格数据
            roomOriginListData:[],
            personListData: [],     // 个人 表格数据
            partOriginListData:[],
            activeName: "1",        // 默认展示tab
            listParam: {            // 获取个人/组室/部门全部空间情况 请求参数
                pageNo: 1,          // 当前页
                pageTotal: 10,      // 当前展示页数
                spaceType: "",      // 个人：1 组室：2 部门：3
                userId:localStorage.getItem("xuserId"),
                keywords:'',//模糊搜素
                //orgId:localStorage.getItem("xorgId")
            },
            getSpaceLoading: false,     // 数据加载loading
            spaceCurrentPage: 1,         // 当前页
            spaceTotalCount: 0,          // 总条数
            selectAnyData: [],       // 列表中勾选的数据
            occupy:0,//总占用

            /* 部门或者组室的权限控制 */
            isSuperAdmin:true,//是否是管理员
            thresholdDialogFormVisible:false,//阈值弹框
            thresholdForm:{
                value:0
            },
            tempId:null,//在列表中，点击弹框中临时的id值
            IsBatchThreshold:null,// 单个single  多个more



        };
    },
    created(){
         this.getSpaceLoading = true;        // 数据加载loading
         this.listParam.spaceType = 1;       // 默认刷新 个人管理页面
         this.showSpaceManageList(this.listParam);   // 获取个人/组室/部门全部空间情况 接口调用
         this.showTotalSpaceFn();        // 获取总占用量
    },
    mounted() {
        if(localStorage.getItem("xidentityId") == "deptAdmin" || localStorage.getItem("xidentityId") =="groupAdmin"){
            this.personTab = false;
            this.activeName = "2";
            this.isSuperAdmin = false
        }else{
             this.isSuperAdmin = true
        }
    },

    methods: {
        saveEditThresholdFn(){
            //判断是批量或者单个修改
             if( this.IsBatchThreshold == "more"){
                 let reqData={
                     ids:this.selectAnyData,
                     spaceType:this.listParam.spaceType,
                     threshold:this.thresholdForm.value,
                 }
                 this.$api.modifyThresholdBatch(reqData).then(res => {
                    this.$Fn.errorCode(res.result).then(() => {
                        if(res.result.code == '0000'){
                            this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                        }
                        this.thresholdDialogFormVisible = false;
                        this.showSpaceManageList(this.listParam);  
                    })
                })
             }else if(this.IsBatchThreshold == "single"){
                  let reqData ={
                        threshold:this.thresholdForm.value,
                        spaceType:this.listParam.spaceType,
                        id:this.tempId
                  }
                this.$api.modifyThreshold(reqData).then(res => {
                    this.$Fn.errorCode(res.result).then(() => {
                        if(res.result.code == '0000'){
                            this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                        }
                        this.thresholdDialogFormVisible = false;
                        this.showSpaceManageList(this.listParam);  
                    })
                })
           }
            

        },
        editThreshold(row){//设置单个阈值
            this.thresholdDialogFormVisible = true;
            this.IsBatchThreshold = "single";
            this.thresholdForm.value =row.threshold;
            if(this.listParam.spaceType == 1){
                this.tempId  = row.userId;
            }else{
                this.tempId = row.orgId
            }

        },
        addMoreThreshold(){
            if(this.selectAnyData.length == 0){
                 this.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                 });
                 return
            }else{
                this.thresholdForm.value = 0;
                this.IsBatchThreshold = "more"
                this.thresholdDialogFormVisible = true
            }

            
        },
        searchUser(val){//关键词搜索 
         if(!!val){
                 if (this.listParam.spaceType == 1) {
                    this.personListData = this.personListData.filter((item)=>{
                            return item.object.userName.indexOf(val) > -1
                    })
                }else if(this.listParam.spaceType == 2){
                      this.roomListData = this.roomListData.filter((item)=>{
                            return item.object.groupName.indexOf(val) > -1
                    })

                }else if(this.listParam.spaceType == 3){
                      this.partListData = this.partListData.filter((item)=>{
                            return item.object.deptname.indexOf(val) > -1
                    })
                }
         }else{
                if (this.listParam.spaceType == 1) {
                      this.personListData = [...this.personOriginListData];
                }else if(this.listParam.spaceType == 2){
                      this.roomListData = [...this.roomOriginListData];
                }else if(this.listParam.spaceType == 3){
                      this.partListData = [...this.partOriginListData];
                }

         }
  
        },
        showTotalSpaceFn(){ // 获取总占用量
             this.$api.showTotalSpace().then(res => {
                    this.occupy =res.totalUseSpace && Number((res.totalUseSpace/res.conversion)*100).toFixed(2) || 0
                 
             })
        },
        // tabs切换事件
        spaceTabsClick(tab) {
            this.listParam.keywords = "";
            this.listParam.spaceType = tab.name;    // 获取个人/组室/部门全部空间情况参数 赋值
            let placeholderTipAry=["","个人名称","组室名称","部门名称"]
            this.placeholdertip = placeholderTipAry[tab.name];
            this.showSpaceManageList(this.listParam);     // 获取个人/组室/部门全部空间情况 接口调用
        },
        // 多选数据 选中事件
        chooseAnyEdit(val) {
            this.selectAnyData = [];
            if (this.listParam.spaceType == 1) {
                val.forEach(item => {
                    this.selectAnyData.push(item.object.userId);
                });
            } else {
                val.forEach(item => {
                    this.selectAnyData.push(item.object.orgId);
                });
            }
        },
        // 操作成功 回调函数
        spaceLimitSuccess(){
            this.showSpaceManageList(this.listParam);       // 刷新列表
        },
        // 当前展示条数改变
        selectPageNumber(val){
            this.listParam.pageTotal = val;
            this.showSpaceManageList(this.listParam);        // 刷新列表
        },
        // 当前页数改变
        selectPaging(val){
            this.listParam.pageNo = val;
            this.showSpaceManageList(this.listParam);        // 刷新列表
        },

        // 获取个人/组室/部门全部空间情况 接口
        showSpaceManageList(reqData) {
             this.getSpaceLoading = true;        // 数据加载loading开始
            this.$api.showSpaceManageList(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    res.data.dataList && res.data.dataList.forEach(item => {
                        if (item.scale < 0) {
                            item.scale = 0;
                        } if(item.scale == 'Infinity'){
                             item.scale = 100;
                        } else {
                            item.scale = Number((item.scale * 100).toFixed(2));     // 使用情况 赋值
                        }
                    });
                    if (this.listParam.spaceType == 1) {
                        this.personListData = res.data.dataList;    // 个人 表格数据赋值
                        this.personOriginListData = res.data.dataList;    
                    } else if (this.listParam.spaceType == 2) {
                        this.roomListData = res.data.dataList;      // 组室 表格数据赋值
                        this.roomOriginListData = res.data.dataList;     
                    } else if (this.listParam.spaceType == 3) {
                        this.partListData = res.data.dataList;      // 部门 表格数据赋值
                        this.partOriginListData = res.data.dataList;    
                    }
                    this.spaceTotalCount = res.data.totalRecord;     // 总条数 赋值
                    this.getSpaceLoading = false;        // 数据加载loading关闭
                });
            });
        }
    }
};
</script>

<style scoped  lang="scss">
    .space-limit {
        /* float: left; */
        /* margin-left: 260px; */
        position: relative;
    }
    .space-limit{
         .modify-space-batch{
           padding: 15px 0 15px 20px;
         }
    }
    .space-limit{
        .el-tabs {
            border: 1px solid #ebeef5;
            padding: 0 20px 0 20px;
       }
    }
    /* .menu-bar {
        position: relative;
        float: left;
        width: 260px;
        background:#f2f7f9;
    } */
    .space-limit{
        .el-progress-bar {
          margin-right: -70px;
       }
    } 
    .space-limit{
         .el-progress__text {
            margin-left: 19px;
            width: 38px;
         }
    }
    .space-limit{
         .space-paging {
            float: right;
            margin-right: 12px;
         }
    }
     .space-limit{
         .total-space{
              position: absolute;
                top: 18px;
                right: 256px;
         }
          .space-wrap{
            height: 50px;
          }
          .add-list{
            display: inline-block;
            padding: 15px 0 15px 20px;
          }
          .old-space{
              cursor: pointer;
          }
          .old-space:hover{
              color:#409EFF
          }


     } 
    .space-limit{
         .total-space span {
            float: right;
            margin-top: -30px;
            margin-right: 203px;
        }
    }
   
 
</style>
<style  lang="scss">
    .selectSearch{
        margin-top: 6px;
        margin-right:20px;
        display: inline-block;
        float: right;
        right: 20px;
        .el-progress__text{
         width: 48px;
       }
        .el-input{
                width: 230px;
        }
        .el-input__icon{
                line-height: 25px;
        }
        .el-input{
            .el-input__inner{
                height: 30px !important;
                line-height: 25px!important;;
                border-radius: 15px!important;;
                font-size:13px!important;;
            }
        }
    }
     .thresholdDialogForm{
        .el-dialog__body{
            padding-bottom: 10px;
            padding-top:20px;
        }
    }
    .ft-ea7a7a{//绑定三元运算符
        color:#ea7a7a
    }
</style>

