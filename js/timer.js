let timer = setInterval(timerFunction, 1000),
    time = 59,
    procent = 100 / time,
    per = 0;
const timerBlock = document.querySelector(".timer");

function timerFunction() {
    per += procent;
    //Hour
    hour = Math.floor(time / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    //Minutes
    minute = Math.floor((time - hour * 3600) / 60);
    minute = minute < 10 ? "0" + minute : minute;
    minute = minute > 59 ? "00" : minute;
    //Seconds
    second = time % 60;
    second = second < 10 ? +second : second;

    timerBlock.innerHTML = second + ' ' + 'сек';
    time--;
    // timerBlock.style.cssText =
    //     "background: conic-gradient(hsla(180, 100%, 50%, 1) " + per +
    //     "%, transparent 0 " + (100 - per) + "%)";

    if (time === -1) clearInterval(timer);
}

function checkDataAvailability(csrftoken, department) {
    let url = `/${department}/check-result?csrfmiddleware=${csrftoken}`
    $.ajax({
          type: 'GET',
          url: url,
            headers: {'X-CSRFToken': csrftoken},
          success: function () {window.location.href = url}});
};

function resetTimer() {
	time = 59;
    procent = 100 / time;
	per = 0;
    clearInterval(timer);
	timer = setInterval(timerFunction, 1000);
  }