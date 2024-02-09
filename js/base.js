base = function () {
	//private menbers
	let imageUrls = ["./images/section/landing/title.png","./images/common/bg.jpg",  "./images/common/bg-2.jpg", "./images/common/bg-3.jpg"];

	let isPlay = false;
	const playIconPath = "./images/common/play-button.png"
	const pauseIconPath = "./images/common/pause-button.png"

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
		viewModel.resetSection();;

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

		})

		$(".game__resizeArea").on("click", ".goToNinesquare", function() {
			gamePage.resetSection_ninesquare()
			viewModel.goToSection(".ninesquare", "fade");
			$(".modal-explan").modal("hide");
		});

		$(".music").on("click", function() {
			musicHandler();
		});

	}

	function musicHandler() {
		const audio = $("#bgm")[0];
		audio.volume = 0.8;
		if(isPlay) {
			$(".music__icon img").attr("src", playIconPath);
			audio.pause()
			audio.removeEventListener("ended", function() {
				audio.currentTime = 0;
				audio.play()
			});
		}else {
			$(".music__icon img").attr("src", pauseIconPath);
			audio.play();
			audio.addEventListener("ended", function() {
				audio.currentTime = 0;
				audio.play();
			});
		}
		isPlay = !isPlay;

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
	};
};

var base = new base();



