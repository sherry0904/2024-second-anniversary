landingPage = function () {

	let arrowDownAniTl;
	let openAniTl = null;

	let startY; // 記錄滑動開始時的 Y 座標
	let isScrolling = false; // 判斷是否正在滑動
	let scrollTimer;
	let scrollDirection = "down";

	//private methods
	function init() {
		console.log('landingPage is loaded.');

		resetOpenAni();

		// 監聽滑動開始事件
		$(".landing").on('touchstart', (e) => {
			startY = e.touches[0].clientY;
			isScrolling = false;
		});

		// 監聽滑動事件
		$(".landing").on('touchmove', (e) => {
			isScrolling = true;
		});

		// 監聽滑動結束事件
		$(".landing").on('touchend', (e) => {
			if (isScrolling) {
				const endY = e.changedTouches[0].clientY;

				// 判斷滑動方向
				if (endY > startY) {
					// 向下滑動
					console.log('向下滑動');
					// 在這裡執行你的動作
				} else if (endY < startY) {
					// 向上滑動
					console.log('向上滑動');
					// 在這裡執行你的動作
					goToCreatorsChoose();
				}
			}
		});

		// 監聽滾軸事件
		$(".landing")[0].addEventListener('wheel', (event) => {
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
				if(scrollDirection = "down") {
					goToCreatorsChoose();
				}
				
			}, 200);
		});

		$(".landing__arrow").on("click", function(){
			goToCreatorsChoose();
		})

		// 測試用
		setTimeout(()=>{
			// base.fullPopupIn("activity");
			// base.fullPopupIn("register");
			// formInAni();
			// viewModel.alertIn("測試訊息");
		},1000);
	}

	//constructor

	function resetOpenAni(){
		gsap.set(".landing__arrow img", { opacity: 0.3});
		gsap.set(".landing__title", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".landing__intro", { autoAlpha: 0, scale: 1.2 });
		gsap.set(".landing__arrow", { autoAlpha: 0, y: "2em" })
	}

	function openAni() {
		arrowDownAni();
		openAniTl = gsap.timeline();
		openAniTl.to(".landing__title", { duration: 1, autoAlpha: 1, scale: 1, ease: "circ.out", })
		openAniTl.to(".landing__intro", { duration: 1, autoAlpha: 1, scale: 1, ease: "circ.out", }, "-=0.7")
		openAniTl.to(".landing__arrow", { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.3")
	}

	function arrowDownAni() {
		arrowDownAniTl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(1)", { duration: 0.2, opacity: 1 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(2)", { duration: 0.2, opacity: 1 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(3)", { duration: 0.2, opacity: 1 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(4)", { duration: 0.2, opacity: 1 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(5)", { duration: 0.2, opacity: 1 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(1)", { duration: 0.2, opacity: 0.3 }, 1);
		arrowDownAniTl.to(".landing__arrow img:nth-child(2)", { duration: 0.2, opacity: 0.3 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(3)", { duration: 0.2, opacity: 0.3 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(4)", { duration: 0.2, opacity: 0.3 });
		arrowDownAniTl.to(".landing__arrow img:nth-child(5)", { duration: 0.2, opacity: 0.3 });
	}

	function resetSection() {
		resetOpenAni();

		if(arrowDownAniTl) {
			arrowDownAniTl.kill();
			arrowDownAniTl = null;
		}
		if(openAniTl) {
			openAniTl.kill();
			openAniTl = null;
		}
	}

	function goToCreatorsChoose() {
		resetSection();
		viewModel.goToSection(".ninesquare", "fade");
	}

	

	{
		$(document).ready(function () {
			init();
		});
	}

	//public

	return {
		resetOpenAni,
		openAni,
		myFunction: function(event) {
			myFunction(event);
		}
	};
};

var landingPage = new landingPage();