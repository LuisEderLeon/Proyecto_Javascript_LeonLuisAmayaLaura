const type = new URLSearchParams(window.location.search).get("type");
const id = new URLSearchParams(window.location.search).get("id");

let promise = fetch(`https://swapi.dev/api/${type}/${id}`).then((value) => value.json());
promise.then((value) => {
    document.querySelector("h1").textContent = value.name;
    let paragraph = document.querySelector("p");
    for(key in value){
        paragraph.innerHTML += `${key} - ${value[key]}<br><br>`
    }
});