import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
// @todo: Темплейт карточки

//DOM узлы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const profileEditPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const newCardPopup = document.querySelector('.popup_type_new-card');

//Вывести карточки на страницу
for (const cardData of initialCards) {
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.appendChild(cardElement);
}

// Обработчики событий для открытия попапов
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openModal(profileEditPopup)
});
addButton.addEventListener('click', () => openModal(newCardPopup));

// Обработчик события для формы добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
});

// Обработчики событий для закрытия попапов
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});


// Обработчик события для формы редактирования профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closeModal(profileEditPopup);
});

//Функция открытия попапа с изображением
function openImagePopup(event) {

    imagePopupImg.src = event.target.src;
    imagePopupImg.alt = event.target.alt;
    imagePopupCaption.textContent = event.target.alt;

    openModal(imagePopup);
}
