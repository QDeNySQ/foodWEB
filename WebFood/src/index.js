import './css/styles.scss';
import './css/zero.scss';
import './css/adaptive.scss';
import logo from './img/fcit-logo.png';

import dishesTpl from './templates/dishes.handlebars';
import dishes from './json/dishesJSON.json';

const refs = {
    dishesBlock: document.querySelector('.dishes-block'),
    logo: document.querySelector('.logo'),
    reserve: document.querySelector('.reserve'),
    reserveBtn: document.querySelector('.reserve-btn'),
    reserveContainer: document.querySelector('.reserve-table'),
    reserveXMark: document.querySelector('.js-fa-xmark'),
    reserveForm: document.querySelector('.reserve-form'),
    reserveName: document.querySelector('#nameInput'),
    reserveNTable: document.querySelector('#numberInput'),
    reserveDate: document.querySelector('#dateInput'),
    errorMessage: document.querySelector('#error'),
    address: document.querySelector('#address')
}

const linkElement = document.createElement('link');
linkElement.rel = 'icon';
linkElement.href = logo;
const headElement = document.head || document.getElementsByTagName('head')[0];
headElement.appendChild(linkElement);

refs.logo.src = logo;

const dishesMarkup = createDishes(dishes);
refs.dishesBlock.innerHTML = dishesMarkup;
function createDishes(dishes){
    return dishesTpl(dishes);
}
refs.reserve.addEventListener('click', reserveTable);
function reserveTable(){
    refs.reserveContainer.classList.add('active');
}
refs.reserveContainer.addEventListener('click', reserveClose);
refs.reserveXMark.addEventListener('click', reserveCLoseX);
function reserveClose(evt){
    if (evt.target.classList.contains('reserve-table')) {
        evt.target.classList.remove('active');
    }
}
function reserveCLoseX(){
    refs.reserveContainer.classList.remove('active');
}
refs.reserveForm.addEventListener('submit', reserveSubmit);
function reserveSubmit(evt){
    evt.preventDefault();
    if (refs.reserveName.value.trim() === '' || refs.reserveNTable.value.trim() === ''|| refs.reserveDate.value.trim() === '') {
        refs.errorMessage.textContent = 'Заповніть всі поля!!!';
        return;
    } else if (refs.reserveNTable.value.trim() > 10 || refs.reserveNTable.value.trim() < 1){
        refs.errorMessage.textContent = 'Виберіть кількість гостей від 1 до 10!!!';
        return;
    }
    refs.errorMessage.textContent = '';
    refs.reserveForm.submit();
}
refs.address.addEventListener('click', openAddress);
function openAddress(){
    const url = 'https://www.google.com/maps/place/Faculty+of+Computer+Information+Technologies/@49.5607243,25.5933273,17z/data=!3m1!4b1!4m6!3m5!1s0x473036b897c1efa5:0xb4784bb5f571674b!8m2!3d49.5607243!4d25.5959022!16s%2Fg%2F1hm4jtw2w?entry=ttu';
    const windowFeatures = 'width=500,height=700,toolbar=no,scrollbars=yes';
    const newWindow = window.open(url, 'SmallWindow', windowFeatures);
    if (!newWindow) {
        alert('Спробуйте ввімкнути спливаючі вікна у вашому браузері!');
    }
}