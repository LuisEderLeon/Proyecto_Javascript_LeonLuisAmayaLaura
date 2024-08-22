const type = new URLSearchParams(window.location.search).get("type");
const id = new URLSearchParams(window.location.search).get("id");

let promise = fetch(`https://swapi.dev/api/${type}/${id}`).then((value) => value.json());
promise.then((value) => {
    document.querySelector("h1").textContent = value.name;
    let list = document.querySelector("div");

    for(key in value){
        let paragraph = document.createElement("p")
        paragraph.textContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: `
        if (Array.isArray(value[key])){
            let saveKey = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
            value[key].forEach(element => {
                let content = fetch(element).then((response) => response.json());
                content.then((data) => {
                    paragraph.innerHTML += `<br>- ${data.name || data.title}`
                })
            });
        }else {
            if (/^https:\/\/swapi/.test(value[key])){
                let content = fetch(value[key]).then((response) => response.json());
                let saveKey = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
                content.then((data) => {
                    paragraph.textContent += `${data.name || data.title}`
                });
            } else{
                paragraph.innerHTML += `${value[key]}`
            }
        }
        list.appendChild(paragraph)
    }
});