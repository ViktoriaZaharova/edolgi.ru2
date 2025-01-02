$("body").on("click", ".btn-scroll-top", function (e) {
	e.preventDefault();
	$("html, body").animate({
		scrollTop: 0
	}, "slow");
});

$('.btn-burger').on('click', function (e) {
	e.preventDefault();
	$('.mobile-menu').fadeToggle();
});

$('.mobile-menu__close').on('click', function (e) {
	e.preventDefault();
	$('.mobile-menu').fadeOut();
});

$('.form-search-header, .activity-search').on('click', function () {
	$('.search-hidden').fadeIn();
	$('.search-hidden input').focus();
});

$('.form-search input').on('keyup change', function () {
	if (this.value.length > 0) {
		$('.result-search-modal').fadeIn();
	} else {
		$('.result-search-modal').fadeOut();
	}
});

$('.search-hidden-close').on('click', function (e) {
	e.preventDefault();
	$('.search-hidden').fadeOut();
});

$('.menu-mobile > li > a').on('click', function (e) {
	e.preventDefault();
	$(this).parents('li').find('.submenu-mobile').fadeIn();
});

$('.submenu-mobile .link-prev').on('click', function (e) {
	e.preventDefault();
	$('.submenu-mobile').fadeOut();
});

$('.js-example-basic-single').select2({
	width: "100%"
});


$.datepicker.setDefaults(
	{
		closeText: 'Закрыть',
		prevText: '',
		currentText: 'Сегодня',
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
			'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
		dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	});

$('.datepicker1').datepicker({
	changeYear: true
});

$('.datepicker2').datepicker({
	changeYear: true,
	dateFormat: 'MM yy',
});

$('.go_to').click(function (e) {
	e.preventDefault();
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length !== 0) {
		$('html, body').animate({
			scrollTop: $(scroll_el).offset().top
		}, 500);
	}
	return false;
});


// show list
$('.toggle-requisites').on('click', function (e) {
	e.preventDefault();

	var
		$this = $(this),
		content = $(this).parent().find('.list-requisites .list-requisites-item'),
		content2 = $(this).parent().find('.requisites-wrapper');


	if (!$this.hasClass('trigger')) {
		$this.addClass('trigger');
		$this.html('Скрыть реквизиты');

		content.slideDown();
		content2.slideDown();
	} else {
		$this.removeClass('trigger');
		$this.html('Показать реквизиты');

		content.slideUp();
		content2.slideUp();
	}
});
// show list

// show map
$('.toggle-maps').on('click', function (e) {
	e.preventDefault();

	var
		$this = $(this),
		content = $(this).parent().find('.map-address');


	if (!$this.hasClass('trigger')) {
		$this.addClass('trigger');
		$this.html('Скрыть карту');

		content.slideDown();
	} else {
		$this.removeClass('trigger');
		$this.html('Показать карту');

		content.slideUp();
	}
});
// show map

// show gallery
$('.toggle-gallery').on('click', function (e) {
	e.preventDefault();

	var
		$this = $(this),
		content = $(this).parent().find('.gallery-collapse');


	if (!$this.hasClass('trigger')) {
		$this.addClass('trigger');
		$this.html('Скрыть фото');

		content.slideDown();
	} else {
		$this.removeClass('trigger');
		$this.html('Показать фото');

		content.slideUp();
	}
});
// show gallery


$('.information-slider').slick({
	slidesToShow: 1,
	fade: true,
	prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="img/sprite.svg#prev"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="img/sprite.svg#next"></use></svg></button>'
});

//auto counter total//
var homeSlider = $('.information-slider');

$('.counter-slide__default').text("/ " + homeSlider.slick("getSlick").slideCount);

homeSlider.on('afterChange', function (event, slick, currentSlide) {
	$(".counter-slide__cp").text(currentSlide < 10 ? `${currentSlide + 1}` : currentSlide + 1);
});


$('.btn-step-next').on('click', function (e) {
	e.preventDefault();
	resetTimer();
	$('.section-loader').fadeIn();
	$('.information-slider').slick('setPosition');
});



$('.copy-link').click(function (e) {
	e.preventDefault();
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(this).parent('h1').find('span').text()).select();
	document.execCommand("copy");
	$temp.remove();
});

$('.tab_selector').on('change', function (e) {
	$('.nav-tabs li a').eq($(this).val()).tab('show');
});

// показать карточку товара по клику в зависимости от значениея data-tab
$(document).ready(function () {
	$(".radio-tab").click(function () {
		var id = $(this).attr('data-tab'),
			content = $('.js-tab-content[data-tab="' + id + '"]');

		$('.js-tab-content.active').removeClass('active'); // 3
		content.addClass('active'); // 4
	});
});

