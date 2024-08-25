
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/* SEARCH */
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

// feedback form
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// card section
// Fetching the JSON data

fetch('assets/js/Data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
      console.log(data);
      displayPlants(data);
      detailPlants(data); 

      renderPlants(data);

        document.getElementById('filter-category').addEventListener('change', () => {
            applyFilterAndSort(data);
        });
        document.getElementById('sort-price').addEventListener('change', () => {
            applyFilterAndSort(data);
        });
    });


function displayPlants(plants) {
  const plantContainer = document.getElementById('card-container');

  plants.forEach(plant => {
    const plantElement = document.createElement('div');
    plantElement.className = 'card';
    plantElement.innerHTML = `
      <img src="${plant.image}" alt="Cactus">
      <h3>${plant.name}</h3>
      <p class="scientific-name">${plant.scientific_name}</p>
      <p class="price">Price: $ ${plant.price}</p>
      <button>Add to Cart</button>
    `;
    plantContainer.appendChild(plantElement);
  });
}

function detailPlants(plants) {
  const plantContainer2 = document.getElementById('plant-info');

  plants.forEach(plant => {
     
      const plantContainer = document.createElement('div');
      plantContainer.className = 'info-container';

      const plantImage = document.createElement('div');
      plantImage.className = 'info-left';
      plantImage.innerHTML = `
          <img src="${plant.image}" alt="${plant.name}">
      `;

      const plantData = document.createElement('div');
      plantData.className = 'info-right';
      plantData.innerHTML = `
          <h3 class="plant-name">${plant.name}</h3>
          <h5 class="scientific-name">${plant.scientific_name}  </h5>
          <p class="plant-price">Price: $${plant.price}</p>
          <p class="plant-req"><b> Origin Country </b> : ${plant.Origin_Country} ,<b> Watering Cycle </b>: ${plant.Watering_Cycle}</p>
          <p class="plant-req"><b>Light Requirements</b> : ${plant.Light_Requirements}</p>
          <p class="plant-req"><b>Soil Type</b> :  ${plant.Soil_Type}</p>
          <p class="plant-description">${plant.description}</p>
          <button class="btn add-to-cart">Add to Cart</button>
          <button class="btn contact-us" >Contact Us</button>
      `;

      plantContainer.appendChild(plantImage);
      plantContainer.appendChild(plantData);

      plantContainer2.appendChild(plantContainer);
  });
}

function renderPlants(filteredPlants) {
    const plantContainer = document.getElementById('card-container');
    plantContainer.innerHTML = ''; // Clear the container first

    filteredPlants.forEach(plant => {
        const plantElement = document.createElement('div');
        plantElement.className = 'card';

        plantElement.innerHTML = `
      <img src="${plant.image}" alt="Cactus">
      <h3>${plant.name}</h3>
      <p class="scientific-name">${plant.scientific_name}</p>
      <p class="price">Price: $ ${plant.price}</p>
      <button>Add to Cart</button>
        `;

        plantContainer.appendChild(plantElement);
    });
}


function applyFilterAndSort(plants) {
    const category = document.getElementById('filter-category').value;
    const sortOption = document.getElementById('sort-price').value;

    let filteredPlants = plants;
    if (category !== 'all') {
        filteredPlants = plants.filter(plant => plant.category === category);
    }

    if (sortOption === 'low-to-high') {
      filteredPlants.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-to-low') {
      filteredPlants.sort((a, b) => b.price - a.price);
  }

    renderPlants(filteredPlants);
}


// feedback form

function Sendmail(){

  var params = {
    from_name : document.getElementById("name").value,
    email_id : document.getElementById("email").value,
    message : document.getElementById("message").value,
  }

  emailjs.send("service_tw85ydl","template_swzz92s",params).then(function(res){
    alert("Successfully! " + res.status);
  })
 }
