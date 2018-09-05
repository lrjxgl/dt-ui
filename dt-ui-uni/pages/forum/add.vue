<template>
	<view>
		<view v-if="pageLoad">
			 <form>
				<view class="input-flex">
					<view class="input-flex-label">主题</view>
					<input class="input-flex-text" type="text" name="title" />
				</view>
				<textarea name="content" class="textarea-content"></textarea>
				<button type="submit" class="btn-row-submit" form-type="submit">保存</button>
			 </form>
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
		onReady:function(){
			uni.setNavigationBarTitle({
				title:"发布帖子",
			})
		} ,
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=forum&ajax=1&a=add",
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