$(".bailiff-next-step").click(function (e) {
	e.preventDefault();
	var id = $(this).attr('data-tab'),
		content = $('.form-bailiff .js-tab-content[data-tab="' + id + '"]');

	$('.form-bailiff .js-tab-content.active').removeClass('active'); // 3
	content.addClass('active'); // 4
});

$('.autopayment-settings-toggle').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('active').parents().find('.block-hidden').fadeToggle();
});

$('.btn-delete').on('click', function (e) {
	e.preventDefault();
	$(this).parents('.row-delete').fadeOut();
});

$('.btn-add-row-delete').on('click', function (e) {
	e.preventDefault();
	$('.js-tab-content-pu').find('.row-delete').fadeIn();
});

$('.checkbox-add').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('click');
	$('.js-tab-content-pu').fadeToggle();
});

$('.checkbox-autopay').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('click');
	$('.js-tab-content-check').fadeToggle();
});

// активная ссылка меню
$('.menu li a').each(function () {
	var location = window.location.href;
	var link = this.href;
	if (location === link) {
		$(this).addClass('active');
	}
});
// end


$(function () {
	var next = $('.next-step');
	var prev = $('.prev-step');
	var progress = $('.progress-bg');
	var stepsCount = $('.bailiff-item').length;
	var currentStep = 1;

	function calculate(current, total) { // Функция для подсчета текущего %
		return (current / total) * 100
	}

	progress.width(calculate(currentStep, stepsCount) + '%'); // устанавливаем начальную ширину полосы
	next.on('click', function () {
		progress.width(calculate(++currentStep, stepsCount) + '%');
		$('.progress-steps__cp').text(currentStep); // устанавливаем ширину полосы после изменения шага
		$('.progress-steps__default').text(stepsCount);
	});

	prev.on('click', function () {
		progress.width(calculate(--currentStep, stepsCount) + '%'); // устанавливаем ширину полосы после изменения шага
		$('.progress-steps__cp').text(currentStep);
		$('.progress-steps__default').text(stepsCount);
		if ($('.next-step-first').parents('.bailiff-item').hasClass('active')) {
			$('.progress-wrapper').hide();
		}
	});
});

$(document).ready(function () {
	$('.next-step-first').click(function () {
		// $('.section-loader-bailiff').fadeIn();
		$('.progress-wrapper').fadeIn();
	});

	// setTimeout(function () {
	// 	$('.section-loader-bailiff').fadeOut();
	// }, 10000);
	//
	// setTimeout(function () {
	// 	$('.bailiff-item-5.active').find('.list-result-information li').removeClass('load-result');
	// }, 10000);
	//
	// setTimeout(function () {
	// 	$('.bailiff-item-5.active').removeClass('active').next('.bailiff-item').addClass('active');
	// }, 11000);
});


$('.variable-adjustment').click(function (e) {
	e.preventDefault();
	$(this).parents('.form-group').find('.label-visible').fadeOut();
	$(this).parents('.form-group').find('.label-hidden').fadeIn();
});

