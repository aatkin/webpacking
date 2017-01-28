let counter = 1;

onmessage = function(event) {
    let timeout = Math.ceil(Math.random() * 1000);
    let msg = `web worker is counting hard: ${counter++}`;

    setTimeout(() => {
        const payload = {
            timeout,
            msg
        };
        postMessage(payload);
    }, timeout);
};