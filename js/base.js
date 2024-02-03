base = function () {
	//private menbers
	let imageUrls = ["./images/section/landing/title.png","./images/common/bg.jpg",  "./images/common/bg-2.jpg", "./images/common/bg-3.jpg"];
	let arrowLeftAniTl = null;
	let arrowRightAniTl = null;

	//private methods
	function init() {
		console.log('base is loaded.');

		// alert("width: "+$(window).width())
		// alert("height: "+$(window).height())

		viewModel.init();

		horizontalHandler();

		ResponsivePage.init();

		ResponsivePage.onHorizontal(_res => {
			// console.log("onHorizontal: "+_res)
			if(_res) {
				$(".wrapper").addClass("wrapper--horizontal");
					gsap.set('.game__alert', { autoAlpha: 1 });
					// console.log("onHorizontal: "+_res)
			}else {
				$(".wrapper").removeClass("wrapper--horizontal");
				gsap.set('.game__alert', { autoAlpha: 0 });
				$(".fbTip").hide();
				// console.log("onHorizontal: "+_res)
			}
			if(ResponsivePage.getIsFbApp()) {
				$(".wrapper").addClass("wrapper--fb");
			}else {
				$(".wrapper").removeClass("wrapper--fb");
			}
			// console.log("getIsFbApp:  "+ResponsivePage.getIsFbApp());
		});


		// 重設section定位
		viewModel.resetSection();

		// 等影片載完再進入頁面
		// loadVideo().then(()=>{
		// 	startHandler
		// });

		// 等背景載完再進入頁面
		loadImagesAndPerformAction(imageUrls, startHandler);

		// 初始頁面
		function startHandler(){
			// alert("width:" + $(window).width())
			// alert("height:" + $(window).height())

			viewModel.goToSection(".landing", "fade");
			$(".loading").fadeOut(1000);
			setTimeout(()=>{
				horizontalHandler();
			}, 1000);
		}

		// 顯示alert
		viewModel.onAlert(msg => {
			viewModel.alertIn(msg);
		});
		
		// 偵測進入的頁面
		viewModel.onSectionEnter(_section => {
			// console.log("onSectionEnter: " + _section);
			// horizontalHandler();

			// console.log("_section: "+_section)

			$(".floatbutton-discount").show();
			$(".logo-title").show();

			if(_section === ".landing") {
				$(".logo-title").hide();
				setTimeout(()=>{
					landingPage.openAni();
				}, 100);
			}
			if(_section === ".ninesquare") {
				setTimeout(()=>{
					gamePage.openAni_ninesquare();
				}, 0);
			}
			
			if (_section === ".challenge") {
				setTimeout(() => {
					gamePage.openAni_challenge();
				}, 100);
			}

			if (_section === ".creators-leeon") {
				setTimeout(() => {
					creatorsPage.openAni_leeon();
				}, 100);
			}

			if (_section === ".creators-video-huber") {
				setTimeout(() => {
					creatorsPage.openAni_video_huber();
				}, 100);
			}

			if (_section === ".creators-video-leeon") {
				setTimeout(() => {
					creatorsPage.openAni_video_leeon();
				}, 100);
			}

			if (_section === ".product-choose") {
				setTimeout(() => {
					productPage.openAni_choose();
				}, 100);
			}
			
			if (_section === ".product-precision") {
				setTimeout(() => {
					productPage.openAni_precision();
				}, 100);
			}

			if (_section === ".product-inspiron") {
				setTimeout(() => {
					productPage.openAni_inspiron();
				}, 100);
			}
			
			if (_section === ".strongpoint") {
				$(".floatbutton-discount").hide();
				setTimeout(() => {
					strongpointPage.openAni();
				}, 100);
			}

		})

		$(".game__resizeArea").on("click", ".goToNinesquare", function() {
			viewModel.goToSection(".ninesquare", "fade");
			$(".modal-explan").modal("hide");
		});

	}

	// 載入影片後再執行
	function loadVideo() {
		return new Promise(resolve => {
			const videos = document.querySelectorAll('video');
			let videosNum = videos.length;
			let loadVideosNum = 0;
			console.log("videosNum: "+videosNum)

			if(videosNum > 0) {
				videos.forEach(video => {
					console.log(video)
					video.addEventListener('loadedmetadata', function() {
						console.log('影片元數據已載入完畢！');
						loadVideosNum++
						if(loadVideosNum >= videosNum) {
							resolve("影片元數據已載入完畢！");
						}
						console.log("loadVideosNum: "+loadVideosNum)
					});
	
					if (video.readyState >= 1) {
						console.log('影片已經載入完畢！');
						return true
					} else {
						console.log('影片還在載入中...');
					}
				});
			}else {
				resolve("無影片！");
			}

		});
	}

	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	// 等背景載完再進入頁面
	async function loadImagesAndPerformAction(imageUrls, action) {
		try {
			const imagePromises = imageUrls.map((url) => loadImage(url));
			const images = await Promise.all(imagePromises);
			// 所有圖片載入完成後，執行後續動作
			action(images);
		} catch (error) {
			console.error("圖片載入錯誤：", error);
		}
	}

	function horizontalHandler(){
		if(ResponsivePage.getHorizontal()) {
			$(".wrapper").addClass("wrapper--horizontal");
			ResponsivePage.setHorizontal(true);
		}else {
			$(".wrapper").removeClass("wrapper--horizontal");
			ResponsivePage.setHorizontal(false);
		}
		// console.log(ResponsivePage.getHorizontal())

		if(ResponsivePage.getIsFbApp()) {
			$(".wrapper").addClass("wrapper--fb");
		}else {
			$(".wrapper").removeClass("wrapper--fb");
		}
		// console.log("getIsFbApp:  "+ResponsivePage.getIsFbApp());
	}

	// 左右箭頭動態
	function arrowAni(el) {
		arrowLeftAni(el);
		arrowRightAni(el);
	}

	function arrowLeftAni(el) {
		arrowLeftAniTl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(3)", { duration: 0.3, opacity: 1 });
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(2)", { duration: 0.3, opacity: 1 });
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(1)", { duration: 0.3, opacity: 1 });
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(3)", { duration: 0.3, opacity: 0.2 }, 0.5);
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(2)", { duration: 0.3, opacity: 0.2 }, 0.8);
		arrowLeftAniTl.to(el + " .selector__arrow-left img:nth-child(1)", { duration: 0.3, opacity: 0.2 }, 1.1);
	}

	function arrowRightAni(el) {
		arrowRightAniTl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(1)", { duration: 0.3, opacity: 1 });
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(2)", { duration: 0.3, opacity: 1 });
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(3)", { duration: 0.3, opacity: 1 });
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(1)", { duration: 0.3, opacity: 0.2 }, 0.5);
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(2)", { duration: 0.3, opacity: 0.2 }, 0.8);
		arrowRightAniTl.to(el + " .selector__arrow-right img:nth-child(3)", { duration: 0.3, opacity: 0.2 }, 1.1);
	}

	function killArrowAni() {
		if(arrowLeftAniTl) {
			arrowLeftAniTl.kill();
			arrowLeftAniTl = null;
		}
		if(arrowRightAniTl) {
			arrowRightAniTl.kill();
			arrowRightAniTl = null;
		}
	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {
		arrowAni: function(el){
			arrowAni(el)
		},
		killArrowAni
	};
};

var base = new base();



