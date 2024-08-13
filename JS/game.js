const dec = [];
const Sdec = [];
let fcard = null, scard = null;
let count = 0;
let timer;

const timeS = document.getElementById("time");
const scoreS = document.getElementById("score");
const startB = document.getElementById("start");
const pauseB = document.getElementById("pause");
let score = 0;
let time = 0;
function pause()
{
    if (timer != null)
    {
        clearInterval(timer);
        timer = null;
        pauseB.innerText = "Resume";
    }
    else
    {
        timer = setInterval(function(){
            timeS.innerHTML = ++time;
        },1000);
        pauseB.innerText = "pause";
    }
}
startB.addEventListener("click", function(){
    timer = setInterval(function(){
        timeS.innerHTML = ++time;
    },1000);
});  

pauseB.addEventListener("click", pause);

for(let i = 1; i < 53;i++)
{   
    if(i < 14)
        dec[i] = `c${i}.png`;
    else if(i < 27)
        dec[i] = `d${i-13}.png`;
    else if(i < 40)
        dec[i] = `h${i-26}.png`;
    else
        dec[i] = `s${i-39}.png`;
}

for(let i = 0; i < 51; i+=2) 
{
    let cardNumber = rand(1,52);
    Sdec[i] = dec[cardNumber];
    Sdec[i+1] = dec[cardNumber];
}
    
    
for(let i = 0; i < 100; i++)
{
    let frand = rand(0,50);
    let srand = rand(0,50);
    [Sdec[frand],Sdec[srand]] =  [Sdec[srand],Sdec[frand]];
}
    
for(let i = 0; i < 50;i++) {
    createCard(Sdec[i]);
}


function cardClick() {
    if ((fcard != null && scard != null) ||timer == null)
        return;
    this.classList.toggle("card-flip");
    if (fcard === null) {
        fcard = this;
    } else if (scard === null) {
        scard = this;
        setTimeout(() => {
            if (fcard.dataset.value !== scard.dataset.value) {
                fcard.classList.toggle("card-flip");
                scard.classList.toggle("card-flip");
            } else {
                fcard.removeEventListener("click", cardClick);
                scard.removeEventListener("click", cardClick);
                scoreS.innerHTML = ++score;
            }
            fcard = null;
            scard = null;
        }, 1000);
    }
    
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCard(src)
{
    const cont = document.querySelector(".card-container");

    const card = document.createElement("div");
    const back = document.createElement("div");
    const front = document.createElement("div");
    const imgfront = document.createElement("img");
    const imgback = document.createElement("img");
    
    card.classList.add("card");
    back.classList.add("card-face");
    back.classList.add("card-back");
    front.classList.add("card-face");
    front.classList.add("card-front");

    cont.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    front.appendChild(imgback);
    back.appendChild(imgfront);
    
    card.addEventListener("click", cardClick);

    imgfront.src = "/img/" + src;
    imgback.src = "./img/bb.png";
    imgfront.alt = "b";
    imgback.alt = "joker";
    card.dataset.value = src;

    return card;
}

