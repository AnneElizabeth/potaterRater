 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
        crudButtons()
    })

// data functions

// GET
function fetchPotato() {
    fetch("http://localhost:3000/potatoes")
    .then(resp => resp.json())
    .then(data => {
        potatoArray = data
        potatoArray.forEach(addDetailCard)
    })
}

// POST
function postData (name, shape, color, flavor, usage) {
    return fetch ('http://localhost:3000/potatoes', {
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
    .then(data => {
        confirm(`Thank you for your contribution!`)
    })
    .catch(function (error) {
        document.body.innerHTML = error.message
    })
}

// UPDATE
function updateData(potato) {
    fetch ('./${potato.id}', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(potato)
    })
    .then(resp => resp.json())
    .then(data => {

    })
}

// DELETE
function deleteData(id) {
    fetch ('./${id}', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

// display functions

function addDetailCard(potatoes) {
    let detailCard = document.querySelector("#potatoes")
    detailCard.innerHTML +=
        `
        <div class="col">
            <div class="card">
                <img src="${potatoes.img}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${potatoes.name}</h5>
                    <p class="card-text"><strong>SHAPE:</strong> ${potatoes.shape}</p>
                    <p class="card-text"><strong>COLOR:</strong> ${potatoes.color}</p>
                    <p class="card-text"><strong>FLAVOR:</strong> ${potatoes.flavor}</p>
                    <p class="card-text"><strong>USAGE:</strong> ${potatoes.shape}</p> 
                </div>
            </div> 
        </div>   
        `
}

// event listeners

function crudButtons() {
    const newButton = document.querySelector('#newBtn')
    newButton.addEventListener('click', addForm)

    const updateButton = document.querySelector('#updateBtn')
    updateButton.addEventListener('click', updateForm)

    const deleteButton = document.querySelector('#deleteBtn')
    deleteButton.addEventListener('click', deleteForm)
 }

 function submitListenerPost () {
    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const img = document.getElementById('img').value
        const name = document.getElementById('name').value
        const shape = document.getElementById('shape').value
        const color = document.getElementById('color').value
        const flavor = document.getElementById('flavor').value
        const usage = document.getElementById('usage').value
        postData(img, name, shape, color, flavor, usage)
        form.reset()
    }) 
}



function submitListenerUpdate() {
 const form = document.getElementById('form')
form.addEventListener('submit', (event) => {
        event.preventDefault()
       /*  const img = document.getElementById('img').value
        const name = document.getElementById('name').value
        const shape = document.getElementById('shape').value
        const color = document.getElementById('color').value
        const flavor = document.getElementById('flavor').value
        const usage = document.getElementById('usage').value
        postData(img, name, shape, color, flavor, usage) */
        form.reset()
    })
}

function submitListenerDelete() {
    let deletePotato = document.querySelector('card')
    deletePotato.addEventListener('click', () => {
        card.innerHTML.remove()
        deleteData()
    })
}


// form functions

function addForm() {
    let formContainer = document.querySelector('#formContainer')
    formContainer.innerHTML += 

        `
            <form id="form" class="row g3">
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

function updateForm() {
    let formContainer = document.querySelector('#formContainer')
    formContainer.innerHTML += 

        `
        <form id="form" class="row g3">
            <h5>Need to updater your tater? Just enter the new info below.</h5>
                
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
}




