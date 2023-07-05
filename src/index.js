 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
})

let potatoArray = []
const baseURL = `http://localhost:3000/potatoes`
const potatoBin = document.querySelector('#potatoBin')

// data functions

// GET
function fetchPotato() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => {
        potatoArray = data
        potatoArray.forEach(addPotatoCard)
    })
}

function addPotatoCard(potato) {
    potatoBin.innerHTML +=
    `
    <div class="col">
        <div id=${potato.id} class="card">
            <img src="${potato.img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${potato.name}</h5>
                <p class="card-text"><strong>SHAPE:</strong> ${potato.shape}</p>
                <p class="card-text"><strong>COLOR:</strong> ${potato.color}</p>
                <p class="card-text"><strong>FLAVOR:</strong> ${potato.flavor}</p>
                <p class="card-text"><strong>USAGE:</strong> ${potato.usage}</p>
                <button class="btn" data-id="${potato.id}" data-action="edit">Edit</button> 
                <button class="btn" data-id="${potato.id}" data-action="delete">Delete</button> 
            </div>
        </div> 
    </div>   
    `
}

// POST
const addForm = document.querySelector('#addForm')
addForm.addEventListener('submit', e => {
    e.preventDefault()

    const img  = addForm.querySelector('#img').value
    const name = addForm.querySelector('#name').value
    const shape = addForm.querySelector('#shape').value
    const color = addForm.querySelector('#color').value
    const flavor = addForm.querySelector('#flavor').value
    const usage = addForm.querySelector('#usage').value

    fetch (baseURL, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            img,
            name,
            shape,
            color,
            flavor,
            usage,
        })
    })
    .then(resp => resp.json())
    .then(potato => {
        addPotatoCard(potato)
        confirm(`Thank you for your contribution!`)
        addForm.reset()
    })
    .catch(function (error) {
    document.body.innerHTML = error.message
    })
})
    

// UPDATE
function updatePotato (potato) {
    const editForm = document.querySelector('#editForm')
/* editForm.addEventListener('submit', (e) => {
   
        e.preventDefault() */

    const imgEdit = editForm.querySelector('#edit-img').value          
    const nameEdit = editForm.querySelector('#edit-name').value
    const shapeEdit = editForm.querySelector('#edit-shape').value
    const colorEdit = editForm.querySelector('#edit-color').value
    const flavorEdit = editForm.querySelector('#edit-flavor').value
    const usageEdit = editForm.querySelector('#edit-usage').value

    if (e.target.dataset.action === 'edit') {       
        const potatoData = potatoArray.find((potato) => {
            return potato.id == e.target.dataset.id
        })
    
        fetch (`baseURL/${potatoData.id}`, {
            method: 'PATCH',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify ({
                imgEdit,
                nameEdit,
                shapeEdit,
                colorEdit,
                flavorEdit,
                usageEdit
            })
        })
        .then(resp => resp.json())
        .then(potato => {
            
        })
        .catch(function (error) {
            document.body.innerHTML = error.message
        })
    } 
}  

    
function deletePotato(potato) {  
    if (e.target.dataset.action === 'delete') {
        const deleteForm = document.querySelector(`#potato-${e.target.dataset.id}`).remove()
        fetch(`http://localhost:3000/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => response.json())
    }
}

