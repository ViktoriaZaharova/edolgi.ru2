let dontKnowIpButton = document.getElementById('dont-know-ip'),
    ipBlock = document.getElementById('block-ip'),
    birthdayBlock = document.getElementById('block-birthday'),
    ipLabel = document.getElementById('label-ip'),
    birthdayLabel = document.getElementById('label-birthday'),
    csrfmiddlewaretoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

let stepOneButton = document.querySelector('.btn-step-one'),
    inputFio = document.getElementById('fio'),
    inputIp = document.getElementById('ip'),
    inputBirthday = document.getElementById('birthday'),
    inputRegion = document.getElementById('region_id'),
    fioBlock = document.querySelector('.form-group-fio'),
    ipOrBirthdayBlock = document.querySelector('.form-group-ip-or-birthday'),
    regionBlock = document.querySelector('.form-group-region'),
    checkbox = document.getElementById('checkbox-main');

let stepTwoButton = document.querySelector('.btn-step-two'),
    inputTerritorialAuthority = document.getElementById('territorial_authority'),
    territorialAuthorityBlock = document.querySelector('.form-group-territorial-authority'),
    inputStructuralDepartment = document.getElementById('structural_department'),
    structuralDepartmentBlock = document.querySelector('.form-group-structural-department'),
    inputEmployee = document.getElementById('employee'),
    employeeBlock = document.querySelector('.form-group-employee');

let stepThreeButton = document.querySelector('.btn-step-three'),
    inputDescription = document.getElementById('description'),
    descriptionBlock = document.querySelector('.form-group-description'),
    inputFile = document.getElementById('file'),
    fileBlock = document.querySelector('.form-group-file'),
    descriptionSymbolCount = document.getElementById('description-symbol-count'),
    removeFileButton = document.querySelector('.file-upload-result__close'),
    fileLabel = document.querySelector('.file-upload-result'),
    fileWindowLabel = document.querySelector('.label-file__title');

let stepFourButton = document.querySelectorAll('.btn-step-four'),
    inputEmail = document.getElementById('email'),
    emailBlock = document.querySelector('.form-group-email'),
    inputCheckbox = document.getElementById('checkbox-last');

inputDescription.oninput = () => {
    descriptionSymbolCount.innerHTML = inputDescription.value.length;
}

let description = '';

let form_data = new FormData();
let data = {};
let employees;
let structural_departments;

dontKnowIpButton.onclick = () => {
    ipBlock.hidden = true;
    birthdayBlock.hidden = false;
    // dontKnowIpButton.hidden = true;
    ipLabel.hidden = true;
    birthdayLabel.hidden = false;
};


stepOneButton.onclick = (e) => {
    ym(91758869,'reachGoal','button-zhaloba1')
    e.preventDefault();
    if (!validateFullName(inputFio.value)) {
        fioBlock.lastElementChild.innerHTML = 'Неверное ФИО';
    } else {
        fioBlock.lastElementChild.innerHTML = '';
    }

    if (ipBlock.hidden) {
        if (!validateBirthday(inputBirthday.value)) {
            ipOrBirthdayBlock.lastElementChild.innerHTML = 'Неверная дата';
        } else {
            ipOrBirthdayBlock.lastElementChild.innerHTML = '';
        }
    } else {
        if (!validateIP(inputIp.value)) {
            ipOrBirthdayBlock.lastElementChild.innerHTML = 'Неверный ИП';
        } else {
            ipOrBirthdayBlock.lastElementChild.innerHTML = '';
        }
    }

    if (inputRegion.value === '0') {
        regionBlock.lastElementChild.innerHTML = 'Выберите регион';
    } else {
        regionBlock.lastElementChild.innerHTML = '';
    }

    if (validateFullName(inputFio.value) &&
        (ipBlock.hidden ? validateBirthday(inputBirthday.value) : validateIP(inputIp.value)) &&
        inputRegion.value !== '0' && checkbox.checked) {
        data['fio'] = inputFio.value;
        ipBlock.hidden ? data['birthday'] = inputBirthday.value : data['ip'] = inputIp.value;
        data['regionId'] = $('#region_id').select2('data')[0]['id'];
        inputDescription.value = `Здраствуйте меня зовут ${inputFio.value}, у меня вопрос по моему исполнительному производству ${inputIp.hidden ? '': inputIp.value}, я хотел бы узнать `
        description = inputDescription.value;
        $('.next-step')[0].click();
        if (!window.location.search) {
            let selectTerritorialAuthority = $('#territorial_authority');
            // selectTerritorialAuthority.select2('data')[0]['id'] = data['regionId'];
            selectTerritorialAuthority.val(data['regionId']);
            selectTerritorialAuthority.trigger('change');
            getAutocompleteInfo();
        }
        }
}

