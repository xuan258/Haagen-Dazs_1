window.onload = function(){
	$.ajax({
		type: "get",
		url:"shoplist.json?"+new Date().getTime(),
		async:true,
		success:function(json){
			var str="";
			for(var i=0;i<json.list.length;i++){
				var pro=json.list[i];
				str+=`<li class="item">
						<div class="mark"></div>
						<div class="start_collction">
							<a href="details.html"><img src="${pro.src}" ></a>
						</div>	
							<h4><a href="details.html">${pro.name}</a></h4>
							<div class="stat_arilt">
								Floral Fantasy
								<span><b>¥</b>${pro.price}<i>/1.2千克</i></span>
									
							</div>
							<p>口味:茉莉花覆盆子石榴、香草</p>
							<div class="start_cart">
								<a class="addcart" id="${pro.id}" src="${pro.src}" name="${pro.name}" price="${pro.price}" href="#">立即购买</a>
							</div>
						</li>`;
			}
			
			
			
			$(".list-pic").html(str)
		}
	})
	var arr=[];
	$(".list-pic").on("click","a",function(){
		var json={
			name:$(this).attr("name"),
			id:$(this).attr("id"),
			src:$(this).attr("src"),
			price:$(this).attr("price"),
			count:1
		}
		if(getCookie("shoplist").length !=0){
			arr=JSON.parse(getCookie("shoplist"));
		}
		var flag=true;
		if(arr.length !=0){
			for(var i=0;i<arr.length;i++){
				if(json.id==arr[i].id){
					arr[i].count++;
					flag=false;
					break;
				}
			}
		}
		if(flag){
			arr.push(json);
		}
		setCookie("shoplist",JSON.stringify(arr));
		if(confirm("确定—去购物车结算，取消—继续购物")){
			location.href="cart.html";
		}
	})
}