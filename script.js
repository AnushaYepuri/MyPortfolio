const EMAILJS_USER_ID = "f92ahcxH1VDf-Cgwr";
const EMAILJS_SERVICE_ID = "service_3ulht6j";
const EMAILJS_TEMPLATE_ID = "template_p1mxooj";

// Initialize EmailJS
(function () {
  emailjs.init(EMAILJS_USER_ID);
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("Contact form not found (#contact-form).");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    // VALIDATION POPUP — SWEETALERT
    if (!name || !email || !message) {
      Swal.fire({
        title: "Missing Details",
        text: "Please fill all fields before submitting.",
        icon: "warning",
        confirmButtonColor: "#ffaa00",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "info",
        confirmButtonColor: "#0077b6",
      });
      return;
    }

    // DEBUG: FormData log
    const fd = new FormData(form);
    console.log("FormData about to send:");
    for (const pair of fd.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    const submitBtn = form.querySelector(".btn-submit");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";
    if (submitBtn) submitBtn.textContent = "Sending...";

    // EmailJS SEND
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, "#contact-form")
      .then(() => {
        Swal.fire({
          title: "Message Sent!",
          text: `Thank you ${name}, I will get back to you soon.`,
          icon: "success",
          confirmButtonColor: "#0077b6",
        });
        form.reset();
        if (submitBtn) submitBtn.textContent = originalBtnText;
      })
      .catch((err) => {
        console.error("EmailJS error:", err);

        Swal.fire({
          title: "Failed to Send",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });

        if (submitBtn) submitBtn.textContent = originalBtnText;
      });
  });
});
