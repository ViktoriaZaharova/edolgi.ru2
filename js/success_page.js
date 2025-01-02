let inputEmail = document.getElementById('mail'),
    submitButton = document.querySelector('.btn-accent'),
    formEmail = document.querySelector('.form-status'),
    csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]');

submitButton.onclick = function(e) {
    e.preventDefault();
    if (inputEmail.value === '') {
        inputEmail.nextElementSibling.innerHTML = 'Введите адрес электронной почты';
    } else if (!validateEmail(inputEmail.value)) {
        inputEmail.nextElementSibling.innerHTML = 'Введите корректный адрес электронной почты';
    } else {
        inputEmail.nextElementSibling.innerHTML = '';
    }

    if (inputEmail.value !== '' && validateEmail(inputEmail.value)) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Формирование квитанции...';
        submitButton.style.background = '#9d9d9e';
        $.ajax(formEmail.action + '&email=' + inputEmail.value, {
            method: formEmail.method,
            headers : {'X-CSRFToken': csrfToken.value},
            success: () => submitButton.innerHTML = 'Квитанция отправлена',
            error: () => submitButton.innerHTML = 'Ошибка отправки'
        })
    }
}