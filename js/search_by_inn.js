let userInn = document.querySelector('.user-inn'),
    proceedToDebtsButton = document.querySelector('.btn-search-inn'),
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;


proceedToDebtsButton.onclick = function checkINNDebts() {
    resetTimer();
    $('.section-loader').fadeIn();
    $('.information-slider').slick('setPosition');
    window.scrollTo(0, 0);
    ym(91758869,'reachGoal','button-poisk-inn-dolg');
    $.ajax({
      type: 'POST',
      url: "/fns/check-debts",
        headers: {'X-CSRFToken': csrftoken},
      data: {
          'csrfmiddleware': csrftoken,
          'inn': String(userInn.value).split(' ')[2].trim()
      }});
    setInterval(checkDataAvailability, 10000, csrftoken, 'fns');
}