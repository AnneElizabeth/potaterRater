 document.addEventListener('DOMContentLoaded', () => {
        fetchPotato()
    })

// data request

function fetchPotato() {
    fetch("http://localhost:3000/potatoes")
    .then(resp => resp.json())
    .then(data => {
        potatoArray = data
        potatoArray.forEach(addDetailCard)
    })
}


// functions

function addDetailCard(potatoes) {
    let detailCard = document.querySelector(".row")
    detailCard.innerHTML +=
        `
        <div class="col"
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





// form