stepTwoButton.onclick = () => {
    ym(91758869,'reachGoal','button-zhaloba3')
    console.log(employees)

    let inputStructuralDepartment = document.getElementById('structural_department'),
        inputEmployee = document.getElementById('employee');

    if (inputTerritorialAuthority.value === '0') {
        territorialAuthorityBlock.lastElementChild.innerHTML = 'Выберите территориальный орган';
    } else {
        territorialAuthorityBlock.lastElementChild.innerHTML = '';
    }

    if (inputStructuralDepartment.value === '0' || !inputStructuralDepartment.value) {
        structuralDepartmentBlock.lastElementChild.innerHTML = 'Введите структурное подразделение';
    } else {
        structuralDepartmentBlock.lastElementChild.innerHTML = '';
    }

    // if (!inputEmployee.value) {
    //     employeeBlock.lastElementChild.innerHTML = 'Введите ФИО сотрудника';
    // } else {
    //     employeeBlock.lastElementChild.innerHTML = '';
    // }

    if (inputTerritorialAuthority.value !== '0' &&
        !['0', ''].includes(inputStructuralDepartment.value)) {
        data['territorial_authority'] = inputTerritorialAuthority.value;
        data['structural_department'] = inputStructuralDepartment.tagName === 'SELECT' ? $('#structural_department').select2('data')['0'].text : inputStructuralDepartment.value
        data['employee'] = inputEmployee.value;
        $('.next-step')[1].click();
        console.log(data);
    }
}

stepThreeButton.onclick = () => {
    ym(91758869,'reachGoal','button-zhaloba4')
    if (!inputDescription.value) {
        descriptionBlock.lastElementChild.innerHTML = 'Введите описание';
    } else if (inputDescription.value.length > 4000) {
        descriptionBlock.lastElementChild.innerHTML = 'Максимальное кол-во символов не может превышать 4000';
    } else if (inputDescription.value === description) {
        descriptionBlock.lastElementChild.innerHTML = 'Описание не может быть таким же как и шаблон';
    } else {
        descriptionBlock.lastElementChild.innerHTML = '';
    }

    if (inputFile.value && inputFile.files[0].size > 5242880) {
        fileBlock.lastElementChild.innerHTML = 'Максимальный размер файла 5 МБ';
    } else {
        fileBlock.lastElementChild.innerHTML = '';
    }

    const allowedExtensions = ['doc', 'docx', 'gif', 'bmp', 'jpg', 'jpeg', 'png', 'tif', 'tiff', 'zip', '7z', 'rar', 'arj', 'odt', 'pdf', 'txt', 'ods']

    if (inputFile.value && !allowedExtensions.includes(inputFile.files[0].name.split('.').pop())) {
        fileBlock.lastElementChild.innerHTML = 'Недопустимый формат файла';
    } else {
        fileBlock.lastElementChild.innerHTML = '';
    }

    if (inputDescription.value && (inputDescription.value.length <= 4000 && inputDescription.value !== description) && (!inputFile.value || (inputFile.files[0].size <= 5242880 && allowedExtensions.includes(inputFile.files[0].name.split('.').pop())))) {
        data['description'] = inputDescription.value;
        if (inputFile.value) form_data.append('file', inputFile.files[0]);
        $('.next-step')[2].click();
        processLoaders();
        console.log(data);
    }

}

function stepFourButtonOnClick() {
    ym(91758869,'reachGoal','button-zhaloba-pay')
    if (!inputEmail.value || !validateEmail(inputEmail.value)) {
        emailBlock.lastElementChild.innerHTML = 'Неверный email';
    } else {
        emailBlock.lastElementChild.innerHTML = '';
    }

    if (validateEmail(inputEmail.value) && inputCheckbox.checked) {
        data['email'] = inputEmail.value;
        // Robokassa.StartPayment({
        //      MerchantLogin: 'edolgi',
        //      OutSum: '11.00',
        //      InvId: 10,
        //      Description: 'Оплата заказа в Тестовом магазине ROBOKASSA',
        //      Shp_Item: '1',
        //      Culture: 'ru',
        //      Encoding: 'utf-8',
        //      SignatureValue: '3925b771e47d405cbcbb492daa936824'})
        processPayment();
    }
}






