const Worker = require('worker!./worker');
const worker = new Worker();

const resultElem = document.getElementById('worker-results');

worker.onmessage = (event) => {
    const { msg, timeout } = event.data;
    resultElem.innerHTML = resultElem.innerHTML + msg + '<br>';
};

const btnElem = document.getElementById('worker-button');

btnElem.addEventListener('click', (event) => {
    for (let i = 0; i < 10; i ++) {
        worker.postMessage({});
    }
});
