<template>
	<view>
		<view v-if="pageLoad">
			<view class="grouplist">
      			 
				<view  @click="goGroup($c.gid)" class="grouplist-item" v-for="($c,index) in pageData.data" :key="index">
					<view class="grouplist-img" :url="'/pages/forum/list?gid='+$c.gid">
						<img class="grouplist-img-img" mode="widthFix" :src="$c.imgurl+'.100x100.jpg'"  />
					</view>
					<view class="flex-1 ">
						<view class="grouplist-title ">{{$c.title}}</view>
						<view class="grouplist-stats">
							主题数 <span class="cor-num mgr-5">{{$c.topic_num}}</span> 
							评论数 <span class="cor-num">{{$c.comment_num}}</span> 
						</view>
						<view class="grouplist-desc">{{$c.description}}</view>
					</view>
					
				</view>
				 
		  </view>  
				
		</view>
		<mt-footer  tab="category"></mt-footer>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/footer.vue";
	export default {
		components:{
			mtFooter
		},
		data: {
			pageLoad: false,
			pageData: {}
		},
		onLoad: function (option) {

			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=forum_group&ajax=1",
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;

					}
				})
			}

		},
	}
</script>

<style>

</style>
