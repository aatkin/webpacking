import Worker from 'worker-loader!./counter_worker';

const btnElem = document.getElementById('worker-button');
const cb = (event) => {
    for (let i = 0; i < 10; i ++) {
        worker.postMessage({});
    }
};

// when module is reloaded, dispose of existing click listener on the button element
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        btnElem.removeEventListener('click', cb);
    });
}

const worker = new Worker();
const resultElem = document.getElementById('worker-results');

worker.onmessage = (event) => {
    const { msg, timeout } = event.data;
    resultElem.innerHTML = resultElem.innerHTML + msg + '<br>';
};

btnElem.addEventListener('click', cb);
