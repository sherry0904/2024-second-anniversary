creatorsPage = function () {
	let openAni_chooseTl = null;

	//private methods
	function init() {
		console.log('creatorsPage is loaded.');

		// resetOpenAni_choose();

		// 測試用
		// $(".modal-explan").modal("show")
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

	// "選擇創作者"回預設
	function resetSection_choose() {
		resetOpenAni_choose();
	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public

	return {
		openAni_choose,
	};
};

var creatorsPage = new creatorsPage();