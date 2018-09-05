<?php
 
function getFiles($dir){
	static $files=array();
	$rss=glob($dir."/*");
	foreach($rss as $rs){	
		if(is_dir($rs)){			
			getFiles($rs);
		}else{			 
			if(strpos($rs,".html")>0){
				$files[]=$rs;		
			}		
		}
	}
	return $files;
}
function replaceTag($file){
	$con=file_get_contents($file);
	$con=str_replace("<page>","<template>",$con);
	$con=str_replace("</page>","</template>",$con);
	$con=str_replace("<a ","<navigator ",$con);
	$con=str_replace("</a>","</navigator>",$con);
	$con=str_replace("<div ","<view ",$con);
	$con=str_replace("</div>","</view>",$con);
	$con=str_replace("href=","url=",$con);
	$con=str_replace("link url","link href",$con);
	file_put_contents($file,$con);
}
$files=getFiles("../html/");
foreach($files as $file){
	replaceTag($file);
}
echo "success";
?>