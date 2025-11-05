const regForm = document.getElementById('regForm');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('regpassword');
const authregContent = document.querySelector('.authregcontent');

const welcomeBlock = document.createElement('div');
welcomeBlock.id = 'welcomeBlock';
welcomeBlock.style.display = 'none';
document.body.appendChild(welcomeBlock);

document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('userData'));
    if (savedUser) {
        showWelcome(savedUser);
        authregContent.style.display = 'none';
    }
});

regForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        saveFormData();
        const userData = JSON.parse(localStorage.getItem('userData'));
        showWelcome(userData);
        authregContent.style.display = 'none';
    }
}

function validateForm() {
    let isValid = true;

    if (!fullnameInput.value.trim()) {
        fullnameInput.classList.add('invalid');
        fullnameInput.classList.remove('valid');
        fullnameInput.setCustomValidity("Поле ПІБ не може бути порожнім");
        isValid = false;
    } else {
        fullnameInput.classList.remove('invalid');
        fullnameInput.classList.add('valid');
        fullnameInput.setCustomValidity("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        emailInput.setCustomValidity("Введіть коректний Email");
        isValid = false;
    } else {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        emailInput.setCustomValidity("");
    }

    if (passwordInput.value.length < 5) {
        passwordInput.classList.add('invalid');
        passwordInput.classList.remove('valid');
        passwordInput.setCustomValidity("Пароль має містити щонайменше 5 символів");
        isValid = false;
    } else {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        passwordInput.setCustomValidity("");
    }

    return isValid;
}

[fullnameInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', validateForm);
});

function saveFormData() {
    const userData = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

function showWelcome(user) {
    welcomeBlock.innerHTML = `
        <main class="authregcontent">
          <div class="welcomediv">
              <div><h2>Вітаємо, ${user.fullname}!</h2></div>
              <div>
                <a href="index.html"><button class="greenbutton">Головна</button></a>
                <button id="logoutBtn" class="redbutton">Вийти</button>
              </div>
          </div>
        </main>
    `;
    welcomeBlock.style.display = 'block';

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userData');
        welcomeBlock.style.display = 'none';
        authregContent.style.display = 'block';
        regForm.reset();
        [fullnameInput, emailInput, passwordInput].forEach(i => i.classList.remove('valid', 'invalid'));
    });
}
