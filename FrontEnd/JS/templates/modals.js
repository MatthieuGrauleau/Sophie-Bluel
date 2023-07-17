import { getWorks } from "../model/works.js";
import { getCategories } from "../model/categories.js";
import { worksContainer } from "../pages/index.js";
import { showWorksByCategory } from "./filtres.js";
import { token } from "../pages/index.js";
import { selectCategory } from "../pages/index.js";

// --- Affichage de la galerie dans la modale ---

export async function showWorksInModal() {
    let arrWorks = await getWorks();
    arrWorks.forEach((work) => {
        const figureModal = document.createElement('figure');
        const figureImgModal = document.createElement('img');
        const editButton = document.createElement('button');
        const delButton = document.createElement('button');
        figureImgModal.src = work.imageUrl;
        figureImgModal.alt = work.title;
        editButton.innerText = 'éditer';
        editButton.classList.add('editer');
        delButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        delButton.classList.add('delete');
        delButton.addEventListener('click', function () {
            confirmDelWork(work.id);
        });
        worksContainer.appendChild( figureModal );
        figureModal.append(figureImgModal, editButton, delButton);
    });
}

// --- Requète DELETE pour supprimer un projet ---

export async function delWork(workId) {
    const response = await fetch( `http://${window.location.hostname}:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.ok) {

        // Vérifier si la réponse contient des données JSON

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log(result);
        } else {
            console.log('Suppression réussie.');
        }
    } else {
        console.error('Erreur lors de la suppression du fichier.');
    }
}

// --- Confirmation pour suppression ---

function confirmDelWork(workId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        delWork(workId);
        worksContainer.innerHTML = '';
        showWorksInModal();
        showWorksByCategory(0);
    }
}

// --- Récupération dynamique des catégories pour ajout de projet ---

export async function getSelectCategory() {
    const category = await getCategories();
    for (let i = 1; i < category.length; i++) {
        const option = document.createElement('option');
        option.textContent = category[i].name;
        option.value = category[i].id;
        selectCategory.appendChild(option);
    }
}