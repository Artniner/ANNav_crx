
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	crossRequest(req.url, req.data, sendResponse);
	return true;   // sendResponse默认只在同步情况下能正常工作，如果是异步情况，需要return true（应该是等待sendResponse完成后再执行后续操作）
});


function crossRequest(url, data, sendResponse){
	var ret = '';
	myajax = $.ajax({
		url: url,
		data: data,
		success: function(result){
			sendResponse(result);
		},
		error: function(xmlHttpRequest, textStatus, errorThrown){
			alert(xmlHttpRequest.responseFields+"---"+textStatus+"---"+errorThrown);
		}
	});
}

/*
function crossRequest(url, data, sendResponse){
	url = url+'?'+data; 	// get的参数直接放url后面，放send()里无效
	let xmr = new XMLHttpRequest();
	xmr.open('get',url,true);
	// xmr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	// xmr.setRequestHeader('Token', 'fca8986d-7f1e-40c7-a69d-9693a6a34c4f');
	// xmr.setRequestHeader('Referer', 'https://fanyi.baidu.com/sug'); 
	xmr.send();
	xmr.onreadystatechange = function() {
		sendResponse(xmr.responseText);
	}
}
*/
