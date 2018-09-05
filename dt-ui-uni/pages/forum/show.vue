<template>
	<view>
		<view v-if="pageLoad">
			<view class="flex">
				<image :src="data.user_head" class="wh-100"></image>
				<view class="flex">
					<view class="f16">{{data.nickname}}</view>
					<view class="flex-1"></view>
					<view class="mgr-10 btn btn-danger">关注</view>
				</view>
			</view>
		<view class="d-title">{{pageData.data.title}}</view>
		 
		<view class="d-content">
			<rich-text type="text" :nodes="pageData.data.content"></rich-text>
		</view>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:{
			pageLoad:false, 
			pageData:{}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=forum&ajax=1&a=show&id="+id,
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			} 
		},
	}
</script>

<style>
</style>