let inputUIN = document.querySelector('.input-uin'),
    inputINN = document.querySelector('.input-inn'),
    inputCheckboxUIN = document.querySelector('.input-uin-checkbox'),
    inputCheckboxINN = document.querySelector('.input-inn-checkbox'),
    inputUINEmail = document.querySelector('.input-uin-email'),
    inputINNEmail = document.querySelector('.input-inn-email'),
    submitButtonUIN = document.querySelector('.js-uin-button'),
    submitButtonINN = document.querySelector('.js-inn-button'),
    csrftoken = document.querySelectorAll('[name=csrfmiddlewaretoken]'),
    switchTabsButton = document.querySelector('.switch-tab'),
    innBlock = document.querySelector('.form-group-inn'),
    emailBlock = document.querySelectorAll('.form-group-email'),
    uinBlock = document.querySelector('.form-group-uin');

submitButtonINN.onclick = function (event) {
    event.preventDefault();
    let INNValue = String(inputINN.value),
        INNemailValue = String(inputINNEmail.value);

    if(!validateINN(INNValue)) {
        console.log('fullname not valid');
        inputINN.classList.add('error');
        inputINN.classList.remove('success');
        innBlock.children[innBlock.children.length - 2].innerHTML = 'Неверный номер ИНН'

    } else {
        inputINN.classList.remove('error');
        inputINN.classList.add('success');
        innBlock.children[innBlock.children.length - 2].innerHTML = ''
    }

    if (INNemailValue !== '' && !validateEmail(INNemailValue)) {
        console.log('INN email not valid');
        inputINNEmail.classList.add('error');
        inputINNEmail.classList.remove('success');
        emailBlock[0].children[emailBlock[0].children.length - 2].innerHTML = 'Неверный E-mail'
    } else if (INNemailValue !== '' && validateEmail(INNemailValue)) {
        inputINNEmail.classList.remove('error');
        inputINNEmail.classList.add('success');
        emailBlock[0].children[emailBlock[0].children.length - 2].innerHTML = ''
    }

    if(!inputCheckboxINN.checked) {
        console.log('checkbox not checked');
        inputCheckboxINN.classList.add('error');
        inputCheckboxINN.classList.remove('success');
    } else {
        inputCheckboxINN.classList.remove('error');
        inputCheckboxINN.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-fns-dolg');
    if (validateINN(INNValue) &&
        (INNemailValue === '' || validateEmail(INNemailValue)) &&
        inputCheckboxINN.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/fns/check-debts",
            headers: {'X-CSRFToken': csrftoken[0].value},
          data: {
              'csrfmiddleware': csrftoken[0].value,
              'department': 'fns',
              'inn': INNValue.trim(),
              'email': INNemailValue.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[0].value, 'fns');
        }
    }


submitButtonUIN.onclick = function (event) {
    event.preventDefault();
    let UINValue = String(inputUIN.value),
        UINemailValue = String(inputUINEmail.value);

    if(!validateUIN(UINValue)) {
        console.log('fullname not valid');
        inputUIN.classList.add('error');
        inputUIN.classList.remove('success');
        uinBlock.children[uinBlock.children.length - 2].innerHTML = 'Неверный номер УИН'

    } else {
        inputUIN.classList.remove('error');
        inputUIN.classList.add('success');
        uinBlock.children[uinBlock.children.length - 2].innerHTML = ''
    }

    if (UINemailValue !== '' && !validateEmail(UINemailValue)) {
        console.log('INN email not valid');
        inputUINEmail.classList.add('error');
        inputUINEmail.classList.remove('success');
        emailBlock[1].children[emailBlock[1].children.length - 2].innerHTML = 'Неверный E-mail'
    } else if (UINemailValue !== '' && validateEmail(UINemailValue)) {
        inputUINEmail.classList.remove('error');
        inputUINEmail.classList.add('success');
        emailBlock[1].children[emailBlock[1].children.length - 2].innerHTML = ''
    }

    if(!inputCheckboxUIN.checked) {
        console.log('checkbox not checked');
        inputCheckboxUIN.classList.add('error');
        inputCheckboxUIN.classList.remove('success');
    } else {
        inputCheckboxUIN.classList.remove('error');
        inputCheckboxUIN.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-fns-dolg');
    if (validateUIN(UINValue) &&
        (UINemailValue === '' || validateEmail(UINemailValue)) &&
        inputCheckboxINN.checked) {
        resetTimer();
        $('.section-loader').fadeIn();
        $('.information-slider').slick('setPosition');
        window.scrollTo(0, 0);
        $.ajax({
          type: 'POST',
          url: "/fns/check-debts",
            headers: {'X-CSRFToken': csrftoken[1].value},
          data: {
              'csrfmiddleware': csrftoken[1].value,
              'department': 'fns',
              'uin': UINValue.trim(),
              'email': UINemailValue.trim()
          }});
        setInterval(checkDataAvailability, 10000, csrftoken[1].value, 'fns');
        }
    }

switchTabsButton.onclick = function (event){
    event.preventDefault();
    document.querySelector('#nav-tab2').click()
}