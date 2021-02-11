
// 生成左边栏按钮
function generateNavList(webInfo){
	var currClss = "";
	var group_i = 0;
	
	var dom = '<div class="an-container"></div>'
	$('body').append(dom);
	dom = '<div class="an-nav-list"></div>'
	$('.an-container').append(dom);
	dom = ' \
		<div class="search-field"> \
			<form class="search-form" action="http://www.baidu.com/s" target="_blank"> \
				<input class="search-content" name="wd" placeholder="请输入搜索内容" type="text" autocomplete="off"> \
			</form>\
		</div>';
	$('.an-nav-list').append(dom);

	for(var i=0;i<webInfo.length;++i){
		var info = webInfo[i].split("---");
		// 生成新组
        if(info[0] !== currClss){
        	++group_i;
        	currClss = info[0];
            var group = '<div class="an-group" id="an-group' + group_i +'"></div>';
            $('.an-nav-list').append(group);
            $('#an-group'+group_i).append('<strong>'+info[0]+'</strong>');
        }

		var item = '<div class="an-item"><a href="'+info[2]+'" target="_blank"><span>'+info[1]+'</span></a></div>';
		$('#an-group'+group_i).append(item);
	}
}

generateNavList(common_webs);