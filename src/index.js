 // code telling function to await execution until DOM is loaded
 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
})

// variable for data source for convenience
const baseURL = 'http://localhost:3000'

// select potatoBin div
const potatoBin = document.querySelector('#potatoBin')

// GET function ==> Fetch potato data from /potatoes endpoint

function fetchPotato() {
    fetch(baseURL + '/potatoes')
    .then(resp => resp.json())
    .then((potatoData) => growPotatoes(potatoData))
    }

// iterate over potato objects and apply callback fxn to each one
function growPotatoes(potatoes) {
    potatoes.forEach(addPotatoCard) 
}

// callback fxn that adds each potato's details to cards
function addPotatoCard(potato) {
    potatoBin.innerHTML +=
    `
    <div class="col" id="potato-detail">
        <div id=${potato.id} class="card">
            <div class="card-body">
                <h5 class="card-title">#${potato.id}  ${potato.name}</h5>
                <p class="card-text"><strong>SHAPE:</strong> ${potato.shape}</p>
                <p class="card-text"><strong>COLOR:</strong> ${potato.color}</p>
                <p class="card-text"><strong>FLAVOR:</strong> ${potato.flavor}</p>
                <p class="card-text"><strong>USAGE:</strong> ${potato.usage}</p>
            </div>
        </div> 
    </div>   
    `

}

// POST function ==> add new potato data to /potatoes
const addForm = document.querySelector('#addForm')
addForm.addEventListener('submit', newPotato)

function newPotato(e) {
    e.preventDefault()

    // get values from input fields
    const name = addForm.querySelector('#new-name').value
    const shape = addForm.querySelector('#new-shape').value
    const color = addForm.querySelector('#new-color').value
    const flavor = addForm.querySelector('#new-flavor').value
    const usage = addForm.querySelector('#new-usage').value

    // create new potato object
    let newPotato = {name, shape, color, flavor, usage}

    // use fetch to post new potato's data to server
    fetch (baseURL + '/potatoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify (
            newPotato
        )
    })
    .then(resp => resp.json())
    .then(newPotato => {
        addPotatoCard(newPotato)
        addForm.reset()
    })
    .catch(function (error) {
    document.body.innerHTML = error.message
    })
}
    

// UPDATE function ==> update an existing potato's data

function updatePotato () {
    const editForm = document.querySelector('#editForm')
    
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // get values from input fields

        const name = editForm.querySelector('#edit-name').value
        const shape = editForm.querySelector('#edit-shape').value
        const color = editForm.querySelector('#edit-color').value
        const flavor = editForm.querySelector('#edit-flavor').value
        const usage = editForm.querySelector('#edit-usage').value
        const id = editForm.querySelector('#potato-id').value

        // create updatedPotato object
        let updatedPotato = {name, shape, color, flavor, usage, id}
    
        // use fetch to update potato's data on the server
        fetch (baseURL + '/potatoes/' + id, {
            method: 'PUT',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify (
                updatedPotato
            )
        })
        .then(resp => resp.json())
        .then(updatedPotato => {
            addPotatoCard(updatedPotato)
            location.reload()

            editForm.reset()
        })
        .catch(function (error) {
            document.body.innerHTML = error.message
        })
    })
} 

 // DELETE function ==> delete a potato

function deletePotato() { 
    const deleteForm = document.querySelector('#deleteForm')
    
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // get number of potato to delete
        const id = deleteForm.querySelector('#potato-id').value

        // use fetch to delete potato from server
        fetch(baseURL + '/potatoes/' + id, {
            method: 'DELETE',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
            }).then( response => response.json())
            .then(deletedPotato => {
                console.log(deletedPotato)
                location.reload()
                deleteForm.reset()
            })
        })
    }