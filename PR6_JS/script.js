const header = document.querySelector('header');
const section = document.querySelector('section');

const requestURL = 'https://semegenkep.github.io/json/example.json';

const request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json'
request.send();

request.onload = function() {
    const superHeroes = request.response
    populateHeader(superHeroes)
    showHeroes(superHeroes)
    console.log(superHeroes)
}

function populateHeader(jsonData) {
    let Header = document.querySelector('header');
    let H1 = document.createElement('h1');
    H1.textContent = jsonData["squadName"];
    Header.appendChild(H1);

    let paragraph = document.createElement('p');
    paragraph.textContent = "Hometown: " + jsonData["homeTown"] + " // Formed: " + jsonData["formed"];
    Header.appendChild(paragraph);
}

function showHeroes(jsonData) {
    let section = document.querySelector('section');
    let heroes = jsonData["members"];

    for (let i=0; i<heroes.length; i++) {
        let Article = document.createElement('article');
        let H2 = document.createElement('h2');
        let paragraph1 = document.createElement('p');
        let paragraph2 = document.createElement('p');
        let paragraph3 = document.createElement('p');
        let ListUl = document.createElement('ul');

        H2.textContent = heroes[i].name;
        paragraph1.textContent = "Secret identity: " + heroes[i].secretIdentity;
        paragraph2.textContent = "Age: " + heroes[i].age;
        paragraph3.textContent = "Superpowers: ";

        let superPowers = heroes[i].powers;
        for (let j=0; j<superPowers.length; j++) {
            let ListLi = document.createElement('li');
            ListLi.textContent = superPowers[j];
            ListUl.appendChild(ListLi);

            Article.appendChild(H2);
            Article.appendChild(paragraph1);
            Article.appendChild(paragraph2);
            Article.appendChild(paragraph3);
            Article.appendChild(ListUl);

            section.appendChild(Article);
        }

    }
}