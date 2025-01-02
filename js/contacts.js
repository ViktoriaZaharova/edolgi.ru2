let fioBlock = document.querySelector('.form-group-fio'),
    mailBlock = document.querySelector('.form-group-mail'),
    textBlock = document.querySelector('.form-group-message'),
    submitButton = document.querySelector('.btn'),
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]');



submitButton.onclick = function (e) {
    e.preventDefault();
    let inputFio = fioBlock.querySelector('.input-fio'),
        inputText = textBlock.querySelector('.input-text'),
        inputMail = mailBlock.querySelector('.input-mail'),
        inputCheckbox = document.querySelector('.input-checkbox');


    if (validateFullName(inputFio.value)) {
        fioBlock.lastElementChild.innerHTML = ''
    } else {
        fioBlock.lastElementChild.innerHTML = 'Неверное ФИО'
    }

    if (validateEmail(inputMail.value)) {
        mailBlock.lastElementChild.innerHTML = ''
    } else {
        mailBlock.lastElementChild.innerHTML = 'Неверный E-mail'
    }


    if (inputText.value === '') {
        textBlock.lastElementChild.innerHTML = 'Введите текст'
    } else {
        textBlock.lastElementChild.innerHTML = ''
    }

    if (validateFullName(inputFio.value) && validateEmail(inputMail.value)
        && inputText.value && inputCheckbox.checked) {
        submitButton.disabled = true
        $.ajax({
            type: 'POST',
            url: '/feedback',
            headers: {'X-CSRFToken': csrftoken.value},
            data: {
                'csrfmiddleware': csrftoken.value,
                'fio': inputFio.value.trim(),
                'email': inputMail.value.trim(),
                'message': inputText.value
            },
            success: function () {
                submitButton.innerHTML = 'Запрос отправлен'
            },
            error: function () {
                submitButton.innerHTML = 'Произошла ошибка'
            }
        })
    }
}