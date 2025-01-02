let form = document.querySelector('.form-search-base'),
    formInputs = document.querySelectorAll('.js-input'),
    inputIP = document.querySelector('.js-input-ip'),
    inputCheckbox_main = document.querySelector('.js-input-checkbox-main'),
    submitButton = document.querySelector('.js-button'),
    csrftoken = document.querySelectorAll('[name=csrfmiddlewaretoken]'),
    ipBlock = document.querySelector('.form-group-ip'),
    emailBlock = document.querySelector('.form-group-email');

submitButton.onclick = function (event) {
    event.preventDefault();
    let IPVal = String(inputIP.value);

    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');

        } else {
            input.classList.remove('error');
        }


        if (!inputCheckbox_main.checked) {
            document.querySelector('.checkbox-main').classList.add('error');

        } else {
            document.querySelector('.checkbox-main').classList.remove('error');
        }
    });

    if(!validateIP(IPVal)) {
        console.log('ip not valid');
        inputIP.classList.add('error');
        inputIP.classList.remove('success');
        ipBlock.lastElementChild.innerHTML = 'Неверный номер ИП'

    } else {
        inputIP.classList.remove('error');
        inputIP.classList.add('success');
        ipBlock.lastElementChild.innerHTML = ''
    }

    if(!inputCheckbox_main.checked) {
        console.log('checkbox not checked');
        document.querySelector('.checkbox-main').classList.add('error');
        document.querySelector('.checkbox-main').classList.remove('success');
    } else {
        document.querySelector('.checkbox-main').classList.remove('error');
        document.querySelector('.checkbox-main').classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-bank-dolg');
    if (validateIP(IPVal) &&
        inputCheckbox_main.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/fssp/check-debts",
            headers: {'X-CSRFToken': csrftoken[1].value},
          data: {
              'csrfmiddleware': csrftoken[1].value,
              'ipNumber': validateIP(IPVal.trim())
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[1].value, 'fssp');
        }
    }

let inputEmail = document.querySelector('.js-email-input'),
    submitEmail = document.querySelector('.btn-email'),
    checkboxEmail = document.querySelector('.js-email-checkbox'),
    formEmail = document.querySelector('.form-subscribe'),
    subscribeBox = document.querySelector('.subscribe-wrapper');

submitEmail.onclick = function (event) {
    event.preventDefault();
    let email = inputEmail.value,
        checkboxmail = document.querySelector('.checkbox-email');

    if (!validateEmail(email)) {
        inputEmail.classList.add('error')
        inputEmail.classList.remove('success')
        emailBlock.lastElementChild.innerHTML = 'Неверный E-mail'
    } else {
        inputEmail.classList.remove('error')
        inputEmail.classList.add('success')
        emailBlock.lastElementChild.innerHTML = ''
    }

    if (!checkboxEmail.checked) {
        checkboxmail.classList.add('error')
        checkboxmail.classList.remove('success')
    } else {
        checkboxmail.classList.remove('error')
        checkboxmail.classList.add('success')
    }

    if (validateEmail(email) && checkboxEmail.checked) {
        $.ajax({
            type: 'POST',
            url: '/subscribe',
            headers: {'X-CSRFToken': csrftoken[0].value},
            data: {
              'csrfmiddleware': csrftoken[0].value,
              'email': email.trim(),
              'department': 'fssp',
              'ipNumber': inputIP.value.trim()
          },
            success: function () {
                formEmail.remove();
                let success = document.createElement('h3')
                success.innerHTML = 'Ваш Email был успешно добавлен в подписку!'
                subscribeBox.appendChild(success);
            },
            error: function () {
                formEmail.remove();
                let error = document.createElement('h3')
                error.innerHTML = 'Произошла ошибка!'
                subscribeBox.appendChild(error);
            }

        })
    }

}