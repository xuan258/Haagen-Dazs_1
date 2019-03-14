window.onload = function(){
	//获取页面元素
	var oTxt = document.getElementById('txt');
	var oErificationcCode = document.getElementById('erificationcCode');
	var oSMSErificationcCode = document.getElementById('SMSerificationcCode');
	var oPassWord = document.getElementById('password');
	var oConfirmPassWord = document.getElementById('confirmPassword');
	var oRgt = document.getElementById('rgt');
	var oRd = document.getElementById('rd');
	//给注册添加点击事件
	oRgt.onclick = function(){
		//获取手机号和密码
		var opho = oTxt.value;
		var pwd = oPassWord.value;
		var con = oConfirmPassWord.value;
		var ec = oErificationcCode.value;
		 var sms = oSMSErificationcCode.value;
		 var rd = oRd.innerHTML;
		//手机号不能为空
		if(!opho){
			alert('手机号不能为空！');
			return;
		}
		//验证码不能为空
		if(!ec){
			alert('验证码不能为空！');
			return;
		}
		if(ec !== rd){
			alert('验证码有误！');
			return;
		}
		//短信验证码
		if(!sms){
			alert('短信验证码不能为空！');
			return;
		}
		//检测密码是否相同
		//密码不能为空，密码规则
		if(pwd !== con){
			alert('两次输入的密码不相同，请重试！');
			return;
		}
		//获取cookie中的用户信息
		var users = getCookie('registerUsers') ? getCookie('registerUsers') : '';
		//将字符串转为对象
		users = convertStrToObj(users);
		if(opho in users){
			alert('手机号已经被注册');
			return;
		}else{
			users[opho] = pwd;
			var	userStr = convertObjToStr(users);
			//设置用户信息cookie
			setCookie('registerUsers',userStr,7);
			console.log(decodeURIComponent(document.cookie))
			alert('注册成功！');
		}
	}
}
//将字符串转为对象
function convertStrToObj(str){
	if(!str){
		return{};
	}
	var users = str.split(':');
	var obj = {};
	//遍历数组
	for(var i = 0 ; i < users.lenght ; i++){
		//将字符串转为数组；
		var userDate = users[i].split(',');
		obj[userDate[0]] = userDate[1];
	}
	return obj;
}
//将对象转为字符串
function convertObjToStr(obj){
	var str = '';
	for(var opho in obj){
		var pwd = obj[opho];
		if(str){
			str += ':';
		}
		str += opho + ',' + pwd;
	}
	return str;
}
//表单验证
 function checkForm(){
	var phonetip = checkPhone();
	var passtip = checkPassword(); 
	var conpasstip = ConfirmPassword();
	return phonetip && passtip && conpasstip;
}
//验证手机号  必须是1开头
	    function checkPhone(){
	    var oTxt = document.getElementById('txt');
		var phonrErr = document.getElementById('phoneErr');
		
		var pattern = /^1\d{10}$/;  //验证手机号正则表达式
		
		if(!pattern.test(oTxt.value)){
			phonrErr.innerHTML="手机号码不合规范"
			phonrErr.className="error"
			return false;
			}
		 else{
			  phonrErr.innerHTML="OK"
	          phonrErr.className="success";
			  return true;
			 }
	   }
//验证密码:6~12:含数字  字母  下划线
		function checkPassword(){
			var oPassWord = document.getElementById('password');
			var errpasswd = document.getElementById('passwordErr');
			var pattern = /^\w{6,12}$/;
			if(!pattern.test(oPassWord.value)){
			errpasswd.innerHTML="密码不合规范"
			errpasswd.className="error"
			return false;
			}
		 else{
			  errpasswd.innerHTML="OK"
	          errpasswd.className="success";
			  return true;
			 }
		}
		
		//确认密码
		function ConfirmPassword(){
		var oPassWord = document.getElementById('password');
		var oConfirmPassWord = document.getElementById('confirmPassword');
		var errConPasswd = document.getElementById('conPasswordErr');
		
		if((oPassWord.value)!=(oConfirmPassWord.value) || oConfirmPassWord.value.length == 0){
			errConPasswd.innerHTML="上下密码不一致"
			errConPasswd.className="error"
			return false;
			}
		 else{
			  errConPasswd.innerHTML="OK"
	          errConPasswd.className="success";
			  
			  return true;
			 }	   
	   }
	   