const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const message = document.querySelector('textarea[name="message"]').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  // Optional: email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // ✅ Success
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  alert(`Thanks for reaching out, ${name}! Your message has been submitted.`);

  // Clear form after submit
  form.reset();

  // 🔧 If connecting to backend later:
  /*
  fetch('http://localhost:8080/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
  */
});

// ✅ Initialize EmailJS
(function() {
  emailjs.init("f92ahcxH1VDf-Cgwr"); // Your actual public key
})();

// ✅ Handle form submission
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Change button text while sending
    const submitButton = form.querySelector(".btn-submit");
    submitButton.textContent = "Sending...";

    // ✅ Send email using EmailJS
    emailjs.sendForm("service_3ulht6j", "template_p1mxooj", form)
      .then(function() {
        alert(`✅ Thanks for reaching out, ${name}! Your message has been sent successfully.`);
        form.reset();
        submitButton.textContent = "Send Message";
      }, function(error) {
        alert("❌ Failed to send message. Please try again later.");
        console.error("Error:", error);
        submitButton.textContent = "Send Message";
      });
  });
});
