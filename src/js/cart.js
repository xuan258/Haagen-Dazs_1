window.onload = function() {

	var cookieStr = $.cookie('shoplist') ? $.cookie('shoplist') : '';
	//console.log(cookieStr.length)
	//判断购物车是否为空
	var str = "";
	if (!cookieStr) {
		str +=
			`
			
					<div class="goods">
						<img src="dist/img/shopping-catrd-back.min.jpg" >
						<p>购物车无商品，请先去选择商品。</p>
					</div>
				
			
			`;
		$('.normalGoodsList').html(str);
	} else {
		//转对象
		let cookieObj = convertCookieStrToCookieObj(cookieStr);
		//遍历对象
		for (let key in cookieObj) {
			//先记录商品Id
			let pro = cookieObj[key];
			console.log(pro)
			str +=
				`
					
					        	 
									<div class="goods-zone clearfix">
					        			<div class="f1 m-r-5">
					        				<input type="checkbox" class="J-sup-checkbox" />
					        			</div>
					                    <div class="goods-img">
					                    	<a href="javascript:;">
					                    		<img src="${pro.src}" alt="" style="max-width: 100%;max-height: 100%;">
					                    	</a>
					                    </div>
					                    <div class="goods-main">
					                    	<div class="spu-name">
					                    		<a href="javascript:;">${pro.name}</a>
					                    	</div>
					                    	<div class="panel-remove">
					                    		<i class="icon-collect iconfont" title="收藏">&#xe60f;</i>
					                    		<i class="icon-delete iconfont" title="删除">&#xe630;</i>
					                    	</div>
					                    	<div class="spu-singles">
					                    		<div class="sku-quantity" data-id="${pro.id}" data-price="${pro.price}" data-count="${pro.count}">
					                    			<i class="jian">-</i>
					                    			<input type="text" value="${pro.count}" class="buyNum"/>	
					                    			<i class="jia">+</i>
					                    		</div>
					                    		<div class="price-thin clearfix">
					                    			<span class="yuan">￥</span>
					                    			<span class="yuan">${pro.price}</span>
					                    		</div>
					                    		<div class="price-true">
					                    			<span class="yuan">￥</span>
					                    			<span class="integer">
					                    			${(pro.count * pro.price).toFixed(2)}
					                    			</span>
					                    		</div>
					                    	</div>
					                    </div>
					        		</div>
								
					       
					 
					        
			`;
		}
		$('.normalGoodsList').html(str);
		//全选
		$("#checkedAllBtn").click(function() {
			$(".J-sup-checkbox").prop("checked", $(this).prop("checked"));
		    jiesuan();
		});
		
		$("#checkedAllBottomBtn").click(function() {
			$(".J-sup-checkbox").prop("checked", $(this).prop("checked"));
			jiesuan()
		});
		//结算
		
		function jiesuan() {
			var count = 0;
			var money = 0;
			$(".quantity-total").html(count);
			$(".amount-total").html("￥" + money);
			$(".kinds-total").html($(".J-sup-checkbox:checked").size());
			$(".J-sup-checkbox:checked").each(function() {
				count += parseInt($(this).parent().parent().find(".buyNum").val());
				console.log(count)
				money += parseInt($(this).parent().parent().find(".integer").html());
				$(".quantity-total").html(count);
				$(".amount-total").html("￥" + money);
				$(".kinds-total").html($(".J-sup-checkbox:checked").size());
			})
		}
		//为每一个复选框添加单击事件
		$(".J-sup-checkbox").click(function() {
			jiesuan()
		})
		//加减操作
		$(".jian").click(function() {
			var pid = $(this).parent().data("id");
			var count = $(this).parent().find(".buyNum").val();
			if(count == 1) {
				return;
			}
			for(var i = 0; i < cookieObj.length; i++) {
				if(pid == cookieObj[i].id) {
					cookieObj[i].count--;
					setCookie("shoplist", JSON.stringify(cookieObj));
					$(this).parent().find(".buyNum").val(cookieObj[i].count);
					$(this).parent().parent().find(".integer").html((cookieObj[i].count * cookieObj[i].price).toFixed(2));
					jiesuan();
					break;
				}
			}
		})
		
		$(".jia").click(function() {
			var pid = $(this).parent().data("id");
			var count = $(this).parent().find(".buyNum").val();
			for(var i = 0; i < cookieObj.length; i++) {
				if(pid == cookieObj[i].id) {
					cookieObj[i].count++;
					setCookie("shoplist", JSON.stringify(cookieObj));
								$(this).parent().find(".buyNum").val(cookieObj[i].count);
								$(this).parent().parent().find(".integer").html((cookieObj[i].count * cookieObj[i].price).toFixed(2));
								jiesuan();
								break;
							}
						}
					})
					//删除功能
					$(".icon-delete").click(function() {
						if(confirm("确定要删除么?")) {
							var pid = $(this).parent().next().find(".sku-quantity").data("id");
							for(var i = 0; i < cookieObj.length; i++) {
								if(pid == cookieObj[i].id) {
									cookieObj.splice(i, 1);
									setCookie("shoplist", JSON.stringify(cookieObj));
									$(this).parent().parent().parent().remove();
									jiesuan();
									break;
								}
							}
						}
					
					})
					$(".delete").click(function() {
						if(confirm("确定要删除么?")) {
							$(".J-sup-checkbox:checked").each(function() {
								var pid = $(this).parent().parent().find(".sku-quantity").data("id");
					
								for(var i = 0; i < cookieObj.length; i++) {
									if(pid == cookieObj[i].id) {
										cookieObj.splice(i, 1);
										setCookie("shoplist", JSON.stringify(cookieObj));
										$(this).parent().parent().remove();
									}
								}
							})
						}
					})
					//  失焦
						$(".buyNum").each(function(index,item){
										$(this).blur(function(){
					
											//获取当前操作的商品ID
											let pid = $(this).parents('.sku-quantity').data("id");
											//console.log($(this).val())
											//console.log(cookieObj.length)
								for(var i = 0; i < cookieObj.length; i++) {
									if(pid == cookieObj[i].id) {
											
											//修改cookie
											if(/^\d+$/.test($(this).val()) && $(this).val() > 0){
												cookieObj[i].count = $(this).val();
											}else{
												cookieObj[i].count = 1;
											}
											$(this).val(cookieObj[i].count);
												$(this).parent().parent().find(".integer").html((cookieObj[i].count * cookieObj[i].price).toFixed(2));
												}	
										}	
									
											//重新写入cookie
										setCookie("shoplist", JSON.stringify(cookieObj));							
											//数量框
											
											//小计
											jiesuan()
									
										})
									})
	}
}
//将cookie字符串转为cookie对象
				function convertCookieStrToCookieObj(str){
					if(!str){
						return {};
					}else{
						return JSON.parse(str);
					}
				}