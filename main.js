console.log("space is cool");

// Write startApplication function - sets up xhr request and executes
const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "planets.json");
    myRequest.send();
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
// Write buildDomString function that loops over input array and creates h1 tags with name and adds them to a big string then calls printToDom and passes string

const buildDomString = (array) => {
    let domString = "";
    array.forEach((planet) => {
        domString += `<h1>${planet.name}</h1>`;
    })
    printToDom(domString, "planets");
}
// write printToDom function that takes a string and an id and writes the string to the id
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}
startApplication();




