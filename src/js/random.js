//定义一个函数 功能是根据id查找页面元素
function $id( id ){
	return document.getElementById( id );
}
//获取任意区间的整数值
function rand( min , max ){
    return Math.round( Math.random()*(max-min) + min );
}
//验证码 ： 字母和数字组成
function yzm(){
	//小写字母   大写字母   数字
	//48--122 随机获取一个code值  判断编码值如果在 58--64   91--96 两个区间，就重新抽取
	//如果不在上面的两个区间内，就将code转成字符， 拼接到字符串中
	var str = "";//拼接4位的验证码
	for( var i = 1 ; i <= 4 ; i++ ){
		var code = rand( 48 , 122 );
		if( code >= 58&&code <= 64 || code >= 91 && code <= 96 ){
			//就重新抽一次
			i--;
		}else{
			var ch = String.fromCharCode( code );
			str += ch;
		}
	}
	return str;
}