Vue.component('sky-raty', {
	  props:{
	  	len:0,
	  	grade:0,
	  	label:"",
	  	fields:"",
		mod:1,
	  	readonly:0,
		groupclass:""
	  },
	  data:function(){
	  	return {
	  		num:0,
	  		items:[],
	  		gradeItems:[],
			half:false,
			gclass:"mgb-10"
	  	}
	  },
	  created:function(){
		  if(this.groupclass!=undefined){
			  this.gclass=this.groupclass;
		  }
	  	var items=[];
	  	var len=this.len;
	  	if(len==0){
	  		len=5;
	  	}
	  	for(var i=0;i<len;i++){
	  		items.push(i);
	  	}
	  	this.items=items;
		var mod=1;
		if(this.mod!=undefined){
			mod=this.mod;
		}
		if(this.grade%mod!=0){
			console.log("mod")
			this.half=true;
		}
	  	var num=parseInt(this.grade/mod);
		
	  	var gradeItems=[];
	  	for(var i=0;i<num;i++){
	  		gradeItems.push(i);
	  	}
	  	this.num=this.grade;
	  	this.gradeItems=gradeItems;
	  },
	  methods:{
	  	setRaty:function(index){
	  		if(this.readonly){
	  			return false;
	  		}
	  		var gradeItems=[];
	  		var num=index+1;
	  		for(var i=0;i<num;i++){
	  			gradeItems.push(i);
	  		}
			var mod=1;
			if(this.mod!=undefined){
				mod=this.mod;
			}
	  		this.num=num*mod;
			this.half=false;
	  		this.gradeItems=gradeItems;
	  	}
	  },
	  template: '<div class="raty-group" :class="gclass" >	<div class="raty-label" v-if="label!=\'\'">{{label}}</div>	<input type="hidden" :name="fields" :value="num" class="raty-value" />	<div class="raty-row">		<div class="raty-item">			<div class="raty-no" @click="setRaty(index)" v-for="(item,index) in items" :key="index"></div> 			<div class="raty-num">{{num}}</div>		</div>		<div class="raty-item">			<div  v-for="(item,index) in gradeItems" @click="setRaty(index)" :key="index" class="raty-yes"></div><div v-if="half" class="raty-yes-half"></div></div>	</div>	</div>'
})