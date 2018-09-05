<template>
	<view>
		<view class="mfooter-row"></view>
		<view class="mfooter">
			<view @click="goHome()" class="mfooter-item" v-bind:class="{'mfooter-active':tab=='index'}">
				<view class="mfooter-icon iconfont icon-home"></view>
				首页
			</view>
			<view @click="goForum()"  class="mfooter-item" v-bind:class="{'mfooter-active':tab=='product'}">
				<view class="mfooter-icon iconfont icon-news"></view>
				帖子
			</view>
			<view @click="goAdd()"  class="mfooter-item" v-bind:class="{'mfooter-active':tab=='product'}">
				<image  src="../../static/img/add.png" class="mfooter-add"></image>
				<view class="mfooter-icon">&nbsp;</view>
				发布
			</view>
			<view @click="goGroup()"  class="mfooter-item" v-bind:class="{'mfooter-active':tab=='cart'}">
				<view class="mfooter-icon iconfont icon-pic"></view>
				版块
			</view>
			<view @click="goUser()"  class="mfooter-item" v-bind:class="{'mfooter-active':tab=='user'}">
				<view class="mfooter-icon iconfont icon-my"></view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tab:"index"
		},
		methods:{
			goHome:function(){
				 
				uni.navigateBack({
					delta:50,
				})
			},
			goForum:function(){
				uni.navigateTo({
					url:"/pages/forum/index",
				})
			},	
			goAdd:function(){
				uni.navigateTo({
					url:"/pages/forum/add",
				})
			},
			goGroup:function(){
				uni.navigateTo({
					url:"/pages/forum_group/index",
				})
			},	
			goUser:function(){
				if(wx.getStorageSync("authcode")){
					uni.navigateTo({
						url:"/pages/user/index",
					})
				}else{
					uni.navigateTo({
						url:"/pages/login/index",
					})
				}
				
			},	
		}
	}
</script>

<style>
/***mfooter***/
.mfooter-row{
	height: 120px;
}
.mfooter{
	display: flex;
	flex-direction: row;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ed6d53;
	
	height: 120px;
	align-items:center;
	z-index: 99;
}
.mfooter-item{
	flex: 1;
	text-align: center;
	text-decoration: none;
	color: #e0e0e0;
	font-size: 36px;
	
	cursor: pointer;
	display: block;
	position: relative;
}
.mfooter-add {
    position: absolute;
    width: 80px;
    height: 80px;
    top: -56px; 
    left: 50%;
    margin-left: -40px;
    z-index: 99;
}
.mfooter-icon{
	display: block;
	color: #e0e0e0;
	height: 35px;
	font-size: 35px;
}
.mfooter-active{
	color: #eee;
	background-color: #ED5953;
}
</style>
