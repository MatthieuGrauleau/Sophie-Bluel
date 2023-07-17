import { showWorksByCategory } from "../templates/filtres.js";

// --- Récupération des catégories de l'API ---

export async function getCategories() {
    const response = await fetch('http://' + window.location.hostname + ':5678/api/categories');
    const arrCategories = await response.json();

    // --- Insertion du bouton `Tous` dans le json ---

    const btnAll = {id: 0, name: `Tous`};
    arrCategories.unshift(btnAll);
    return arrCategories;
}

// --- Création et affichage des boutons filtres ---

export async function displayCategoriesBtn() {

    const btns = document.querySelector('.btns');
    btns.style.display = 'flex';
    const arrCategories = await getCategories();
    for (let i = 0; i < arrCategories.length; i += 1) {

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = arrCategories[i].name;
        btn.setAttribute('id', arrCategories[i].id );
        btns.appendChild(btn);

        // --- Classe .active au chargement de la page ---
        
        if (arrCategories[i].id === 0) {
            btn.classList.add(`active`);
        }
        btn.addEventListener('click', function () {
            const allBtns = document.querySelectorAll('.btn');
            allBtns.forEach( ( btn ) => {
                btn.classList.remove('active');
            });
            btn.classList.toggle('active');
            // --- Condition pour le bouton Tous ---
            showWorksByCategory(arrCategories[i].id);
        });
    }
}
