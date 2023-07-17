// --- Récupération des projets de l'API ---
export async function getWorks() {
    const response = await fetch('http://' + window.location.hostname + ':5678/api/works');
    const works = await response.json();
    return works;
}