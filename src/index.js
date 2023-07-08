 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
})

// Select potatoBin div
const potatoBin = document.querySelector('#potatoBin')

// GET function ==> Fetch potato data from /potatoes endpoint
const baseURL = 'http://localhost:3000'

function fetchPotato() {
    fetch(baseURL + '/potatoes')
    .then(resp => resp.json())
    .then((potatoData) => growPotatoes(potatoData))
    }

// Iterate over potato objects and apply callback fxn to each one
function growPotatoes(potatoes) {
    potatoes.forEach(addPotatoCard) 
}

// Callback fxn that adds each potato's details to cards

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

// POST
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
        //confirm(`Thank you for your contribution!`)
        addForm.reset()
    })
    .catch(function (error) {
    document.body.innerHTML = error.message
    })
}
    

// UPDATE

function updatePotato () {
    const editForm = document.querySelector('#editForm')
    
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = editForm.querySelector('#edit-name').value
        const shape = editForm.querySelector('#edit-shape').value
        const color = editForm.querySelector('#edit-color').value
        const flavor = editForm.querySelector('#edit-flavor').value
        const usage = editForm.querySelector('#edit-usage').value
        const id = editForm.querySelector('#potato-id').value

        
        let updatedPotato = {name, shape, color, flavor, usage, id}
    
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
            //confirm(`Thank you for the fresh potato!`)
            location.reload()

            editForm.reset()
        })
        .catch(function (error) {
            document.body.innerHTML = error.message
        })
    })
} 

  
function deletePotato() { 
    const deleteForm = document.querySelector('#deleteForm')
    
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const id = deleteForm.querySelector('#potato-id').value


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

    /* if (e.target.dataset.action === 'delete') {
        document.querySelector(`#book-${e.target.dataset.id}`).remove()
          fetch(`${bookURL}/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json())
        }
 */