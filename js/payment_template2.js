let payButton = document.querySelector('.btn-payments'),
    inputAccount = document.querySelector('#number-document'),
    inputNumber = document.querySelector('#number-phone'),
    inputAmount = document.querySelector('#amount'),
    inputAutopaymentDay = document.querySelector('#autopayment-day'),
    autopaymentDate = document.querySelector('.autopayment-date'),
    autopaymentCheckbox = document.querySelector('.checkbox.checkbox-autopay'),
    checkbox = document.querySelector('.checkbox-main'),
    addressBlock = document.querySelector('.input-address'),
    receiptLabel = document.querySelectorAll('.details-payments-list__name'),
    inputNumberCheckbox = document?.querySelector('#input_number'),
    inputAccountCheckbox = document?.querySelector('#input_account');


let first_input_name = document.querySelector('.input-title').innerHTML,
    first_input_regexp = document.querySelector('#first_input_regexp').value,
    service_id = document.querySelector('#service_id').value;

let accountRegExp = new RegExp(first_input_regexp);

let today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 2;

const yyyy = today.getFullYear();
inputAutopaymentDay.value = dd > 28 ? 28 : dd
autopaymentDate.innerHTML = `${inputAutopaymentDay.value}.${mm}.${yyyy}`

inputAccount.onkeyup = () => {
    receiptLabel[0].nextElementSibling.innerHTML = inputAccount.value ? inputAccount.value : '-'
}

inputAutopaymentDay.onkeyup = () => {
    if (inputAutopaymentDay.value > 28) inputAutopaymentDay.value = 28
    autopaymentDate.innerHTML = `${inputAutopaymentDay.value}.${mm}.${yyyy}`.replace('_', '')
}



inputAmount.onkeyup = () => {
    let amountFeeIncluded = Number(inputAmount.value) > 400 ? (Number(inputAmount.value) + Number(inputAmount.value) * 0.05).toFixed(2) : (Number(inputAmount.value) + 20).toFixed(2)

    receiptLabel[2].nextElementSibling.innerHTML = inputAmount.value && +amountFeeIncluded ? amountFeeIncluded + ' ₽' : '-'}

function validateNumber(account) {
    let re = /^(\+7|8)?[0-9]{10}$/
    let test_phone = re.test(account)
    if (test_phone) {
        account = account.replace('+7', '');
        if (account.length === 11) account = account.substring(1);
        return account;
    }
}


payButton.onclick = (e) => {
    e.preventDefault();

    let account,
        data = {};
    data['service_id'] = service_id
    setAutopaymentText(today);

    if (inputAccountCheckbox.checked) {
        if (accountRegExp.test(inputAccount.value)) {
            inputAccount.nextElementSibling.innerHTML = '';
            data['account'] = inputAccount.value;
            account = true;
        } else {
            inputAccount.nextElementSibling.innerHTML = `Введите корректный номер лицевого счета.`;
            smoothScroll(inputAccount);
            account = false;
        }
    } else if (inputNumberCheckbox.checked) {
        if (validateNumber(inputNumber.value)) {
            inputNumber.nextElementSibling.innerHTML = '';
            data['account'] = validateNumber(inputNumber.value);
            account = true;
        } else {
            inputNumber.nextElementSibling.innerHTML = `Введите корректный номер телефона.`;
            smoothScroll(inputNumber);
            account = false;
        }
    }
    // } else {
    //     if (!['mtsinet', 'mtstv'].includes(service_id) && validateNumber(inputAccount.value)) {
    //         inputAccount.nextElementSibling.innerHTML = '';
    //         data['account'] = validateNumber(inputAccount.value);
    //         account = true;
    //     } else if (['mtsinet', 'mtstv'].includes(service_id)) {
    //         inputAccount.nextElementSibling.innerHTML = '';
    //         data['account'] = inputAccount.value;
    //         account = true;
    //     } else {
    //         inputAccount.nextElementSibling.innerHTML = `Введите корректный номер.`;
    //         smoothScroll(inputAccount);
    //         account = false;
    //     }
    // }



    if (Number(inputAmount.value) < 15) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть меньше 15 руб';
        smoothScroll(inputAmount);
    } else if (Number(inputAmount.value) > 60000) {
        inputAmount.nextElementSibling.innerHTML = `Сумма не может быть больше 60000 руб.`
        smoothScroll(inputAmount);
    } else if (!inputAmount.value) {
        inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
        smoothScroll(inputAmount);
    } else if (isNaN(Number(inputAmount.value))) {
        inputAmount.nextElementSibling.innerHTML = 'Введите корректную сумму';
        smoothScroll(inputAmount);
    } else {
        inputAmount.nextElementSibling.innerHTML = '';
        data['amount'] = Number(inputAmount.value);
    }


    if (checkbox.checked && account && (15 <= Number(inputAmount.value) && Number(inputAmount.value) <= 60000)) {
        console.log(service_id);
        // if (data['service_id'] === 'yota_internet' && (data['account'].startsWith('+7') || data['account'].length === 11)) {
        //     data['account'] = validateNumber(data['account']);
        //     data['service_id'] = "yota_phone";

        if (service_id === 'tele2') {
            ym(91758869,'reachGoal','button-pay-tele2');
        }

        if (!autopaymentCheckbox.classList.contains('click')) {
            data['autopayment_day'] = inputAutopaymentDay.value
            // $('#modal1').modal('show')
            // sendRequest(data, false)
            // return
        }
        console.log(data);
        sendRequest(data);
    }
}