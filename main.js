// var to hold array needs to be created
// this new array is ___________
let data2 = [];

console.log("space is cool");

// write printToDom function that takes a string and an id and writes the string to the id
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

// Write buildDomString function that loops over array of planets and creates h1 tags with name + shows each's image
// += ensures that each is added to the empty string originally created
// printToDom calls this accumulated string and prints it to the DOM, landing it in the div with the ID "planets"
// event listeners must be attached here because clicking on the cards yields another domString of just one planet + more details
const buildDomString = (array) => {
    let domString = "";
    array.forEach((planet) => {
        domString += `<div class="planet-card">`
        domString += `<h1 class="planet-names">${planet.name}</h1>`;
        domString += `<img class="hide" src="${planet.imageUrl}">`;
        domString += `</div>`; 
    })
    printToDom(domString, "planets");
    addEventListeners();
};

const domString2 = (planet) => {
    let onlyCardString = "";
    onlyCardString += `<div class="only-card">`;
    onlyCardString += `<button id="x">X</button>`;
    onlyCardString += `<h1 class="onlyName">${planet.name}</h1>`;
    onlyCardString += `<img class="onlyImage" src="${planet.imageUrl}">`;
    if (planet.numberOfMoons === 0) {
        onlyCardString += `<h4>${planet.name} doesn't have any moons.</h4>`;
    } else if (planet.numberOfMoons === 1) {
        onlyCardString += `<h4>${planet.name} has 1 moon.</h4>`;
    } else {
        onlyCardString += `<h4>${planet.name} has ${planet.numberOfMoons} moons.</h4>`;
        onlyCardString += `<h4>The largest one is ${planet.largestMoon}.</h4>`;
      }
    onlyCardString += `<p>${planet.description}</p>`;
    onlyCardString +=`<p>${planet.isGasPlanet}</p>`;
    onlyCardString += `</div>`;
    printToDom(onlyCardString, "planets");
    attachCloseEvent();
}

// the planet name is all that shows in the card (default display)
// this click is not to be confused with closing the single planet card with the button
// the parentNode is the "parent-card" and the children are the h1 and the image. i have only the first child index 0 coded here. 
const mouseClick = (e) => {
    // 
    const planetName = e.target.parentNode.children[0].innerHTML;
    console.log(planetName);
    data2.planets.forEach((planet) => {
        if(planetName === planet.name) {
            domString2(planet);
        }
    })
}

// in these functions the mouseEnter, mouseLeave are defined
// write functions to hide and unhide the two "children" of the div "planet-card"--the name and the image
// classList.add/remove seems to be a built-in method
// what is removed or added is the class "hide"
// so on mouse entry, to the first child (index 0 which is planet.name) the class of hide is added
// also on mouse entry, simultaneously, to the second child of "parent-card", which is planet.imageUrl, the class of "hide" is removed, therefore showing this second child 
const mouseEnter = (e) => {
    e.target.children[1].classList.remove("hide");
    e.target.children[0].classList.add("hide");
}
const mouseLeave = (e) => {
    e.target.children[0].classList.remove("hide");
    e.target.children[1].classList.add("hide");
}

const attachCloseEvent = () => {
    const x = document.getElementById("x");
    x.addEventListener('click', hideStuff);
    }

// the parent node is the 
const hideStuff = (e) => {
    console.log('hideStuff', 'e', e);
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











