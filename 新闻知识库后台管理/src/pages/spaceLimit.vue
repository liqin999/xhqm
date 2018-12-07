<template>
    <div>
        <!-- 左侧菜单 -->
        <!-- <div>
            <menu-nav :menuLinkActive="menuLinkActive"></menu-nav>
        </div> -->
        <div class="space-limit">
            <modify-space-batch 
             :selectAnyData="selectAnyData" 
            :listParam="listParam"
             @spaceLimitSuccess="spaceLimitSuccess" 
             class="modify-space-batch">
                <span slot="iconName">批量编辑</span>
            </modify-space-batch>

             <div class="select">
                <el-input v-model="listParam.keywords"
                 suffix-icon="el-icon-search" 
                 placeholder="搜索用户" 
                 @keyup.enter.native="searchUser(listParam.keywords)"></el-input>
            </div>

            <div class="total-space">
                <el-progress :percentage="occupy" class="processBar" ></el-progress>
                  <span>总占用</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="spaceTabsClick" v-loading="getSpaceLoading">
                <el-tab-pane label="个人" name="1">
                    <el-table ref="multipleTable" :data="personListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="45">
                        </el-table-column>
                        <el-table-column prop="object.userName" label="名称">
                        </el-table-column>
                        <el-table-column prop="object.attachmentLimit" label="空间容量" >
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况" >
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.scale"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column prop="yuJing" label="是否满报警">
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="组室" name="2">
                    <el-table ref="multipleTable" :data="roomListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="object.groupName" label="组室" >
                        </el-table-column>
                        <el-table-column prop="object.attachmentLimit" label="空间容量" >
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况" >
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.scale"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column prop="yuJing" label="是否满报警" >
                        </el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="部门" name="3">
                    <el-table ref="multipleTable" :data="partListData" tooltip-effect="dark" style="width: 100%" @selection-change="chooseAnyEdit">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="object.deptname" label="部门" >
                        </el-table-column>
                        <el-table-column prop="object.attachmentLimit" label="空间容量" >
                        </el-table-column>
                        <el-table-column prop="scale" label="使用情况" >
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.scale"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column prop="yuJing" label="是否满报警" >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <modify-space-limit :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></modify-space-limit>
                                <reset-space :thisSpace="scope.row" :listParam="listParam" @spaceLimitSuccess="spaceLimitSuccess"></reset-space>
                            </template>
                        </el-table-column>
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
    </div>
</template>

<script>
// libs
// import menuNav from "@/pages/libs/menu/menuNav"

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
    data() {
        return {
            menuLinkActive: 3,      // 菜单高亮
            partListData: [],        // 部门 表格数据
            roomListData: [],       // 组室 表格数据
            personListData: [],     // 个人 表格数据
            activeName: "1",        // 默认展示tab
            listParam: {            // 获取个人/组室/部门全部空间情况 请求参数
                pageNo: 1,          // 当前页
                pageTotal: 20,      // 当前展示页数
                spaceType: "",      // 个人：1 组室：2 部门：3
                userId:localStorage.getItem("xuserId"),
                keywords:'',//模糊搜素
            },
            getSpaceLoading: false,     // 数据加载loading
            spaceCurrentPage: 1,         // 当前页
            spaceTotalCount: 0,          // 总条数
            selectAnyData: [],       // 列表中勾选的数据
            occupy:1,//总占用


        };
    },
    mounted() {
        this.getSpaceLoading = true;        // 数据加载loading
        this.listParam.spaceType = 1;       // 默认刷新 个人管理页面
         this.showSpaceManageList(this.listParam);        // 获取个人/组室/部门全部空间情况 接口调用
         this.showTotalSpaceFn();        // 获取总占用量
    },
    methods: {
        searchUser(){//关键词搜索 
            console.log()
            this.showSpaceManageList(this.listParam);
        },
        showTotalSpaceFn(){ // 获取总占用量
             this.$api.showTotalSpace().then(res => {
                    this.occupy = Number(res.totalUseSpace/res.conversion).toFixed(2)*100
                 
             })
        },
        // tabs切换事件
        spaceTabsClick(tab) {
            console.log('当前tab',tab.name);
            this.listParam.keywords = "";
            this.listParam.spaceType = tab.name;    // 获取个人/组室/部门全部空间情况参数 赋值
            this.showSpaceManageList(this.listParam);     // 获取个人/组室/部门全部空间情况 接口调用
        },
        // 多选数据 选中事件
        chooseAnyEdit(val) {
            console.log('选中的数据',val);
            this.selectAnyData = [];
            if (this.listParam.spaceType == 1) {
                val.forEach(item => {
                    this.selectAnyData.push(item.object.userId);
                });
            } else {
                val.forEach(item => {
                    this.selectAnyData.push(item.object.tid);
                });
            }
        },
        // 操作成功 回调函数
        spaceLimitSuccess(){
            this.showSpaceManageList(this.listParam);       // 刷新列表
        },
        // 当前展示条数改变
        selectPageNumber(val){
            console.log('当前展示条数',val);
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
            this.$api.showSpaceManageList(reqData).then(res => {
                this.$Fn.errorCode(res.result).then(() => {
                    res.data.dataList.forEach(item => {
                        if (item.scale < 0) {
                            item.scale = 0;
                        } else {
                            item.scale = Number((item.scale * 100).toFixed(2));     // 使用情况 赋值
                        }
                    });
                    if (this.listParam.spaceType == 1) {
                        this.personListData = res.data.dataList;    // 个人 表格数据赋值
                    } else if (this.listParam.spaceType == 2) {
                        this.roomListData = res.data.dataList;      // 组室 表格数据赋值
                    } else if (this.listParam.spaceType == 3) {
                        this.partListData = res.data.dataList;      // 部门 表格数据赋值
                    }
                    this.spaceTotalCount = res.data.totalRecord;     // 总条数 赋值
                    this.getSpaceLoading = false;        // 数据加载loading关闭
                });
            });
        }
    }
};
</script>

<style scoped>
    .space-limit {
        /* float: left; */
        /* margin-left: 260px; */
        position: relative;
    }
    .space-limit .modify-space-batch{
        padding: 15px 0 15px 20px;
    }
    .space-limit .el-tabs {
        border: 1px solid #ebeef5;
        padding: 0 20px 0 20px;
    }
    /* .menu-bar {
        position: relative;
        float: left;
        width: 260px;
        background:#f2f7f9;
    } */
    .space-limit .el-progress-bar {
        margin-right: -70px;
    }
    .space-limit .el-progress__text {
        margin-left: 19px;
    }
    .space-limit .space-paging {
        float: right;
        margin-right: 12px;
    }
     .space-limit .total-space{
         position: absolute;
             position: absolute;
                top: 18px;
                right: 256px;
     }
    .space-limit .total-space span {
        float: right;
        margin-top: -30px;
        margin-right: 203px;
    }
    .space-limit .total-space .el-progress{
        /* width: 20%;
        float: right;
        margin-top: -33px; */
    }
    
     .select{
        /* margin: 5px 20px 13px 0; */
        margin-top: 10px;
        display: block;
        float: right;
    }
  
</style>

<style>
    .space-limit .select .el-input__inner{
        height: 30px;
        line-height: 25px;
        border-radius: 15px;
        font-size:13px;
    }
    .space-limit .select .el-input{
        width: 230px;
    }
    .space-limit .select .el-input__icon{
        line-height: 25px;
    }
</style>