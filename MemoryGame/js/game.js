const grid = document.querySelector(".grid");
const spanVisitor = document.querySelector('.visitor');
const timer = document.querySelector('.timer');

const photos = [
    '02',
    '03',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEnd = () => {
    const disableCards = document.querySelectorAll('.disabled-card');

    if (disableCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns! Seu tempo foi: ${timer.innerHTML} segundos`);
    }
}

const checkCards = () =>{
    const firstPhoto = firstCard.getAttribute('data-photo')
    const secondPhoto = secondCard.getAttribute('data-photo')

    if (firstPhoto === secondPhoto){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEnd();

    }else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }


}
const createCard = (photo) => {
    const card = createElement("div", 'card');
    const front = createElement("div", 'face front');
    const back = createElement("div", 'face back');

    front.style.backgroundImage = `url(../images/${photo}.jpeg)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-photo', photo);

    return card;
}

const loadGame = () => {
    const duplicatePhotos = [...photos, ...photos];

    const misturarArray = duplicatePhotos.sort( () => Math.random() - 0.5);

    misturarArray.forEach((photo)=>{
        const card = createCard(photo);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

window.onload = () => {
    const visitorName = localStorage.getItem('user');
    spanVisitor.innerHTML = `Visitante: ${visitorName}`;
    loadGame();
    startTimer();
}