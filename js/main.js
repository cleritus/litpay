const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const burgerDark = document.querySelector('.burgerDark');
const burgerExit = document.querySelector('.burger-exit');
const modalBg = document.querySelector('.modal-bg');
const headerDisplayNone = $('.header-ul').css('display');

// Nav - Scroll to section

let sectionActive = '';

$('li').on('click', function () {
  const sectionName = $(this).attr('class');

  if (sectionActive === sectionName) {
    return console.log('You are in the section you click');
  } else {
    modalBg.style.display = 'none';
    $(header).removeClass('activeHead');
    header.classList.remove('hideHead');


    $('body, html').animate({
      scrollTop: $(`[data-section = ${sectionName}]`).offset().top + 40
    })

    sectionActive = sectionName;
  }
});

// Stick nav on desktop

$(document).on('scroll', function () {
  const scrollPosition = $(this).scrollTop();
  const headerHeight = $(header).outerHeight();
  let isActive = 0;
  const headerDisplayNone = $('.header-ul').css('display');

  if ((scrollPosition > headerHeight / 2) && (isActive === 0)) {
    $(header).addClass('activeHead');
    hamburger.style.display = 'none';

    if (headerDisplayNone === 'none') {
      burgerDark.style.display = 'block';
    }

    isActive = 1;
  }

  if (scrollPosition < headerHeight / 2) {
    $(header).removeClass('activeHead');
    hamburger.style.display = 'block';
    burgerDark.style.display = 'none';
    isActive = 0;
  }
})

// Modal nav
const openMenu = () => {
  header.classList.add('hideHead');
  modalBg.style.display = 'block';
}

const closeMenu = () => {
  header.classList.remove('hideHead');
  modalBg.style.display = 'none';
}
hamburger.addEventListener('click', openMenu);
burgerDark.addEventListener('click', openMenu);
burgerExit.addEventListener('click', closeMenu);

// Error when empty input

const inputs = [...document.querySelectorAll('.input')];
const submitBtn = document.querySelector('.submit-btn');

const onSubmitForm = (e) => {
  e.preventDefault();

  let validationError = false;
  inputs.forEach(input => {
    if (input.value === '') {
      input.classList.add('empty-input');
      validationError = true;
      return;
    }

    input.classList.remove('empty-input');
  });

  if (validationError) {
    return;
  }

  $.post('http://litpay.pl/send.php', $('.contact-form').serialize())
    .done(function (result) {
      document.querySelector('.form').style.display = 'none';
      document.querySelector('.success-msg').classList.add('show');
      document.querySelector('.contact-img').classList.toggle('hide');
      document.querySelector('.contact-content').style.alignItems = 'center';
    })
    .fail(function (result) {
      alert("Oops, something wrong. Can't send your message ");
    });
};

submitBtn.addEventListener('click', onSubmitForm);

inputs.forEach(input => input.addEventListener('keydown', () => input.classList.remove('empty-input')));