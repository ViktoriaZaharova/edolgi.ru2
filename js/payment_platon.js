let tabs = document.querySelectorAll('.js-tab-content'),
    inputAmount = document.querySelector('.input-amount'),
    inputAutopaymentDay = document.querySelector('#autopayment-day'),
    autopaymentDate = document.querySelector('.autopayment-date'),
    autopaymentCheckbox = document.querySelector('.checkbox.checkbox-autopay'),
    checkbox = document.querySelector('.checkbox-main'),
    payButton = document.querySelector('.btn-payments'),
    receiptLabel = document.querySelectorAll('.details-payments-list__name'),
    sectionTabs = document.querySelectorAll('.radio-tab');

let transferTab = tabs[0],
    transferAccount = transferTab.querySelector('.transfer-account'),
    transferLastName = transferTab.querySelector('.transfer-lastname'),
    transferFirstName = transferTab.querySelector('.transfer-firstname'),
    transferMiddleName = transferTab.querySelector('.transfer-middlename');

let provisionTab = tabs[1],
    provisionAccount = provisionTab.querySelector('.provision-account'),
    provisionContractDate = provisionTab.querySelector('.provision-contract-date'),
    provisionLastName = provisionTab.querySelector('.provision-lastname'),
    provisionFirstName = provisionTab.querySelector('.provision-firstname'),
    provisionMiddleName = provisionTab.querySelector('.provision-middlename');

let compensationTab = tabs[2],
    compensationAccount = compensationTab.querySelector('.compensation-account'),
    compensationDevice = compensationTab.querySelector('.compensation-device'),
    compensationContractDate = compensationTab.querySelector('.compensation-contract-date'),
    compensationLastName = compensationTab.querySelector('.compensation-lastname'),
    compensationFirstName = compensationTab.querySelector('.compensation-firstname'),
    compensationMiddleName = compensationTab.querySelector('.compensation-middlename');

let today = new Date()
let dd = today.getDate();
let mm = today.getMonth() + 2;
const yyyy = today.getFullYear();
inputAutopaymentDay.value = dd > 28 ? 28 : dd
autopaymentDate.innerHTML = `${inputAutopaymentDay.value}.${mm}.${yyyy}`

function isActiveTab(tab) {
    return tab.classList.contains('active');
}


sectionTabs.forEach(function (element) {
    element.onclick = () => {
        if (isActiveTab(transferTab)) {
            receiptLabel[0].innerHTML = 'Номер расчётной записи'
        } else if (isActiveTab(provisionTab)) {
            receiptLabel[0].innerHTML = 'Номер договора'
        } else if (isActiveTab(compensationTab)) {
            receiptLabel[0].innerHTML = 'Номер договора'
        }
    }
})

transferAccount.onkeyup = () => {
    receiptLabel[0].nextElementSibling.innerHTML = transferAccount.value ? transferAccount.value : '-'
}

provisionAccount.onkeyup = () => {
    receiptLabel[0].nextElementSibling.innerHTML = provisionAccount.value ? provisionAccount.value : '-'
}

compensationAccount.onkeyup = () => {
    receiptLabel[0].nextElementSibling.innerHTML = compensationAccount.value ? compensationAccount.value : '-'
}

inputAutopaymentDay.onkeyup = () => {
    if (inputAutopaymentDay.value > 28) inputAutopaymentDay.value = 28
    autopaymentDate.innerHTML = `${inputAutopaymentDay.value}.${mm}.${yyyy}`.replace('_', '')
}

inputAmount.onkeyup = () => {
    let amountFeeIncluded = Number(inputAmount.value) > 400 ? (Number(inputAmount.value) + Number(inputAmount.value) * 0.05).toFixed(2) : (Number(inputAmount.value) + 20).toFixed(2)

    receiptLabel[2].nextElementSibling.innerHTML = inputAmount.value && inputAmount.value && +amountFeeIncluded ? amountFeeIncluded + ' ₽' : '-'
}

