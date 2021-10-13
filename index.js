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
    const monsterName = document.createElement('p')
    const monsterAge = document.createElement('p')
    const monsterDescription = document.createElement('p')

    monsterName.textContent = `Name: ${monsterObj.name}`
    monsterAge.textContent = `Age: ${monsterObj.age}`
    monsterDescription.textContent = `Description: ${monsterObj.description}`

    monsterDiv.append(monsterName, monsterAge, monsterDescription)
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