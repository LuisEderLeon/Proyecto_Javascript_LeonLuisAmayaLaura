const type = new URLSearchParams(window.location.search).get("type");
const id = new URLSearchParams(window.location.search).get("id");

let promise = fetch(`https://swapi.dev/api/${type}/${id}`).then((value) => value.json());
promise.then((value) => {
    document.querySelector("h1").textContent = value.name;
    let paragraph = document.querySelector("p");

    for(key in value){
        paragraph.innerHTML += `<hr>${key.charAt(0).toUpperCase() + key.slice(1)}: `
        if (Array.isArray(value[key])){
            let saveKey = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
            value[key].forEach(element => {
                let content = fetch(element).then((response) => response.json());
                content.then((data) => {
                    paragraph.innerHTML = paragraph.innerHTML.slice(0, (paragraph.innerHTML.indexOf(saveKey) + saveKey.length)) + `<br>* ${data.name || data.title}` + paragraph.innerHTML.slice(paragraph.innerHTML.indexOf(saveKey) + saveKey.length)
                })
            });
        }else {
            if (/^https:\/\/swapi/.test(value[key]) && key != "url"){
                let content = fetch(value[key]).then((response) => response.json());
                let saveKey = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
                content.then((data) => {
                    paragraph.innerHTML = paragraph.innerHTML.slice(0, (paragraph.innerHTML.indexOf(saveKey) + saveKey.length)) + `${data.name || data.title}` + paragraph.innerHTML.slice(paragraph.innerHTML.indexOf(saveKey) + saveKey.length)
                });
            } else{
                paragraph.innerHTML += `${value[key]}`
            }
        }
    }
    paragraph.innerHTML = paragraph.innerHTML.slice(0, (paragraph.innerHTML.indexOf("<hr>Created")));
});