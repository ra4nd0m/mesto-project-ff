import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
// @todo: Темплейт карточки

//DOM узлы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');


//Вывести карточки на страницу
for (const cardData of initialCards) {
    const cardElement = createCard(cardData, deleteCard, toggleLike);
    placesList.appendChild(cardElement);
}

// Обработчики событий для открытия попапов
editButton.addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_edit');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openModal(popup)
});
addButton.addEventListener('click', () => openModal(document.querySelector('.popup_type_new-card')));

// Обработчик события для формы добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.prepend(cardElement);
    closeModal(document.querySelector('.popup_type_new-card'));
    newCardForm.reset();
});

// Обработчики событий для закрытия попапов
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

// Обработчик события для открытия попапа с изображением
document.querySelectorAll('.card__image').forEach(image => {
    image.addEventListener('click', (event) => {
        const popup = document.querySelector('.popup_type_image');
        const popupImage = popup.querySelector('.popup__image');
        const popupCaption = popup.querySelector('.popup__caption');

        popupImage.src = event.target.src;
        popupImage.alt = event.target.alt;
        popupCaption.textContent = event.target.alt;

        openModal(popup);
    });
});

// Обработчик события для формы редактирования профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closeModal(document.querySelector('.popup_type_edit'));
});

//Функция открытия попапа с изображением
function openImagePopup(event) {
    const popup = document.querySelector('.popup_type_image');
    const popupImage = popup.querySelector('.popup__image');
    const popupCaption = popup.querySelector('.popup__caption');

    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;

    openModal(popup);
}
