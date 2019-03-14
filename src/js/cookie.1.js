//设置cookie
function setCookie(key,value,day){
	if( day ){ //说明要设置生存期
		var now = new Date();
		now.setDate( now.getDate() +day );
		document.cookie = `${key}=${value};expires=${now}`;
	}else{
		document.cookie = `${key}=${value}`;
	}
}

//获取cookie
function getCookie(key){
	var str = document.cookie;//"uname=jack; age=15; addr=上海; sex=男; upwd=123"
	if( str ){
		var str = str.replace( /\s+/g, "" );//将cookie中的空格替换成空字符串
		var arr = str.split(";"); //将字符串拆分成数组  ["uname=jack", "age=15", "addr=上海", "sex=男", "upwd=123"]
		//遍历数组 根据键找到对应的值 
		for( var i = 0 ; i < arr.length ; i++ ){
			var item = arr[i].split("="); 
			if( item[0] == key ){
				return item[1]; //找到了key对应的值
			}
		}
		//循环结束后 如果没有找到key 就返回一个""
		return "";
	}
	//如果没有cookie  返回一个""
	return "";
}


//删除cookie
function removeCookie( key ){
	setCookie( key,"",-1 );
}
