 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
        crudButtons()
    })

// data functions

let baseURL = `http://localhost:3000/potatoes`

// GET
function fetchPotato() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => {
        potatoArray = data
        potatoArray.forEach(addDetailCard)
    })
}

// POST
function postData (name, shape, color, flavor, usage) {
    return fetch (baseURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify ({
        img,
        name,
        shape,
        color,
        flavor,
        usage
        })
    })
    .then(resp => resp.json())
    .then(potato => {
        addDetailCard(potato)
        confirm(`Thank you for your contribution!`)
    })
    .catch(function (error) {
        document.body.innerHTML = error.message
    })
}

// UPDATE
function updateData(img, name, shape, color, flavor, usage) {
    fetch (baseURL + '/${potato.id}', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify ({
        img,
        name,
        shape,
        color,
        flavor,
        usage
        })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)

        confirm(`Thank you for keeping our potatoes fresh!`)
    })
    .catch(function (error) {
            document.body.innerHTML = error.message
    })
}

// DELETE
function deleteData(id) {
    fetch ('potato/${id}', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

// display functions

function addDetailCard(potato) {
    let detailCard = document.querySelector("#potatoes")
    detailCard.innerHTML +=
        `
        <div class="col">
            <div id=${potato.id} class="card">
                <img src="${potato.img}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${potato.name}</h5>
                    <p class="card-text"><strong>SHAPE:</strong> ${potato.shape}</p>
                    <p class="card-text"><strong>COLOR:</strong> ${potato.color}</p>
                    <p class="card-text"><strong>FLAVOR:</strong> ${potato.flavor}</p>
                    <p class="card-text"><strong>USAGE:</strong> ${potato.shape}</p> 
                    <button data-id="${potato.id}" id="edit-${potato.id} newBtn" data-action="edit" type="button" name="Potater Updater" class="btn"><img src="img/pIcon.png" />   Potater Updater</button><br />
                    <button data-id="${potato.id}" id="delete-${potato.id} deleteBtn" data-action="delete" type="button" name="Potater Deleter" class="btn"><img src="img/pIcon.png" />  Potater Hater</button>
                </div>
            </div> 
        </div>   
        `
/*     const updateButton = document.querySelector('#updateBtn')
    updateButton.addEventListener('click', updateForm)

    const deleteButton = document.querySelector('#deleteBtn')
    deleteButton.addEventListener('click', deleteForm) */
}

// event listeners

function crudButtons() {
    const newButton = document.querySelector('#newBtn')
    newButton.addEventListener('click', addForm)

    /* const updateButton = document.querySelector('#updateBtn')
    updateButton.addEventListener('click', updateForm)

    const deleteButton = document.querySelector('#deleteBtn')
    deleteButton.addEventListener('click', deleteForm) */
 }

 function submitListenerPost () {
    const addForm = document.querySelector('#addForm')
    addForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const img = document.querySelector('#img').value
        const name = document.querySelector('#name').value
        const shape = document.querySelector('#shape').value
        const color = document.querySelector('#color').value
        const flavor = document.querySelector('#flavor').value
        const usage = document.querySelector('#usage').value
        postData(img, name, shape, color, flavor, usage)
        form.reset()
    }) 
}



/* function submitListenerUpdate() {
 const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
        event.preventDefault()
        const img = document.querySelector('img').value
        const name = document.querySelector('name').value
        const shape = document.querySelector('shape').value
        const color = document.querySelector('color').value
        const flavor = document.querySelector('flavor').value
        const usage = document.querySelector('usage').value
        updateData(img, name, shape, color, flavor, usage)
        form.reset()
    })
}

function submitListenerDelete() {
    let deletePotato = document.querySelector('card')
    deletePotato.addEventListener('click', () => {
        card.innerHTML.remove()
        deleteData()
    })
} */


// form functions

function addForm() {
    let formContainer = document.querySelector('#formContainer')
    formContainer.innerHTML += 

        `
            <form id="addForm" class="row g3">
                <h5>Did our "eyes" fail us? Add your favorite potater below!</h5>
                
                <label for="img">Image:</label>
                <input type="text" id="img" name="img">

                
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <label for="shape">Shape:</label>
                <input type="text" id="shape" name="shape">
            
                <label for="color">Color:</label>
                <input type="text" id="color" name="color">

                <label for="flavor">Flavor:</label>
                <input type="text" id="flavor" name="flavor">

                <label for="color">Usage:</label>
                <input type="text" id="usage" name="usage">
                
                <button type="submit" id="submit" class="btn"><img src="img/pIcon.png" />  SUBMIT  </button>
            </form>
        `
        location.href = '#formContainer'
        submitListenerPost()
}

/* function updateForm() {
    let formContainer = document.querySelector('#formContainer')
    formContainer.innerHTML += 

        `
        <form id="form" class="row g3">
        <img src="img/pIcon.png" />  <h5>Need to updater a tater?</h5>
            <p>Just enter the new info below.
                
                <label for="img">Image:</label>
                <input type="text" id="img" name="img">

                
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <label for="shape">Shape:</label>
                <input type="text" id="shape" name="shape">
            
                <label for="color">Color:</label>
                <input type="text" id="color" name="color">

                <label for="flavor">Flavor:</label>
                <input type="text" id="flavor" name="flavor">

                <label for="color">Usage:</label>
                <input type="text" id="usage" name="usage">
                
                <button type="submit" id="submit" class="btn"><img src="img/pIcon.png" />  SUBMIT  </button>
            </form>
        `
        location.href = '#formContainer'
        submitListenerUpdate()
}

function deleteForm() {
    let formContainer = document.querySelector('#formContainer')
    formContainer.innerHTML += 
        `
        <form id="form" class="row g3">
            <h5>Are you a tater hater? Just press the button.</h5>
                
                <button type="submit" id="submit" class="btn"><img src="img/pIcon.png" />  LATER TATER  </button>
            </form>
        `
        location.href = '#formContainer'
        submitListenerDelete()
} */




