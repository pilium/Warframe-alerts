let triggers = document.querySelectorAll('.trigger');
const modalWrapper = document.querySelector('.modal-wrapper');
const pageWrapper = document.querySelector('.main-wrapper');

triggers.forEach((trigger) => {
    trigger.addEventListener('click', function() {
       modalWrapper.classList.toggle('open');
       pageWrapper.classList.toggle('blur');
       return false;
    })
});