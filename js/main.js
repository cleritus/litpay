// Nav - Scroll to section

$('li').on('click', function () {
  console.log($(this).attr('class'));
  const sectionName = $(this).attr('class');

  $('body, html').animate({
    scrollTop: $(`[data-section = ${sectionName}]`).offset().top + 80
  })
});


const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const burgerDark = document.querySelector('.burgerDark');
const burgerExit = document.querySelector('.burger-exit');
const modalBg = document.querySelector('.modal-bg');

// Stick nav on desktop

$(document).on('scroll', function () {
  const scrollPosition = $(this).scrollTop();
  const headerHeight = $(header).outerHeight();
  let isActive = 0;

  if ((scrollPosition > headerHeight / 2) && (isActive === 0)) {
    $(header).addClass('activeHead');
    hamburger.style.display = 'none';
    burgerDark.style.display = 'block';
    isActive = 1;
  }

  if (scrollPosition < headerHeight) {
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


/* zmianny w index.html:
 line35 <img class="hamburger burger" src="./images/icons/burger_menu.svg" alt="Burger menu">
 line36 <img class="hamburger burgerDark" src="./images/icons/burger_menu_dark.svg" alt="Burger menu">

 header.scss
 line28

*/