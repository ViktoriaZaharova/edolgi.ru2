let showFormButton = document.querySelectorAll(".d-sm-block"),
    paymentForm = document.querySelector("#modal2"),
	FioBlock = paymentForm.querySelector('.form-group-fio'),
	SumBlock = paymentForm.querySelector('.form-group-sum'),
    emailOrPhoneBlock = paymentForm.querySelector('.form-group-email-or-phone'),
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]');

import Currency from 'https://unpkg.com/@tadashi/currency@3.2.0/src/currency.js';

function normalSum(string) {
    if (!string.includes(',') && !string.includes('.')) {
        return String(Number(string).toFixed(2)).replace('.', '')
    }

    if (/^\d+(.|,)\d$/.test(string)) {
        string = string + '0'
    }

    return string.replace(',', '').replace(' ₽', '').replace('.', '')
}

function countPayClick() {
    const path = window.location.pathname
    const re_bank = /^\/bank-dannykh-ispolnitelnykh-proizvodstv\/\d+-\d+-\d+-ip\d+$/
    const re_fio = /^\/[a-z]+-[a-z]+[0-9]+$/
    const re_fns = /^\/proverit-nalogi-po-inn\/(\d{12}|\d{20}|\d{25})-\d+$/
    const re_gibdd = /^\/shtrafy-gibdd\/(\d{10}|\d{20}|\d{25})-\d+$/

    if (re_bank.test(path)) ym(91758869,'reachGoal','button-pay-bank-dolg');
    else if (re_fio.test(path)) ym(91758869,'reachGoal','button-pay-fssp-dolg');
    else if (re_fns.test(path)) ym(91758869,'reachGoal','button-pay-fns-dolg');
    else if (re_gibdd.test(path)) ym(91758869,'reachGoal','button-pay-gibdd-dolg');
}

showFormButton.forEach(function (element){
	element.onclick = function (){
        if (element.getAttribute('fio').match(/[А-Яа-я\s]+/g)) {
            FioBlock.querySelector('.input-fio').value = element.getAttribute('fio')?.match(/[А-Яа-я\s]+/g)[0].trim()
        } else {
           FioBlock.querySelector('.input-fio').value = ''
        }
        if (element.getAttribute('department')) {
            paymentForm.querySelector('#department').value = element.getAttribute('department')
        }
        SumBlock.querySelector('.input-sum').value = Currency.masking(element.getAttribute('data-rest')).replace('.', '') + ' ₽'
		SumBlock.querySelector('.error-box').innerHTML = ''
        paymentForm.querySelector('.input-uin').value = element.getAttribute('data-uin')
        paymentForm.querySelector('.input-uin').setAttribute('amount', element.getAttribute('data-rest'))
		if (parseInt(element.getAttribute('data-rest')) >= 30000000) {
			SumBlock.querySelector('.error-box').innerHTML = 'Максимальная сумма за 1 транзакцию не может ' +
				'превышать 300 000 руб, произведите частичную оплату'
		}
	}
})



document.querySelector('.btn-payment').onclick = function (event) {
    event.preventDefault();
    let fullName = FioBlock.querySelector('.input-fio'),
        checkBox = paymentForm.querySelector('.input-checkbox'),
        emailOrPhone = emailOrPhoneBlock.querySelector('.input-email-or-phone');
    if (!validateFullName(fullName.value)) {
        console.log('fullname not valid');
        fullName.classList.add('error');
        fullName.classList.remove('success');
        FioBlock.lastElementChild.innerHTML = 'Неверное ФИО'

    } else {
        fullName.classList.remove('error');
        fullName.classList.add('success');
        FioBlock.lastElementChild.innerHTML = ''
    }

    if (!validateEmail(emailOrPhone.value) && emailOrPhone.value) {
        console.log('email not valid');
        emailOrPhone.classList.add('error');
        emailOrPhone.classList.remove('success');
        emailOrPhoneBlock.lastElementChild.innerHTML = 'Неверный email'
    }

    let currentSum = Number(normalSum(SumBlock.querySelector('.input-sum').value)),
        initialSum = paymentForm.querySelector('.input-uin').getAttribute('amount');
    console.log(currentSum)
    if (currentSum > initialSum) {
        SumBlock.lastElementChild.innerHTML = 'Указанная сумма не может быть больше суммы долга'
    } else if (currentSum === 0){
        SumBlock.lastElementChild.innerHTML = 'Сумма не может быть равна нулю'
    } else if (currentSum > 30000000) {
        SumBlock.lastElementChild.innerHTML = 'Максимальная сумма не может превышать 300 000 руб.'
    } else {
        SumBlock.lastElementChild.innerHTML = ''
    }

    if (!checkBox.checked) {
        console.log('checkbox not checked');
        checkBox.classList.add('error');
        checkBox.classList.remove('success');
    } else {
        checkBox.classList.remove('error');
        checkBox.classList.add('success');
    }
    countPayClick();
    if (validateFullName(fullName.value) &&
        currentSum <= initialSum &&
        currentSum !== 0 &&
        currentSum <= 30000000 &&
        checkBox.checked && (validateEmail(emailOrPhone.value) || !emailOrPhone.value)) {
        SumBlock.querySelector('.input-sum').value = currentSum;
        paymentForm.querySelector('.form-pay').submit();
    }
}

 $(function() {
            $("input[name='amount']").on('input', function(e) {
                $(this).val($(this).val().replace(/[^0-9+.,]/g, ''));
            });
        });