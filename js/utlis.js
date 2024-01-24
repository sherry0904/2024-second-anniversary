
/* utlis */

// if (typeof console == "undefined") {
//     window.console = {
//         log: function () {}
//     };
// }

 // window.console = {
 //        log: function () {}
 // };

let isLive = false; 
let API__DOMAIN = null;

if(location.host === "event.digital-transformation.com.tw") {
  isLive = true;
  API__DOMAIN = '/api'
}else {
  isLive = false;
  API__DOMAIN = 'https://event.digital-transformation.com.tw/api';
}



var currentPageView = '';

function gtag_pageView(_key) {
  //ga('send', 'pageview', key);

  // if(isMobile) _key += '_mb';

  if(currentPageView != _key){
    currentPageView = _key;

    gtag('event', 'page_view', {
      'page_title' : _key,
      'page_path': '/' + _key
    });
    console.log("gtag_pageView: " + _key);
  }
}

function gtag_ButtonClick(_key, category="button") {
  // if(isMobile) _key += '_mb';
  gtag('event', 'click',{'event_category': category,'event_label':_key});

  console.log("gtag_ButtonClick: " + _key + "/" + category);
}

function setDefault(_textbox, _value) { // depend on jQuery
  $(_textbox).val(_value).css({opacity:.4});
  $(_textbox).focus(
    function() {
      if ($(this).val() == _value) {
        $(this).val('').css({opacity:1});
      }
    })
    .blur(function() {
      if ($(this).val() == '') {
        $(this).val(_value).css({opacity:.4});
      }
    });
}

function setParameterByName(name, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?|&])" + name + "=.*?(&|$)", "i");
  separator = url.indexOf('?') !== -1 ? "&" : "?";
  if (url.match(re)) {
    return url.replace(re, '$1' + name + "=" + value + '$2');
  }
  else {
    return url + separator + name + "=" + value;
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let checkStatus = res => {
  if (res.status >= 200 && res.status < 300) return res;
  else {
    let err = new Error(res.statusText);
    err.response = res;
    throw err;
  }
}
let parseJson = res => {
  let data = res.text();
  return data.then(r => {
    if (r.length === 0) return null;
    else return JSON.parse(r);
  })
}

function POST(theUrl, theData) {
  const _url = API__DOMAIN + theUrl;
  console.log(JSON.stringify(theData))
  console.log(_url)
  return fetch(_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(theData)
  })
  .then(checkStatus).then(parseJson).then(res => {
    console.log(res)
    const { success, message } = res;
    if (!success) {
      throw new Error(message);
    }
    return res;
  })
  .catch(e => {
    console.log(e)
    throw new Error(e);
  })
}

function SetCookie(name,value){
    var Days = 1;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)    {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}


var isMobile = false;
var isPC = false;
var isIE = false;

utlis = function (){

	//private menbers


	//private methods
	function init () {
    console.log('all is loaded.');
    initClickCode();
  }
  
  function initClickCode() {
    // $('[data-ga]').on('click', clickCode);

    $('[data-ga]').on("click", function (e) { 
      var _category = $(this).data('category');
      var _code = $(this).data('ga');
      if(_code != ''){
        gtag_ButtonClick(_code, _category);
      }
    });

  }
	//constructor

	{
    if ($('html').is('.ie6, .ie7, .ie8')) {
      isIE = true;
      // alert('.ie6, .ie7, .ie8');
    }

		$(document).ready(function() {

		if($('body').width() <= 992){
      isMobile = true;
		}else{
      isMobile = false;
      isPC = true;
    }

			init();
		});
	}

	//public

	return {

	}
}

utlis = new utlis();