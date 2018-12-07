<template>
	<div class="headerCon">
		<img src="../assets/img/sss.png" alt="">
		<div class="title">新华全媒</div>
		<div class="slo"> 
			新闻知识库后台管理系统
		</div>
		<div class="logout" v-if="isShowBtn" @click="loginOutFn">
			<span>退出</span>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			isShowBtn:false,
		}
	},
	mounted(){
		if(!!localStorage.getItem("xuserId")){
			this.isShowBtn=true
		}
	},
	methods:{
		loginOutFn(){//清楚保存在本地的信息
		    localStorage.removeItem("xuserId");
		    localStorage.removeItem("xidentityId");
		    localStorage.removeItem("xorgId");
			localStorage.removeItem("xflag");
			this.$router.push({
				path:'/login'
			})
		}
	},
	watch:{

	}

}
</script>

<style scoped>
	.headerCon{
		background: #0682c8;
		width: 100%;
		height: 80px;
		position: relative;
	}
	.headerCon img{
		width: 50px;
		height: 50px;
		border-radius: 25px;
		position: absolute;
		top: 15px;
		left: 20px;
	}
	.headerCon .title{
		position: absolute;
		top: 17px;
		left: 90px;
		font-size: 20px;
		color: #ffffff;
	}
	.headerCon .slo{
		position: absolute;
		top: 45px;
		left: 90px;
		color: #ffffff;
	}
	.headerCon .logout{
		position: absolute;
		right: 30px;
		top: 25px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	}
</style>
