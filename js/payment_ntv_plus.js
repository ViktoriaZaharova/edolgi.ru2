let payButton = document.querySelector('.btn-payments'),
    receiptLabel = document.querySelectorAll('.details-payments-list__name'),
    inputAccount = document.querySelector('#number-document'),
    inputAmount = document.querySelector('#amount'),
    inputAutopaymentDay = document.querySelector('#autopayment-day'),
    autopaymentDate = document.querySelector('.autopayment-date'),
    autopaymentCheckbox = document.querySelector('.checkbox.checkbox-autopay'),
    checkbox = document.querySelector('.checkbox-main');

let today = new Date()
let dd = today.getDate();
let mm = today.getMonth() + 2;
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
    receiptLabel[2].nextElementSibling.innerHTML = inputAmount.value && inputAmount.value && +amountFeeIncluded ? amountFeeIncluded + ' ₽' : '-'
}

payButton.onclick = (e) => {
    e.preventDefault();
    setAutopaymentText(today);
    if (!/[0-9]{10}/.test(inputAccount.value)) {
        inputAccount.nextElementSibling.innerHTML = 'Неверный номер лицевого счета';
        smoothScroll(inputAccount);
        ym(91758869,'reachGoal','pay-ntv-plus-error-number-ls');
    } else inputAccount.nextElementSibling.innerHTML = '';

    inputAmount.value ? inputAmount.nextElementSibling.innerHTML = '' : inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
    if (autopaymentCheckbox.classList[2] !== 'click') Number(inputAutopaymentDay.value.replace('_', '')) ? inputAutopaymentDay.value = Number(inputAutopaymentDay.value.replace('_', '')) : inputAutopaymentDay.value = dd;
    ym(91758869,'reachGoal','button-pay-ntv-plus');

    if (Number(inputAmount.value) < 15) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть меньше 15 руб';
        smoothScroll(inputAmount);
    } else if (Number(inputAmount.value) > 3000) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть больше 3000';
        smoothScroll(inputAmount);
    } else if (inputAmount.value === '') {
        inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
        smoothScroll(inputAmount);
    } else if (isNaN(Number(inputAmount.value))) {
        inputAmount.nextElementSibling.innerHTML = 'Введите корректную сумму';
        smoothScroll(inputAmount);
    } else inputAmount.nextElementSibling.innerHTML = ''

    if (checkbox.checked &&
        /[0-9]{10}/.test(inputAccount.value) &&
        (15 < Number(inputAmount.value) && Number(inputAmount.value) <= 3000)) {
        let data = {}
        data['csrfmiddlewaretoken'] = document.querySelector('[name="csrfmiddlewaretoken"]').value
        data['service_id'] = 'ntv';
        data['account_number'] = inputAccount.value;
        data['amount'] = Number(inputAmount.value);
        if (!autopaymentCheckbox.classList.contains('click')) {
            data['autopayment_day'] = inputAutopaymentDay.value
            // $('#modal1').modal('show')
            // sendRequest(data, false)
            // return
        }
        sendRequest(data);
        console.log(data)
    }

}

$(document).ready(function() {
    $("#number-document").mask("9999999999");
    $("#autopayment-day").mask("9?9");
});