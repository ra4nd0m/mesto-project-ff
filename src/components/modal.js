// Функция открытия попапа
export function openModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 0);
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('mousedown', handleOverlayClick);
}
// Функция закрытия попапа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 600);
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('mousedown', handleOverlayClick);
}

// Функция закрытия попапа нажатием на Esc
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
}