let inputEmail = document.querySelector('.input-email-base'),
    submitButton = document.querySelector('.btn-email'),
    data_token = document.querySelector('#data-token'),
    csrftoken = document.querySelector('#data-token'),
    subscribeForm = document.querySelector('.form-subscribe'),
    subscribeBox = document.querySelector('.notification-wrapper'),
    emailBlock = document.querySelector('.form-group-email');

submitButton.onclick = function(event) {
    event.preventDefault();

    if (!validateEmail(inputEmail.value)) {
        inputEmail.classList.add('error')
        inputEmail.classList.remove('success')
        emailBlock.lastElementChild.innerHTML = 'Неверный E-mail'
        inputEmail.value = ''
    } else {
        inputEmail.classList.remove('error')
        inputEmail.classList.add('success')
        emailBlock.lastElementChild.innerHTML = ''
    }

    if (validateEmail(inputEmail.value)) {
        $.ajax({
            type: 'POST',
            url: '/subscribe',
            headers: {'X-CSRFToken': csrftoken.value},
            data: {
              'csrfmiddleware': csrftoken.value,
              'email': inputEmail.value.trim(),
              'department': data_token.className,
          },
            success: function () {
                subscribeForm.remove();
                let success = document.createElement('h3')
                success.innerHTML = 'Ваш Email был успешно добавлен в подписку!'
                subscribeBox.appendChild(success);
            },
            error: function () {
                subscribeForm.remove();
                let error = document.createElement('h3')
                error.innerHTML = 'Произошла ошибка!'
                subscribeBox.appendChild(error);
            }

        })
    }

}