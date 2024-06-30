// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyAaOfICmFrMjYzZ__1bxjq0NAud4WwktGY",
  authDomain: "hazm-hp.firebaseapp.com",
  projectId: "hazm-hp",
  storageBucket: "hazm-hp.appspot.com",
  messagingSenderId: "777629157845",
  appId: "1:777629157845:web:ee180062f3d10dbdb6155c",
  measurementId: "G-9RXJHFYHBR"
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);
const db = firebase.firestore();

// إضافة اقتباس جديد
function addQuote(quoteText) {
    db.collection("quotes").add({
        text: quoteText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Quote added successfully!");
        loadQuotes();
    }).catch((error) => {
        console.error("Error adding quote: ", error);
    });
}

// تحميل الاقتباسات
function loadQuotes() {
    db.collection("quotes").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        var quotesList = document.getElementById("quotesList");
        quotesList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            var quote = doc.data().text;
            var listItem = document.createElement("li");
            listItem.textContent = quote;
            quotesList.appendChild(listItem);
        });
    });
}

// إضافة مستمع للنموذج
document.getElementById("quoteForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var quoteText = document.getElementById("quoteText").value;
    addQuote(quoteText);
    document.getElementById("quoteText").value = "";
});

// تحميل الاقتباسات عند تحميل الصفحة
window.onload = function() {
    loadQuotes();
};
