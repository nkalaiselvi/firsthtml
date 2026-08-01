// ===== CONTACT FORM WITH EMAILJS =====
// Replace with your actual Public Key
emailjs.init("SLAGcefcWj2Hqba-K"); 

const form = document.getElementById('contactForm');
const statusBox = document.getElementById('formStatus');
const sendBtn = document.getElementById('sendButton');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        statusBox.textContent = '📤 Sending your message...';
        statusBox.style.color = '#ff5f26';
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';

        // Replace with your actual Service ID and Template ID
        emailjs.sendForm(
            'service_aftdt9e',    // Your Service ID
            'template_90g7vxl',   // Your Template ID (get this after saving)
            this
        )
        .then(function(response) {
            statusBox.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            statusBox.style.color = '#00c2a8';
            form.reset();
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
        })
        .catch(function(error) {
            statusBox.textContent = '❌ Failed to send. Please try again later.';
            statusBox.style.color = '#ff5f26';
            sendBtn.textContent = 'Send Message';
        });
    });
}