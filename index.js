

const monsterContainer = document.querySelector('div#monster-container')
const newMonsterForm = document.querySelector('form#newMonster')
let monsterMin = 1
let monsterMax = 50
const nextMonsters = document.querySelector('button#forward')
const prevMonsters = document.querySelector('button#back')

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
            if((monster.id <= monsterMax) && (monster.id >= monsterMin)) renderOneMonster(monster)
        }))

}

newMonsterForm.addEventListener('submit', function(event) {
    event.preventDefault()
    
    const nameInput = event.target.name.value
    const ageInput = event.target.age.value
    const descriptionInput = event.target.description.value

    const newMonsterObj = {
        name: nameInput,
        age: ageInput,
        description: descriptionInput
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonsterObj)
    })
        .then(r => r.json())
        .then(renderAllMonsters())

        newMonsterForm.reset()
})

nextMonsters.addEventListener('click', function(e) {
    monsterMax += 50
    monsterMin += 50
    monsterContainer.innerHTML = ""
    renderAllMonsters()
})

prevMonsters.addEventListener('click', function(e) {
    monsterMax -= 50
    monsterMin -= 50
    monsterContainer.innerHTML = ""
    renderAllMonsters()
})

renderAllMonsters()