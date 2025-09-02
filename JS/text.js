
let textos={};

async function cargarTexto() {
    try {
        const respuesta = await fetch("./Text.json");
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

     // Seccion intro y titulo
    const title=document.getElementById("title");
    const basicInfo=textos[lengIdioma].basicInfo;

    // Seccion proyectos
    const titleProyect= document.getElementById('title-proyects');
    const proyects=textos[lengIdioma].titleProyect;


    //Seccion about
    const titleAbout=document.getElementById("title-about");
    const infoAbout=document.getElementById('info-about');
    const about=textos[lengIdioma].About;

    const intro=document.getElementById('introduction');
    lista.innerHTML = `
        <li><a href="#home">${nav.home}</a></li>
        <li><a href="#projects">${nav.proyect}</a></li>
        <li><a href="#about">${nav.about}</a></li>
    `;

     // Seccion intro y titulo
    title.textContent = basicInfo.title;
    title.classList.remove("title-es", "title-en");
    void title.offsetWidth;
    title.classList.add(lengIdioma === "es" ? "title-es" : "title-en");
    intro.textContent=basicInfo.info;


    // Seccion proyectos
    titleProyect.textContent=proyects.title
    renderProjects(lengIdioma);

    //Seccion about
    titleAbout.textContent=about.title;
    infoAbout.textContent=about.info;
}

function renderProjects(lang) {
    const projectsContainer = document.querySelector(".projects-grid");
    projectsContainer.innerHTML = ""; // limpiar

    const projects = textos[lang].proyects;
    const linksText = textos[lang].links;

    projects.forEach(proj => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
            <div class="project-media">
                <img src="${proj.img}" alt="${proj.subtitle}" class="project-img">
                <video src="${proj.video}" muted loop playsinline></video>
            </div>
            <div class="project-info">
                <h3>${proj.subtitle}</h3>
                <p>${proj.info}</p>
                <div class="project-links">
                    <a href="${proj.links.code}" target="_blank"><i class="fa-brands fa-github"></i> ${linksText.code}</a>
                    <a href="${proj.links.demo}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i> ${linksText.Demo}</a>
                </div>
            </div>
        `;

        // Hover video
        const video = card.querySelector("video");
        card.addEventListener("mouseenter", () => { video.currentTime = 0; video.play(); });
        card.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });

        projectsContainer.appendChild(card);
    });
}


