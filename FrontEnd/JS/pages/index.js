import { getWorks } from "../model/works.js";
import { getCategories } from "../model/categories.js";
import { displayCategoriesBtn } from "../model/categories.js";
import { showWorksByCategory } from "../templates/filtres.js";
import { showWorksInModal } from "../templates/modals.js";
import { delWork } from "../templates/modals.js";
import { getSelectCategory } from "../templates/modals.js";


export const gallery = document.querySelector('.gallery');
export const token = sessionStorage.accessToken;
console.log(token);
const edition = document.querySelector('.edition');
const modifier = document.querySelectorAll('.modifier');
const login = document.getElementById('login');
const displayModal = document.querySelector('.modifier3');
const modalContainer = document.querySelector('.modalContainer');
const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const close = document.querySelectorAll('.close');
export const worksContainer = document.querySelector('.worksContainer');
const delButton = document.querySelector('.delete');
const addWork = document.querySelector('.addWork');
const back = document.querySelector('.back');
const upTitle = document.getElementById('titre');
const uploadImg = document.getElementById('uploadImg');
export const selectCategory = document.getElementById('categorie');
const submitButton = document.querySelector('.valid');
let preview = document.getElementById('preview');

// --- Conditions lorsque personne n'est connecté (affichage des boutons des différentes catégories) ---
if (!token) {displayCategoriesBtn();}

// --- Affichages des projets ---

showWorksByCategory(0);

// --- Conditions pour mise en page si token valide ---
if (token) {
    edition.style = `display: flex`;
    login.innerText = `logout`;
    modifier.forEach(( button ) => {
        button.style.display = 'flex';
    });
}

// --- Affichage de la modale ---

displayModal.addEventListener('click', function () {
    modalContainer.style.display = 'flex';
    modal.style.display = 'flex';
});

// --- Fermeture de la modale ---
document.addEventListener('click', function ( e ) {
    if (e.target === modalContainer ) {
        closeModal()
    }
});

function closeModal() {
    modalContainer.style.display = 'none';
    modal2.style.display = 'none';
}

close.forEach(function (button) {
    button.addEventListener('click', closeModal);
});

// --- Affichage de la gallery dans la modale ---

showWorksInModal();


// --- "Redirection" vers ajout d'un projet ---

addWork.addEventListener('click', function () {
    modal.style.display = 'none';
    modal2.style.display = 'flex';
    checkConditions();
});

// --- Flèche retour dans la modale ---

back.addEventListener('click', function () {
    modal.style.display = 'flex';
    modal2.style.display = 'none';
    preview.src = '';
    upTitle.value = '';
});

// --- Récupération dynamique des catégories pour ajout de projet ---

getSelectCategory();

// --- Conditions pour le bouton Valider ---

const checkConditions = () => {
    if (uploadImg.files[ 0 ] ?. size < 4000000 && upTitle.value !== '' && selectCategory.value !== '') {
        submitButton.classList.add('envoyer');
    } else {
        submitButton.classList.remove('envoyer');
    }
};
upTitle.addEventListener('input', checkConditions);
selectCategory.addEventListener('input', checkConditions);
uploadImg.addEventListener('input', checkConditions);

// --- Requete POST pour envoyer un nouveau work ---

submitButton.addEventListener('click', async ( e ) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('sendImg'));
    formData.append('image', uploadImg.files[0]);
    formData.append('title', upTitle.value );
    formData.append('category', selectCategory.value );
    if ( submitButton.classList.contains('envoyer') ) {
        const response = await fetch('http://' + window.location.hostname + ':5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
        modal2.style.display = 'none';
        modal.style.display = 'flex';
        worksContainer.innerHTML = '';
        showWorksInModal();
        showWorksByCategory(0);
        upTitle.value = '';
        uploadImg.files[0] = '';
        preview.src = '';
    } else {
        const error = document.createElement('p');
        error.innerText = 'Titre, Catégorie, Taille < 4Mo requis';
        error.style.textAlign = 'center';
        error.style.color = 'red';
        sendImg.appendChild(error);
    }
});

// --- Prévisualisation de l'image ---

function previewImage(event) {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    preview.src = imageUrl;
}

// --- Suppression du token si logout ---

login.addEventListener('click', function () {
    if (token) {
        sessionStorage.removeItem('accessToken');
        location.reload();
    }
});