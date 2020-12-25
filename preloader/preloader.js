let isLoaded = true;
let queue = [];
function createLoader() {
    let contentElem = document.getElementsByClassName('content')[0];
    let loaderElem = document.createElement('div');
    loaderElem.className = 'loader';
    let innerElem = document.createElement('div');
    innerElem.className = 'inner';        
    loaderElem.append(innerElem);
    contentElem.append(loaderElem);
    let width = 0;
    let interval;
    queue.push(innerElem);
    function load(elem) {
        if (isLoaded) {
            interval = setInterval(() => {
                isLoaded = false;
                elem.style.width = `${++width}%`;
            }, 30);
            setTimeout(() => {
                clearInterval(interval);                
                isLoaded = true;
                queue.shift();
                width = 0;
                queue.length > 0 && load(queue[0]);
            }, 3000);
        }
    }
    load(queue[0]);
}

