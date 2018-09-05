$(function() {
	//头部搜索	
	$(document).on("keyup", "#search-text", function(event) {
		if($(this).val() == '') return false;
		if(event.keyCode == "13") {
			var keyword = $(this).val();
			window.location = "/index.php?m=product&keyword=" + encodeURI(keyword);
			return false;
		}
	})
	//分类滚动

})

var catScroll = {
	wh: $(window).height(),
	eIndex: ".list-side-item",  
	eBoxs: ".list-cat-item", 
	lastY: 0,
	lastIndex: 0,
	top:100,
	init: function() {
		var that=this;
		var $eIndex = $(this.eIndex);
		var $eBoxs = $(that.eBoxs);
		var a = $eIndex.eq(that.lastIndex).addClass("active");
		$(document).on("click", that.eIndex, function(e) {
			$(this).addClass("active").siblings().removeClass("active");
			var st = $eBoxs.eq($(this).index()).offset().top - 100;
			$(window).scrollTop(st);
			that.lastY = st;
			that.lastIndex = $(this).index();
		})

		$(document).on("scroll", function(e) {
			var st = $(this).scrollTop();
			if(st > that.lastY) { /*向上拉*/
				var eBox = $eBoxs.eq(that.lastIndex + 1);
				if(eBox.length == 0) return false;

				if(st + that.top > eBox.offset().top) {
					that.lastY = st;
					$eIndex.eq(that.lastIndex + 1).addClass("active").siblings().removeClass("active");
					that.lastIndex++;
				}

			} else { /*向下拉*/
				var eindex = that.lastIndex - 1;

				if(eindex < 0) return false;
				var eBox = $eBoxs.eq(eindex);
				if(eBox.length == 0) return false;
				var thisBox = $eBoxs.eq(that.lastIndex);

				if(st + that.top+100 < thisBox.offset().top) {
					that.lastY = st;
					$eIndex.eq(eindex).addClass("active").siblings().removeClass("active");
					that.lastIndex = eindex;
				}
			}

		})
	}
}
catScroll.init();