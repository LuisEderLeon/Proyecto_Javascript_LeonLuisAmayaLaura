var page = 1;
var information;

function listStuff(){
    let url = document.querySelector("select#category").value
    let listElement = document.querySelector("section#list")

    let promise = fetch(`https://swapi.dev/api/${url}/?page=${page}`).then((value) => value.json());
    promise.then((value) => {
        let id = 0;
        information = value.results;

        listElement.replaceChildren();
        value.results.forEach(element => {
            const div = document.createElement('div');
            if (url === "films") {
                div.textContent = element.title;
            } else {
                div.textContent = element.name;
            }
            let infoButton = document.createElement('button')
            infoButton.textContent = "Mas informacion"
            infoButton.id = id;
            id += 1;
            infoButton.classList.add("info")

            const moreInfo = function() {
                document.querySelector("main").innerHTML = ""
                for (let key in information[this.id])
                document.querySelector("main").innerHTML += `<hr> ${key}: ${information[this.id][key]}`
            };
            
            infoButton.addEventListener('click', moreInfo);
            div.appendChild(infoButton)
            listElement.appendChild(div);
        });
        if (value.previous != null) {
            const previousButton = document.createElement('button');
            previousButton.id = 'previous';
            previousButton.textContent = 'Anterior';
            listElement.appendChild(previousButton);
        
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
            listElement.appendChild(nextButton);
        
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
document.querySelector("button#category").addEventListener("click",() => page=1)
document.querySelector("button#category").addEventListener("click",listStuff);