// var to hold array needs to be created
// this new array is ___________
let data2 = [];

console.log("space is cool");

// write printToDom function that takes a string and an id and writes the string to the id
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const searchEvent = (planets) => {
    let getSearchInput = document.getElementById('search-planets');
    // the element with the 'search-planets' ID now listens for 'input' or 'keypress'? and then an event (e) is set into motion
    // addEventListener takes a condition (keypress) and a function (e) -- when you hear a keypress event do this function described
    // js is my secretary. there is a report. when a letter key is pressed send me a report about this event (e)
    getSearchInput.addEventListener('keypress', (e) => {
      // the e is an object and target is a property of it. target is a specific property that targets the input field
      let searchValue = e.target.toLowerCase();
      // split would arrange the array values  such as "Does Saturn have moons?" to "Does,Saturn,Have,Moons?". each is now a substring to be matched to words on the DOM
      let splitSearchWords = searchValue.split(' '); // it splits it into words when a space is betw quotes
      // want to console log here but no search terms entered to see?
      // empty array to push searched words matched with words in content of planets.json?
      let outputArray = [];
      // loop through planets in json and through splitSearchWords (what user typed into search field)
      for(let i = 0; i < planets.length; i++) {
        for(let j= 0; j < splitSearchWords.length; j++) {
            // if the name of any planet object (also made lower case) includes any of the search words that have been lower-cased and split, AND are not already in the output array then push the planet name that matches any of the searched words to the outputArray
            if(planets[i].name.toLowerCase().includes(splitSearchWords[j]) && !outputArray.includes(i)){
                outputArray.push(planets[i]);
            }
            // if any of the words in the description of any of the planets, once made lower case, include any of the words entered in search (split and lower-cased) AND are not already in the outputArray then push the words to the outputArray
            else if (planets[i].description.toLowerCase().includes(splitSearchWords[j]) && !outputArray.includes(i)){
                outputArray.push(planets[i]);
            }
          }
        };
        // the comparison stuff above ends now and then we run buildDomString
        buildDomString(outputArray);  // do the buildDomString but do it differently, with outputArray
});

// create a var to hold the input the user types into input field. 'search-planets is the ID of the form element
// querySelector is used because we are identifying it by the tag 'input'
// = document.forms['search-planets'].querySelector('input');
// console.log(searchBar);
// searchBar.addEventListener('keyup', (e) => {
//     // grab the search term the user entered and convert to lower case
//     const term = e.target.value.toLowerCase()
// })

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
