
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

     // Seccion intro y titulo
    const title=document.getElementById("title");
    const basicInfo=textos[lengIdioma].basicInfo;

    // Seccion proyectos
    const titleProyect= document.getElementById('title-proyects');
    const subTitleProyect=document.getElementById('subtitle-proyects');
    const infoProyect=document.getElementById("info-proyects");
    const gitProyect= document.getElementById('git-proyect');
    const demoProyect= document.getElementById('demo-proyect');
    const proyects=textos[lengIdioma].proyects1;
    const links=textos[lengIdioma].links;

    const intro=document.getElementById('introduction');
    lista.innerHTML = `
        <li><a>${nav.home}</a></li>
        <li><a>${nav.proyect}</a></li>
        <li><a>${nav.about}</a></li>
    `;

    // Seccion intro y titulo
    title.textContent = basicInfo.title;
    title.classList.remove("title-es", "title-en");
    void title.offsetWidth;
    title.classList.add(lengIdioma === "es" ? "title-es" : "title-en");
    intro.textContent=basicInfo.info;


    // Seccion proyectos
    titleProyect.textContent=proyects.title
    subTitleProyect.textContent=proyects.subtitle
    infoProyect.textContent=proyects.info
    gitProyect.innerHTML=`<i class="fa-brands fa-github"></i>${links.code}`
    demoProyect.innerHTML=`<i class="fa-solid fa-up-right-from-square"></i>${links.Demo}`

}