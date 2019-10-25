// Nav - Scroll to section

$('li').on('click', function () {
  console.log($(this).attr('class'));
  const sectionName = $(this).attr('class');

  $('body, html').animate({
    scrollTop: $(`[data-section = ${sectionName}]`).offset().top + 80
  })
});


const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const burgerExit = document.querySelector('.burger-exit');
const modalBg = document.querySelector('.modal-bg');

// Stick nav on desktop

$(document).on('scroll', function () {
  const scrollPosition = $(this).scrollTop();
  const headerHeight = $(header).outerHeight();

  if (scrollPosition > headerHeight / 2) {
    $(header).addClass('activeHead');
    burger.src = 'images/icons/burger_menu_dark.svg'
  }

  // Clear

  if (scrollPosition < headerHeight) {
    $(header).removeClass('activeHead');
    burger.src = 'images/icons/burger_menu.svg';
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
burger.addEventListener('click', openMenu);
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