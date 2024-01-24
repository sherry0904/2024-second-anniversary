strongpointPage = function () {
	let openAniTl = null;

	//private methods
	function init() {
		console.log('strongpointPage is loaded.');

		resetOpenAni();

		$(".modal__overlay").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			$(".modal-activity").modal("hide");
		});

		$(".button-activity").on("click", function(){
			$(".modal-activity").modal("show");
			gtag_ButtonClick("t&c", "strongpoint");
		});

		$(".floatbutton-discount").on("click", function(){
			viewModel.goToSection(".strongpoint", "fade");
			gtag_ButtonClick("floating_coupon");
		});

		// 測試用
		// setTimeout(()=>{
		// 	$(".modal-activity").modal('show');
		// },500);
	}

	//constructor

	function resetOpenAni(){
		gsap.set(".strongpoint .bg", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".strongpoint .strongpoint__discount", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".strongpoint .strongpoint__list", { autoAlpha: 0, scale: 0.5 });
		gsap.set(".strongpoint .strongpoint__voucher", { autoAlpha: 0, scale: 0.5 });
	}

	function openAni() {
		openAniTl = gsap.timeline();
		openAniTl.to(".strongpoint .bg, .strongpoint .strongpoint__discount, .strongpoint .strongpoint__list, .strongpoint .strongpoint__voucher", { duration: 0.7, autoAlpha: 1, scale: 1, ease: "circ.out", });
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
	};
};

var strongpointPage = new strongpointPage();