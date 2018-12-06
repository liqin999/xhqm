<template>
	<div id="organization">
		<div>
			<el-button type="primary">新增账号</el-button>
			<el-button type="primary">批量删除</el-button>
			<el-select v-model="valuePart" placeholder="请选择部门">
				<el-option v-for="item in optionsPart" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="valueRoom" placeholder="请选择组室">
				<el-option v-for="item in optionsRoom" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="valueRole" placeholder="请选择角色">
				<el-option v-for="item in optionsRole" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-input v-model="inputSearch" placeholder="搜索"></el-input>
		</div>
		<div>
			<el-table :data="organizationData" style="width: 100%" @selection-change="selectedNode">
				<el-table-column type="selection" width="30">e
				</el-table-column>
				<el-table-column prop="id" label="ID" width="80">
				</el-table-column>
				<el-table-column prop="role" label="角色名称" width="100">
				</el-table-column>
				<el-table-column prop="situation" label="状态" width="100">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="100">
				</el-table-column>
				<el-table-column prop="part" label="部门" width="100">
				</el-table-column>
				<el-table-column prop="room" label="组室" width="100">
				</el-table-column>
				<el-table-column prop="time" label="创建时间" width="180">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<style>
#organization {
  position: absolute;
  top: 80px;
  left: 300px;
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      organizationData: [
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        },
        {
          id: "28392",
          role: "中文乱码",
          situation: "Text",
          name: "杨宝",
          part: "财务部",
          room: "审计组",
          time: "2018-10-15 15:04:11"
        }
      ],
      optionsPart: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      valuePart: "",
      optionsRoom: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      valueRoom: "",

      optionsRole: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      valueRole: "",
      inputSearch: ""
    };
  },
  methods: {
    selectedNode() {}
  }
};
</script>
