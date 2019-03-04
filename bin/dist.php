<?php
$files=array(
	"dt-ui-base.css",
	"dt-ui-animate.css",
	"dt-ui-btn.css",
	"dt-ui-comment.css",
	"dt-ui-form.css",
	"dt-ui-global.css",
	"dt-ui-list.css",
	"dt-ui-m.css",
	"dt-ui-modal.css",	
	"dt-ui-page.css",
	"dt-ui-tabs.css",
	"dt-ui-raty.css",
);
$html="";
foreach($files as $file){
	$html.=file_get_contents("../css/".$file);
}
file_put_contents("../dist/dt-ui-h5.css",$html);
//2.2px
$html=preg_replace_callback("/(\d+)px/",function($res){
	if($res[1]==1){
		return "1px";
	}else{
		return ($res[1]*2.4)."upx";
	}
	
},$html);
file_put_contents("../dist/dt-ui-uni.css",$html);
?>