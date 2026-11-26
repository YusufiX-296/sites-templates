var login = document.getElementById("login");
var form = document.getElementById("login_form");
var btn_close = document.getElementById("btn_close");
var overlay = document.getElementById("overlay");
var myForm = document.getElementById("myForm");

function form_move(){
    setTimeout(move, 1500);
}

function move(){
    form.style.top = "50%";
    form.style.transform = "translate(-50%, -50%)";
    overlay.classList.add("active");
}

function close_form(){
    form.style.top = "-500px";
    form.style.transform = "translate(-50%)";
    overlay.classList.remove("active");

}

window.addEventListener("load", form_move);

login.addEventListener("click",  move);

btn_close.addEventListener("click", close_form);

overlay.addEventListener("click", close_form);

myForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    close_form();
})