const content = [
  {'id': '01', 'text': 'Республика Адыгея'},
  {'id': '02', 'text': 'Республика Башкортостан'},
  {'id': '03', 'text': 'Республика Бурятия'},
  {'id': '04', 'text': 'Республика Алтай'},
  {'id': '05', 'text': 'Республика Дагестан'},
  {'id': '06', 'text': 'Республика Ингушетия'},
  {'id': '07', 'text': 'Кабардино - Балкария'},
  {'id': '08', 'text': 'Республика Калмыкия'},
  {'id': '09', 'text': 'Карачаево - Черкесия'},
  {'id': '10', 'text': 'Республика Карелия'},
  {'id': '11', 'text': 'Республика Коми'},
  {'id': '12', 'text': 'Республика Марий Эл'},
  {'id': '13', 'text': 'Республика Мордовия'},
  {'id': '14', 'text': 'Республика Саха (Якутия)'},
  {'id': '15', 'text': 'Северная Осетия - Алания'},
  {'id': '16', 'text': 'Республика Татарстан'},
  {'id': '17', 'text': 'Республика Тыва'},
  {'id': '18', 'text': 'Удмуртская Республика'},
  {'id': '19', 'text': 'Республика Хакасия'},
  {'id': '20', 'text': 'Чеченская Республика'},
  {'id': '21', 'text': 'Чувашская Республика - Чувашия'},
  {'id': '22', 'text': 'Алтайский край'},
  {'id': '23', 'text': 'Краснодарский край'},
  {'id': '24', 'text': 'Красноярский край'},
  {'id': '25', 'text': 'Приморский край'},
  {'id': '26', 'text': 'Ставропольский край'},
  {'id': '27', 'text': 'Хабаровский край и Еврейская автономная область'},
  {'id': '28', 'text': 'Амурская область'},
  {'id': '29', 'text': 'Архангельская область и Ненецкий автономный округ'},
  {'id': '30', 'text': 'Астраханская область'},
  {'id': '31', 'text': 'Белгородская область'},
  {'id': '32', 'text': 'Брянская область'},
  {'id': '33', 'text': 'Владимирская область'},
  {'id': '34', 'text': 'Волгоградская область'},
  {'id': '35', 'text': 'Вологодская область'},
  {'id': '36', 'text': 'Воронежская область'},
  {'id': '37', 'text': 'Ивановская область'},
  {'id': '38', 'text': 'Иркутская область'},
  {'id': '39', 'text': 'Калининградская область'},
  {'id': '40', 'text': 'Калужская область'},
  {'id': '41', 'text': 'Камчатский край и Чукотский автономный округ'},
  {'id': '42', 'text': 'Кемеровская область - Кузбасс'},
  {'id': '43', 'text': 'Кировская область'},
  {'id': '44', 'text': 'Костромская область'},
  {'id': '45', 'text': 'Курганская область'},
  {'id': '46', 'text': 'Курская область'},
  {'id': '47', 'text': 'Ленинградская область'},
  {'id': '48', 'text': 'Липецкая область'},
  {'id': '49', 'text': 'Магаданская область'},
  {'id': '50', 'text': 'Московская область'},
  {'id': '51', 'text': 'Мурманская область'},
  {'id': '52', 'text': 'Нижегородская область'},
  {'id': '53', 'text': 'Новгородская область'},
  {'id': '54', 'text': 'Новосибирская область'},
  {'id': '55', 'text': 'Омская область'},
  {'id': '56', 'text': 'Оренбургская область'},
  {'id': '57', 'text': 'Орловская область'},
  {'id': '58', 'text': 'Пензенская область'},
  {'id': '59', 'text': 'Пермский край'},
  {'id': '60', 'text': 'Псковская область'},
  {'id': '61', 'text': 'Ростовская область'},
  {'id': '62', 'text': 'Рязанская область'},
  {'id': '63', 'text': 'Самарская область'},
  {'id': '64', 'text': 'Саратовская область'},
  {'id': '65', 'text': 'Сахалинская область'},
  {'id': '66', 'text': 'Свердловская область'},
  {'id': '67', 'text': 'Смоленская область'},
  {'id': '68', 'text': 'Тамбовская область'},
  {'id': '69', 'text': 'Тверская область'},
  {'id': '70', 'text': 'Томская область'},
  {'id': '71', 'text': 'Тульская область'},
  {'id': '72', 'text': 'Тюменская область'},
  {'id': '73', 'text': 'Ульяновская область'},
  {'id': '74', 'text': 'Челябинская область'},
  {'id': '75', 'text': 'Забайкальский край'},
  {'id': '76', 'text': 'Ярославская область'},
  {'id': '77', 'text': 'Москва'},
  {'id': '78', 'text': 'Санкт - Петербург'},
  {'id': '80', 'text': 'Донецкая Народная Республика'},
  {'id': '81', 'text': 'Луганская Народная Республика'},
  {'id': '82', 'text': 'Республика Крым и Севастополь'},
  {'id': '84', 'text': 'Херсонская область'},
  {'id': '85', 'text': 'Запорожская область'},
  {'id': '86', 'text': 'Ханты - Мансийский АО'},
  {'id': '89', 'text': 'Ямало - Ненецкий АО'}
];

// function hidden list > 8
$(function () {

	// hidden list > 8
	$('.district-branches-box').each(function () {
		if ($(this).find('.district-branches-list a').length > 8) {
				$(this).find('.district-branches-list a').slice(8).hide();
				$(this).find('.district-branches-box__body').append('<a href="#" class="link text-decoration color-accent load-more-wrap">Раскрыть</a>');
		}
});

// hidden list > 8

// show list all
$('.load-more-wrap').on('click', function(e){
  e.preventDefault();
  
  var
    $this = $(this),
    content = $(this).parents('.district-branches-box__body').find('.district-branches-list a');  
  
  
  if(!$this.hasClass('trigger')){
    $this.addClass('trigger');
    $this.html('Свернуть');
    
    content.show();
  } else {
    $this.removeClass('trigger');
    $this.html('Раскрыть');
    
    content.slice(8).hide();
  }
});
	// show list all
});