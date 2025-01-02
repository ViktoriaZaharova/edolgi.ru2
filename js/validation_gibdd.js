let inputCarNumber = document.querySelector('.input-car-number'),
    inputRegionNumber = document.querySelector('.input-region-number'),
    inputSTS = document.querySelector('.input-sts-number'),
    inputVU = document.querySelector('.input-vu'),
    inputUIN = document.querySelector('.input-uin'),
    inputCheckboxCar = document.querySelector('.input-car-checkbox'),
    inputCheckboxDriver = document.querySelector('.input-driver-checkbox'),
    inputCheckboxUIN = document.querySelector('.input-uin-checkbox'),
    inputCarEmail = document.querySelector('.input-car-check-email'),
    inputDriverEmail = document.querySelector('.input-driver-check-email'),
    submitButtonCar = document.querySelector('.btn-check-car'),
    submitButtonDriver = document.querySelector('.btn-check-driver'),
    submitButtonUIN = document.querySelector('.btn-check-uin'),
    csrftoken = document.querySelectorAll('[name=csrfmiddlewaretoken]'),
    carNumberRegionBlock = document.querySelector('.form-group-number-car'),
    stsBlock = document.querySelector('.form-group-sts'),
    emailBlock = document.querySelectorAll('.form-group-email'),
    vuBlock = document.querySelector('.form-group-vu'),
    uinBlock = document.querySelector('.form-group-uin'),
    stsEmailBlock = document.querySelector('.form-group-sts-email');


