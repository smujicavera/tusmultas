// Función para abrir el popup
function openPopup(popupId) {
    const popup = document.getElementById(`popup-${popupId}`);
    popup.classList.add('active');
}

// Función para cerrar el popup
function closePopup(popupId) {
    const popup = document.getElementById(`popup-${popupId}`);
    popup.classList.remove('active');
}

// Asignamos la acción de abrir y cerrar los popups a los botones
document.querySelectorAll('.info-btn').forEach(button => {
    const popupId = button.getAttribute('data-info');
    button.addEventListener('click', () => openPopup(popupId));
});

document.querySelectorAll('.close-btn').forEach(button => {
    const popupId = button.closest('.popup').id.replace('popup-', '');
    button.addEventListener('click', () => closePopup(popupId));
});
