const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const resultsEl = document.getElementById("results")
let page = 1;

const buttonEl = document.getElementById("button")


const accessKey = "OdqIINV4hNzFiBE7qaEShuVxKFMwj_sdTBGDbV6yeeo";

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchImages();

})
buttonEl.onclick = () => {
    page++
    fetchImages();
}


async function fetchImages() {
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();


    for (let item of data.results) {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');


        const imageEl = document.createElement('img');
        imageEl.classList.add('images');
        imageEl.setAttribute('src', item.urls.regular)


        const aEl = document.createElement('a');
        aEl.classList.add('qr');
        aEl.innerText = item.alt_description
        aEl.setAttribute("href", item.links.html);
        aEl.setAttribute("target", "_blank")


        cardEl.append(imageEl);
        cardEl.append(aEl);
        resultsEl.append(cardEl);
    }

    if (data.results.length >= 10) {
        buttonEl.style.display = "block"
    } else {
        buttonEl.style.display = "none"
    }

}
