// let fioBlock = document.getElementById('block-fio'),
//     birthdayBlock = document.getElementById('block-birthday'),
//     fioLabel = document.getElementById('label-fio'),
//     birthdayLabel = document.getElementById('label-birthday'),
let csrfmiddlewaretoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

let stepOneButton = document.querySelector('.btn-step-one'),
    inputFio = document.getElementById('fio'),
    inputBirthday = document.getElementById('birthday'),
    inputRegion = document.getElementById('region_id'),
    fioBlock = document.querySelector('.form-group-fio'),
    birthdayBlock = document.querySelector('.form-group-birthday'),
    regionBlock = document.querySelector('.form-group-region'),
    checkbox = document.getElementById('checkbox-main');

let stepTwoButton = document.querySelector('.btn-step-two'),
    inputSnils = document.getElementById('snils'),
    inputSts = document.getElementById('sts'),
    snilsBlock = document.querySelector('.form-group-snils'),
    stsBlock = document.querySelector('.form-group-sts'),
    checkboxAuto = document.getElementById('checkbox-auto');

let stepFourButton = document.querySelector('.btn-step-four'),
    inputEmail = document.getElementById('email'),
    emailBlock = document.querySelector('.form-group-email'),
    checkboxLast = document.getElementById('checkbox-last');

checkboxAuto.onclick = () => {
    stsBlock.hidden = !checkboxAuto.checked;
}

let data = {};
let snils_found;

stepOneButton.onclick = (e) => {
    e.preventDefault();
    if (!validateFullNameForTravelBanCheck(inputFio.value)) {
        fioBlock.lastElementChild.innerHTML = 'Неверное ФИО';
    } else {
        fioBlock.lastElementChild.innerHTML = '';
    }

    if (!validateBirthday(inputBirthday.value)) {
        birthdayBlock.lastElementChild.innerHTML = 'Неверная дата';
    } else {
        birthdayBlock.lastElementChild.innerHTML = '';
    }

    if (inputRegion.value === '0') {
        regionBlock.lastElementChild.innerHTML = 'Выберите регион';
    } else {
        regionBlock.lastElementChild.innerHTML = '';
    }

    if (validateFullNameForTravelBanCheck(inputFio.value) &&
        validateBirthday(inputBirthday.value) &&
        inputRegion.value !== '0' && checkbox.checked) {
        data['fio'] = inputFio.value;
        data['birthday'] = inputBirthday.value
        data['regionId'] = $('#region_id').select2('data')[0]['id'];
        $('.next-step')[0].click();
        resetTimer();
        $('.section-loader').fadeIn();
        getAutocompleteInfo();
        ym(91758869,'reachGoal','zs1')
        }
}


stepTwoButton.onclick = (e) => {
    let snils_regex = /^(\d{3}-\d{3}-\d{2}. .{2})|(\d{8}.{3})$/
    e.preventDefault();
    if (inputSnils.value && !snils_regex.test(inputSnils.value)) {
        snilsBlock.lastElementChild.innerHTML = 'Неверный СНИЛС';
    } else {
        snilsBlock.lastElementChild.innerHTML = '';
    }

    if (checkboxAuto.checked && !validateSTS(inputSts.value)) {
        stsBlock.lastElementChild.innerHTML = 'Неверный СТС';
    } else {
        stsBlock.lastElementChild.innerHTML = '';
    }

    if ((inputSnils.value ? snils_regex.test(inputSnils.value) : true) &&
        (checkboxAuto.checked ? validateSTS(inputSts.value) : true)) {
        if (inputSnils.value) data['snils'] = !inputSnils.value.includes('X') ? inputSnils.value : 'autocomplete';
        if (checkboxAuto.checked) data['sts'] = !inputSts.value.includes('X') ? inputSts.value : 'autocomplete';
        $('.next-step')[1].click();
        processLoaders();
        ym(91758869,'reachGoal','zs2')
        }
}


function stepFourButtonOnClick() {
    let payButtons = document.querySelectorAll('.btn-step-four');
    if (!validateEmail(inputEmail.value)) {
        emailBlock.lastElementChild.innerHTML = 'Неверный email';
    } else {
        emailBlock.lastElementChild.innerHTML = '';
    }

    if (validateEmail(inputEmail.value) && checkboxLast.checked) {
        data['email'] = inputEmail.value;
        payButtons.forEach(function (element) {
            element.disabled = true;
            element.innerHTML = 'Формируем ссылку на оплату...';
            element.style.background = '#9d9d9e';
        });
        processPayment();
        ym(91758869,'reachGoal','zsoplata')
        }
}

