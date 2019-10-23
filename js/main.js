// Nav - Scroll to section

$('li').on('click', function () {
  console.log($(this).attr('class'));
  const sectionName = $(this).attr('class');

  $('body, html').animate({
    scrollTop: $(`[data-section = ${sectionName}]`).offset().top + 80
  })
});

// Error when empty input

const inputs = [...document.querySelectorAll('.input')];
const submitBtn = document.querySelector('.submit-btn');

const warning = (e) => {
  e.preventDefault();
  inputs.forEach(input => {

    if (input.value === '') {

      const empty = inputs.find(input => input.value === "");
      empty.classList.add('empty-input');
      console.error('błąd');

    } else if (input.value !== "") {
      input.classList.remove('empty-input')
    }
  })

  inputs.forEach(input => input.value = '')
}

submitBtn.addEventListener('click', warning);