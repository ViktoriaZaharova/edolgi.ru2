let form = document.querySelector('.form-examination'),
    formInputs = document.querySelectorAll('.js-input'),
    inputFullName = document.querySelector('.js-input-fullname'),
    inputBirthday = document.querySelector('.js-input-birthday'),
    inputCheckbox_main = document.querySelector('.js-input-checkbox-main'),
    submitButton = document.querySelector('.js-button'),
    csrftoken = document.querySelectorAll('[name=csrfmiddlewaretoken]'),
    fioBlock = document.querySelector('.form-group-fio'),
    selectBlock = document.querySelector('.form-group-select'),
    dateBlock = document.querySelector('.form-group-date'),
    emailBlock = document.querySelector('.form-group-email');



submitButton.onclick = function (event) {
    event.preventDefault();
    let fullnameVal = String(inputFullName.value),
        birthdayVal = String(inputBirthday.value),
        selectedRegion = $('.js-input-region').select2('data')[0]['id'];

    if(!validateFullName(fullnameVal)) {
        console.log('fullname not valid');
        inputFullName.classList.add('error');
        inputFullName.classList.remove('success');
        fioBlock.lastElementChild.innerHTML = 'Неверное ФИО';

    } else {
        inputFullName.classList.remove('error');
        inputFullName.classList.add('success');
        fioBlock.lastElementChild.innerHTML = ''
    }

    if (!validateBirthday(birthdayVal)) {
        console.log('birthday not valid');
        inputBirthday.classList.add('error');
        inputBirthday.classList.remove('success');
        dateBlock.lastElementChild.innerHTML = 'Неверная дата'
    } else {
        inputBirthday.classList.remove('error');
        inputBirthday.classList.add('success');
        dateBlock.lastElementChild.innerHTML = ''
    }

    if (selectedRegion === "0") {
            console.log('not selected')
            document.querySelector('.select2-selection--single').classList.add('error');
            document.querySelector('.select2-container--default').classList.add('error');
            document.querySelector('.select2-selection--single').classList.remove('success');
            document.querySelector('.select2-container--default').classList.remove('success');
            selectBlock.lastElementChild.innerHTML = 'Не выбран регион';
        } else {
            document.querySelector('.select2-selection--single').classList.remove('error');
            document.querySelector('.select2-container--default').classList.remove('error');
            document.querySelector('.select2-selection--single').classList.add('success');
            document.querySelector('.select2-container--default').classList.add('success');
            selectBlock.lastElementChild.innerHTML = '';
        }

    if(!inputCheckbox_main.checked) {
        console.log('checkbox not checked');
        document.querySelector('.checkbox-main').classList.add('error');
        document.querySelector('.checkbox-main').classList.remove('success');
    } else {
        document.querySelector('.checkbox-main').classList.remove('error');
        document.querySelector('.checkbox-main').classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-fssp-dolg');
    if (validateFullName(fullnameVal) &&
        validateBirthday(birthdayVal) &&
        inputCheckbox_main.checked &&
        selectedRegion !== "0") {
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
              'department': 'fssp',
              'regionId': selectedRegion,
              'lastname': fullnameVal.split(' ')[0].trim(),
              'firstname': fullnameVal.split(' ')[1].trim(),
              'middlename': fullnameVal.split(' ')[2].trim(),
              'birthday': birthdayVal.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[1].value, 'fssp');
        }
    }


    





$(document).ready(function() {
    $('.js-input-region').select2({
        placeholder: 'Выберите регион',
        data:content.sort((a, b) => a.text.localeCompare(b.text))
    });
    $(".js-input-birthday").mask("99.99.9999");
});





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
              'email': email,
              'department': 'fssp',
              'regionId': $('.js-input-region')?.select2('data')[0]['id'].trim(),
              'lastname': inputFullName?.value.split(' ')[0].trim(),
              'firstname': inputFullName?.value.split(' ')[1].trim(),
              'middlename': inputFullName?.value.split(' ')[2].trim(),
              'birthday': inputBirthday?.value.trim()
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