$(document).ready(function(){

  var currentQuestion;

  // generate a random number from 1 to 10
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  // generate an equation question using 2 random numbers from 1 to 10
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }
  
  // 10 second timer
  var timeLeft = 10;
  var interval = setInterval(function () {
    updateTimeLeft(-1);
    $('#time-left').text(timeLeft);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);

  // add one second when user gives right answer
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  // inject current question to DOM and create new question when input = answer
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  }
  
  var checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
    }
  }
  
  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();

});