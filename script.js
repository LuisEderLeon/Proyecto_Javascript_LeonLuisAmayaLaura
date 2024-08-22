var page = 1;
var information;

function listStuff(){
    let url = document.querySelector("select#category").value
    let listElement = document.querySelector("section#list")
    switch (url) {
        case "people":
            document.querySelector("div#category section").style.display = "block"
            break;
    
        default:
            document.querySelector("div#category section select").selectedIndex = 0;
            document.querySelector("div#category section").style.display = "none"
            break;
    }

    let promise = fetch(`https://swapi.dev/api/${url}/?page=${page}`).then((value) => value.json());
    promise.then((value) => {
        let id = 0;
        information = value.results;
        let color = document.querySelector("div#category section select").value

        listElement.replaceChildren();
        information.forEach(element => {
            if (color == "default" || element.skin_color == color){
                const div = document.createElement('div');
                const p = document.createElement('p')
                p.textContent = element.name || element.title;
                div.appendChild(p)
                let infoButton = document.createElement('a')
                infoButton.innerHTML = '<img src="assets/more.svg" alt="logo de la página">'
                infoButton.id = id;
                id += 1;
                infoButton.classList.add("info")
                infoButton.href = `item.html?type=${url}&id=${element.url.slice(element.url.lastIndexOf("/", element.url.length - 2) + 1, (element.url.length - 1))}`

                div.appendChild(infoButton)
                listElement.appendChild(div);
            }
        });
        const buttonsSection = document.querySelector("section#buttons")
        buttonsSection.replaceChildren()
        if (value.previous != null) {
            const previousButton = document.createElement('button');
            previousButton.id = 'previous';
            previousButton.textContent = 'Anterior';
            buttonsSection.appendChild(previousButton);
        
            const previousPage = function() {
                page -= 1;
                listStuff();
                this.removeEventListener('click', previousPage);
            };
            
            previousButton.addEventListener('click', previousPage);
        }
        
        if (value.next != null) {
            const nextButton = document.createElement('button');
            nextButton.id = 'next';
            nextButton.textContent = 'Siguiente';
            buttonsSection.appendChild(nextButton);
        
            const nextPage = function() {
                page += 1;
                listStuff();
                this.removeEventListener('click', nextPage);
            };
            
            nextButton.addEventListener('click', nextPage);
        }
    });
}

document.querySelector("button#category").addEventListener("click",() => document.querySelector("main").textContent = "")
document.querySelector("button#category").addEventListener("click",() => page = 1)
document.querySelector("button#category").addEventListener("click",listStuff);

document.querySelector("section#searchForm button").addEventListener("click", () => {
    let search = document.querySelector("section#searchForm div input").value;
    let url = document.querySelector("section#searchForm select").value;
    console.log(url)
    let promise = fetch(`https://swapi.dev/api/${url}/?search=${search}`).then((value) => value.json());
    promise.then((value) => {
        information = value.results;
        if (information.length != 0){
            window.location.href = `item.html?type=${url}&id=${information[0].url.slice(information[0].url.lastIndexOf("/", information[0].url.length - 2) + 1, (information[0].url.length - 1))}`
        }else{
            alert("Nombre no encontrado para la categoria seleccionada")
        }
    });
    
})