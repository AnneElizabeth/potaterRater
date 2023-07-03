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

    const imgInput  = addForm.querySelector('#img').value
    const nameInput = addForm.querySelector('#name').value
    const shapeInput = addForm.querySelector('#shape').value
    const colorInput = addForm.querySelector('#color').value
    const flavorInput = addForm.querySelector('#flavor').value
    const usageInput = addForm.querySelector('#usage').value

    fetch (baseURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify ({
            img: imgInput,
            name: nameInput,
            shape: shapeInput,
            color: colorInput,
            flavor: flavorInput,
            usage: usageInput
            })
        })
        .then(resp => resp.json())
        .then(potato => {
            addPotatoCard(potato)
            confirm(`Thank you for your contribution!`)
        })
        .catch(function (error) {
            document.body.innerHTML = error.message
        })
    })
    

// UPDATE
potatoBin.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {
        const potatoData = potatoArray.find((potato) => {
            return potato.id == e.target.dataset.id
        })

        e.target.parentElement.innerHTML +=
        `
        <div class="col">
            <div id="${potato.id}" class="card">
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
        const editForm = document.querySelector('#editForm')
        editForm.addEventListener("submit", (e) => {
            e.preventDefault()

            const imgInput = editForm.querySelector('#edit-img').value          
            const nameInput = editForm.querySelector('#edit-name').value
            const shapeInput = editForm.querySelector('#edit-shape').value
            const colorInput = editForm.querySelector('#edit-color').value
            const flavorInput = editForm.querySelector('#edit-flavor').value
            const usageInput = editForm.querySelector('#edit-usage').value

            fetch (`baseURL/${potatoData.id}`), {
                method: 'PATCH',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify ({
                    image: imgInput,
                    name: nameInput,
                    shape: shapeInput,
                    color: colorInput,
                    flavor: flavorInput,
                    usage: usageInput
                })
                .then(resp => resp.json())
                .then(potato => {
                    updatedPotato.innerHTML +=
                    `
                    <div class="col">
                        <div id="edit-potato-${potato.id} class="card">
                            <div class="card-body">
                                <p class="card-text"><strong>IMAGE:</strong> ${potato.img}
                                <h5 class="card-title">${potato.name}</h5>
                                <p class="card-text"><strong>SHAPE:</strong> ${potato.shape}</p>
                                <p class="card-text"><strong>COLOR:</strong> ${potato.color}</p>
                                <p class="card-text"><strong>FLAVOR:</strong> ${potato.flavor}</p>
                                <p class="card-text"><strong>USAGE:</strong> ${potato.usage}</p>
                                <button id="edit-${potato.id}" data-id="${potato.id}" data-action="edit" class="btn" >Edit</button> 
                                <button id="delete-${potato.id}" data-id="${potato.id}" data-action="delete" class="btn" >Delete</button>
                                <div id="edit-potato-${potato.id}">
                                </div>
                                editForm.innerHTML = "" 
                            </div>
                        </div> 
                    </div>
                    `
                confirm(`Thank you for keeping our potatoes fresh!`)
                })
                .catch(function (error) {
                        document.body.innerHTML = error.message
                })
            }
        })
    } else if (e.target.dataset.action === 'delete') {
        document.querySelector(`#potato-${e.target.dataset.id}`).remove()
          fetch(`${baseURL}/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json())
        }
})