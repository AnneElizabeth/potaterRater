document.addEventListener('DOMContentLoaded', () => {
    fetchPotato()
})

// variables


// data requests

function fetchPotato() {
    fetch("http://localhost:3000/potatoes")
    .then(resp => resp.json())
    .then(data => 
        addInfoCard(data))
}

// functions

function addInfoCard() {
    let infoCard = document.querySelector('.card')
    infoCard.innerText +=
        `
            <img src="${potatoes.img}" class="card-img-top" alt="All Blue">
            <div class="card-body">
                <h5 class="card-title">${potatoes.name}</h5>
                <p class="card-text"><strong>SHAPE:</strong> ${potatoes.shape}</p>
                <p class="card-text"><strong>COLOR:</strong> ${potatoes.color}</p>
                <p class="card-text"><strong>FLAVOR:</strong> ${potatoes.flavor}</p>
                <p class="card-text"><strong>USAGE:</strong> ${potatoes.shape}</p>
            </div>
        `
}

// event listeners





// form