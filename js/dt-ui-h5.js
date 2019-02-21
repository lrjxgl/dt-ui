function skyToast(msg){
	var html='<div id="toast" class="toast toast-success">'+msg+'</div>';
	if($("#toast").length>0){
		$("#toast").html(msg).show();
		
	}else{
		$("body").append(html);
	}
	setTimeout(function(){
		$("#toast").hide();
	},1000)
}

function goBack(){
	window.history.back()
}

/**短信验证码****/
//倒计时
var smsCountDown={
	time:60,
	timer:60,
	sendClass:"js-sendBtn",
	el:".input-flex-btn",
	disClass:"btn-light",
	init:function(){
		this.countdown();
	},
	forbid:function(){
		console.log("forbid");
		$(this.el).addClass(this.disClass)
	},
	allow:function(){
		console.log("allow");
		$(this.el).removeClass(this.disClass).addClass(this.sendClass);
	},
	countdown:function(){
		var that=this;
		if(this.timer==0){
			$(this.el).addClass(this.sendClass).removeClass(this.disClass);
			$(this.el).text("发送验证码")
			this.timer=this.time;
			return;
		}else{
			$(this.el).addClass(this.disClass).removeClass(this.sendClass);
			$(this.el).text('重新发送(' + this.timer + ')')
			this.timer--;
		}
		setTimeout(function(){
			that.countdown();
		},1000)
	}
};

$(function(){
	$(document).on("click",".js-switch",function(){
		var p=$(this).parents("switch-group");
		$(".switch-value").val($(this).siblings(".js-switch").attr("data-value"));
		 
		$(this).removeClass("switch-active").siblings(".js-switch").addClass("switch-active");
	})
	$(document).on("click","[gourl]",function(){
		var url=$(this).attr("gourl");
		window.location=url;
	})
	$(document).on("click",".goBack",function(){
		var backurl=document.referrer;
		if(backurl==''){
			var obj=$(this);
			if(obj.attr("url")!=undefined){
				window.location=obj.attr("url");
			}else{
				window.location="/";
			}
		}else{
			window.history.back();
		}	
		
	})
	$(document).on("click",".header-back",function(){
		
		var backurl=document.referrer;
		if(backurl==''){
			var obj=$(this);
			if(obj.attr("url")!=undefined){
				window.location=obj.attr("url");
			}else{
				window.location="/";
			}
		}else{
			window.history.back();
		}				 
	})
	$(document).on("click",".modal-close,.modal-mask,.modal-cancel",function(){
		$(this).parents(".modal-group").hide();
	})
	
		$(document).on("click",".js-submit",function(){
		var obj=$(this);
		$.post(
			$(this).parents("form").attr("action")+"&ajax=1",
			$(this).parents("form").serialize(),
			function(data){
				skyToast(data.message)
				if(obj.attr("ungo")=="1"){
					return true;
				}else{
					setTimeout(function(){
						window.history.back();
					},1000)
					
				}
			},
			"json"
		);
		
	})
	
	//删除
	$(document).on("click",".js-delete",function(){
		var obj=$(this);
		if(confirm("删除后不可恢复，确认删除吗?")){
			$.get($(this).attr("url"),function(data){
				if(data.error=='0'){
					obj.parents("tr").remove();
					obj.parents(".js-item").remove();
				}else{
					alert(data.message);
				}
			},"json");
			
		}
	});
	
	$(document).on("click",".js-toggle-status",function(){
		var id=$(this).attr("v");
		var obj=$(this);
		var url=$(this).attr("url")
		$.get(url,function(res){
			if(res.data==1){
				obj.addClass("yes").removeClass("no");
			}else{
				obj.addClass("no").removeClass("yes");
			}
		},"json")
	})
	 
})
