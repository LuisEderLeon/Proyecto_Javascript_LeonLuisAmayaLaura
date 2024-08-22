const type = new URLSearchParams(window.location.search).get("type");
const id = new URLSearchParams(window.location.search).get("id");

let promise = fetch(`https://swapi.dev/api/${type}/${id}`).then((value) => value.json());
promise.then((value) => {
    document.querySelector("h1").textContent = value.name;
    let list = document.querySelector("div");

    for(key in value){
        let div = document.createElement("div")
        let span = document.createElement("span")
        let paragraph = document.createElement("p")
        div.id = key;
        span.textContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: `
        if (Array.isArray(value[key])){
            value[key].forEach(element => {
                let content = fetch(element).then((response) => response.json());
                content.then((data) => {
                    paragraph.innerHTML += `- ${data.name || data.title}<br>`
                })
            });
        }else {
            if (/^https:\/\/swapi/.test(value[key])){
                let content = fetch(value[key]).then((response) => response.json());
                content.then((data) => {
                    paragraph.textContent += `${data.name || data.title}`
                });
            } else{
                paragraph.innerHTML += `${value[key]}`
            }
        }   
        div.appendChild(span)
        div.appendChild(paragraph)
        list.appendChild(div)
    }

    list.removeChild(document.getElementById("url"))
    list.removeChild(document.getElementById("created"))
    list.removeChild(document.getElementById("edited"))

});