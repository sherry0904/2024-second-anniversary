gamePage = function () {
	let data = null; // 所有題目資料
	let currentQuesId = null; // 目前題目Id
	let currentData = null; // 此題題目資訊
	let correctAnswerIdx = null; // 正確答案的Idx
	let isAnswerCorrect = false; // 作答是否正確
	let correctText = "恭喜答對";
	let incorrectText = "哎呀答錯";

	let openAni_ninesquareTl = null;
	let challengeAnnouceAniTl = null;


	//private methods
	function init() {
		console.log('gamePage is loaded.');

		resetSection_ninesquare();
		resetSection_challenge();

		viewModel.getData().then(_res => {
			data = _res;
			console.log("data", data);
			buildNinesquare();

			// 測試
			// goToChallengeHandler(6);
			// $(".modal-explan").modal("show");
		});

		$(".challenge").on("click", ".challenge__buttons__item-explan", function() {
			$(".modal-explan").modal("show");
		});

		$(".ninesquare__list").on("click", ".ninesquare__item", function() {
			let quesId = $(this).data("ques");
			console.log("quesId: "+quesId);
			currentQuesId = quesId;
			goToChallengeHandler(currentQuesId);

		});

		$(".challenge").on("click", ".challenge__answers__item", function(e, idx) {
			let chooseIdx = $(this).index();
			chooseIdx !== correctAnswerIdx ? isAnswerCorrect = false : isAnswerCorrect = true;
			answerHandler()
		});

	}

	//constructor

	function resetOpenAni_ninesquare(){
		console.log("resetOpenAni_ninesquare");
		gsap.set(".challenge__annouce", { autoAlpha: 0, scale: 0.3 });
	}

	function resetOpenAni_challenge(){
	}

	function openAni_ninesquare() {

	}

	function openAni_challenge() {
		resetOpenAni_challenge();
		console.log("gamePage precision openAni")
	}

	function resetSection_ninesquare() {
		currentQuesId = null;
		currentData = null;
		correctAnswerIdx = null;
		if(challengeAnnouceAniTl) {
			challengeAnnouceAniTl.kill();
			challengeAnnouceAniTl = null;
		}
		resetOpenAni_ninesquare();
	}

	function resetSection_challenge() {
		correctAnswerIdx = null;
		resetOpenAni_challenge();
	}

	function buildNinesquare() {
		for(let i=0; i<data.length; i++) {
			let id = data[i].id;
			let tag = data[i].tag;
			$(".ninesquare__list").append(`
				<div class="ninesquare__item ninesquare__item-${id}" data-ques="${id}">
					<div class="ninesquare__text">
						<p>
							${tag}
						</p>
					</div>
				</div>
			`);	
		}
	}

	async function goToChallengeHandler(currentQuesId) {
		await getCurrentData(currentQuesId);
		await buildChallengeDom(currentData);
		await buildExplan(currentData);
		viewModel.goToSection(".challenge", "fade");
	}

	function getCurrentData(currentQuesId) {
		return new Promise(resolve => {
			// 取得該題目資料
			currentData = data.filter(item => {
				return item.id === currentQuesId;
			})[0]; 

			 // 取得正確答案的Idx
			currentData.answers.map((answer, idx) => {
				if(answer.indexOf(currentData.correct) !== -1) {
					correctAnswerIdx = idx;
					return idx;
				}
			});

			console.log("currentData", currentData);
			console.log("correctAnswerIdx", correctAnswerIdx);
			resolve(currentData);
		});
	}

	function buildChallengeDom({ id, ques, answers, answerscol }) {
		return new Promise(resolve => {
			$(".challenge .section__container").html("");
	
			let challengeDom = `
				<div class="challenge__ques challenge__ques-${id}">
					<p>
						${ques}
					</p>
				</div>
				<div class="challenge__answers challenge__answers-col${answerscol} challenge__answers-${id}" data-answer="${correctAnswerIdx}"></div>
				<div class="challenge__buttons">
					<div class="challenge__buttons__item challenge__buttons__item-explan">
						<p>
							詳解
						</p>
					</div>
					<div class="challenge__buttons__item challenge__buttons__item-ninesquare goToNinesquare">
						<p>
							下一題
						</p>
					</div>
				</div>
			`
	
			$(".challenge .section__container").append(challengeDom);

			for(let i=0; i<answers.length; i++) {
				$(".challenge__answers").append(`
					<div class="challenge__answers__item">
						<p>${answers[i]}</p>
					</div>
				`);
			}

			resolve("buildChallengeDom complelte")
		});
		
	}

	function buildExplan({ ques, detail }) {
		return new Promise(resolve => {
			$(".modal-explan .modal-body").html("");
			$(".modal-explan .modal-body").append(`
				<div class="modal__body modal__body-${currentQuesId}">
					<div class="modal__title">
						<p>
							${ques}
						</p>
					</div>
					<div class="modal__detail">
						${detail}
					</div>
				</div>
			`);

			$(".modal-explan .modal-body").append(`
				<div class="modal__button goToNinesquare">
					<p>
						下一題
					</p>
				</div>	
			`);


			resolve("buildExplan complete");
		});
	}

	function answerHandler() {
		ninesquareUpdate();
		challengeAnnounceAnswer();
		challengeAnnouceAni();
		gsap.to(".challenge__buttons", { duration: 0, autoAlpha: 1});
		$(".challenge__answers__item").css("pointer-events", "none");
	}

	function ninesquareUpdate(){
		let wrongTemplate = `
			<div class="ninesquare__icon ninesquare__icon-wrong">
				<p>X</p>
			</div>
		`
		let rightTemplate = `
			<div class="ninesquare__icon ninesquare__icon-right">
				<p>O</p>
			</div>
		`
		$(".ninesquare__item-"+currentQuesId).addClass("disable");
		if(isAnswerCorrect) {
			$(".ninesquare__item-"+currentQuesId).append(rightTemplate);
		}else {
			$(".ninesquare__item-"+currentQuesId).append(wrongTemplate);
		}
	}

	function challengeAnnounceAnswer() {
		$(`.challenge__answers__item`).addClass("wrong");
		$(`.challenge__answers__item:nth-child(${correctAnswerIdx+1})`).removeClass("wrong");
		$(`.challenge__answers__item:nth-child(${correctAnswerIdx+1})`).addClass("right");
		
	}

	function challengeAnnouceAni() {
		$(".challenge__annouce p").html();
		if(isAnswerCorrect) {
			$(".challenge__annouce p").text(correctText);
		}else {
			$(".challenge__annouce p").text(incorrectText);
		}
		challengeAnnouceAniTl = gsap.timeline({});
		challengeAnnouceAniTl.to(".challenge__annouce", { duration: 0, autoAlpha: 1, ease: "none" });
		challengeAnnouceAniTl.to(".challenge__annouce", { duration: 0.4, scale: 1.5, ease: "none"});
		challengeAnnouceAniTl.to(".challenge__annouce", { duration: 0.3, autoAlpha: 0, ease: "none", delay: 0.5  });
	}


	{
		$(document).ready(function () {
			init();
		});
	}

	//public

	return {
		openAni_ninesquare,
		openAni_challenge,
		resetSection_ninesquare
	};
};

var gamePage = new gamePage();