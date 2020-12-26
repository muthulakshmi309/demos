function addNewTab() {
    let tab = document.createElement('div');
    let tabsContainer = document.getElementsByClassName('tabs-container')[0];
    let str = `<div class='tab-title'>New Tab</div><div class='close' onclick='closeTab(event)'>x</div>`;
    tab.className = 'tab';
    tab.innerHTML = str;
    tabsContainer.append(tab);
}

function closeTab(event) {
    let parentElem = event.target.parentElement;    
    parentElem.remove();
}