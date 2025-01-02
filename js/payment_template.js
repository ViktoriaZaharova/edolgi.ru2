let payButton = document.querySelector('.btn-payments'),
    inputAccount = document.querySelector('#account'),
    inputFio = document.querySelector('#fio'),
    inputAmount = document.querySelector('#amount'),
    inputAutopaymentDay = document.querySelector('#autopayment-day'),
    inputAddress = document.querySelector('#address'),
    autopaymentDate = document.querySelector('.autopayment-date'),
    autopaymentCheckbox = document.querySelector('.checkbox.checkbox-autopay'),
    checkbox = document.querySelector('.checkbox-main'),
    addressBlock = document.querySelector('.input-address'),
    receiptLabel = document.querySelectorAll('.details-payments-list__name');

let first_input_name = document.querySelector('.input-title').innerHTML,
    first_input_length = document.querySelector('#first_input_length').value,
    service_number = document.querySelector('#service_number').value,
    max_payment_amount = Number(document.querySelector('#max_payment_amount').value);

let accountRegExp = new RegExp(`^.{${first_input_length}}$`);

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

    receiptLabel[2].nextElementSibling.innerHTML = inputAmount.value && +amountFeeIncluded ? amountFeeIncluded + ' ₽' : '-'
    addressBlock.hidden = Number(inputAmount.value) < 15000;
}


payButton.onclick = (e) => {
    e.preventDefault();

    let account,
        fio,
        address;

    setAutopaymentText(today);
    if (!accountRegExp.test(inputAccount.value)) {
        inputAccount.nextElementSibling.innerHTML = `${first_input_name} должен быть от ${first_input_length.split(',')[0]} до ${first_input_length.split(',')[1]} символов`;
        smoothScroll(inputAccount);
    } else {
        inputAccount.nextElementSibling.innerHTML = '';
        account = true;
    }

    if (Number(inputAmount.value) >= 15000) {
        if (!inputAddress.value) {
            inputAddress.nextElementSibling.innerHTML = 'Введите адрес.';
            smoothScroll(inputAddress);
            address = false;
        } else if (inputAddress.value.length < 5) {
            inputAddress.nextElementSibling.innerHTML = 'Длина адреса должна составлять более 5 символов.';
            smoothScroll(inputAddress);
            address = false;
        } else if (!(/^.+\s.+\s.+$/.test(inputAddress.value))) {
            inputAddress.nextElementSibling.innerHTML = 'Длина адреса должна составлять более 3 слов.';
            smoothScroll(inputAddress);
            address = false;
        } else {
        address = true;
        inputAddress.nextElementSibling.innerHTML = '';
        }
    } else {
        address = true;
        inputAddress.nextElementSibling.innerHTML = '';
    }



    if (Number(inputAmount.value) < 15) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть меньше 15 руб';
        smoothScroll(inputAmount);
    } else if (Number(inputAmount.value) > max_payment_amount) {
        inputAmount.nextElementSibling.innerHTML = `Сумма не может быть больше ${max_payment_amount} руб`
        smoothScroll(inputAmount);
    } else if (!inputAmount.value) {
        inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
        smoothScroll(inputAmount);
    } else if (isNaN(Number(inputAmount.value))) {
        inputAmount.nextElementSibling.innerHTML = 'Введите корректную сумму';
        smoothScroll(inputAmount);
    } else inputAmount.nextElementSibling.innerHTML = ''; amount = true;

      if (validateFullName(inputFio.value)) {
        inputFio.nextElementSibling.innerHTML = '';
        fio = true;
    } else {
        inputFio.nextElementSibling.innerHTML = 'Неверный формат ФИО';
        smoothScroll(inputFio);
        fio = false;
    }

    let data = {};

    if (checkbox.checked && fio && account && address && (15 < Number(inputAmount.value) && Number(inputAmount.value) <= max_payment_amount)) {
        data['service_id'] = 'freereqotherservices';
        data['service_number'] = service_number;
        data['account'] = inputAccount.value;
        data['fio'] = inputFio.value;
        data['amount'] = Number(inputAmount.value);
        if (Number(inputAmount.value) >= 15000) data['address'] = inputAddress.value;

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