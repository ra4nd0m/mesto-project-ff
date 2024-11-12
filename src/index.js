
// @todo: Темплейт карточки

// @todo: DOM узлы

//Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', deleteCallback);
    return cardElement;
}
//Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}
//Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
for (const cardData of initialCards) {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
}