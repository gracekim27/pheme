document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const submitButton = form.querySelector('button');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Extract form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const keyword = document.getElementById('keyword').value.trim();
        const time = document.getElementById('time').value.trim();

        if (!name || !email || !time) {
            alert('Please fill in all mandatory fields!');
            return;
        }

        // Disable button & show "Processing..."
        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        try {
            const response = await fetch(`https://script.google.com/macros/s/AKfycbw_pwNQcc6Zq7qWW2Go4HX9EEUAqQXLjEj6fQ-0amZWG6bb_XlJ5ioqb-bb3y6jpm_UDw/exec?` +
                new URLSearchParams({
                    name: name,
                    email: email,
                    keyword: keyword,
                    period: time,
                    submit: "true"
                }), {
                method: 'GET'
            });

            const data = await response.json();

            alert(data.message); // Show success message
            form.reset(); // Reset the form

        } catch (error) {
            console.error('Error logging subscription:', error);
            alert('An error occurred while submitting your data.');
        }

        // Restore button after request completes
        submitButton.disabled = false;
        submitButton.textContent = "Subscribe";
    });
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
    console.log("toggleMenu pressed");
}
