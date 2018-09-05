<template>
	<view class="flex-1" v-if="pageLoad">
		<view class="search-header">
			<image class="search-header-logo" src="https://deitui-weizhan1.oss-cn-hangzhou.aliyuncs.com/attach/2018/07/06/94385ce66afa493729176ced1540f84e.png" ></image>
			<form action="/shop.php?m=forum&a=search" class="flex-1">
				<view class="none">
					<input type="text" name="m" value="forum" />
					<input type="text" name="a" value="search" />
				</view>
				<input type="text" name="keyword" class="search-header-text  " />
				 
			</form>
			<view class="mgr-5"></view>
		</view>

		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,key) in pageData.flashlist" :key="key">
				<view class="swiper-item">
					<image :src="item.imgurl" style="width:100%" mode="widthFix"></image>
				</view>
			</swiper-item>

		</swiper>
 
 
		<view class="flist">
			<view @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in pageData.forumlist" :key="fkey">
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

		<mt-footer></mt-footer>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data: {
			pageLoad: false,
			pageHide: false,
			pageData: {}
		},

		onLoad: function (option) {
			uni.showNavigationBarLoading();
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "uniBbs",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?ajax=1&fromapp=" + app.fromapp(),
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;
						uni.hideNavigationBarLoading();
					}
				})
			},

			goForum: function (id) {
				uni.navigateTo({
					url: "/pages/forum/show?id=" + id
				})
			}
		},
	}
</script>

<style>
	@import "../../common/uicompent.css";
</style>
