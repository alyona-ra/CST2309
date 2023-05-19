let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");

let slider = document.getElementById("slider");
let label = document.querySelector("label");
let imgs = [
    './assets/img/cat1.jpeg',
    './assets/img/cat2.jpeg',
    './assets/img/cat3.jpeg',
    './assets/img/cat4.jpeg',
    './assets/img/cat5.jpeg',
    './assets/img/cat6.jpeg',
    './assets/img/cat7.jpeg',
];
let index = 0;
let curretnImg = new Image();
curretnImg.src = imgs[index];

let intervalID = window.setInterval(() => {
        curretnImg.src = imgs[index];
}, slider.value);

slider.addEventListener('change', () => {
    clearInterval(intervalID);
    intervalID = window.setInterval(() => {
        curretnImg.src = imgs[index];
    }
    , slider.value);
    label.innerHTML = `Speed: ${slider.value / 1000}s`;
});

curretnImg.addEventListener('load', () => {
    const ratio = Math.min(cnv.width / curretnImg.width, cnv.height / curretnImg.height);
    const imgWidth = curretnImg.width * ratio;
    const imgHeight = curretnImg.height * ratio;
    const offsetX = (cnv.width - imgWidth) / 2;
    const offsetY = (cnv.height - imgHeight) / 2;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(curretnImg, 0, 0, curretnImg.width, curretnImg.height, offsetX, offsetY, imgWidth, imgHeight)
    index++;
    if (index >= imgs.length) {
        index = 0;
    }
});

//stop on img click 
cnv.addEventListener('click', () => {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    } else {
        intervalID = window.setInterval(() => {
            curretnImg.src = imgs[index];
        }, slider.value);
    }
});



