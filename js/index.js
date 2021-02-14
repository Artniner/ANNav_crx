generateNavList();

// 生成左边栏按钮
function generateNavList(){
	var dom = '<div class="an-container"></div>'
	$('body').append(dom);

	dom = '<div class="an-nav-list"></div>'
	$('.an-container').append(dom);	
	
	// 搜索
	for(var i=0;i<search_wb.length;++i){
		var info = search_wb[i].split('---');
		generateSearchField($('.an-nav-list'), info);
	}
	
	// 翻译
	generateTranslateField($('.an-nav-list'));
	
	// 按钮
	// for(var i=0;i<common_webs.length;++i){
		// var info = common_webs[i].split('---');
		// generateWebButton($('.an-nav-list'), info);
	// }
}

// 生成搜索框
function generateSearchField(parent, info){
	// 处理需要额外参数的情况
	var additional_param = "";
	if(info[3]){
		var param = info[3].split('=');
		additional_param = '<input style="display:none" type="text" name="'+param[0]+'" value="'+param[1]+'">'
	}
	
	var search = ' \
		<div class="an-search-field"> \
			<form class="an-search-form" action="'+info[1]+'" target="_blank" > \
				<input class="an-search-content" name="'+info[2]+'" placeholder="'+info[0]+'" type="text" autocomplete="off"> \
				'+additional_param+' \
				<input style="display:none" type="submit"> \
			</form>\
		</div>';
	parent.append(search);
}

// 生成小按钮
function generateWebButton(parent, info){
	var group_id = 'an-group-'+info[0];
	var group_dom = $('#'+group_id);
	// 生成新组
	if(group_dom.length <= 0){
		var group = '<div class="an-group" id="'+ group_id +'"></div>';
		parent.append(group);
		group_dom.append('<strong>'+info[0]+'</strong>');
	}

	var item = '<div class="an-item"><a href="'+info[2]+'" target="_blank"><span>'+info[1]+'</span></a></div>';
	group_dom.append(item);
}

// 生成翻译区
function generateTranslateField(parent){
	var translate = ' \
		<div class="an-trans-field"> \
				<textarea id="an-trans-raw" placeholder="金山词霸"></textarea> \
				<textarea id="an-trans-result" readonly="readonly" placeholder="Iciba"></textarea> \
		</div>';
	parent.append(translate);
}

// 实时翻译
// 需要跨域请求，与background通信，使用background跨域
$('#an-trans-raw').keyup(function(e){
	if(e.which == 13){
		$('#an-trans-raw').val('');
		$('#an-trans-result').val('');
		return;
	}
	var url = 'https://dict.iciba.com/dictionary/word/suggestion';
	var data = 'word='+$(this).val()+'&nums=5';
	chrome.runtime.sendMessage({
		url: url,
		data: data,
	}, res => {
		// 答复
		if(res.message[0]){
			var result = res.message[0].paraphrase.split(';');
			var txt = '';
			for(var r of result){
				txt = txt + r + ';\n';
			}
			$('#an-trans-result').val(txt);
		}else{
			$('#an-trans-result').val('查询失败，请重新输入');
		}
	});
});

// 提交清空表单
// 用form的onsubmit无效（不知道原因）
// jq没有reset方法，可以先获取其中的form元素，用form的reset
$('.an-search-form').submit(function(){
	$(this)[0].reset();
});

