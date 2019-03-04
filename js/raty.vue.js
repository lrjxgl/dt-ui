Vue.component('sky-raty', {
	  props:{
	  	len:0,
	  	grade:0,
	  	label:"",
	  	fields:"",
	  	readonly:0
	  },
	  data:function(){
	  	return {
	  		num:0,
	  		items:[],
	  		gradeItems:[]
	  	}
	  },
	  created:function(){
	  	var items=[];
	  	var len=this.len;
	  	if(len==0){
	  		len=5;
	  	}
	  	for(var i=0;i<len;i++){
	  		items.push(i);
	  	}
	  	this.items=items;
	  	var num=this.grade;
	  	var gradeItems=[];
	  	for(var i=0;i<num;i++){
	  		gradeItems.push(i);
	  	}
	  	this.num=num;
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
	  		this.num=num;
	  		this.gradeItems=gradeItems;
	  	}
	  },
	  template: '<div class="raty-group  mgb-10" >	<div class="raty-label" v-if="label!=\'\'">{{label}}</div>	<input type="hidden" :name="fields" :value="num" class="raty-value" />	<div class="raty-row">		<div class="raty-item">			<div class="raty-no" @click="setRaty(index)" v-for="(item,index) in items" :key="index"></div> 			<div class="raty-num">+{{num}}</div>		</div>		<div class="raty-item">			<div  v-for="(item,index) in gradeItems" @click="setRaty(index)" :key="index" class="raty-yes"></div>		</div>	</div>	</div>'
})