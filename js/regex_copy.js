function validateEmail(email) {
    let re = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])\s?$/;
    return re.test(email);
}

function validateFullName(fullname) {
    let re = /^([А-Яа-я-ё]+)\s([А-Яа-я-ё]+)\s?([А-Яа-я-ё]+)?\s?$/;
    return re.test(fullname);
}

function validateFullNameForTravelBanCheck(fullname) {
    let re = /^([А-Яа-я-ё-]+)\s([А-Яа-я-ё-]+)\s([А-Яа-я-ё-]+)\s?$/;
    return re.test(fullname);
}


function validateBirthday(date) {
    let re = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
    return re.test(date);
}

function validateINN(INN) {
    let re = /^((?!00)[0-9]{12})\s?$/
    return re.test(INN)
}

function validateUIN(UIN) {
    let re = /^((?!00)[0-9]{20}\s?)|((?!00)[0-9]{25}\s?)$/
    return re.test(UIN)
}

function validateCarNumber(CarNumber) {
    let re = /^[А-Яа-я\d]{2}\d{2}([А-Яа-я]{1,2}|\d{1,2}|\d[А-Яа-я])\s?$/
    return re.test(CarNumber)
}

function validateRegionNumber(RegionNumber) {
    let re = /^\d{2,3}\s?$/
    return re.test(RegionNumber)
}

function validateSTS(STS) {
    let re = /^((?!00)[0-9]{10}\s?)|((?!00)[0-9]{2}[А-Яа-я]{2}\d{6}\s?)$/
    if (STS.includes('XXX')) return true
    else return re.test(STS)
}

function validateVUNumber(VU) {
    let re = /^((?!00)[0-9]{10}\s?)|((?!00)[0-9]{2}[А-Яа-я]{2}\d{6}\s?)$/
    return re.test(VU)
}

function validateIP(IP) {
    let re = /^\w+\/\w+\/\w+(-(ИП|ип))?\s?$/;
    let test = re.test(IP)
    if (test) {
        if (!IP.toLowerCase().endsWith('-ип')) {
            IP = IP + '-ИП';
        }
        return IP;
    }
    return test;
}

function validatePassport(passport) {
    let re = /^\d{2}\s\d{2}\s\d{6}\s?$/
    return re.test(passport)
}

function validateAccount(account) {
    let re = /^([0-9]{5,7}|[0-9]{10,12}|(\+7|8)[0-9]{10})\s?$/
    let test = re.test(account)
    if (test) {
        account = account.replace('+7', '');
        if (account.length === 11) account = account.substring(1);
        return account;
    } else return test;
}

function validatePhoneNumber(number) {
    let re = /^\d{10}$/
    return re.test(number)
}


function sendRequest (data, submit=true) {
    let PayButton = document.querySelector('.btn-payments');
    if (submit) {
        PayButton.disabled = true;
        PayButton.innerHTML = 'Формируем ссылку на оплату...';
        PayButton.style.background = '#9d9d9e';
    }
    data['csrfmiddlewaretoken'] = document.querySelector('[name="csrfmiddlewaretoken"]').value;
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = 'make-payment';
    form.className = 'make-payment'
    for (let key in data) {
        let input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = data[key]
        form.appendChild(input)
    }
    document.body.appendChild(form)
    if (!submit) return
    form.submit();

    // $.ajax({
    //       type: 'POST',
    //       url: "/make-payment",
    //       headers: {'X-CSRFToken': data['csrfmiddlewaretoken']},
    //       data: data,
    //     });

  //   try {
  //   // Send a fetch request to get the redirect URL
  //   const response = fetch("/uslugi/make-payment", {
  //       method: "POST",
  //       redirect: 'manual',
  //       headers: {'X-CSRFToken': data['csrfmiddlewaretoken'],
  //                 'Content-Type': 'application/x-www-form-urlencoded',
  //                 'Accept': '*/*' },
  //       body: new URLSearchParams(data)
  //   });
  //   const redirectUrl = response.url;
  //
  //   // Create an iframe element and set the redirect URL as the source
  //   const iframe = document.createElement('iframe');
  //   iframe.src = redirectUrl;
  //   iframe.style.width = '100%';
  //   iframe.style.height = '100%';
  //
  //   // Append the iframe to the document body
  //   document.body.appendChild(iframe);
  //   iframe.click()
  // } catch (error) {
  //   console.error('Error:', error);
  // }
  //
    }


// function normalSum(string) {
//     return parseFloat(string.replaceAll(/\s/g, '').replace('₽', '').replace(',', '.'))
// }

function smoothScroll(element){
    element.scrollIntoView({
        behavior: 'smooth'
    });
}

$(function() {
    $("input[name='amount']").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9.,]/g, ''));
    });
});
