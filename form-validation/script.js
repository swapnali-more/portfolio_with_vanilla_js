const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check if email is valid
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Check email is valid
const checkEmail = (input) => {
  const emailValue = input.value.trim();
  if (emailValue === '') {
    showError(input, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    showError(input, 'Email is not valid');
  } else {
    showSuccess(input);
  }
};

// Check required field
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.name} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${input.name} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.name} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

// Check password match
const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

// Event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([usernameInput, emailInput, passwordInput, confirmPasswordInput]);
  checkLength(usernameInput, 3, 15);
  checkLength(passwordInput, 6, 25);
  checkEmail(emailInput);
  checkPasswordMatch(passwordInput, confirmPasswordInput);
});
