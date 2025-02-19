// Open IndexedDB Database
let db;
let request = indexedDB.open("quizHistoryDB", 1);

// Create Object Store
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

// Retrieve quiz attempt history
function getAttemptHistory() {
  let transaction = db.transaction(["attempts"], "readonly");
  let objectStore = transaction.objectStore("attempts");
  let request = objectStore.getAll();

  request.onsuccess = function(event) {
    console.log("Quiz History:", event.target.result);
  };
}
