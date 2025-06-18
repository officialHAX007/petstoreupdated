// File: loadpet.js

const pets = [
    {"name": "Buddy", "type": "Dog", "age": 3, "img": "dog01.jpg"},
    {"name": "Max", "type": "Dog", "age": 4, "img": "dog02.jpg"},
    {"name": "Whiskers", "type": "Cat", "age": 2, "img": "cat01.jpg"},
    {"name": "Mittens", "type": "Cat", "age": 2, "img": "cat02.jpg"},
    {"name": "Daisy", "type": "Dog", "age": 1, "img": "dog03.jpg"},
    {"name": "Shadow", "type": "Cat", "age": 3, "img": "cat03.jpg"},
    {"name": "Pip", "type": "Bird", "age": 1, "img": "bird01.jpg"},
    {"name": "Mango", "type": "Bird", "age": 2, "img": "bird02.jpg"},
    {"name": "Pebble", "type": "Capybara", "age": 3, "img": "capybara01.jpg"},
    {"name": "River", "type": "Capybara", "age": 2, "img": "capybara02.jpg"},
    {"name": "Rocky", "type": "Hamster", "age": 0.5, "img": "https://placehold.co/180x180/ADD8E6/333333?text=Hamster"},
    {"name": "Bubbles", "type": "Fish", "age": 0.8, "img": "https://placehold.co/180x180/90EE90/333333?text=Fish"},
];

/**
 * Renders a given array of pets into the #pet-list div.
 * @param {Array} petsToRender - The array of pet objects to display.
 */
function renderPets(petsToRender) {
    console.log('Rendering pets...');
    const $petList = $('#pet-list');

    if ($petList.length) { // Check if the element exists
        $petList.empty(); // Clear existing content using jQuery

        if (petsToRender.length === 0) {
            $petList.append('<p>No pets found for the selected criteria.</p>');
            return;
        }

        $.each(petsToRender, function(index, pet) { // Iterate using jQuery's $.each
            const $petItem = $('<div>').addClass('pet'); // Create div and add class

            // Populate the innerHTML with pet details: image, name, type, and age.
            $petItem.html(`
                <img src="${pet.img}" alt="${pet.name}" onerror="this.onerror=null;this.src='https://placehold.co/180x180/cccccc/333333?text=Pet+Image';">
                <h3>${pet.name}</h3>
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age} years</p>
                <button onclick="adoptPet()">Adopt Now</button>
            `);
            $petList.append($petItem); // Append to pet list
        });
        console.log('Pets rendered successfully.');
    } else {
        console.error("Error: Element with ID 'pet-list' not found. Pets cannot be loaded on this page.");
    }
}

/**
 * Filters the main pets array based on selected checkboxes and then renders the filtered pets.
 */
function filterAndRenderPets() {
    console.log('Filtering pets...');
    const selectedTypes = $('input[name="pet-type"]:checked').map(function() {
        return this.value;
    }).get(); // Get an array of values from checked checkboxes

    let filteredPets = [];
    if (selectedTypes.length === 0) {
        // If no types are selected, show no pets or all pets depending on desired behavior.
        // For this example, if nothing is checked, nothing is shown.
        filteredPets = [];
    } else {
        filteredPets = pets.filter(pet => selectedTypes.includes(pet.type));
    }

    renderPets(filteredPets);
}

// Use jQuery's document ready function
$(document).ready(function() {
    // Initial load of pets based on default checked checkboxes
    filterAndRenderPets();

    // Attach change event listener to all checkboxes with name "pet-type"
    $('input[name="pet-type"]').on('change', filterAndRenderPets);
});