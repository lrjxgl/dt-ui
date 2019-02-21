 
function getPara(key) {
		var data= new Array();
		var url = window.location.href;       
		var len = url.length;
		var offset = url.indexOf("?");
		var str = url.substr(offset+1, len);     
		var args = str.split("&");      
		len = args.length; 
		
		for (var i = 0; i < len; i++) {
			str = args[i];
			var arg = str.split("=");            
			if (arg.length <= 1) {
				break;
			}else {
				
				data[arg[0]]=arg[1];
				
			}
		};
	   if(typeof(key)!="undefined"){
			return data[key];
	   };
		return data;
};

function include(tpl){
	var html="";
	$.ajax({
		type:"GET",
		url:"component/"+tpl+".html",
		async:false,
		 "cache":false,
		success:function(res){
			html=res;
		}
	})
 
	return html;
}

function parseTpl(html){
	var html= html.replace(/{include=([^}]*)}/,function(res,file){
		return include(file);
	})
	return html;
}


var GET=getPara(); 
$m=GET['m'];
if($m==undefined){
	$m="index";
}
$a=GET['a'];
if($a==undefined){
	$a="index"
}

 
$d=GET['d'];
if($d==undefined){
	$d=localStorage.getItem("d");
}else{
	localStorage.setItem("d",$d);
}
if($d!=null){
	var url=$d+"/"+$m+"/"+$a+".html";
}else{
	var url="html/"+$m+"/"+$a+".html";
}

$.ajax({
	"type":"GET",	 
	"url":url,
	"cache":false,
	async:false,
	"success":function(res){
		var html=parseTpl(res);
		html=html.replace("template","view"); 
		$("#page").html(html);
	}
})

$(function(){
	
	$(document).on("click",".header-back",function(event){
		event.preventDefault();
		window.history.back();
	})
	
	$(document).on("click","navigator",function(){
		if($(this).attr("url")==undefined){
			return false;
		}
		window.location=$(this).attr("url");
	})
	
	$(document).on("click",'[gourl]',function(){
		window.location=$(this).attr("gourl");
	})
	
})