const btn = document.getElementById('btn')
let input = document.querySelector('input')
let result = document.getElementById('result')

function checkPlaceholder(){
    let entity = document.getElementById("entity").value;
        if (entity === 'films') {
            input.setAttribute('placeholder', 'number from 1 to 7');
        } else if (entity === 'people') {
            input.setAttribute('placeholder', 'number from 1 to 87');
        } else if (entity === 'starships') {
            input.setAttribute('placeholder', 'number from 1 to 37');
        } else if (entity === 'vehicles') {
            input.setAttribute('placeholder', 'number from 1 to 39');
        } else if (entity === 'species') {
            input.setAttribute('placeholder', 'number from 1 to 37');
        } else if (entity === 'planets') {
            input.setAttribute('placeholder', 'number from 1 to 61');
        } else {
            alert('Choose an entity');
        }
    };

async function getEntity(item, id) {
    try {
        const response = await fetch(`https://swapi.dev/api/${item}/${id}/`);
        const responseJSON = await response.json();
        if (responseJSON.detail === "Not found") {
            getEntity.catch();
        }
        console.log(responseJSON);
        if (item === 'films') {
            result.innerHTML = `
            <div class="right">
            ${responseJSON.title}
            </div>
        `
        } else {
            result.innerHTML = `
            <div class="right">
            ${responseJSON.name}
            </div>
        `
        };
    } catch (err) {
        result.innerHTML = `
        <div class="error">
            Error 404: ${item} not found
        </div>
        `
    } finally {
        let f = document.querySelector('input');
        f.value = "";
    }
}

btn.addEventListener("click",function (event) {
    event.preventDefault();
    let y = document.querySelector('select').value;
    console.log(y);
    let x = document.querySelector('input').value;
    console.log(x);
    getEntity(y, x);
    result.innerHTML = `
            <div class="mask">
                <div class="loader"></div>
            </div>
        `
});

let mask = document.querySelector('.mask');
result.addEventListener('load'), () => {
    mask.classList.add('hide');
}