// JavaScript Document
;(function($,window,document,undefined){
	//定义Beautifier的构造函数
	window.pn__callbackFunc__ = function(){
		return false;
	};
	var funnn = function(){
		return false;
	}
	var pageNow = 1,pageCount=1,options="",haveAddForword_=false,isFirstAdd=true;
    var BtPagination = function(ele, opt, func) {
        this.$element = ele,
        this.defaults = {
        		'items':100, 
    			'itemsOnPage':5,
    			'displayedPages':3,
    			'edges':3,
    			'showtohead':true,
    			'showtofoot':true,
    			'showForword':true,
    			'showBack':true
        },
        options = this.options = $.extend({}, this.defaults, opt),
        pageCount =this.options.pageCount = this.options.items/this.options.itemsOnPage,
        funnn = func;
    };
    
  //定义Beautifier的方法
    BtPagination.prototype = {
    		applyBtPagination: function() {
    			//分页数大于首页显示数
    			if(this.options.pageCount > this.options.displayedPages ){
    				//到最前
    				if (this.options.showtohead){
    					this.$element.append("<li><a href='#'>&laquo;&laquo;</a></li>");
    				}
    				//设置显示向前
    				if (this.options.showForword){
        				this.$element.append("<li><a href='#'>&laquo;</a></li>");
        			}
    				for(i = 1;i<=this.options.displayedPages;i++){
        				this.$element.append("<li><a href='#'>"+i+"</a></li>");
        			}
    				this.$element.append('<li ><a  href="#">...</a></li>');
    				//显示省略号后面最后几页
    				for(i = this.options.edges;i>=1;i--){
    					this.$element.append("<li><a href='#'>"+(this.options.pageCount-i+1)+"</a></li>");
    				}
    				//设置显示向后
    				if(this.options.showBack){
        				this.$element.append("<li><a href='#'>&raquo;</a></li>")
        			}
    				//到最后
    				if (this.options.showtofoot){
    					this.$element.append("<li><a href='#'>&raquo;&raquo;</a></li>");
    				}
    			} else {
    				for(i = 1;i<=this.options.pageCount;i++){
        				this.$element.append("<li><a href='#'>"+i+"</a></li>");
        			}
    			}
    			
    			$(this.$element).find("li").each(function(event){
    				$(this).removeAttr("onclick");
    				var val = $(this).children().text();
    				if(isNaN(val)){
    					$(this).attr("onclick","window.pn__defaultFunc__('"+val+"',this)");
    				} else {
    					$(this).attr("onclick","window.pn__defaultFunc__("+val+",this)");
    				}
    			});
    			obj = findObjByText(this.$element.find("li"),1);
    			$(obj).addClass("active");
	            return false;
        }
    };
    
    function _headAddFotDel(obj){
		if(pageNow!=1 && isNaN($(obj).prev().text()) && pageNow > options.edges+1 && pageNow <  options.pageCount -options.edges ){
			//头部追加，尾部删除
			//删除最后一个
			var delitem = $(obj);
			for(i = 0;i<options.displayedPages-1;i++){
				delitem = $(delitem).next();
			}
			$(delitem).remove();
			$(obj).before("<li><a href='#'>"+(pageNow-1)+"</a></li>");
			$(obj).prev().attr("onclick","window.pn__defaultFunc__("+(pageNow-1)+",this)");
			return true;
		}
		return false;
    }
    
    function _headDelFotAdd(obj){
    	if(isNaN($(obj).next().text())){
			//已到最后一个 头部删除，尾部追加
			if(pageNow < pageCount - options.edges && ((isFirstAdd &&pageNow >= options.edges) || (!isFirstAdd && pageNow > options.edges) ) ){
				isFirstAdd = false;
				if(pageNow >= options.edges+options.displayedPages){
					//删除第一个
					var delitem = $(obj);
					for(i = 0;i<options.displayedPages-1;i++){
						delitem = $(delitem).prev();
					}
					if(pageNow == options.edges+options.displayedPages && !haveAddForword_){
						$(delitem).before('<li ><a  href="#">...</a></li>');
						haveAddForword_ =true;
					}
					$(delitem).remove();
				}
				$(obj).after("<li><a href='#'>"+(pageNow+1)+"</a></li>");
				$(obj).next().attr("onclick","window.pn__defaultFunc__("+(pageNow+1)+",this)");
				return true;
			}
		}
    	return false;
    }
    
    function _forwordForLast(obj){
    	var obj1 = $(obj).next();
		$(obj).remove();
		obj = obj1;
		while(!isNaN($(obj).text())){
			obj1 = $(obj).next();
			$(obj).remove();
			obj = obj1;
		}
		
		if($(obj).text()=="..." && $(obj).prev().text() == "..."){
			$(obj).prev().remove();
		}
		if(pageNow - options.displayedPages >= options.edges){
			//可以加省略号
			$(obj).before("<li><a href='#'>...</a></li>");
			$(obj).prev().attr("onclick","window.pn__defaultFunc__('...',this)");
		}
		
		for(i = 0;i<options.displayedPages;i++){
			var index = pageNow-options.displayedPages+i;
			if(index > options.edges){
				$(obj).before("<li><a href='#'>"+index+"</a></li>");
				$(obj).prev().attr("onclick","window.pn__defaultFunc__("+index+",this)");
			}
		}
		obj = $(obj).prev();
		return obj;
    }
    
    window.pn__defaultFunc__ = function(val,obj){
		if(!isNaN(val)){
			$(obj).siblings().removeClass("active");
			$(obj).addClass("active");
			pageNow = val;
			//点击第一个元素
			_headAddFotDel(obj);
			//点击最后一个元素
			_headDelFotAdd(obj);
		} else {
			var objlist = $(obj).parent().children();
			if(val == "««"){
				obj = findObjByText(objlist,1);
					$(obj).siblings().removeClass("active");
					$(obj).addClass("active");
					pageNow = 1;
			} else if(val == "»»"){
				obj = findObjByText(objlist,20);
				$(obj).siblings().removeClass("active");
				$(obj).addClass("active");
				pageNow = 20;
			} else if(val == "«"){
				if(pageNow != 1){
					//向前
					obj = findObjByText(objlist,pageNow-1);
					if(obj == undefined){
						if(pageNow < options.pageCount-options.edges){
							obj = findObjByText(objlist,pageNow);
							if(_headAddFotDel(obj)){
								obj = $(obj).prev();
							}
						} else {
							
							obj = findObjByText(objlist,options.edges+1);
							if(obj != undefined){
								isFirstAdd=true;
								obj = _forwordForLast(obj);
							} else {
								//找到中间部分第一个
								for(i = options.edges+2;i<pageNow;i++){
									obj = findObjByText(objlist,i);
									if(obj != undefined){
										break;
									}
								}
								obj =  _forwordForLast(obj);
							}
						}
					}
					if(obj != undefined){
						pageNow--;
					}
					$(obj).siblings().removeClass("active");
					$(obj).addClass("active");
				}
				
			} else if(val = "»"){
				if(pageNow != options.pageCount){
					//向后
					obj = findObjByText(objlist,pageNow+1);
					if(obj == undefined){
						obj = findObjByText(objlist,pageNow);
						if(_headDelFotAdd(obj)){
							obj = $(obj).next();
						}
					}
					if(obj != undefined){
						pageNow++;
					}
					$(obj).siblings().removeClass("active");
					$(obj).addClass("active");
				}
			}
		}
		return funnn(obj,pageNow);
	};
	
	function findObjByText(objlist,val){
		var obj;
		$(objlist).each(function(){
			if($(this).text() == val){
				obj = this;
			}
		});
		return obj;
	}
  //在插件中使用Beautifier对象
  $.fn.applyBtPagination = function(options,func) {
        //创建Beautifier的实体
        var btPagination = new BtPagination(this, options,func);
        //调用其方法
        return btPagination.applyBtPagination();
    };
})(jQuery,window,document);
