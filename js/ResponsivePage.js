
function ResponsivePage() {

  //private menbers
  let events = {
    onInit: function () { },
    onHorizontal: function() {}
  };

  let option = {
    container: '.game__container',
    resizeArea: '.game__resizeArea',
    RWD: 'width'
  };

  let isHorizontal = false;
  let isFbApp = false;

  //private methods
  function init() {
    events.onInit();
    
    doResize();
    $(window).resize(function () {
      doResize();
    });

    $('.turn_btn').click(function (e) {
      e.preventDefault();
      if (!isHorizontal) {
        setHorizontal(true);
      } else {
        setHorizontal(false);
      }
    });

    if(/FB_IAB/.test(navigator.userAgent) || /FBAN/.test(navigator.userAgent) || /FBAV/.test(navigator.userAgent)){
      isFbApp = true;
    }

    console.log('isFbApp:' + isFbApp);
  }

  /******************************/

  function doResize() {
    let _windowW = $(window).innerWidth();
    let _windowH = $(window).innerHeight();

    let _canvasWidth = 1920;
    let _canvaHeight = 992;

    // console.log("isMobile: "+isMobile)
    // console.log("isHorizontal: "+isHorizontal)

    if (isMobile && !isHorizontal) {
      _canvaHeight = 870;
      console.log("isMobile && !isHorizontal")
    }

    // console.log("_canvaHeight: "+_canvaHeight)

    let _d;

    if (option.RWD == 'width') {
      _d = _canvasWidth / _canvaHeight;
    } else {
      _d = _canvaHeight / _canvasWidth;
    }

    let _scale = 1;
    let _rotation = 0;

    if (!isHorizontal) {
      if (_windowW / _windowH < _d) {
        _scale = _windowW / _canvasWidth;
      } else {
        _scale = _windowH / _canvaHeight;
      }
      _rotation = 0;
    } else {

      if (_windowW / _windowH < _d) {
        _scale = _windowH / _canvasWidth;
      } else {
        _scale = _windowW / _canvaHeight;
      }
      _rotation = 90;
    }

    // console.log("option.resizeArea: "+option.resizeArea);
    // console.log("_scale: "+_scale);
    // console.log("_rotation: "+_rotation);
    gsap.set(option.resizeArea, { scale: _scale, rotation: _rotation });
    // let fontSize = 16 * _scale;
    // gsap.set(option.resizeArea, { fontSize: fontSize });

    let isAlert = false;

    if (_windowW / _windowH < 0.8) {
      isAlert = true;

      if(!isHorizontal){
        setTimeout(()=>{
          setHorizontal(true);
        },300);
      }
      
    }else{
      if(isHorizontal){
        setTimeout(()=>{
          setHorizontal(false);
        },300);
      }
    }

    if (isHorizontal) {
      isAlert = false;
    }

    //確認有無旋轉
    if (isAlert) { //1.2考慮摺疊螢幕
      //未旋轉
      +gsap.set('.game__alert', { autoAlpha: 1 });
      $('.wrapper').css('height', $(window).innerHeight() - 56);
    } else {
      gsap.set('.game__alert', { autoAlpha: 0 });
      $('.wrapper').css('height', $(window).innerHeight());
    }

    console.log("_windowW / _windowH: "+_windowW / _windowH);
    console.log("isHorizontal: "+isHorizontal);

    events.onHorizontal(isHorizontal);
  }

  /******************************/

  function getIsFbApp() {
    return isFbApp;
  }

  function setRWD(type = 'width') {
    option.RWD = type;
    doResize();
  }

  function setHorizontal(_isHorizontal = false) {
    isHorizontal = _isHorizontal;
    doResize();
  }

  function getHorizontal(_isHorizontal = false) {
    return isHorizontal;
  }

  function onHorizontal(_callback = callbackDefault) {
    events.onHorizontal = _callback;
  }

  function callbackDefault() { }

  /******************************/

  function onInit(_callback = callbackDefault) {
    events.onInit = _callback;
  }

  function callbackDefault() {}

  //constructor
  {
    console.log('ResponsivePage is loaded.');
  }

  //public

  return {
    init,
    onInit,
    setRWD,
    setHorizontal,
    onHorizontal,
    getHorizontal,
    getIsFbApp,
  };
};

export default ResponsivePage;
window.ResponsivePage = new ResponsivePage();