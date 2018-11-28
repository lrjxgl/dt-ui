<?php
$shopCss['name']="login.css";
$shopCss['files']=array(
	"../html/login/index.css",
	//"../html/category/index.css",
	//"../html/cart/index.css"
);
$files= $shopCss;
$html="";
foreach($files['files'] as $file){
	$html.=file_get_contents($file);
}
file_put_contents("../dist/h5/".$files['name'],$html);
//2.2px
$html=preg_replace_callback("/(\d+)px/",function($res){
	return ($res[1]*2.2)."px";
},$html);
file_put_contents("../dist/uni/".$files['name'],$html);
?>