function getAutocompleteInfo() {
    fetch('/zapret-vyezda/autocomplete',{
        method: "POST",
        headers: {'X-CSRFToken': csrfmiddlewaretoken},
        body: JSON.stringify(data)
    }).then(response => (response.json())).then((response) => (
        fillAutocompleteInfo(response)
        )
    )
}

function fillAutocompleteInfo(response) {
    let autocomplete_span = '<span class="autocomplete-box">Автозаполнено</span>'
    if (response['snils']) {
        snils_found = true;
        inputSnils.value = response['snils'];
        snilsBlock.firstElementChild.innerHTML += autocomplete_span;
    }
    if (response['sts']) {
        inputSts.value = response['sts'];
        stsBlock.firstElementChild.innerHTML += autocomplete_span;
    }
    $('.section-loader').fadeOut();
}

function processPayment() {
    fetch('/zapret-vyezda/pid',{
        method: "POST",
        headers: {'X-CSRFToken': csrfmiddlewaretoken},
        body: JSON.stringify(data)
    }).then(response => (response.json())).then((response) => (
        Robokassa.StartPayment(
        {
            MerchantLogin: 'edolgi',
            OutSum: '298.00',
            InvId: response['i'],
            Description: 'Оплата отчета о содержании задолженности и рекомендациям по выезду за границу',
            Culture: 'ru',
            Shp_type: 'zapret_vyezda',
            Encoding: 'utf-8',
            Email: data['email'],
            SignatureValue: response['o']
        })

    ))
}

function processLoaders() {
    const loaders = document.querySelector('.list-result-information').getElementsByTagName('li');
    const timeouts = [2, 3, 6, 10, 12, 15];
    const checkedHTML = ' (<a class="d-inline color-accent">проверено</a>)';
    for (let i = 0; i < loaders.length; i++) {
        if (!loaders[i].classList.contains('load-result')) {
            loaders[i].classList.add('load-result');
            loaders[i].lastElementChild.innerHTML.replace(/^ \(.+\)$/, '');
        }
        setTimeout(() => {
            let last_element_inner_html = loaders[i].lastElementChild.innerHTML;
            loaders[i].classList.remove('load-result');
            if (last_element_inner_html.includes("Проверка задолженности в ФССП")) {
                if (snils_found) {
                    loaders[i].lastElementChild.innerHTML += ' (<a href="#" class="d-inline color-red">найдены долги</a>)'
                } else {
                    loaders[i].lastElementChild.innerHTML += checkedHTML;
                }
            } else if (last_element_inner_html.includes("Комплексная проверка запрета")) {
                loaders[i].lastElementChild.innerHTML += ' (<a href="#" class="d-inline color-red">возможен запрет</a>)'
            } else {
                loaders[i].lastElementChild.innerHTML += checkedHTML;
            }
        }, timeouts[i] * 1000)


    }
    setTimeout(() => {
        $('.next-step')[1].click();
    }, 16 * 1000);
    setTimeout(function () {
		$('.bailiff-item-5.active').removeClass('active').next('.bailiff-item').addClass('active');
	}, 16000);
}

function getAutocompleteInfoFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    for(const entry of urlParams.entries()) {
        console.log(`${entry[0]}: ${entry[1]}`);
    }
    data['fio'] = urlParams.get('info').split(/ \d+/)[0];
    inputFio.value = data['fio'];
    data['birthday'] = urlParams.get('info').split(' ')[3]
    inputBirthday.value = data['birthday'];
    data['regionId'] = content[Object.keys(content).find(key => content[key].text === urlParams.get('info').split(/\d+ - /)[1])].id;
    $('#region_id').val(data['regionId']).trigger('change');
    $('.next-step')[0].click();
    resetTimer();
    $('.section-loader').fadeIn();
    getAutocompleteInfo();

}

$(document).ready(function() {
    $('.js-input-region').select2({
    placeholder: 'Выберите регион',
    data: content.sort((a, b) => a.text.localeCompare(b.text)),
    width: '100%'
    });

    $(".js-input-birthday").mask("99.99.9999");
    $("#snils").mask("999-999-99* **");
    if (window.location.search) {
        getAutocompleteInfoFromUrl();
        ym(91758869,'reachGoal','zsdolg')
    }
    // if (window.location.search) {
    //     fillAutocompleteInfo();
    // }
});