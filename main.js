console.log("space is cool");

// write printToDom function that takes a string and an id and writes the string to the id
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

// Write buildDomString function that loops over input array and creates h1 tags with name and adds them to a big string then calls printToDom and passes string

const buildDomString = (array) => {
    let domString = "";
    array.forEach((planet) => {
        domString += `<div class="planet-card">`
        domString += `<h1 class="planet-names">${planet.name}</h1>`;
        domString += `<img class="planet-images" src="${planet.imageUrl}">`;
        domString +=`<h4>${planet.description}</h4>`;
        domString += `<h4>${planet.isGasPlanet}</h4>`;

        if (`${planet.numberOfMoons}` === 0) {
            domString += `<h4>${planet.name} doesn't have any moons.</h4>`;
        } else if (`${planet.numberOfMoons}` === 1) {
            domString += `<h4>${planet.name} has 1 moon.</h4>`;   
        } else 
        domString += `</div>`;
    })
    printToDom(domString, "planets");
}
// Write executeThisCodeIfXHRFails function that consoles that an error has occurred
function executeThisCodeIfXHRFails() {
    console.log("something broke");
} 
// Write executeThisCodeAfterFileLoaded function that parses xhr response and passes it to a buildDomString function
function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
        buildDomString(data.planets);
}

// Write startApplication function - sets up xhr request and executes
const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication();

// when the user moves their mouse over a planet card the name should disappear and the image of the planet should take up the whole card.

// we are going to be working with three items: planet cards, planet images and planet names
// so it would follow that we need to create classes for each of their tags in the domString









