
function ViewModel() {

  //private menbers
  let events = {
    onInit: function () { },
    onAlert: function () { },
    onSectionEnter: function () { }
  };

  // alert($(window).width())
  // alert($(window).height())

  let data = [];

  let endDate = "2024/12/31 23:59"; // 活動結束日期
  let winnerDate = "2024/12/31 23:59"; // 得獎公告日期

  let alertTimeInline = null;
  let alertTimeOutline = null;
  let sectionTimeline = null;
  let currentSection = null;
  let nextSection = null;

  let officeCategory = "finance";

  //private methods
  function init() {
    events.onInit();
    openExternalBrowserHandler();
  }

  // 判斷是否為行動裝置
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // 判斷是否在 Facebook 的 InApp 瀏覽器中
  function isInAppBrowser_FB() {
    return /FBAV|FBAN/i.test(navigator.userAgent);
  }

  // 判斷是否在 Facebook 或 Line 的 InApp 瀏覽器中
  function isInAppBrowser_LINE() {
    return /Line/i.test(navigator.userAgent);
  }

  // 判斷是否為 Android 系統
  function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  // 判斷是否為 iOS 系統
  function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // 開啟外部瀏覽器程序
  function openExternalBrowserHandler() {
    console.log(navigator.userAgent)
    if (isMobileDevice()) {
      $(".fbTip").hide();
      if (isInAppBrowser_LINE()) {
        let openParam = location.href.indexOf("?") !== -1 ? "&openExternalBrowser=1" : "?openExternalBrowser=1"
        location.href = location.href + openParam
      } else if(isInAppBrowser_FB()) {
        console.log("isInAppBrowser_FB: " +isInAppBrowser_FB())
        console.log("isAndroid(): " +isAndroid())
        console.log("isIOS(): " +isIOS())
         // 在 Facebook 的 InApp 瀏覽器中開啟，使用外部瀏覽器
        if (isIOS()) {
          location.href = "googlechrome://"+location.host + location.pathname;
          console.log("isIOS: googlechrome:" + location.host + location.pathname);
          $(".fbTip").show();
          
        }
      } else {
          // 不在 InApp 瀏覽器中，正常處理
          console.log('不在 InApp 瀏覽器中');
          if(getParameterByName("openExternalBrowser")===1) {
            setTimeout(()=>{
              location.reload();
            }, 1000);
          }
          $(".fbTip").hide();
      }
    } else {
      console.log('不是行動裝置');
      $(".fbTip").hide();
    }
  }

  // 重設 section 淡入動態 
  function resetSection () {
    currentSection = nextSection;
    gsap.set("section:not("+nextSection+")", { autoAlpha: 0, x: 0} );
    $("section:not("+nextSection+")").css("z-index", "0");
    $(nextSection).css("z-index", "1")
    if(sectionTimeline !== null) {
      sectionTimeline.kill();
      sectionTimeline = null;
    }
    console.log("sectionEnter: " + currentSection)
    events.onSectionEnter(currentSection);
  }

  // 取得現在停留頁面
  function getCurrentSection() {
    return currentSection;
  }

  // 前往特定頁面
  function goToSection(el = ".open", type) {
    return new Promise(resolve => {
      sectionEnterAni(el, type).then(()=>{
        resolve( el + " goToSection")
      });
    }); 
  }

  // 進入section動畫
  function sectionEnterAni(el, type="fade") {
    return new Promise(resolve => {
      if(type === "fade") {
        sectionEnteFadeAni(el, ()=>resolve( el + " sectionEnterAni"))
      }else if(type === "enterRight") {
        sectionEnterRightAni(el, ()=>resolve( el + " sectionEnterRightAni"))
      }else if(type === "enterLeft") {
        sectionEnterLeftAni(el, ()=>resolve( el + " sectionEnterLeftAni"))
      }
    });
  }

  // 進入section動畫淡入
  function sectionEnteFadeAni(el, callback) {

    nextSection = el;
    $(nextSection).css("z-index", "2")

    sectionTimeline = gsap.timeline();
    if(currentSection !== null) {
      sectionTimeline.to(currentSection, { duration: 0.7, autoAlpha: 0 });
    }
    sectionTimeline.to( nextSection, { duration: 0.7, autoAlpha: 1,
      onComplete: function(){
        resetSection();
        callback();
      }
    }, 0);
  }

  // section 從“右”邊進入動畫
  function sectionEnterRightAni(el, callback) {
    console.log("sectionEnterRightAni");
    nextSection = el;
    $(nextSection).css("z-index", "2")
    gsap.set( nextSection, { autoAlpha: 1, x: "-=100%" });

    sectionTimeline = gsap.timeline();
    if(currentSection !== null) {
      sectionTimeline.to(currentSection, { duration: 0.5, autoAlpha: 1, x: "+=100%", ease: "power1.out" });
    }
    sectionTimeline.to( nextSection, { duration: 0.5, x: 0, ease: "power1.out",
      onComplete: function(){
        resetSection();
        callback();
      }
    }, 0);
  }

  // section 從”左“邊進入動畫
  function sectionEnterLeftAni(el, callback) {
    console.log("sectionEnterLeftAni");
    nextSection = el;
    $(nextSection).css("z-index", "2")
    gsap.set( nextSection, { autoAlpha: 1, x: "+=100%" });

    sectionTimeline = gsap.timeline();
    if(currentSection !== null) {
      sectionTimeline.to(currentSection, { duration: 0.3, autoAlpha: 1, x: "-=100%", ease: "power1.out" });
    }
    sectionTimeline.to( nextSection, { duration: 0.3, x: 0, ease: "power1.out",
      onComplete: function(){
        resetSection();
        callback();
      }
    }, 0);
  }

  // 送註冊表單
  function getData() {
    return new Promise(resolve => {
      $.ajax("./js/data.json").then(res => {
        data = res
        resolve(data);
        return data;
      });
    })
  }

  function setRegisterCookies(data) {
    SetCookie("dellFastIT_register", true);
    SetCookie("dellFastIT_name", encodeURIComponent(data.name));
    SetCookie("dellFastIT_company_name", encodeURIComponent(data.company_name));
    SetCookie("dellFastIT_company_department", encodeURIComponent(data.company_department));
    SetCookie("dellFastIT_job_title", encodeURIComponent(data.job_title));
    SetCookie("dellFastIT_phone", encodeURIComponent(data.phone));
    SetCookie("dellFastIT_company_email", encodeURIComponent(data.company_email));
  }

  function getRegisterCookies() {
    if(getCookie("dellFastIT_register")) {
      data.name = decodeURIComponent(getCookie("dellFastIT_name"));
      data.company_name = decodeURIComponent(getCookie("dellFastIT_company_name"));
      data.company_department = decodeURIComponent(getCookie("dellFastIT_company_department"));
      data.job_title = decodeURIComponent(getCookie("dellFastIT_job_title"));
      data.phone = decodeURIComponent(getCookie("dellFastIT_phone"));
      data.company_email = decodeURIComponent(getCookie("dellFastIT_company_email"));
      return data;
    }
    return null;
  }

  // 送註冊表單
  function survey(theFormData) {
    return POST('/fy2q4q/result', {
      ...data,
      ...theFormData,
    }).catch((error)=> {
      console.log('_survey:' + error);
      throw '表單儲存失敗';
    });
  }

  // 取得 x 內的亂數，ex: x=3 會回傳0~2之間的隨機數字
  function getRandom(x){
      return Math.floor(Math.random()*x);
  };


  // 活動是否結束
  function isOverTime() {
    let _nowDate = new Date();
    let _endDate = new Date(endDate);

    if(_nowDate.getTime() >= _endDate.getTime()) {
      // console.log("活動結束");
      return true;
    }else {
      // console.log("活動進行中");
      return false;
    }
  }

  // 是否公佈得獎的日期
  function isWinnerTime() {
    let _nowDate = new Date();
    let _endDate = new Date(winnerDate);

    if(_nowDate.getTime() >= _endDate.getTime()) {
      // console.log("公佈得獎結束");
      return true;
    }else {
      // console.log("公佈得獎進行中");
      return false;
    }
  }

  function setNewOfficeCategory(category) {
    officeCategory = category;
  }

  function getNewOfficeCategory() {
    return officeCategory;
  }

  /******************************/

  function callbackDefault() { }

  /******************************/

  function onInit(_callback = callbackDefault) {
    events.onInit = _callback;
  }

  // 監聽 Alert
  function onAlert(_callback = callbackDefault) {
    events.onAlert = _callback;
  }

  // 監聽 SectionEnter
  function onSectionEnter(_callback = callbackDefault) {
    events.onSectionEnter = _callback;
  }

  //constructor
  {
    console.log('ViewModel is loaded.');
  }

  //public

  return {
    init,
    onInit,
    onAlert,  // 監聽alert
    onSectionEnter, // 監聽 section 進入
    goToSection, // 指定到特定section
    getData,
    resetSection,
    survey,
    getCurrentSection, // 取得現在停留頁面,
    getRandom: function(x) {
      return getRandom(x)
    }, // 取得 x 內的亂數
    setRegisterCookies: function(data){
      setRegisterCookies(data);
    },
    getRegisterCookies, //取得註冊cookies
    isOverTime,
    isWinnerTime,
    setNewOfficeCategory: function(category){
      setNewOfficeCategory(category);
    },
    getNewOfficeCategory
  };
};

export default ViewModel;
window.viewModel = new ViewModel();