creatorsPage = function () {
	let arrowDownAniTl = null;
	let openAni_chooseTl = null;
	let openAni_huberTl = null;
	let openAni_leeonTl = null;
	let openAni_video_huber_tl = null;
	let openAni_video_leeon_tl = null;
	let huberDialogNum = 1;
	let huberDialogMaxNum = $(".creators-huber .creators__dialog__item").length;
	let leeonDialogNum = 1;
	let leeonDialogMaxNum = $(".creators-leeon .creators__dialog__item").length;

	let huberVideoSrc = "https://www.youtube.com/embed/FA-ZWqzoY88?si=5mFuvvzELTgOA8C3";
	let leeonVideoSrc = "https://www.youtube.com/embed/LIcnZ1rbWuo?si=vLQmlgPbw1VSReS7";

	let startY; // 記錄滑動開始時的 Y 座標
	let isScrolling = false; // 判斷是否正在滑動
	let scrollTimer;
	let scrollDirection = "down";

	//private methods
	function init() {
		console.log('creatorsPage is loaded.');

		resetOpenAni_choose();
		resetOpenAni_huber();
		resetOpenAni_leeon();
		resetOpenAni_video_huber();
		resetOpenAni_video_leeon();


		$(".creators-choose .selector__arrow-left, .creators-choose .creators__section-huber .creators__section__man, .creators-choose .creators__section-huber .creators__section__name").on("click", function(){
			viewModel.goToSection(".creators-huber", "enterRight");
			base.killArrowAni();
			gtag_ButtonClick("creator_66", "creators-choose");
		});

		$(".creators-choose .selector__arrow-right, .creators-choose .creators__section-leeon .creators__section__man, .creators-choose .creators__section-leeon .creators__section__name").on("click", function(){
			viewModel.goToSection(".creators-leeon", "enterLeft");
			base.killArrowAni();
			gtag_ButtonClick("creator_tt", "creators-choose");
		});

		// creators-huber 監聽滑動開始事件
		$(".creators-huber").on('touchstart', (e) => {
			startY = e.touches[0].clientY;
			isScrolling = false;
		});

		// creators-huber 監聽滑動事件
		$(".creators-huber").on('touchmove', (e) => {
			isScrolling = true;
		});

		// creators-huber 監聽滑動結束事件
		$(".creators-huber").on('touchend', (e) => {
			if (isScrolling) {
				const endY = e.changedTouches[0].clientY;

				// 判斷滑動方向
				if (endY > startY) {
					// 向下滑動
					console.log('向下滑動');
					// 在這裡執行你的動作
					if(huberDialogNum > 1) {
						huberDialogNum-=1;
						nextDialogStep("huber");
					}

				} else if (endY < startY) {
					// 向上滑動
					console.log('向上滑動');
					// 在這裡執行你的動作
					if(huberDialogNum < huberDialogMaxNum) {
						huberDialogNum+=1;
						nextDialogStep("huber");
					}else {
						viewModel.goToSection(".creators-video-huber", "fade");
					}
					
				}
			}
		});

		// creators-huber 監聽滾軸事件
		$(".creators-huber")[0].addEventListener('wheel', (event) => {
			// 判斷滾輪方向
			if (event.deltaY > 0) {
				console.log('往下滑動');
				scrollDirection = "down";
			} else if (event.deltaY < 0) {
				console.log('往上滑動');
				scrollDirection = "up";
			}
		
			// 設置 scrolling 為 true
			scrolling = true;
		
			// 清除之前的計時器
			clearTimeout(scrollTimer);
		
			// 設定計時器，在滾輪停止後 500 毫秒執行操作
			scrollTimer = setTimeout(() => {
				console.log('滾輪停止');
				scrolling = false;

				// 在這裡執行你的特定操作
				if(scrollDirection == "down") {
					if(huberDialogNum < huberDialogMaxNum) {
						huberDialogNum+=1;
						nextDialogStep("huber");
					}else {
						viewModel.goToSection(".creators-video-huber", "fade");
					}
				}

				if(scrollDirection == "up") {
					if(huberDialogNum > 1) {
						huberDialogNum-=1;
						nextDialogStep("huber");
					}
				}
				
			}, 100);
		});
		
		//creators-huber 往下箭頭
		$(".creators-huber .creators__content__arrow").on("click", function() {
			if(huberDialogNum < huberDialogMaxNum) {
				huberDialogNum+=1;
				nextDialogStep("huber");
			}else {
				viewModel.goToSection(".creators-video-huber", "fade");
			}
		});

		// creators-leeon 監聽滑動開始事件
		$(".creators-leeon").on('touchstart', (e) => {
			startY = e.touches[0].clientY;
			isScrolling = false;
		});

		// creators-leeon 監聽滑動事件
		$(".creators-leeon").on('touchmove', (e) => {
			isScrolling = true;
		});

		// creators-leeon 監聽滑動結束事件
		$(".creators-leeon").on('touchend', (e) => {
			if (isScrolling) {
				const endY = e.changedTouches[0].clientY;

				// 判斷滑動方向
				if (endY > startY) {
					// 向下滑動
					console.log('向下滑動');
					// 在這裡執行你的動作
					if(leeonDialogNum > 1) {
						leeonDialogNum-=1;
						nextDialogStep("leeon");
					}

				} else if (endY < startY) {
					// 向上滑動
					console.log('向上滑動');
					// 在這裡執行你的動作
					if(leeonDialogNum < leeonDialogMaxNum) {
						leeonDialogNum+=1;
						nextDialogStep("leeon");
					}else {
						viewModel.goToSection(".creators-video-leeon", "fade");
					}
					
				}
			}
		});

		// creators-leeon 監聽滾軸事件
		$(".creators-leeon")[0].addEventListener('wheel', (event) => {
			// 判斷滾輪方向
			if (event.deltaY > 0) {
				console.log('往下滑動');
				scrollDirection = "down";
			} else if (event.deltaY < 0) {
				console.log('往上滑動');
				scrollDirection = "up";
			}
		
			// 設置 scrolling 為 true
			scrolling = true;
		
			// 清除之前的計時器
			clearTimeout(scrollTimer);
		
			// 設定計時器，在滾輪停止後 500 毫秒執行操作
			scrollTimer = setTimeout(() => {
				console.log('滾輪停止');
				scrolling = false;

				// 在這裡執行你的特定操作
				if(scrollDirection == "down") {
					if(leeonDialogNum < leeonDialogMaxNum) {
						leeonDialogNum+=1;
						nextDialogStep("leeon");
					}else {
						viewModel.goToSection(".creators-video-leeon", "fade");
					}
				}

				if(scrollDirection == "up") {
					if(leeonDialogNum > 1) {
						leeonDialogNum-=1;
						nextDialogStep("leeon");
					}
				}
				
			}, 100);
		});
		
		//creators-leeon 往下箭頭
		$(".creators-leeon .creators__content__arrow").on("click", function() {
			if(leeonDialogNum < leeonDialogMaxNum) {
				leeonDialogNum+=1;
				nextDialogStep("leeon");
			}else {
				viewModel.goToSection(".creators-video-leeon", "fade");
			}
		});

		$(".button-creators").on("click", function() {
			viewModel.goToSection(".creators-choose", "fade");
		});

		$(".button-product").on("click", function() {
			resetOpenAni_video_huber();
			resetOpenAni_video_leeon();
			viewModel.goToSection(".product-choose", "fade");
		});

		

		// 測試用
		// setTimeout(()=>{
		// 	base.fullPopupIn("activity");
		// },1000);
	}

	//constructor

	// 重設"選擇創作者"動態
	function resetOpenAni_choose(){
		gsap.set(".creators-choose .creators__section-intro", { autoAlpha: 0});
		gsap.set(".creators-choose .selector__arrow img", { opacity: 0.2});
		gsap.set(".creators__content__arrow img", { opacity: 0.2})
		gsap.set(".creators-choose .creators__section .tag", { autoAlpha: 0, y: "-2em"});
		gsap.set(".creators-choose .creators__section-huber .creators__section__man", { autoAlpha: 0, x: "-4em"});
		gsap.set(".creators-choose .creators__section-leeon .creators__section__man", { autoAlpha: 0, x: "4em"});
		gsap.set(".creators-choose .creators__section-huber .creators__section__name", { autoAlpha: 0, x: "2em"});
		gsap.set(".creators-choose .creators__section-leeon .creators__section__name", { autoAlpha: 0, x: "-2em"});
	}

	// 重設"六指淵"動態
	function resetOpenAni_huber(){
		huberDialogNum = 1;
		gsap.set(".creators-huber .creators__product", { autoAlpha: 0, x: "10em" });
		gsap.set(".creators-huber .creators__figure", { autoAlpha: 0, x: "-10em" });
		gsap.set(".creators-huber .creators__dialog", { autoAlpha: 0, x: "-10em" });
		gsap.set(".creators-huber .creators__content", { autoAlpha: 0, x: "-10em" });
	}

	// 重設"彤彤"動態
	function resetOpenAni_leeon(){
		leeonDialogNum = 1;
		gsap.set(".creators-leeon .creators__product", { autoAlpha: 0, x: "-10em" });
		gsap.set(".creators-leeon .creators__figure", { autoAlpha: 0, x: "10em" });
		gsap.set(".creators-leeon .creators__dialog", { autoAlpha: 0, x: "10em" });
		gsap.set(".creators-leeon .creators__content", { autoAlpha: 0, x: "10em" });
	}

	// 重設"六指淵 - 影片"動態
	function resetOpenAni_video_huber(){
		$(".creators__video-916 iframe").attr("src", huberVideoSrc);
		gsap.set(".creators-video-huber .bg", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-huber .creators__tip", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-huber .button", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-huber .creators__video", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-huber .creators__expect", { autoAlpha: 0, scale: 0.5});
	}

	// 重設"彤彤 - 影片"動態
	function resetOpenAni_video_leeon(){
		$(".creators__video-169 iframe").attr("src", leeonVideoSrc);
		gsap.set(".creators-video-leeon .bg", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-leeon .creators__tip", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-leeon .button", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-leeon .creators__video", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".creators-video-leeon .creators__expect", { autoAlpha: 0, scale: 0.5});
	}

	// "選擇創作者"開頭動態
	function openAni_choose() {
		resetOpenAni_video_huber();
		resetOpenAni_video_leeon();
		base.arrowAni(".creators-choose");
		console.log("creatorsPage choose openAni")

		openAni_chooseTl = gsap.timeline();
		openAni_chooseTl.to(".creators-choose .creators__section-intro", { duration: 0.3, autoAlpha: 1 });
		openAni_chooseTl.to(".creators-choose .creators__section .tag", { duration: 0.5, autoAlpha: 1, y: 0 }, 0);
		openAni_chooseTl.to(".creators-choose .creators__section-huber .creators__section__man", { duration: 0.5, autoAlpha: 1, x: 0 }, 0.6);
		openAni_chooseTl.to(".creators-choose .creators__section-leeon .creators__section__man", { duration: 0.5, autoAlpha: 1, x: 0 }, 0.6);
		openAni_chooseTl.to(".creators-choose .creators__section-huber .creators__section__name", { duration: 0.5, autoAlpha: 1, x: 0 }, 0.6);
		openAni_chooseTl.to(".creators-choose .creators__section-leeon .creators__section__name", { duration: 0.5, autoAlpha: 1, x: 0 }, 0.6);
	}

	// "六指淵"開頭動態
	function openAni_huber() {
		resetSection_choose();
		arrowDownAni(".creators-huber");
		console.log("creatorsPage Huber openAni")
		openAni_huberTl = gsap.timeline();
		openAni_huberTl.to(".creators-huber .creators__product", { duration: 0.3, autoAlpha: 1, x: 0 });
		openAni_huberTl.to(".creators-huber .creators__dialog", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.2);
		openAni_huberTl.to(".creators-huber .creators__content", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.2);
		openAni_huberTl.to(".creators-huber .creators__figure", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.3);
	}

	// "彤彤"開頭動態
	function openAni_leeon() {
		resetSection_choose();
		arrowDownAni(".creators-leeon");
		console.log("creatorsPage LEEON openAni")
		openAni_leeonTl = gsap.timeline();
		openAni_leeonTl.to(".creators-leeon .creators__product", { duration: 0.3, autoAlpha: 1, x: 0 });
		openAni_leeonTl.to(".creators-leeon .creators__dialog", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.2);
		openAni_leeonTl.to(".creators-leeon .creators__content", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.2);
		openAni_leeonTl.to(".creators-leeon .creators__figure", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.3);
	}

	// "六指淵 - 影片"開頭動態
	function openAni_video_huber() {
		console.log("creatorsPage Video Huber openAni");
		resetSection_huber();
		openAni_video_huber_tl = gsap.timeline();
		openAni_video_huber_tl.to(".creators-video-huber .creators__tip, .creators-video-huber, .creators-video-huber .bg, .creators-video-huber .creators__video, .creators-video-huber .creators__expect", { duration: 0.7, autoAlpha: 1, scale: 1, ease: "circ.out", });
		openAni_video_huber_tl.to(".creators-video-huber .button", { duration: 0.7, autoAlpha: 1, scale: 1, ease: "circ.out", }, 0.4);
	}

	// "彤彤 - 影片"開頭動態
	function openAni_video_leeon() {
		console.log("creatorsPage Video LEEON openAni");
		resetSection_leeon();
		openAni_video_leeon_tl = gsap.timeline();
		openAni_video_leeon_tl.to(".creators-video-leeon .creators__tip, .creators-video-leeon, .creators-video-leeon .bg, .creators-video-leeon .creators__video, .creators-video-leeon .creators__expect", { duration: 0.7, autoAlpha: 1, scale: 1, ease: "circ.out", });
		openAni_video_leeon_tl.to(".creators-video-leeon .button", { duration: 0.7, autoAlpha: 1, scale: 1, ease: "circ.out", }, 0.4);
	}

	// "向下箭頭"動態
	function arrowDownAni($el) {
		arrowDownAniTl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(1)", { duration: 0.3, opacity: 1 });
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(2)", { duration: 0.3, opacity: 1 });
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(3)", { duration: 0.3, opacity: 1 });
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(1)", { duration: 0.3, opacity: 0.2 }, 0.5);
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(2)", { duration: 0.3, opacity: 0.2 }, 0.8);
		arrowDownAniTl.to($el + " .creators__content__arrow img:nth-child(3)", { duration: 0.3, opacity: 0.2 }, 1.1);
	}

	// 前往下一個對話框
	function nextDialogStep(creator) {
		if(creator == "huber") {
			gsap.to(`.creators-huber .creators__dialog__item:not(:nth-child(${huberDialogNum}))`, { duration: 0.3, autoAlpha: 0 })
			gsap.to(`.creators-huber .creators__dialog__item:nth-child(${huberDialogNum})`, { duration: 0.3, autoAlpha: 1 })
		}

		if(creator == "leeon") {
			gsap.to(`.creators-leeon .creators__dialog__item:not(:nth-child(${leeonDialogNum}))`, { duration: 0.3, autoAlpha: 0 })
			gsap.to(`.creators-leeon .creators__dialog__item:nth-child(${leeonDialogNum})`, { duration: 0.3, autoAlpha: 1 })
		}
	}

	// "選擇創作者"回預設
	function resetSection_choose() {
		resetOpenAni_choose();
	}

	// "六指淵"回預設
	function resetSection_huber() {
		resetOpenAni_huber();

		if(arrowDownAniTl) {
			arrowDownAniTl.kill();
			arrowDownAniTl = null;
		}
	}

	// "彤彤"回預設
	function resetSection_leeon() {
		resetOpenAni_leeon();

		if(arrowDownAniTl) {
			arrowDownAniTl.kill();
			arrowDownAniTl = null;
		}
	}


	{
		$(document).ready(function () {
			init();
		});
	}

	//public

	return {
		openAni_choose,
		openAni_huber,
		openAni_leeon,
		openAni_video_huber,
		openAni_video_leeon
	};
};

var creatorsPage = new creatorsPage();