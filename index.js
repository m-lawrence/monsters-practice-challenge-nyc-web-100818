// fetch monsters
// display first 50 monsters w details
// New monster form above list of monsters
// Button onClick posts new monster to db
// Button at the end of list of monsters onClick displays the next 50 monsters

const monsterContainer = document.querySelector('div#monster-container')

function renderOneMonster(monsterObj) {
    const monsterDiv = document.createElement('div')
    monsterDiv.classList.add('monster-card')
    monsterDiv.dataset.id = monsterObj.id 

    monsterDiv.innerHTML = `Name: ${monsterObj.name} Age: ${monsterObj.age} Description: ${monsterObj.description}`
    // need to change this to create new/separate elements to append to the div

    monsterContainer.append(monsterDiv)
}

function renderAllMonsters() {

    fetch('http://localhost:3000/monsters')
        .then(r => r.json())
        .then(monstersArr => monstersArr.forEach(monster => {
            if(monster.id <= 49) renderOneMonster(monster)
        }))

}

renderAllMonsters()