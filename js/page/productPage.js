productPage = function () {
	let openAni_chooseTl = null;

	//private methods
	function init() {
		console.log('productPage is loaded.');

		resetOpenAni_choose();

		$(".product-choose .selector__arrow-left, .tag-precision, .product-choose .product__laptop-precision, .product-choose .product__laptop-precision").on("click", function(){
			viewModel.goToSection(".product-precision", "enterRight");
			base.killArrowAni();
			gtag_ButtonClick("precision", "product-choose");
		});

		$(".product-choose .selector__arrow-right, .tag-inspiron, .product-choose .product__laptop-inspiron, .product-choose .product__laptop-inspiron").on("click", function(){
			viewModel.goToSection(".product-inspiron", "enterLeft");
			base.killArrowAni();
			gtag_ButtonClick("inspiron", "product-choose");
		});

		$(".button-discount").on("click", function() {
			viewModel.goToSection(".strongpoint", "fade");
		});


		$(".goToProductChoose-precision").on("click", function(){
			viewModel.goToSection(".product-choose", "enterLeft");
			gtag_ButtonClick("goToProductChoose", "product-precision");
		});

		$(".goToProductChoose-inspiron").on("click", function(){
			viewModel.goToSection(".product-choose", "enterRight");
			gtag_ButtonClick("goToProductChoose", "product-inspiron");
		});
		
		// 測試用
		// setTimeout(()=>{
		// 	base.fullPopupIn("activity");
		// },1000);
	}

	//constructor

	function resetOpenAni_choose(){
		gsap.set(".product-choose .selector__arrow img", { opacity: 0.2});
		gsap.set(".product-choose .tag", { autoAlpha: 0, y: "-2em" });
		gsap.set(".product-choose .product__feature", { autoAlpha: 0, scale: 0.8 });
		gsap.set(".product-choose .product__laptop-precision", { autoAlpha: 0, x: "-5em" });
		gsap.set(".product-choose .product__laptop-inspiron", { autoAlpha: 0, x: "5em" });
		gsap.set(".product-choose .selector__arrow-left", { autoAlpha: 0, x: "-5em" });
		gsap.set(".product-choose .selector__arrow-right", { autoAlpha: 0, x: "5em" });
	}

	function openAni_choose() {
		base.arrowAni(".product-choose");
		console.log("productPage choose openAni")
		openAni_chooseTl = gsap.timeline();
		openAni_chooseTl.to(".product-choose .tag", { duration: 0.3, autoAlpha: 1, y: 0 });
		openAni_chooseTl.to(".product-choose .product__feature", { duration: 0.5, autoAlpha: 1, scale: 1, ease: "circ.out" }, 0.2);
		openAni_chooseTl.to(".product-choose .product__laptop-precision", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.3);
		openAni_chooseTl.to(".product-choose .product__laptop-inspiron", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.3);
		openAni_chooseTl.to(".product-choose .selector__arrow-left", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.5);
		openAni_chooseTl.to(".product-choose .selector__arrow-right", { duration: 0.3, autoAlpha: 1, x: 0 }, 0.5);
	}

	function openAni_precision() {
		resetSection_choose();
		console.log("productPage precision openAni")
	}

	function openAni_inspiron() {
		resetSection_choose();
		console.log("productPage inspiron openAni")
	}

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
		openAni_precision,
		openAni_inspiron,
	};
};

var productPage = new productPage();