// Sample Quiz Data
const quizData = [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Saturn"],
      correctAnswer: "Jupiter"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "Thailand", "India"],
      correctAnswer: "Japan"
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["3,000 km/s", "300,000 km/s", "30,000 km/s", "300 km/s"],
      correctAnswer: "300,000 km/s"
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
      correctAnswer: "George Washington"
    },
    {
      question: "What is the value of Pi (π) to two decimal places?",
      options: ["3.14", "3.15", "3.16", "3.13"],
      correctAnswer: "3.14"
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "Who is considered the father of the World Wide Web?",
      options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
      correctAnswer: "Tim Berners-Lee"
    },
    {
      question: "Which famous artist is known for painting the Mona Lisa?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "Who is the 'King of Pop'?",
      options: ["Michael Jackson", "Elvis Presley", "Prince", "Justin Timberlake"],
      correctAnswer: "Michael Jackson"
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      options: ["China", "Brazil", "United States", "Russia"],
      correctAnswer: "Brazil"
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
      correctAnswer: "Neil Armstrong"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correctAnswer: "Mitochondria"
    }
  ];
  
  let currentQuestionIndex = 0;
  let timeLeft = 30;
  let score = 0;
  let userAnswers = [];
  let db;
  
  // Open IndexedDB Database
  let request = indexedDB.open("quizHistoryDB", 1);
  
  // Create Object Store (if not already created)
  request.onupgradeneeded = function(event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("score", "score", { unique: false });
  };
  
  // Store quiz attempt data
  function saveAttempt(score) {
    let transaction = db.transaction(["attempts"], "readwrite");
    let objectStore = transaction.objectStore("attempts");
  
    let attempt = {
      score: score,
      date: new Date()
    };
  
    objectStore.add(attempt);
  }
  
  // Retrieve quiz attempt history and display it
  function getAttemptHistory() {
    let transaction = db.transaction(["attempts"], "readonly");
    let objectStore = transaction.objectStore("attempts");
    let request = objectStore.getAll();
  
    request.onsuccess = function(event) {
      const historyList = document.getElementById("history-list");
      const attempts = event.target.result;
      historyList.innerHTML = ""; // Clear any previous history
  
      if (attempts.length === 0) {
        historyList.innerHTML = "<p>No quiz history available.</p>";
      } else {
        attempts.forEach(attempt => {
          const historyItem = document.createElement("div");
          historyItem.classList.add("history-item");
          historyItem.innerHTML = `
            <p><strong>Score:</strong> ${attempt.score} / ${quizData.length}</p>
            <p><strong>Date:</strong> ${new Date(attempt.date).toLocaleString()}</p>
          `;
          historyList.appendChild(historyItem);
        });
      }
    };
  
    request.onerror = function(event) {
      console.error("Error retrieving quiz history from IndexedDB:", event.target.error);
    };
  }
  
  // Display Question and Options
  function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    const options = document.querySelectorAll(".option");
  
    // Reset button states (enable and remove any colors)
    options.forEach(option => {
      option.disabled = false;
      option.style.backgroundColor = "";  // Reset the background color
    });
  
    options.forEach((option, index) => {
      option.textContent = question.options[index];
      option.onclick = () => {
        userAnswers[currentQuestionIndex] = option.textContent;
        giveFeedback(option.textContent === question.correctAnswer);
      };
    });
  
    // Reset Timer
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    startTimer();
  }
  
  // Provide feedback when the answer is selected
  function giveFeedback(isCorrect) {
    const options = document.querySelectorAll(".option");
  
    options.forEach(option => {
      option.disabled = true; // Disable the options after an answer is chosen
      if (option.textContent === quizData[currentQuestionIndex].correctAnswer) {
        option.style.backgroundColor = "green"; // Correct answer color
      } else if (option.textContent === userAnswers[currentQuestionIndex] && !isCorrect) {
        option.style.backgroundColor = "red"; // Incorrect answer color
      }
    });
  }
  
  // Start Timer for each question
  function startTimer() {
    clearInterval(timer);  // Clear previous interval to avoid overlapping timers
  
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer when it hits 0
        nextQuestion(); // Move to the next question when timer ends
      } else {
        document.getElementById("timer").textContent = timeLeft;
        timeLeft--;
      }
    }, 1000);
  }
  
  // Move to the next question or show the scoreboard if finished
  function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      displayQuestion(); // Display next question
    } else {
      showScoreboard(); // Show scoreboard after last question
    }
  }
  
  // Show scoreboard and save attempt
  function showScoreboard() {
    const scoreboard = document.getElementById("scoreboard");
    let correctAnswers = 0;
  
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
  
    scoreboard.innerHTML = `
      <h3>Your Score: ${correctAnswers} / ${quizData.length}</h3>
      <button onclick="retryQuiz()">Retry Quiz</button>
    `;
    saveAttempt(correctAnswers); // Save the score to IndexedDB (if needed)
  }
  
  // Retry Quiz by resetting everything
  function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("scoreboard").innerHTML = ""; // Clear scoreboard
    displayQuestion(); // Display the first question again
    startTimer(); // Restart the timer
  }
  
  // Call this function to fetch and display the quiz history
  function showQuizHistory() {
    getAttemptHistory();
    document.getElementById("history-container").style.display = 'block'; // Show the history section
  }
  
  // Initialize the quiz
  window.onload = function() {
    displayQuestion();
  };
  