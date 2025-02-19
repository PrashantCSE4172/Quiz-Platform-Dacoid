Interactive Quiz Platform

This interactive quiz platform allows users to take a general knowledge quiz, answer multiple-choice questions, and view their score at the end. It features a timer for each question, displays feedback, and saves quiz attempts in the browser using IndexedDB. Users can also view their previous quiz history.

Features:
Multiple Choice Questions: Answer a series of general knowledge questions.
Timer: Each question is timed, with a 30-second countdown.
Scoreboard: Displays the user's score after completing the quiz.
Quiz History: Saves quiz attempts locally in IndexedDB and allows the user to view their quiz history.
Retry Option: Users can retry the quiz after completing it.
Instructions to Run Locally
Clone the Repository:

Open your terminal and clone the repository using the following command:

bash
Copy
git clone https://github.com/your-username/interactive-quiz-platform.git
cd interactive-quiz-platform

Open the App in Your Browser:

Navigate to the project folder and open index.html in your preferred browser:

bash
Copy
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
This will open the quiz platform in your browser.

Play the Quiz:

Answer the quiz questions by clicking the options.
The timer will start as soon as you see a question.
Once you finish all the questions, your score will be shown.
You can view your quiz history and retry the quiz.
Deployed App
The deployed version of the app is available here:

Deployed Interactive Quiz Platform
https://quiz-platform-dacoid.netlify.app/

Technologies Used
HTML: Markup for the quiz structure.
CSS: Styling for the app layout and appearance.
JavaScript: Logic for handling the quiz functionality, timer, answers, and saving quiz history to IndexedDB.
IndexedDB: For storing the user's quiz attempt history locally in the browser.
File Structure
bash
Copy
/interactive-quiz-platform
│
├── index.html          # Main HTML file with quiz structure
├── quiz.js             # JavaScript file handling quiz functionality
├── indexedDB.js        # JavaScript file for IndexedDB handling
└── styles.css          # CSS file for styling the quiz interface
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
This quiz uses general knowledge questions for demonstration purposes. You can easily expand it by adding more questions or changing the categories.
