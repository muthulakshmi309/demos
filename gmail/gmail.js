const createGmail = (() => {
    const itemsPerPage = 8;
    let numberOfPages;
    let currentPage = 1;
    // let tableData;
    (function renderTable() {
        fetch('./data.json', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then((dt) => {
                // tableData = dt;
                createTable(dt);
            })
    })();

    function createTable(data) {
        createTableBody();
        createPageContainer(data);
        createListPage(data);
    }

    function createTableBody() {
        const contElem = document.querySelector('.table-container');
        contElem.innerHTML = `<table class="mail-list" tabindex="0">
            <tbody></tbody>
            </table>`;
    }

    function createPageContainer(data) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const contElem = document.querySelector('.table-container');
        contElem.innerHTML += `<div class="page-container"><div class="page-view">${currentPage} of ${totalPages}</div></div>`;
    }

    function createListPage(data) {
        const startIndex = data.slice(currentPage * itemsPerPage);
        addRows(startIndex, startIndex + itemsPerPage);
    }

    function addRows(data) {
        let tbodyElem = document.querySelector('.table-container tbody');
        let frag = document.createDocumentFragment();
        frag.innerHTML = '';
        // console.log(performance.now())
        for (let i = 0; i < data.length; i++) {
            //check-sqaure, star-fill,
            frag.innerHTML += ` <tr class="mail" data-id=${i}>
                    <td>
                        <div onclick="onCheckboxClick(event)" class="bi bi-square"></div>
                    </td>
                    <td>
                        <div onclick="onStarClick(event)" class="bi bi-star"></div>
                    </td>
                    <td>
                        <div class="email-from">${data[i].username ?? data[i].from}</div>
                    </td>     
                    <td>
                        <div class="subject">${data[i].subject}</div>
                    </td>                   
                    <td>
                        <div class="date">${new Date(data[i].recieved)}</div>
                    </td>
                </tr>`;
        }
        tbodyElem.innerHTML = frag.innerHTML;
        // console.log(performance.now())
    }

    function deleteRow(id) {}


})();

const utils = function() {
    function debounce(cb, timer) {
        let timerId;

        return function(...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                cb.apply(this, ...args);
            }, timer);
        };
    }

    function throttle() {

    }

    return {
        debounce,
        throttle
    }
};

let db = utils().debounce(() => {
    console.log('deb');
}, 1000);

function onSearch(event) {
    console.log(event.target.value);
    db();
}

function onThemeChange(event) {
    event.target.classList.toggle('bi-brightness-high-fill');
    event.target.classList.toggle('bi-brightness-high');
    document.body.classList.toggle('dark');
}

function onTabClick(event) {
    event.currentTarget.querySelectorAll('li').forEach((el) => el.classList.remove('tab-active'));
    let elem = event.target;
    if (elem.tagName !== 'LI') {
        elem = elem.parentElement;
    }
    elem.classList.add('tab-active');
}

function onCheckboxClick(event) {
    event.target.classList.toggle('bi-square');
    event.target.classList.toggle('bi-check-square-fill');
}

function onStarClick(event) {
    event.target.classList.toggle('bi-star');
    event.target.classList.toggle('bi-star-fill');
}

//window.scrollTo({top: 0, behavior: 'smooth'})
//script with defer,nonce