payButton.onclick = () => {
    inputAmount.value ? inputAmount.nextElementSibling.innerHTML = '' : inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
    setAutopaymentText(today);
    ym(91758869,'reachGoal','button-pay-platon');
     if (Number(inputAmount.value) < 15) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть меньше 15 руб';
        smoothScroll(inputAmount);
    } else if (Number(inputAmount.value) > 14250) {
        inputAmount.nextElementSibling.innerHTML = 'Сумма не может быть больше 14250';
        smoothScroll(inputAmount);
    } else if (inputAmount.value === '') {
         inputAmount.nextElementSibling.innerHTML = 'Введите сумму';
         smoothScroll(inputAmount);
    } else if (isNaN(Number(inputAmount.value))) {
        inputAmount.nextElementSibling.innerHTML = 'Введите корректную сумму';
        smoothScroll(inputAmount);
    } else inputAmount.nextElementSibling.innerHTML = ''
    if (isActiveTab(transferTab)) {
        validateTransfer();
    } else if (isActiveTab(provisionTab)) {
        validateProvision();
    } else if (isActiveTab(compensationTab)) {
        validateCompensation();
    }
}

function validateTransfer() {
    let account,
        lastName,
        firstName,
        middleName;

    if (/^[а-яА-ЯёЁa-zA-Z0-9- .,\\/_()";]{1,40}$/.test(transferAccount.value)) {
        transferAccount.nextElementSibling.innerHTML = '';
        account = true;
    } else {
        transferAccount.nextElementSibling.innerHTML = 'Неверный формат счета';
        smoothScroll(transferAccount);
        ym(91758869,'reachGoal','pay-platon-error-number-ls');
        account = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(transferLastName.value)) {
        transferLastName.nextElementSibling.innerHTML = '';
        lastName = true;
    } else {
        transferLastName.nextElementSibling.innerHTML = 'Неверный формат фамилии';
        smoothScroll(transferLastName);
        lastName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(transferFirstName.value)) {
        transferFirstName.nextElementSibling.innerHTML = '';
        firstName = true;
    } else {
        transferFirstName.nextElementSibling.innerHTML = 'Неверный формат имени';
        smoothScroll(transferFirstName);
        firstName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(transferMiddleName.value)) {
        transferMiddleName.nextElementSibling.innerHTML = '';
        middleName = true;
    } else {
        transferMiddleName.nextElementSibling.innerHTML = 'Неверный формат отчества';
        smoothScroll(transferMiddleName);
        middleName = false;
    }

    let data = {};

    if (checkbox.checked && lastName && firstName && middleName && account && (15 < Number(inputAmount.value) && Number(inputAmount.value) <= 14250)) {
        data['service_id'] = 'platon';
        data['service_type'] = 'TRANSFER'
        data['account_number'] = transferAccount.value;
        data['lastname'] = transferLastName.value;
        data['firstname'] = transferFirstName.value;
        data['patronymic'] = transferMiddleName.value;
        data['amount'] = Number(inputAmount.value);
        data['contract_date'] = '';
        data['router_device_number'] = '';
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

function validateProvision() {
    let account,
        lastName,
        firstName,
        middleName,
        contractDate;

    if (/^[0-9]{1,40}$/.test(provisionAccount.value)) {
        provisionAccount.nextElementSibling.innerHTML = '';
        account = true;
    } else {
        provisionAccount.nextElementSibling.innerHTML = 'Неверный формат счета';
        ym(91758869,'reachGoal','pay-platon-error-number-ls');
        smoothScroll(provisionAccount);
        account = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(provisionLastName.value)) {
        provisionLastName.nextElementSibling.innerHTML = '';
        lastName = true;
    } else {
        provisionLastName.nextElementSibling.innerHTML = 'Неверный формат фамилии';
        smoothScroll(provisionLastName);
        lastName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(provisionFirstName.value)) {
        provisionFirstName.nextElementSibling.innerHTML = '';
        firstName = true;
    } else {
        provisionFirstName.nextElementSibling.innerHTML = 'Неверный формат имени';
        smoothScroll(provisionFirstName);
        firstName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(provisionMiddleName.value)) {
        provisionMiddleName.nextElementSibling.innerHTML = '';
        middleName = true;
    } else {
        provisionMiddleName.nextElementSibling.innerHTML = 'Неверный формат отчества';
        smoothScroll(provisionMiddleName);
        middleName = false;
    }


    if (/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(provisionContractDate.value)) {
        provisionContractDate.nextElementSibling.innerHTML = '';
        contractDate = true;
    } else {
        provisionContractDate.nextElementSibling.innerHTML = 'Неверный формат даты';
        smoothScroll(provisionContractDate);
        contractDate = false;
    }

    let data = {};

    if (checkbox.checked && lastName && firstName && middleName && account && contractDate && (15 < Number(inputAmount.value) && Number(inputAmount.value) <= 14250)) {
        data['service_id'] = 'platon';
        data['service_type'] = 'PROVISION';
        data['account_number'] = provisionAccount.value;
        data['lastname'] = provisionLastName.value;
        data['firstname'] = provisionFirstName.value;
        data['patronymic'] = provisionMiddleName.value;
        data['amount'] = Number(inputAmount.value);
        data['contract_date'] = provisionContractDate.value;
        data['router_device_number'] = '';
        if (!autopaymentCheckbox.classList.contains('click')) {
            data['autopayment_day'] = inputAutopaymentDay.value
            // $('#modal1').modal('show')
            // sendRequest(data, false)
            // return
        }
        console.log(data);
        sendRequest(data);
}}

function validateCompensation() {
    let account,
        lastName,
        firstName,
        middleName,
        contractDate,
        router_device_number;

    if (/^[0-9]{1,40}$/.test(compensationAccount.value)) {
        compensationAccount.nextElementSibling.innerHTML = '';
        account = true;
    } else {
        compensationAccount.nextElementSibling.innerHTML = 'Неверный формат счета';
        smoothScroll(compensationAccount);
        ym(91758869,'reachGoal','pay-platon-error-number-ls');
        account = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(compensationLastName.value)) {
        compensationLastName.nextElementSibling.innerHTML = '';
        lastName = true;
    } else {
        compensationLastName.nextElementSibling.innerHTML = 'Неверный формат фамилии';
        smoothScroll(compensationLastName);
        lastName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(compensationFirstName.value)) {
        compensationFirstName.nextElementSibling.innerHTML = '';
        firstName = true;
    } else {
        compensationFirstName.nextElementSibling.innerHTML = 'Неверный формат имени';
        smoothScroll(compensationFirstName);
        firstName = false;
    }

    if (/^[а-яА-ЯёЁ.\- ]{1,255}$/.test(compensationMiddleName.value)) {
        compensationMiddleName.nextElementSibling.innerHTML = '';
        middleName = true;
    } else {
        compensationMiddleName.nextElementSibling.innerHTML = 'Неверный формат отчества';
        smoothScroll(compensationMiddleName);
        middleName = false;
    }

    if (/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(compensationContractDate.value)) {
        compensationContractDate.nextElementSibling.innerHTML = '';
        contractDate = true;
    } else {
        compensationContractDate.nextElementSibling.innerHTML = 'Неверный формат даты';
        smoothScroll(compensationContractDate);
        contractDate = false;
    }

    if (/[а-яА-ЯёЁa-zA-Z0-9-.,\/_()";]{1,30}/.test(compensationDevice.value)) {
        compensationDevice.nextElementSibling.innerHTML = '';
        router_device_number = true;
    } else {
        compensationDevice.nextElementSibling.innerHTML = 'Неверный формат номера устройства';
        smoothScroll(compensationDevice);
        router_device_number = false;
    }
    let data = {};

    if (checkbox.checked && lastName && firstName && middleName && account && contractDate && router_device_number && (15 < Number(inputAmount.value) && Number(inputAmount.value) <= 14250)) {
        data['service_id'] = 'platon';
        data['service_type'] = 'COMPENSATION';
        data['account_number'] = compensationAccount.value;
        data['lastname'] = compensationLastName.value;
        data['firstname'] = compensationFirstName.value;
        data['patronymic'] = compensationMiddleName.value;
        data['amount'] = Number(inputAmount.value);
        data['contract_date'] = compensationContractDate.value;
        data['router_device_number'] = compensationDevice.value;
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

$(document).ready(function() {
    $(".provision-contract-date").mask("99.99.9999");
    $(".compensation-contract-date").mask("99.99.9999");
    $(".autopayment-day").mask("9?9");
});