submitButtonCar.onclick = function (event) {
    event.preventDefault();
    let CarNumber = String(inputCarNumber.value),
        RegionNumber = String(inputRegionNumber.value),
        STS = String(inputSTS.value),
        Email = String(inputCarEmail.value);

    if(!validateCarNumber(CarNumber)) {
        console.log('Carnumber not valid');
        inputCarNumber.classList.add('error');
        inputCarNumber.classList.remove('success');
        carNumberRegionBlock.children[carNumberRegionBlock.children.length - 2].innerHTML = 'Неверный номер или регион'

    } else {
        inputCarNumber.classList.remove('error');
        inputCarNumber.classList.add('success');
        carNumberRegionBlock.children[carNumberRegionBlock.children.length - 2].innerHTML = ''
    }

    if(!validateRegionNumber(RegionNumber)) {
        console.log('region not valid');
        inputRegionNumber.classList.add('error');
        inputRegionNumber.classList.remove('success');
        carNumberRegionBlock.children[carNumberRegionBlock.children.length - 2].innerHTML = 'Неверный номер или регион'
    } else {
        inputRegionNumber.classList.remove('error');
        inputRegionNumber.classList.add('success');
        carNumberRegionBlock.children[carNumberRegionBlock.children.length - 2].innerHTML = ''
    }

    if(!validateSTS(STS)) {
        console.log('sts not valid');
        inputSTS.classList.add('error');
        inputSTS.classList.remove('success');
        stsBlock.children[stsBlock.children.length - 2].innerHTML = 'Неверный номер СТС'
    } else {
        inputSTS.classList.remove('error');
        inputSTS.classList.add('success');
        stsBlock.children[stsBlock.children.length - 2].innerHTML = ''
    }

    if (Email !== '' && !validateEmail(Email)) {
        console.log('email not valid');
        inputCarEmail.classList.add('error');
        inputCarEmail.classList.remove('success');
        emailBlock[0].children[emailBlock[0].children.length - 2].innerHTML = 'Неверный E-mail'
    } else if (Email !== '' && validateEmail(Email)) {
        inputCarEmail.classList.remove('error');
        inputCarEmail.classList.add('success');
        emailBlock[0].children[emailBlock[0].children.length - 2].innerHTML = ''
    }

    if(!inputCheckboxCar.checked) {
        console.log('checkbox not checked');
        inputCheckboxCar.classList.add('error');
        inputCheckboxCar.classList.remove('success');
    } else {
        inputCheckboxCar.classList.remove('error');
        inputCheckboxCar.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-gibdd-dolg');
    if (validateCarNumber(CarNumber) &&
        (Email === '' || validateEmail(Email)) &&
        validateRegionNumber(RegionNumber) &&
        validateSTS(STS) &&
        inputCheckboxCar.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/gibdd/check-debts",
            headers: {'X-CSRFToken': csrftoken[0].value},
          data: {
              'csrfmiddleware': csrftoken[0].value,
              'department': 'gibdd',
              'carNumber': CarNumber.trim(),
              'regionNumber': RegionNumber.trim(),
              'sts': STS.trim(),
              'email': Email.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[0].value, 'gibdd');
        }
    }


submitButtonDriver.onclick = function (event) {
    event.preventDefault();
    let VU = String(inputVU.value),
        Email = String(inputDriverEmail.value);

    if(!validateVUNumber(VU)) {
        console.log('VU not valid');
        inputVU.classList.add('error');
        inputVU.classList.remove('success');
        vuBlock.children[vuBlock.children.length - 2].innerHTML = 'Неверный номер ВУ'

    } else {
        inputVU.classList.remove('error');
        inputVU.classList.add('success');
        vuBlock.children[vuBlock.children.length - 2].innerHTML = ''
    }

    if (Email !== '' && !validateEmail(Email)) {
        console.log('INN email not valid');
        inputDriverEmail.classList.add('error');
        inputDriverEmail.classList.remove('success');
        emailBlock[1].children[emailBlock[1].children.length - 2].innerHTML = 'Неверный E-mail'
    } else if (Email !== '' && validateEmail(Email)) {
        inputDriverEmail.classList.remove('error');
        inputDriverEmail.classList.add('success');
        emailBlock[1].children[emailBlock[1].children.length - 2].innerHTML = ''

    }

    if(!inputCheckboxDriver.checked) {
        console.log('checkbox not checked');
        inputCheckboxDriver.classList.add('error');
        inputCheckboxDriver.classList.remove('success');
    } else {
        inputCheckboxDriver.classList.remove('error');
        inputCheckboxDriver.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-gibdd-dolg');
    if (validateVUNumber(VU) &&
        (Email === '' || validateEmail(Email)) &&
        inputCheckboxDriver.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/gibdd/check-debts",
            headers: {'X-CSRFToken': csrftoken[1].value},
          data: {
              'csrfmiddleware': csrftoken[1].value,
              'department': 'gibdd',
              'vu': VU.trim(),
              'email': Email.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[1].value, 'gibdd');
        }
    }


submitButtonUIN.onclick = function (event) {
    event.preventDefault();
    let UIN = String(inputUIN.value);

    if(!validateUIN(UIN)) {
        console.log('UIN not valid');
        inputUIN.classList.add('error');
        inputUIN.classList.remove('success');
        uinBlock.children[uinBlock.children.length - 2].innerHTML = 'Неверный номер УИН'

    } else {
        inputUIN.classList.remove('error');
        inputUIN.classList.add('success');
        uinBlock.children[uinBlock.children.length - 2].innerHTML = ''
    }

    if(!inputCheckboxUIN.checked) {
        console.log('checkbox not checked');
        inputCheckboxUIN.classList.add('error');
        inputCheckboxUIN.classList.remove('success');
    } else {
        inputCheckboxUIN.classList.remove('error');
        inputCheckboxUIN.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-gibdd-dolg');
    if (validateUIN(UIN) &&
        inputCheckboxUIN.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/gibdd/check-debts",
            headers: {'X-CSRFToken': csrftoken[2].value},
          data: {
              'csrfmiddleware': csrftoken[2].value,
              'department': 'gibdd',
              'uin': UIN.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[2].value, 'gibdd');
        }
    }

let inputEmailUIN = document.querySelector('.input-subscribe-email'),
    inputEmailSTS = document.querySelector('.input-subscribe-sts'),
    submitEmail = document.querySelector('.btn-email'),
    subscribeForm = document.querySelector('.form-subscribe-uin'),
    subscribeBox = document.querySelector('.subscribe-fines__text');

submitEmail.onclick = function (event) {
    event.preventDefault();

    let email = inputEmailUIN.value,
        sts = inputEmailSTS.value;

    if (!validateEmail(email)) {
        inputEmailUIN.classList.add('error')
        inputEmailUIN.classList.remove('success')
        emailBlock[2].lastElementChild.innerHTML = 'Неверный E-mail'

    } else {
        inputEmailUIN.classList.remove('error')
        inputEmailUIN.classList.add('success')
        emailBlock[2].lastElementChild.innerHTML = ''

    }

    if (!validateSTS(sts)) {
        inputEmailSTS.classList.add('error')
        inputEmailSTS.classList.remove('success')
        stsEmailBlock.children[stsEmailBlock.children.length - 2].innerHTML = 'Неверный номер СТС'
    } else {
        inputEmailSTS.classList.remove('error')
        inputEmailSTS.classList.add('success')
        stsEmailBlock.children[stsEmailBlock.children.length - 2].innerHTML = ''
    }

    if (validateEmail(email) && validateSTS(sts)) {
        $.ajax({
            type: 'POST',
            url: '/subscribe',
            headers: {'X-CSRFToken': csrftoken[3].value},
            data: {
              'csrfmiddleware': csrftoken[3].value,
              'email': email.trim(),
              'department': 'gibdd',
              'sts': sts.trim()
          },
            success: function () {
                subscribeBox.remove();
                while (subscribeForm.firstChild) {
                    subscribeForm.removeChild(subscribeForm.firstChild);
                }
                let success = document.createElement('h3')
                success.innerHTML = 'Ваш Email был успешно добавлен в подписку!'
                subscribeForm.appendChild(success);
            },
            error: function () {
                subscribeBox.remove();
                while (subscribeForm.firstChild) {
                    subscribeForm.removeChild(subscribeForm.firstChild);
                }
                let error = document.createElement('h3')
                error.innerHTML = 'Произошла ошибка!'
                subscribeForm.appendChild(error);
            }

        })
    }

}