function skyRaty(el) {
	var elen=$(el).length;
	console.log(elen);
	for(var eli=0;eli<elen;eli++){
		var obj=$(el).eq(eli);
		console.log(obj.attr("grade"))
		var html = '<div class="raty-group mgb-10">';
		var label = obj.attr("label");
		if (label != undefined) {
			html += '<div class="raty-label">'+label+'</div>';
		}
		html += '<div class="raty-row"><div class="raty-item">';
		var len = parseInt(obj.attr("len"));
		for (var i = 0; i < len; i++) {
			html += '<div class="raty-no"></div>';
		}
		var grade = parseInt(obj.attr("grade"));
		if(obj.attr("mod")==undefined){
			var mod=1;
		}else{
			var mod=parseInt(obj.attr("mod"));
		}
		
		
		html += '<div class="raty-num">' + grade + '</div>';
		var half=false;
		if(grade%mod!=0){
			half=true;
		}
		grade=parseInt(grade/mod);
		html += '</div><div class="raty-item">';
		
		for (var i = 0; i < grade; i++) {
			html += '<div class="raty-yes"></div>';
		}
		if(half){
			html += '<div class="raty-yes-half"></div>';
		}
		html += '</div></div>';
		html += '</div>';
		obj.html(html);
	}
}
