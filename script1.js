function thambnail() {
    window.location.href = "index2.html";
}
function Menu() {

    document.getElementById("menu1").style.display = "flex";
    Start(event);
}
function Start(event) {
    if (event.code == "Backspace") {
        window.location.reload();
    }
}
