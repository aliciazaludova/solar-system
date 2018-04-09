let data2 = [];

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
        domString += `<img class="hide" src="${planet.imageUrl}">`;
        // domString +=`<h4 class="hide" >${planet.description}</h4>`;
        // domString += `<h4 class="hide" >${planet.isGasPlanet}</h4>`;
        domString += `</div>`; 
    })
    printToDom(domString, "planets");
    addEventListeners();
};

const domString2 = (onlyplanet) => {
    let onlyCardString = "";
    onlyCardString += `<div class="only-card">`;
    onlyCardString += `<button id="close">Close</button>`;
    onlyCardString += `<h1 class="onlyName">${planet.name}</h1>`;
    onlyCardString += `<img class="onlyImage" src="${planet.imageUrl}>`;
    if (planet.numberOfMoons === 0) {
        domString += `<h4>${planet.name} doesn't have any moons.</h4>`;
    } else if (planet.numberOfMoons === 1) {
        domString += `<h4>${planet.name} has 1 moon.</h4>`;
    } else {
        onlyCardString += `<h4>${planet.name} has ${planet.numberOfMoons} moons.</h4>`;
        onlyCardString += `<h4>The largest one is ${planet.largestMoon}.`;
      }
    onlyCardString += `<p>${planet.description}</p>`;
    onlyCardString += `</div>`;
    printToDom(onlyCardString, "planets");
}

const mouseClick = (e) => {
    const planetName = e.target.parentNode.children[0];
    data2.planets.forEach((planet) => {
        if(planetName.innerHTML === planet.name) {
            domString2(planet);
        }
    })
}

// write functions to hide and unhide the two "children" of the div "planet-card"--the name and the image
const mouseEnter = (e) => {
    e.target.children[1].classList.remove("hide");
    e.target.children[0].classList.add("hide");
}
const mouseLeave = (e) => {
    e.target.children[0].classList.remove("hide");
    e.target.children[1].classList.add("hide");
}

const closeEvent = (e) => {
    const x = document.getElementById("exit");
        x.addEventListener('click', hideStuff);
    }

const hideStuff = (e) => {
    e.target.parentNode.remove();
    buildDomString(data2.planets);
}

// write function for mouse actions on planet card so name disappears and image appears
const addEventListeners = () => {
    const cards = document.getElementsByClassName("planet-card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", mouseEnter);
        cards[i].addEventListener("mouseleave", mouseLeave);
        cards[i].addEventListener("click", mouseClick);
    }
}
 
// Write executeThisCodeIfXHRFails function that consoles that an error has occurred
function executeThisCodeIfXHRFails() {
    console.log("something broke");
} 
// Write executeThisCodeAfterFileLoaded function that parses xhr response and passes it to a buildDomString function
// function executeThisCodeAfterFileLoaded () {
//     const data = JSON.parse(this.responseText);
//         buildDomString(data.planets);
// }
function executeThisCodeAfterFileLoaded () {
    const data = JSON.parse(this.responseText);
    data2 = data;  // data2
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

// decided to use children of the div instead of the below:
// we are going to be working with three items: planet cards, planet images and planet names
// so it would follow that we need to create classes for each of their tags in the domString
// const planetCards = document.getElementsByClassName("planet-card");
// const planetImages = document.getElementsByClassName("planet-images");
// const planetNames = document.getElementsByClassName("planet-names");










