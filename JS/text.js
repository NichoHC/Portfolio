
let textos={};

async function cargarTexto() {
    try {
        const respuesta = await fetch("/Text.json");
        textos = await respuesta.json();
        agregarItems()
    } catch (error) {
        console.error("Error al cargar el json:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    cargarTexto();
    
    const lengBtn = document.getElementById('leng');
    lengBtn.addEventListener("click", () => {
        // Aquí podrías aplicar una clase de "fade out"
        document.body.classList.add("fade-out");

        // Espera 300ms antes de ejecutar el cambio
        setTimeout(() => {
            agregarItems();
            // Luego aplicamos el "fade in"
            document.body.classList.remove("fade-out");
            document.body.classList.add("fade-in");

            // Quitamos la clase después de la animación
            setTimeout(() => {
                document.body.classList.remove("fade-in");
            }, 100);
        }, 100);
    });
});


function agregarItems() {
    const lista = document.getElementById("items");
    let lengIdioma = document.getElementById('leng').textContent;
    const nav = textos[lengIdioma].nav; 

    const title=document.getElementById("title");
    const basicInfo=textos[lengIdioma].basicInfo;

    const intro=document.getElementById('introduction');
    lista.innerHTML = `
        <li><a>${nav.home}</a></li>
        <li><a>${nav.about}</a></li>
        <li><a>${nav.proyect}</a></li>
    `;

        
    title.textContent = basicInfo.title;
    title.classList.remove("title-es", "title-en");
    void title.offsetWidth;
    title.classList.add(lengIdioma === "es" ? "title-es" : "title-en");

    intro.textContent=basicInfo.info;

}