const themes = [
    {id: '0', text: 'Я двойник!'},
    {id: '1', text: 'Об ограничении права на выезд за пределы РФ и другие вопросы исполнительного производства'},
    {id: '2', text: 'О ненадлежащем исполнении судебных решений, связанных с арестом и реализации имущества должника'},
    {id: '3', text: 'О действии судебных приставов по ОПДС при осуществлении привода, обеспечении пропускного режима в судебные органы'},
    {id: '4', text: 'На действия (бездействие) судебных приставов-дознавателей'},
    {id: '5', text: 'Сообщения о готовящемся или совершенном преступлении'},
    {id: '7', text: 'О ненадлежащем поведении служащих ФССП России'},
    {id: '8', text: 'Выражение благодарности служащим ФССП России'},
    {id: '9', text: 'Правовая помощь и разъяснение законодательства в части, касающейся исполнении судебных решений'},
    {id: '10', text: 'Запрос на предоставление информации в виде наборов открытых данных'},
]

$(document).ready(function() {
    $('.js-input-region').select2({
    placeholder: 'Выберите регион',
    data: content.sort((a, b) => a.text.localeCompare(b.text)),
    width: '100%'
    });
    $('.js-input-theme').select2({
            placeholder: 'Выберите тему обращения',
            data:themes,
            width: '100%'
        });
    $('.js-input-territorial-authority').select2({
        placeholder: 'Выберите территориальный орган',
        data:content,
        width: '100%'
    });

    $(".js-input-birthday").mask("99.99.9999");
    if (window.location.search) {
        fillAutocompleteInfo();
    }
});

function fillAutocompleteInfo() {
    const urlParams = new URLSearchParams(window.location.search);

    for(const entry of urlParams.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
    }
    data['fio'] = urlParams.get('info').split(/ \d+/)[0];
    inputFio.value = data['fio'];
    data['birthday'] = urlParams.get('info').split(' ')[3]
    inputBirthday.value = data['birthday'];
    data['regionId'] = content[Object.keys(content).find(key => content[key].text === urlParams.get('info').split(/\d+ - /)[1])].id;
    console.log(data['regionId'])
    $('#region_id').val(data['regionId']);
    $('#region_id').trigger('change');
    let selectTerritorialAuthority = $('#territorial_authority');
    selectTerritorialAuthority.val(data['regionId']);
    selectTerritorialAuthority.trigger('change');
    $('.next-step')[0].click();
    setTimeout(() => {
        for (let i = 0; i < structural_departments.length; i++) {
            if (structural_departments[i].text === urlParams.get('bailiffDepartment').split(/\d+/)[0]) {
                console.log(structural_departments[i].text)
                $('#structural_department').val(structural_departments[i].id);
                $('#structural_department').trigger('change');
                break;
            }
        }
    }, 2000);
    inputDescription.value = `Здравствуйте! Меня зовут ${inputFio.value} ${inputBirthday.value} ${$('#region_id').select2('data')[0]['text']}, у меня вопрос по моему исполнительному производству ${urlParams.get('ip')} , я хотел(а) бы узнать, `
    description = inputDescription.value;
}

inputFile.addEventListener('change', function() {
    fileLabel.hidden = false;
    const file = inputFile.files[0];
    const fileSize = file.size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2) + ' MB';
    const fileName = file.name;
    const fileSizeElement = document.querySelector('.file-upload-result__size');
    const fileNameElement = document.querySelector('.file-upload-result__title');
    fileSizeElement.innerHTML = fileSizeMB;
    fileNameElement.innerHTML = fileName;
    fileWindowLabel.innerHTML = 'Файл загружен';
    inputFile.disabled = true;
});

removeFileButton.onclick = () => {
    fileLabel.hidden = true;
    inputFile.disabled = false;
    inputFile.value = '';
    fileWindowLabel.innerHTML = 'Выберите файл (или перетащите в поле)';
    form_data.delete('file');
};

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
            loaders[i].classList.remove('load-result');
            loaders[i].lastElementChild.innerHTML += checkedHTML;
        }, timeouts[i] * 1000)


    }
    setTimeout(() => {
        $('.next-step')[3].click();
    }, 16 * 1000);
    setTimeout(function () {
		$('.bailiff-item-5.active').removeClass('active').next('.bailiff-item').addClass('active');
	}, 16000);
}


