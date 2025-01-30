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
    }})