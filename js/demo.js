$(document).on("click",".tabs-toggle-hd",function(){
	var $p=$(this).parents(".tabs-toggle");
	var $group=$(this).parents(".tabs-toggle-group");
	var isactive=$p.find(".tabs-toggle-hd").hasClass("tabs-toggle-hd-active");
	console.log(isactive);
	if($group.length>0){
		$group.find(".tabs-toggle-hd").removeClass("tabs-toggle-hd-active");
		$group.find(".tabs-toggle-box").removeClass("tabs-toggle-active");
	}
	if(!isactive){
		$p.find(".tabs-toggle-hd").toggleClass("tabs-toggle-hd-active");
		$p.find(".tabs-toggle-box").toggleClass("tabs-toggle-active");
	}
})

$(document).on("click",".tabs-border-item",function(){
	var $group=$(this).parents(".tabs-border-group");
	var index=$(this).index();
	if($group.length>0){
		$group.find(".tabs-border-box").removeClass("tabs-border-box-active");
		$group.find(".tabs-border-box").eq(index).addClass("tabs-border-box-active");
	}
	$(this).addClass("tabs-border-active").siblings().removeClass("tabs-border-active");
})