function getAutocompleteInfo() {
    let client_info = {};
    client_info['csrfmiddleware'] = csrfmiddlewaretoken;
    client_info['regionId'] = $('#region_id').select2('data')[0]['id'];
    client_info['lastname'] = inputFio.value.split(' ')[0].trim();
    client_info['firstname'] = inputFio.value.split(' ')[1].trim();
    client_info['middlename'] = inputFio.value.split(' ')[2].trim();
    if (ipBlock.hidden) client_info['birthday'] = inputBirthday.value.trim();
    else client_info['ipNumber'] = inputIp.value.trim();

    fetch("/zhaloba-na-pristava/autocomplete", {
        method: "POST",
        redirect: 'manual',
        headers: {'X-CSRFToken': csrfmiddlewaretoken,
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': '*/*' },
        body: new URLSearchParams(client_info)
    }).then(response => (response.json())).then((data) => {
        if (data['structural_departments']) {
            // inputStructuralDepartment.tagName = 'select';
            updateAutoritiesAndEmployees(data);
        }
        if (data['debtor_ip']) {
            inputDescription.value = `Здравствуйте! Меня зовут ${inputFio.value} ${inputBirthday.value} ${$('#region_id').select2('data')[0]['text']}, у меня вопрос по моему исполнительному производству ${data['debtor_ip']} , я хотел(а) бы узнать, `
            description = inputDescription.value;
        } else {
            inputDescription.value = `Здравствуйте! Меня зовут ${inputFio.value} ${inputBirthday.value} ${$('#region_id').select2('data')[0]['text']}, у меня вопрос по моему исполнительному производству, я хотел(а) бы узнать, `
            description = inputDescription.value;
        }
    })
}

function updateAutoritiesAndEmployees(data) {
    $('#structural_department').parent().append('<select onchange="changeEmployee()" id="structural_department"></select>')
    $('#structural_department').remove();

    let structuralDepartment = $('#structural_department'),
                employee = $('#employee');

            structuralDepartment.select2({
                placeholder: 'Выберите структурное подразделение',
                data: data['structural_departments'],
                width: '100%'
            });
            employees = data['structural_departments_employees'];
            structural_departments = data['structural_departments'];
            // inputEmployee.tagName = 'select';
            // employee.select2({
            //     placeholder: 'Выберите пристава',
            //     data: data['structural_departments_employees'],
            //     width: '100%'
            // });
            if (data['debtor_info_id']) {
                structuralDepartment.val(data['debtor_info_id']);
                employee.val(employees[data['debtor_info_id']]);
            }
        structuralDepartment.trigger('change');
        employee.trigger('change');
}

function processPayment() {
    for (const [key, value] of Object.entries(data)) {
        form_data.append(key, value);
    }
    fetch('/zhaloba-na-pristava/pid', {
        method: "POST",
        redirect: 'manual',
        headers: {'X-CSRFToken': csrfmiddlewaretoken},
        body: form_data
    }).then(response => (response.json())).then((response) => (
        Robokassa.StartPayment(
        {
            MerchantLogin: 'edolgi',
            OutSum: '229.00',
            InvId: response['i'],
            Description: 'Оплата услуги по приему обращения',
            Culture: 'ru',
            Encoding: 'utf-8',
            Email: data['email'],
            SignatureValue: response['o']
        })

    ))
}

inputTerritorialAuthority.onchange = () => {
    fetch('/zhaloba-na-pristava/regions', {
        method: "POST",
        headers: {'X-CSRFToken': csrfmiddlewaretoken},
        body: new URLSearchParams({'regionId': inputTerritorialAuthority.value})
    }).then(response => (response.json())).then((data) => {
        if (data['structural_departments'].length > 0) {
        updateAutoritiesAndEmployees(data);
        inputStructuralDepartment = document.querySelector('#structural_department');
        inputEmployee.value = employees[inputStructuralDepartment.value];
        } else {
        $('#structural_department').parent().append('<input id="structural_department" placeholder="ОСП по Московской области">')
        $('#structural_department').next().remove();
        $('#structural_department').remove();
        inputEmployee.value = '';
        employees = {};
        }

    });
};

function changeEmployee() {
    console.log($('#structural_department').select2('data')['0'].id);
    console.log(employees);

    inputEmployee.value = employees[$('#structural_department').select2('data')['0'].id];
};




