const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const validateInput = ({target}) => {
 if (target.value.length > 1){
    button.removeAttribute('disabled');
 } else {
    button.setAttribute('disabled', '');
 }
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', input.value);
    window.location = 'pages/memories.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);