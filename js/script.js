const answerBtns = Array.from(document.querySelectorAll(' .answers>.btn'));
const questionInfo = document.querySelector('.question');
const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const answerText = Array.from(document.querySelectorAll('.text'));
const prizeList = Array.from(document.querySelectorAll('.prizeText'));

let acceptingAnswers = false;
let currentQuestion = {};
let score;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
	{
		question: 'ile to 2 + 2',
		choice1: '4',
		choice2: '5',
		choice3: '2',
		choice4: '6',
		answer: 1,
	},
	{
		question: 'ile to 10 * 10',
		choice1: '300',
		choice2: '100',
		choice3: '110',
		choice4: '150',
		answer: 2,
	},
	{
		question: 'ile to 122 + 22',

		choice1: '1222',
		choice2: '228',
		choice3: '21',
		choice4: '144',
		answer: 4,
	},
	{
		question: 'ile to 200 - (2*2)',
		choice1: '22',
		choice2: '-46',
		choice3: '196',
		choice4: '944',
		answer: 3,
	},
];

//Stałe zmienne//

const MAX_QUESTIONS = 12;

//////////////////////

const starGame = () => {
	availableQuestions = [...questions];
	questionCounter = 0;
	startBtn.classList.add('hide');
	questionInfo.classList.remove('hide');

	answerBtns.forEach((x) => {
		x.classList.remove('hide');
	});

	nextQuestion();
};

const nextQuestion = () => {
	// if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
	// 	return window.location.assign('/end.html');
	// }

	questionCounter++;
	console.log(questionCounter);
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	questionInfo.textContent = currentQuestion.question;

	answerText.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.textContent = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
	nextBtn.classList.add('hide');

	prizeList.forEach(prize =>{
		const prizeNum = prize.dataset['num']
		if(prizeNum == questionCounter){
			prize.classList.add('highlight')
		}else{
			prize.classList.remove('highlight')
		}
	
		
	})
};

const nextFunc = () => {
	answerText.forEach((choice) => {
		choice.closest('button').classList.remove('good', 'wrong');
		choice.closest('button').classList.add('hover');
	});

	nextQuestion();
};

answerText.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		if (selectedAnswer == currentQuestion.answer) {
			selectedChoice.closest('button').classList.add('good');
			selectedChoice.closest('button').classList.remove('hover');
			nextBtn.classList.remove('hide');
		} else if (selectedAnswer !== currentQuestion.answer) {
			selectedChoice.closest('button').classList.add('wrong');
			selectedChoice.closest('button').classList.remove('hover');
		}
	});
});



nextBtn.addEventListener('click', nextFunc);
startBtn.addEventListener('click', starGame);
