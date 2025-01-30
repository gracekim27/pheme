document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm'); // Ensure your form has this ID

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const keyword = document.getElementById('keyword').value.trim();
        const time = document.getElementById('time').value.trim();

        // Validate inputs
        if (!name || !email || !keyword || !time) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            // Send data to Google Apps Script Web App
            const response = await fetch(`https://script.google.com/macros/s/AKfycbw_pwNQcc6Zq7qWW2Go4HX9EEUAqQXLjEj6fQ-0amZWG6bb_XlJ5ioqb-bb3y6jpm_UDw/exec?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&keyword=${encodeURIComponent(keyword)}&time=${encodeURIComponent(time)}`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Thank you for subscribing! Your data has been logged.');
                form.reset(); // Reset the form after submission
            } else {
                alert(`An error occurred: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging subscription:', error);
            alert('An error occurred while submitting your data. Please try again.');
        }
    });
});
