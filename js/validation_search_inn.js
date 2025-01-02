let form = document.querySelector('.form-search-inn'),
    formInputs = document.querySelectorAll('.js-input'),
    inputFullName = document.querySelector('.js-input-fullname'),
    inputBirthday = document.querySelector('.js-input-birthday'),
    inputPassport = document.querySelector('.js-input-passport'),
    inputCheckbox_main = document.querySelector('.js-input-checkbox-main'),
    inputEmail = document.querySelector('.js-input-email'),
    submitButton = document.querySelector('.js-button'),
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value,
    fioBlock = document.querySelector('.form-group-fio'),
    dateBlock = document.querySelector('.form-group-date'),
    passportBlock = document.querySelector('.form-group-passport');


submitButton.onclick = function (event) {
    event.preventDefault();
    let fullnameVal = String(inputFullName.value),
        birthdayVal = String(inputBirthday.value),
        passportVal = String(inputPassport.value),
        checkboxmain = document.querySelector('.checkbox-main');

    if(!validateFullName(fullnameVal)) {
        console.log('fullname not valid');
        inputFullName.classList.add('error');
        inputFullName.classList.remove('success');
        fioBlock.lastElementChild.innerHTML = 'Неверное ФИО'

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

    if (!validatePassport(passportVal)) {
        console.log('birthday not valid');
        inputPassport.classList.add('error');
        inputPassport.classList.remove('success');
        passportBlock.lastElementChild.innerHTML = 'Неверный номер паспорта'
    } else {
        inputPassport.classList.remove('error');
        inputPassport.classList.add('success');
        passportBlock.lastElementChild.innerHTML = ''
    }


    if(!inputCheckbox_main.checked) {
        console.log('checkbox not checked');
        checkboxmain.classList.add('error');
        checkboxmain.classList.remove('success');
    } else {
        checkboxmain.classList.remove('error');
        checkboxmain.classList.add('success');
    }
    ym(91758869,'reachGoal','button-poisk-inn');
    if (validateFullName(fullnameVal) &&
        validateBirthday(birthdayVal) &&
        validatePassport(passportVal) &&
        inputCheckbox_main.checked) {
        $('.form-search-inn').submit();
        }
    }


$(document).ready(function() {
    $(".js-input-birthday").mask("99.99.9999");
    $(".js-input-passport").mask("99 99 999999");
});

// submitButton2.onclick = function () {
//     let inputCheckbox2 = document.querySelector('.js-input2-checkbox'),
//         emailVal = String(inputEmail.value),
//         fullnameVal = String(inputFullName.value),
//         birthdayVal = String(inputBirthday.value),
//         regionIdVal = String(regionSelector.title);
//
//
//     form2Inputs.forEach(function (input) {
//         if (input.value === '') {
//             input.classList.add('error');
//
//         } else {
//             input.classList.remove('error');
//         }
//
//         if (!inputCheckbox2.checked) {
//             document.querySelector('.checkbox2').classList.add('error');
//
//         } else {
//             document.querySelector('.checkbox2').classList.remove('error');
//         }
//     });
//
//     if (!validateEmail(emailVal)) {
//         console.log('email not valid');
//         inputEmail.classList.add('error');
//     } else {
//         inputEmail.classList.remove('error');
//     }
//
//     if (!inputCheckbox2.checked) {
//         console.log('checkbox not checked');
//         document.querySelector('.checkbox-custom').classList.add('error');
//     } else {
//         document.querySelector('.checkbox-custom').classList.remove('error');
//     }
//
//     if (validateEmail(emailVal) &&
//         inputCheckbox2.checked) {
//         $.ajax({
//           type: 'POST',
//           url: "/process-data",
//             headers: {'X-CSRFToken': csrftoken},
//           data: {'csrfmiddleware': csrftoken,
//                 'region': regionIdVal,
//                 'fullname': fullnameVal,
//                 'birthday': birthdayVal,
//                 'email': emailVal},
//           success: function (response) {
//               window.location.href = response
//           }
//         });
//     }
// };

