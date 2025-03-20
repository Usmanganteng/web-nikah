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
  const form = document.getElementById("message-form");
  const messagesContainer = document.getElementById("messages-container");

  // Load messages from localStorage
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messagesContainer.innerHTML = messages
      .map(
        (msg) => `
        <div class="message">
          <strong>Nama:</strong> ${msg.name}<br>
          <strong>Pesan:</strong> ${msg.message}<br>
          <strong>Tanggal:</strong> ${msg.date}
        </div>
      `
      )
      .join("");
  }

  // Save message to localStorage
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const date = new Date().toLocaleString();

    const newMessage = { name, message, date };
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    form.reset();
    loadMessages();
  });

  // Initial load
  loadMessages();
});
