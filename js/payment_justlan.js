let payButton = document.querySelector('.btn-payments'),
    inputAccount = document.querySelector('#account'),
    inputAmount = document.querySelector('#amount'),
    inputAutopaymentDay = document.querySelector('#autopayment-day'),
    autopaymentDate = document.querySelector('.autopayment-date'),
    autopaymentCheckbox = document.querySelector('.checkbox.checkbox-autopay'),
    checkbox = document.querySelector('.checkbox-main'),
    receiptLabel = document.querySelectorAll('.details-payments-list__name');

let accountRegExp = new RegExp('^[0-9]{1,10}$');

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
}


payButton.onclick = (e) => {
    e.preventDefault();

    let account;

    setAutopaymentText(today);
    if (!accountRegExp.test(inputAccount.value)) {
        inputAccount.nextElementSibling.innerHTML = `Номер лицевого счета должен быть от 1 до 10 символов`;
        smoothScroll(inputAccount);
    } else {
        inputAccount.nextElementSibling.innerHTML = '';
        account = true;
    }




    if (Number(inputAmount.value) < 15) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть меньше 15 руб';
        smoothScroll(inputAmount);
    } else if (Number(inputAmount.value) > 15000) {
        inputAmount.nextElementSibling.innerHTML = `Сумма не может быть больше 15000 руб`
        smoothScroll(inputAmount);
    } else if (!inputAmount.value) {
        inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
        smoothScroll(inputAmount);
    } else if (isNaN(Number(inputAmount.value))) {
        inputAmount.nextElementSibling.innerHTML = 'Введите корректную сумму';
        smoothScroll(inputAmount);
    } else inputAmount.nextElementSibling.innerHTML = ''; amount = true;


    let data = {};

    if (checkbox.checked && account && (15 < Number(inputAmount.value) && Number(inputAmount.value) <= 15000)) {
        data['service_id'] = 'netbynet';
        data['account_number'] = inputAccount.value;
        data['amount'] = Number(inputAmount.value);
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