// pobieram wszystkie potrzbene elementy
// przyciski odpowiedzi
const answerBtns = Array.from(document.querySelectorAll(' .answers>.btn'));
//  zawartość pytania
const questionInfo = document.querySelector('.question');
// przyciska startu
const startBtn = document.querySelector('.start-btn');
// przycisk wybierający następne pytanie
const nextBtn = document.querySelector('.next-btn');
// odpowiedzi
const answerText = Array.from(document.querySelectorAll('.text'));
// lista nagród
const prizeList = Array.from(document.querySelectorAll('.prizeText'));
const halfBtn = document.querySelector('.btn2')
const btn1 = document.querySelector('.btn1')
const btn3 = document.querySelector('.btn3')
const help = document.querySelector('.help')



// tworze zmienne
let acceptingAnswers = false;
let currentQuestion = {};
let score;
let num1 = 1
let num2 = 1
let num3 = 1
let questionCounter = 0;
let availableQuestions = [];

// tworze obiekt który przechowuje wszystkie pytania
const questions = [
    {
		question: 'Jak nazywamy odmianę rzeczownika przez przypadki?',
		choice1: 'deklinacja',
		choice2: 'koniugacja',
		choice3: ' transformacja',
		choice4: ' fleksja',
		answer: 1,
	},
    {
		question: 'Z jakiego miasta pochodzi pizza?',
		choice1: 'Florencji',
		choice2: 'Lukki',
		choice3: 'Neapolu',
		choice4: 'Sieny ',
		answer: 3,
	},
    {
		question: 'Który z tych owoców zawiera najwięcej witaminy C:',
		choice1: 'pomarańcza',
		choice2: 'czarna porzeczka',
		choice3: 'malina',
		choice4: 'banan',
		answer: 2,
	},
    {
		question: 'Kto jest autorem Opowieści Wigilijnej?',
		choice1: 'Charles Dickens',
		choice2: 'Ernest Hemingway',
		choice3: 'Clive Staples Lewis',
		choice4: 'Thomas Stearns Eliot',
		answer: 1,
	},
    {
		question: 'Z czego wyrabia się alkohol zwany Rakiją?',
		choice1: 'wina',
		choice2: 'kukurydzy',
		choice3: 'żyta',
		choice4: 'owoców',
		answer: 4,
	},
    {
		question: 'Z ilu członków składa się polski senat',
		choice1: '90',
		choice2: '100',
		choice3: '110',
		choice4: '115',
		answer: 2,
	},
    {
		question: 'Jaki tytuł nosiła debiutancka książka S. Kinga?',
		choice1: 'Carrie',
		choice2: 'Dallas ’63',
		choice3: ' Mroczna Wieża I: Roland',
		choice4: 'Pan Mercedes',
		answer: 1,
	},
    {
		question: 'Jak nazywał się reżyser filmu Akademia Pana Kleksa?',
		choice1: ' Stanisław Loth',
		choice2: 'Jan Batory',
		choice3: 'Krzysztof Gradowski',
		choice4: 'Stanisław Jędryka',
		answer: 3,
	},
    {
		question: 'Która z mitycznych muz jest patronką poezji miłosnej?',
		choice1: 'Euterpe',
		choice2: 'Terpsychora',
		choice3: 'Talia',
		choice4: 'Erato',
		answer: 4,
	},
    {
		question: 'Jakiej rasy są Indianie?',
		choice1: 'czarnej',
		choice2: 'żółtej',
		choice3: 'czerwonej',
		choice4: 'białej ',
		answer: 2,
	},
    {
		question: 'Z jakiego kraju pochodzi aktualny mistrz świata w szachach?',
		choice1: 'Chin',
		choice2: 'Rosji',
		choice3: 'Norwegii',
		choice4: 'Stanów Zjednoczonych',
		answer: 1,
	},
    {
		question: 'Kto był następcą Władysława III Łokietka ',
		choice1: 'Kazimierz III Wielki',
		choice2: 'Władysław III Warneńczyk',
		choice3: ' Mieszko II',
		choice4: 'Stefan Batory',
		answer: 1,
	},

]

//Stałe zmienne//

const MAX_QUESTIONS = 12;

//////////////////////

