$(document).ready(function(){

  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var slider = document.getElementById("slider");

  // calculator input
  function setupCalculatorInput() {
  // Get all the calculator buttons
  const buttons = $('.calc-button');

  // Add a click event listener to each button
  buttons.on('click', function() {
    const input = $('#user-input');
    const button = $(this);

    // If the button is the clear button, clear the input field
    if (button.hasClass('is-clear')) {
      input.val('');
    } 
    // If the button is the equals button, evaluate the input value as a math expression
    else if (button.hasClass('add')) {
      $('input[type="checkbox"][value="addition"]').prop('checked', true);
      $('input[type="checkbox"][value="subtraction"]').prop('checked', false);
      $('input[type="checkbox"][value="multiplication"]').prop('checked', false);
      $('input[type="checkbox"][value="division"]').prop('checked', false);
      restartGame();
    }
    else if (button.hasClass('subtract')) {
      $('input[type="checkbox"][value="addition"]').prop('checked', false);
      $('input[type="checkbox"][value="subtraction"]').prop('checked', true);
      $('input[type="checkbox"][value="multiplication"]').prop('checked', false);
      $('input[type="checkbox"][value="division"]').prop('checked', false);
      restartGame();
    }
    else if (button.hasClass('multiply')) {
      $('input[type="checkbox"][value="addition"]').prop('checked', false);
      $('input[type="checkbox"][value="subtraction"]').prop('checked', false);
      $('input[type="checkbox"][value="multiplication"]').prop('checked', true);
      $('input[type="checkbox"][value="division"]').prop('checked', false);
      restartGame();
    }
    else if (button.hasClass('divide')) {
      $('input[type="checkbox"][value="addition"]').prop('checked', false);
      $('input[type="checkbox"][value="subtraction"]').prop('checked', false);
      $('input[type="checkbox"][value="multiplication"]').prop('checked', false);
      $('input[type="checkbox"][value="division"]').prop('checked', true);
      restartGame();
    }
      
    // Otherwise, append the button value to the input field
    else {
      input.val(input.val() + button.text());
    }
  });
  }

  setupCalculatorInput();
  $('input[type="checkbox"][value="addition"]').prop('checked', true);
  $('input[type="checkbox"][value="subtraction"]').prop('checked', false);
  $('input[type="checkbox"][value="multiplication"]').prop('checked', false);
  $('input[type="checkbox"][value="division"]').prop('checked', false);
  $('.add').addClass('active');  // activating buttons
  $('.add').on('click', function() {
    // Remove active class from all buttons
    $('.calc-button').removeClass('active');
    // Add the "active" class to the button
    $(this).addClass('active');
  });
  $('.subtract').on('click', function() {
    // Remove active class from all buttons
    $('.calc-button').removeClass('active');
    // Add the "active" class to the button
    $(this).addClass('active');
  });
  $('.multiply').on('click', function() {
    // Remove active class from all buttons
    $('.calc-button').removeClass('active');
    // Add the "active" class to the button
    $(this).addClass('active');
  });
  $('.divide').on('click', function() {
    // Remove active class from all buttons
    $('.calc-button').removeClass('active');
    // Add the "active" class to the button
    $(this).addClass('active');
  });

  // getting numbers limit from slider
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
    
    // get the selected question types
    var selectedTypes = $('input[name=question-type]:checked').map(function() {
      return $(this).val();
    }).get();
    
    // choose a random question type
    var questionType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];

    
    // generate a question based on the selected type
    if (questionType === 'addition') {
      question.answer = num1 + num2;
      question.equation = "Solve: " + String(num1) + " + " + String(num2);
    } else if (questionType === 'subtraction') {
      if (num1 < num2) {
        // swap the numbers if num1 is less than num2
        var temp = num1;
        num1 = num2;
        num2 = temp;
      }
      question.answer = num1 - num2;
      question.equation = "Solve: " + String(num1) + " - " + String(num2);
    } else if (questionType === 'multiplication') {
      question.answer = num1 * num2;
      question.equation = "Solve: " + String(num1) + " × " + String(num2);
    } else if (questionType === 'division') {
      // generate a new set of numbers if the answer is not a whole number or if num1 is less than num2
      while (num1 % num2 !== 0 || num1 < num2) {
        num1 = randomNumberGenerator(sliderValue);
        num2 = randomNumberGenerator(sliderValue);
      }
      question.answer = num1 / num2;
      question.equation = "Solve: " + String(num1) + " ÷ " + String(num2);
    }
    
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
    if(Number(userInput) === answer) {
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
    if (score > highScore) {
      highScore = score;
      $('#high-score').text(highScore);
    }
  };

  // restart game when slider value changes
  var restartGame = function () {
    clearInterval(interval);
    interval = undefined;
    timeLeft = 10;
    score = 0;
    highScore = 0;
    updateScore(score);
    updateTimeLeft(0);
    renderNewQuestion();
  }
  
  // Attach click event listener to all elements with class "answer-button"
  $('.answer-button').on('click', function () {
  // Start the game
  startGame();
  // Call the checkAnswer function with the button value and the current question answer
  checkAnswer(Number($('#user-input').val()), currentQuestion.answer);
  });

  // Attach keyup event listener to the input field
  $('#user-input').on('keyup', function () {
  // Start the game
  startGame();
  // Call the checkAnswer function with the input field value and the current question answer
  checkAnswer(Number($(this).val()), currentQuestion.answer);
  });


  renderNewQuestion();

});

