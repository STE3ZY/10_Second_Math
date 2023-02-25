$(document).ready(function(){

  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var slider = document.getElementById("slider");

  slider.addEventListener("input", () => {
    var sliderValue = slider.value;
    restartGame();
  });


  // generate a random number from 1 to 10
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  // generate an equation question using 2 random numbers from 1 to 10
  var questionGenerator = function (sliderValue) {
    var question = {};
    var num1 = randomNumberGenerator(sliderValue);
    var num2 = randomNumberGenerator(sliderValue);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }
  
  // 10 second timer
  var startGame = function () {
    if (!interval) {
      // call the updateTimeLeft function if timeLeft is 0
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }

  // add one second when user gives right answer
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  // inject current question to DOM and create new question when input = answer
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator(slider.value);
    $('#equation').text(currentQuestion.equation);  
  }
  
  var checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  // update score
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  // restart game when slider value changes
  var restartGame = function () {
    clearInterval(interval);
    interval = undefined;
    timeLeft = 10;
    score = 0;
    updateScore(score);
    updateTimeLeft(0);
    renderNewQuestion();
  }
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();

});

