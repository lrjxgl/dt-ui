<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view  @click="setCat(0)" class="tabs-border-item" v-bind:class="defaultActive">推荐</view>
			<view @click="setCat(item.catid)" v-bind:class="{ 'tabs-border-active':item.isactive }" v-for="(item,key) in pageData.catlist" :key="key" class="tabs-border-item">{{item.cname}}</view>
			
		</view>
		<view class="flist">
			<view @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in pageData.list" :key="fkey">
				<view class="flist-user">
					<image :src="item.user_head+'.100x100.jpg'" class="flist-user-head"></image>
					<view class="flex-1">
						<view class="flist-nick">{{item.nickname}}</view>
						<view class="flist-time">{{item.timeago}}</view>
					</view>
				</view>
				<view class="flist-title">{{item.title}}</view>
				
				<view class="flist-vd" v-if="item.videourl">
					<image class="flist-vd-bg" src="../../static/img/0.jpg" ></image>
					<div class="flist-vd-play"></div>
				</view>
				
				<view class="flist-vd" v-else-if="item.imgurl">
					<image class="flist-vd-bg" :src="item.imgurl+'.middle.jpg'" mode="widthFix" ></image>
					
				</view>
							
				<view class="flist-imgs" v-if="item.imgslist">                   
					<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="$img+'.100x100.jpg'" class="flist-imgs-img"  mode="widthFix" ></image>
				</view>
				
				<view class="flex flist-ft">
					<view class="flist-ft-love">
						{{item.love_num}} </view>
					<view class="flist-ft-cm">
						{{item.comment_num}} </view>
					<view class="flist-ft-view">
						{{item.view_num}} </view>
				</view>
			</view>
			
		</view>
		
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;
	var catid=0;
	export default{
	
		data:{
			pageLoad:false, 
			pageHide:false,
			pageData:{},
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
				title: '资讯'
			});
			this.getPage();
		},
		 
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		}, 
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=forum&a=list&ajax=1",
					data:{
						authcode:app.getAuthCode()
					},
					success:function(res){
						//登录
						if(res.data.error==1000){
							uni.navigateTo({
								url:"/pages/login/index",
							})
						}else{
							isfirst=false;
							that.pageLoad=true;
							that.pageData=res.data.data;
							per_page=res.data.data.per_page;
						}
						 
					}
				})
			},
			setCat:function(cid){
				catid=cid;
				isfirst=true;
				per_page=0;
				if(catid==0){
					this.defaultActive=activeClass;
				}else{
					this.defaultActive="";
				}
				var catlist=this.pageData.catlist;
				for(var i in catlist){
					if(catlist[i].catid==catid){
						catlist[i].isactive=1;
					}else{
						catlist[i].isactive=0;
					}
				}
				this.pageData.catlist=catlist;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=forum&a=list&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(res){
						
						if(!res.data.error){
							if(isfirst){
								that.pageData.list=res.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,res.data.data.list);
							}
							per_page=res.data.data.per_page;  
							
						}
						
						
					}
				})
			},
			goForum: function (id) {
				uni.navigateTo({
					url: "/pages/forum/show?id=" + id
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
			}
		},
	}
</script>

<style>
 
</style>
