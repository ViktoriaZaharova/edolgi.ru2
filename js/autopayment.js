let botText = document.querySelector('.modal-body>.box-text>p'),
    autopaymentDay = document.querySelector('#autopayment-day'),
    accountType = document.querySelector('.details-payments-list__name').innerHTML,
    serviceName = document.querySelectorAll('.list-information-company__text>p')[0].innerHTML,
    buttonRemoveAutopayment = document.querySelector('.btn-remove-autopayment'),
    buttonContinueWithAutopayment = document.querySelector('.btn-continue-with-autopayment');


function setAutopaymentText (today) {
    botText.innerHTML = `После успешного платежа мы выполним автоматическое списание на ваш ${accountType.toLowerCase()}, в адрес ${serviceName.trim()}. Следующий платеж будет выполнен ${autopaymentDay.value}.${today.getMonth() + 2}.${today.getFullYear()}.`;
}

buttonRemoveAutopayment.onclick = () => {
    ym(91758869,'reachGoal','button-pay-nosub')
    buttonRemoveAutopayment.disabled = true
    buttonContinueWithAutopayment.disabled = true
    buttonRemoveAutopayment.innerHTML = 'Формируем ссылку на оплату...'
    let form = document.querySelector('.make-payment')
    form.removeChild(form.querySelector('[name=autopayment_day]'))
    form.submit();
}

buttonContinueWithAutopayment.onclick = () => {
    ym(91758869,'reachGoal','button-pay-sub')
    buttonRemoveAutopayment.disabled = true
    buttonContinueWithAutopayment.disabled = true
    buttonContinueWithAutopayment.innerHTML = 'Формируем ссылку на оплату...'
    let form = document.querySelector('.make-payment')
    form.submit();
}


