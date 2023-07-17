import { getWorks } from "../model/works.js";
import { gallery } from "../pages/index.js";

// --- Affichage des projets ---
export async function showWorksByCategory(categoryId) {

    gallery.innerHTML = '';
    let arrWorks = await getWorks();
    if (categoryId!== 0) {
        arrWorks = arrWorks.filter((work) => work.categoryId === categoryId);
    }

    arrWorks.forEach(( work ) => {
        const figureGallery = document.createElement('figure');
        const figureImgGallery = document.createElement('img');
        const figureFigCaptionGallery = document.createElement('figcaption');
        figureImgGallery.src = work.imageUrl;
        figureImgGallery.alt = work.title;
        figureFigCaptionGallery.innerText = work.title;
        gallery.appendChild(figureGallery);
        figureGallery.append(figureImgGallery, figureFigCaptionGallery);
    });
}