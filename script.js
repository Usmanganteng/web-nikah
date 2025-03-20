document.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  function adjustTimelineImage() {
    const secondTimelineItem = document.querySelector(".timeline li:nth-child(2)");
    if (window.innerWidth <= 576) {
      secondTimelineItem.classList.add("centered");
    } else {
      secondTimelineItem.classList.remove("centered");
    }
  }

  // Adjust on page load
  adjustTimelineImage();

  // Adjust on window resize
  window.addEventListener("resize", adjustTimelineImage);
});

document.addEventListener("DOMContentLoaded", function () {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDFBigoWysynrkva5lvD8Ghgb3NPvf79Ow",
    authDomain: "aldizar.firebaseapp.com",
    databaseURL: "https://aldizar-default-rtdb.firebaseio.com",
    projectId: "aldizar",
    storageBucket: "aldizar.appspot.com",
    messagingSenderId: "423538284515",
    appId: "1:423538284515:web:406f3a04e6821343f8b2d6",
    measurementId: "G-J6R7SBS4Y0"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const form = document.getElementById("message-form");
  const messagesContainer = document.getElementById("messages-container");

  // Load messages from Firebase
  function loadMessages() {
    database.ref('messages').on('value', (snapshot) => {
      const messages = snapshot.val();
      messagesContainer.innerHTML = '';
      for (let id in messages) {
        const msg = messages[id];
        messagesContainer.innerHTML += `
          <div class="message">
            <strong>Nama:</strong> ${msg.name}<br>
            <strong>Pesan:</strong> ${msg.message}<br>
            <strong>Tanggal:</strong> ${msg.date}
          </div>
        `;
      }
    });
  }

  // Save message to Firebase
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const date = new Date().toLocaleString();

    const newMessage = { name, message, date };
    database.ref('messages').push(newMessage);

    form.reset();
  });

  // Initial load
  loadMessages();
});
