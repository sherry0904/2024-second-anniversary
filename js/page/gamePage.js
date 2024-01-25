gamePage = function () {
	let openAni_ninesquareTl = null;
	let data = null;
	let currentQuesId = null;
	let currentAnswerIdx = null;


	//private methods
	function init() {
		console.log('gamePage is loaded.');

		resetOpenAni_ninesquare();
		resetOpenAni_challenge();

		viewModel.getData().then(_res => {
			data = _res;
			console.log("data", data);
			buildNinesquare();
		});

		$(".challenge__buttons__item-explan").on("click", function() {
			$(".modal-explan").modal("show");
		});

		$(".ninesquare__list").on("click", ".ninesquare__item", function() {
			let quesId = $(this).data("id");
			console.log("quesId: "+quesId);
			currentQuesId = quesId;
			buildChallenge(currentQuesId);

		});

		// resetOpenAni_choose();

		// 測試用
		// setTimeout(()=>{
		// 	base.fullPopupIn("activity");
		// },1000);
	}

	//constructor

	function resetOpenAni_ninesquare(){
	}

	function resetOpenAni_challenge(){
	}

	function openAni_ninesquare() {

	}

	function openAni_challenge() {
		resetSection_choose();
		console.log("gamePage precision openAni")
	}

	function resetSection_ninesquare() {
		currentQuesId = null;
		resetOpenAni_ninesquare();
	}

	function resetSection_challenge() {
		currentAnswerIdx = null;
		resetOpenAni_ninesquare();
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

	function buildChallenge(id) {
		let currentData = data[id];
		let ques = data.ques;
		let correctIdx = currentData.answers.map((answer, idx) => {
			if(answer.indexOf(currentData.correct) !== -1) {
				return idx;
			}
		});
		console.log("currentData", currentData);
		console.log("correctIdx", correctIdx);

		let challengeDom = `
		<div class="challenge__ques">
			<p>
				${ques}
			</p>
		</div>
		<div class="challenge__answers challenge__answers-1" data-answer="2">
			<div class="challenge__answers__item wrong" data>
				<p>測試測試測試測試測試測試測試測試</p>
			</div>
			<div class="challenge__answers__item right">
				<p>測試測試測試測試測試測試測試測試</p>
			</div>
			<div class="challenge__answers__item wrong">
				<p>測試測試測試測試測試測試測試測試</p>
			</div>
			<div class="challenge__answers__item wrong">
				<p>測試測試測試測試測試測試測試測試</p>
			</div>
		</div>
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
	}

	function answerHandler() {
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
	};
};

var gamePage = new gamePage();