// funkcja  ukrywa start btn, przypisuje pytania do zmiennej availableQuestions
// i odkrywa btn z pytaniami   //
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
//
const nextQuestion = () => {
	// jeśli nie bedzie dostępnyych pytań lub licznik pytań przkroczy limit to załaduj koniec gry
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		return window.location.assign('/end.html');
	}
	// inkrementacja licznika pytań
	questionCounter++;
	// tworze zmienną ktora wybiera losowe pytanie z dostępnych
	const questionIndex = (0 * availableQuestions.length);
	// przypisuje wybrane pytanie do zmiennej
	currentQuestion = availableQuestions[questionIndex];
	//przypisuej zawartość tekstową pytania do pola z pytaniem
	questionInfo.textContent = currentQuestion.question;
// tworze pętlę dla odpowiedzi. 
	answerText.forEach((choice) => {
		// zmienna która pobiera unikalny data number dla każdej odpowiedzi
		const number = choice.dataset['number'];
	// przypisjue tekst odpowiedzi do buttonów odpowiedzi
		choice.textContent = currentQuestion['choice' + number];
	});
// usuwa wybrane pytanie z tablicy dostępnych pytań
	availableQuestions.splice(questionIndex, 1);
	// pozwala na wybranie odpowiedzi
	acceptingAnswers = true;
	// ukrywam przycisk NEXT
	nextBtn.classList.add('hide');

	// Pętla która podświetla nagrode za aktualne pytanie
	prizeList.forEach((prize) => {
		
		const prizeNum = prize.dataset['num'];
		if (prizeNum == questionCounter) {
			prize.classList.add('highlight');
		} else {
			prize.classList.remove('highlight');
		}
	});
	
};
// funkcja która po załadowaniu nowego pytania usuwa z przycisków klasy good i wrong i nadaje standardową klase hover
const nextFunc = () => {
	answerText.forEach((choice) => {
		choice.closest('button').classList.remove('good', 'wrong');
		choice.closest('button').classList.add('hover');
	});

	nextQuestion();
};
// Pęt;a spradzająca czy klikne w odpowiednim miejscu
answerText.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;
// blokuje wybranie wielu odpowiedzi
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
// 
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

// Function to get two random wrong answers
const getTwoRandomWrongAnswers = () => {
    const wrongAnswers = [];
    const answerArr = [];

    // Push all answer choices to the answerArr
    answerArr.push(currentQuestion.choice1);
    answerArr.push(currentQuestion.choice2);
    answerArr.push(currentQuestion.choice3);
    answerArr.push(currentQuestion.choice4);

    // Remove the correct answer from the array
    answerArr.splice(currentQuestion.answer - 1, 1);

    // Shuffle the array to get random wrong answers
    const randomItems = answerArr.sort(() => Math.random() - 0.5).slice(0, 2);

    // Add the random wrong answers to the wrongAnswers array
    randomItems.forEach((choice) => {
        wrongAnswers.push(choice);
    });

    return wrongAnswers;
};

// Function to apply 'wrong' class to random wrong answers
const markRandomWrongAnswers = () => {
    const wrongAnswers = getTwoRandomWrongAnswers();

    answerText.forEach((choice) => {
        const number = choice.dataset['number'];

        // Check if the choice corresponds to a random wrong answer
        if (wrongAnswers.includes(currentQuestion['choice' + number])) {
            choice.closest('button').classList.add('wrong');
            choice.closest('button').classList.remove('hover');
        }
    });
};

// Updated halfbtnlogic function
const halfbtnlogic = () => {
    markRandomWrongAnswers();
};


const changeColor = (e) =>{
	choice = e.target;
	number = num1

	if(number == 1 )
	{
		choice.closest('button').classList.add('helpColor2');
		choice.closest('button').classList.remove('helpColor1');
	}
	if (number == 0){
		choice.closest('button').classList.add('hide');
	}
	console.log(num1);
	num1--

}
const changeColor2 = (e) =>{
	choice = e.target;
	number = num2

	if(number == 1 )
	{
		choice.closest('button').classList.add('helpColor2');
		choice.closest('button').classList.remove('helpColor1');
	}
	if (number == 0){
		choice.closest('button').classList.add('hide');
	}
	console.log(num2);
	num2--

}
const changeColor3 = (e) =>{
	choice = e.target;
	number = num3
	if(number == 1 )
	{
		choice.closest('button').classList.add('helpColor2');
		choice.closest('button').classList.remove('helpColor1');
	}
	if (number == 0){
		choice.closest('button').classList.add('hide');
	}
	
	num3--

}




btn1.addEventListener('click',changeColor)
halfBtn.addEventListener('click',changeColor2)
halfBtn.addEventListener('click', halfbtnlogic);
btn3.addEventListener('click',changeColor3)
nextBtn.addEventListener('click', nextFunc);
startBtn.addEventListener('click', starGame);



