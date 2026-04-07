

// Function to switch between visible sections on the page
function showSection(id) {
  // Hide all sections
  document.querySelectorAll('section').forEach(sec =>
    sec.classList.remove('active')
  );
  // Show the selected section by adding the "active" class
  document.getElementById(id).classList.add('active');
}

// Run this code only after the DOM (HTML content) is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Find the checkbox element darkmode-active
  const themeToggle = document.getElementById('darkmode-active');
  // Add a check to be extra safe
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      console.log("toggle dark mode")
      document.body.classList.toggle('dark-mode');
    });
  }

  // Price calculator function (attached to the window object so it can be used from HTML)
  window.calculateTotal = function () {
    // Get pet details from form inputs
    const weight = parseInt(document.getElementById('petWeight').value);
    // const cremation = document.getElementById('cremationRe').value;
    const petType = document.getElementById('petType').value;
    const cremationRe = document.getElementById('cremationRe').value;

    

    // Check optional checkboxes (use "?.checked" in case the element doesn't exist)
    const rush = document.getElementById('rush')?.checked || false;
    const weekend = document.getElementById('weekend')?.checked || false;
    const holiday = document.getElementById('holiday')?.checked || false;
    const aggressive = document.getElementById('aggressivePet')?.checked || false;

    // Validate weight input
    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid pet weight.");
      return;
    }

    // Euthanasia base prices by pet type
    const euthanasiaPrices = {
      cat: 300,
      small: 325,
      medium: 360,
      large: 400,
      xlarge: 500,
      behavioral: 550
    };

    // Get base price for selected pet type
    let base = euthanasiaPrices[petType];

    
    const movementPrices = {
      Westchester: 50,
      Putnam: 75,
      Rockland: 105,
      Orange: 110,
      None: 0,
    };
    // Get base price for selected pet type
    let move = movementPrices[cremationRe];


    
    // Calculate extra fees based on selected options
    let extra = 0;
    if (rush) extra += 200;       // Rush appointment fee
    if (weekend) extra += 50;     // Weekend appointment fee
    if (holiday) extra += 120;    // Holiday appointment fee
    if (aggressive) extra += 100; // Aggressive pet handling fee

    // Calculate subtotal, surcharge (3% card fee), and final total
    const subtotal = base + move + extra;
    const surcharge = subtotal * 0.03; // 3% of subtotal
    const total = subtotal + surcharge;

    // Show the total to the user
    alert(`Estimated Total Cost (with 3% card fee): $${total.toFixed(2)}`);
  };

  // Euthanasia application form submission handler
  const appForm = document.getElementById("applicationForm");
  if (appForm) {
    appForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent page reload
      alert("Thank you for your application. A member of our team will review this and reach out to you within 48 hours.");
      appForm.reset(); // Clear form inputs
    });
  }
});

// Simple mobile navigation toggle (show/hide menu)
document.querySelector('.nav-toggle').onclick = function() {
  document.querySelector('.nav-links').classList.toggle('active');
};
/*
  Note: JavaScript running in the browser cannot send emails directly for security reasons.
  To send form submissions to an email address (like example@gmail.com), you need a backend service.
  You can use services like EmailJS, Formspree, or set up your own server with Node.js and Nodemailer.
  Below is an example using EmailJS (https://www.emailjs.com/):

  1. Sign up at EmailJS and create an email service/template.
  2. Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS credentials.
  3. Add the EmailJS SDK to your HTML: <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
*/

if (window.emailjs) {
  emailjs.init('YOUR_USER_ID');
  const appForm = document.getElementById("applicationForm");
  if (appForm) {
    appForm.addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', appForm)
        .then(() => {
          alert("Thank you for your application. A member of our team will review this and reach out to you within 48 hours.");
          appForm.reset();
        }, (error) => {
          alert("There was an error sending your application. Please try again later.");
        });
    });
  }
}