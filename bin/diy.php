<?php
$files=array(
	"../html/forum/forum.css",	 
);
$html="";
foreach($files as $file){
	$html.=file_get_contents($file);
}
file_put_contents("../dist/h5/forum.css",$html);
//2.2px
$html=preg_replace_callback("/(\d+)px/",function($res){
	return ($res[1]*2.2)."px";
},$html);
file_put_contents("../dist/uni/forum.css",$html);
?>