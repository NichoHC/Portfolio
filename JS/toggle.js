const btnTog = document.getElementById('btn-toggle');
btnTog.addEventListener('click', agregarClase);

const navBar= document.getElementById('navBar');
const theme=document.getElementById('theme')
theme.addEventListener('click',cambiarTema);

const leng= document.getElementById('leng');
leng.addEventListener('click',cambiarIdioma)

function agregarClase() {
    btnTog.classList.toggle("active");
    navBar.classList.toggle("activeBar");
}

function cambiarTema(){
    const icon = theme.querySelector("i");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
    document.body.classList.toggle("dark-mode");

}

function cambiarIdioma(){
    if (leng.textContent === "es") {
    leng.textContent = "en";
    } else {
        leng.textContent = "es";
    }
}