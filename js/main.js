document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');

    // Log Prolific ID when the user joins (using GET request)
    if (prolificID) {
        fetch(`https://script.google.com/macros/s/AKfycbw_pwNQcc6Zq7qWW2Go4HX9EEUAqQXLjEj6fQ-0amZWG6bb_XlJ5ioqb-bb3y6jpm_UDw/exec?prolificID=${prolificID}&event=joined`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => console.log('Prolific ID logged for join:', data))
            .catch(error => console.error('Error logging join event:', error));
    }

    // Function to handle CAPTCHA completion
    function onCaptchaCompleted(token) {
        fetch(`https://script.google.com/macros/s/AKfycbw_pwNQcc6Zq7qWW2Go4HX9EEUAqQXLjEj6fQ-0amZWG6bb_XlJ5ioqb-bb3y6jpm_UDw/exec?prolificID=${prolificID}&event=captcha_completed&token=${token}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log('CAPTCHA completed and logged:', data);
                document.getElementById('placeholderImage').style.display = 'block';
            })
            .catch(error => console.error('Error logging CAPTCHA completion:', error));
    }

    // Ensure CAPTCHA is reset and rendered on every page load
    window.onloadCallback = function() {
        // Render CAPTCHA and ensure it runs every time
        const captchaWidgetId = grecaptcha.render('g-recaptcha', {
            'sitekey': '6LfJzF4qAAAAALXCzt0YbG4tZirZYeOewOlFj9ov',
            'callback': onCaptchaCompleted
        });

        // Force reCAPTCHA reset to ensure the user solves it every time
        grecaptcha.reset(captchaWidgetId);
    };
});

// Get elements
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');

// Show the popup when the page loads
window.onload = function() {
    popup.style.display = 'flex'; // Show the popup
};

// Close the popup when the close button is clicked
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none'; // Hide the popup
});

// Close the popup when the user clicks outside the popup content
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none'; // Hide the popup
    }
});