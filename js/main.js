const form = document.getElementById('subscriptionForm'); // Ensure your form has this ID

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const keyword = document.getElementById('keyword').value;
    const time = document.getElementById('time').value;

    // Validate inputs
    if (!name || !email || !keyword || !time) {
        alert('Please fill in all fields!');
        return;
    }

    // Send data to Google Apps Script Web App
    fetch(`https://script.google.com/macros/s/AKfycbw_pwNQcc6Zq7qWW2Go4HX9EEUAqQXLjEj6fQ-0amZWG6bb_XlJ5ioqb-bb3y6jpm_UDw/exec?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&keyword=${encodeURIComponent(keyword)}&time=${encodeURIComponent(time)}&event=subscribed`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Subscription logged:', data);
            alert('Thank you for subscribing! Your data has been logged.');
            form.reset(); // Reset the form after submission
        })
        .catch(error => {
            console.error('Error logging subscription:', error);
            alert('An error occurred while submitting your data. Please try again.');
        });
});