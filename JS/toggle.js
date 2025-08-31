const btnTog = document.getElementById('btn-toggle');
btnTog.addEventListener('click', agregarClase);

const navBar= document.getElementById('navBar');


function agregarClase() {
    btnTog.classList.toggle("active");
    navBar.classList.toggle("activeBar");
}

