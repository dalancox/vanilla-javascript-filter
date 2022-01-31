// starting program
console.log('Initialized...');

// grabbing input and values;
const input = document.getElementById('search-bar');
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")

// event listeners for updating the value
input.addEventListener('input', updateValue);

// users array for filtering 
let users = [];

// updating DOM with filtered list 
function updateValue(e) {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisble = 
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisble);
    })
}

// fetch API to grab dummy data
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector('[data-header]');
            const body = card.querySelector('[data-body]');
            header.textContent = user.name;
            body.textContent = user.email;
            userCardContainer.append(card)
            return { name: user.name, email: user.email, element: card }
        });
    });