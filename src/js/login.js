window.onload = function(){
	//获取页面元素
	var oLogin_1 = document.getElementById("login_1");
	var oLoginName = document.getElementById("loginName");
	var oPassword = document.getElementById("password");
	var oRd = document.getElementById('rd');
	var oError =document.getElementById('error');
	//给登录按钮加点击事件
	oLogin_1.onclick = function(){
		//获取用户输入的用户名和密码
		var opho = oLoginName.value;
		alert(opho);
		var pwd = oPassword.value;
		//验证码不能为空
		if(!ec){
			alert('验证码不能为空！');
			return;
		}
		if(ec !== rd){
			alert('验证码有误！');
			return;
		}
		//校验用户名和密码是否正确
		//获取到cookie中的用户信息
		var users = getCookie("registerUsers") ? getCookie("registerUsers") : "";
		//将字符串转为对象
		users = convertStrToObj(users);
		
		if(users[opho] == pwd){
			//登录成功
			setCookie("loginedUsers",usn,7);
			console.log("登录成功!");
			location.href = "index.html";
		}else{
			oError.style.display='block';
		}
	}
}
//将字符串转为对象
function convertStrToObj(str){
	if(!str){ //如果是空字符串
		return {}; //返回空对象
	}
	var users = str.split(":");
	var obj = {};
	for(var i = 0; i < users.length; i ++){
		var userData = users[i].split(",");
		obj[userData[0]] = userData[1];
	}
	return obj;
}

//将对象转为字符串
function convertObjToStr(obj){
	var str = "";
	//遍历对象
	for(var opho in obj){
		var pwd = obj[opho];
		if(str){
			str += ":";
		}
		str += opho + ',' + pwd;
	}
	return str;
}
//表单验证
 function checkForm(){
	var phonetip = checkPhone();
	var passtip = checkPassword(); 
	return phonetip && passtip ;
}
//验证手机号 
	    function checkPhone(){
	    var oLoginName = document.getElementById("loginName");
		var phonrErr = document.getElementById('phoneErr');
		var pattern = /^1\d{10}$/;  //验证手机号正则表达式
		
		if(!pattern.test(oLoginName.value)){
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