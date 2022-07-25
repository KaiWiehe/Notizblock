let header = [];
let contentText = [];

let trashHeader = [];
let trashText = [];

load();

function render() {
    let content = document.getElementById('content-container');
    content.innerHTML = '';

    let trash = document.getElementById('trash-container');
    trash.innerHTML = '';


    for (let i = 0; i < header.length; i++) {
        content.innerHTML += /* html */ `
        <div class="content" id="content">
            <img class="pin" src="push_pin_FILL0_wght400_GRAD0_opsz48.svg" alt="Stecknadel">
            <div class="content-header" id="content-header">
                <h1>${header[i]}</h1>
            </div>
            <div class="content-text" id="content-text">${contentText[i]}</div>
            <div class="del-img">
                <img onclick="deleteItem(${i})" src="delete_FILL0_wght400_GRAD0_opsz48.svg" alt="Mülleimer">
            </div>
            <!-- man muss in den button auch das "i" schreiben, sonst gibt er die Zahl nicht weiter -->
        </div>`;
    }

    for (let t = 0; t < trashHeader.length; t++) {
        trash.innerHTML += /* html */ `
        <div class="content" id="content">
            <img class="pin" src="push_pin_FILL0_wght400_GRAD0_opsz48.svg" alt="Stecknadel">
            <div class="content-header" id="content-header">
                <h1>${trashHeader[t]}</h1>
            </div>
            <div class="content-text" id="content-text">${trashText[t]}</div>
            <div class="return-img">
                <img onclick="returnTodo(${t})" src="autorenew_FILL0_wght400_GRAD0_opsz48.svg">
                <img onclick="deleteComplete(${t})" src="delete_FILL0_wght400_GRAD0_opsz48.svg" alt="Mülleimer">
            </div>
        </div>`;
    }
}

function addNote() {
    let inputTitel = document.getElementById('input-titel');
    let inputContent = document.getElementById('input-content');
    header.push(inputTitel.value);
    contentText.push(inputContent.value);
    render();
    save();
    inputTitel.value = '';
    inputContent.value = '';
}

function deleteItem(i) {
    trashHeader.push(header[i]);
    trashText.push(contentText[i]);
    header.splice(i, 1);
    contentText.splice(i, 1)
    render();
    save();
}

function returnTodo(i) {
    header.push(trashHeader[i]);
    contentText.push(trashText[i]);
    trashHeader.splice(i, 1);
    trashText.splice(i, 1);
    render();
    save();
}

function deleteComplete(i) {
    trashHeader.splice(i, 1);
    trashText.splice(i, 1);
    render();
    save();
}

function save() {
    let headerAsText = JSON.stringify(header);
    let contentTextAsText = JSON.stringify(contentText);

    let trashHeaderAsText = JSON.stringify(trashHeader);
    let trashTextAsText = JSON.stringify(trashText);

    localStorage.setItem('header', headerAsText);
    localStorage.setItem('contentText', contentTextAsText);

    localStorage.setItem('trashHeader', trashHeaderAsText);
    localStorage.setItem('trashText', trashTextAsText);
}

function load() {
    let headerAsText = localStorage.getItem('header');
    let contentTextAsText = localStorage.getItem('contentText');

    let trashHeaderAsText = localStorage.getItem('trashHeader');
    let trashTextAsText = localStorage.getItem('trashText');

    if (headerAsText && contentTextAsText) {
        header = JSON.parse(headerAsText);
        contentText = JSON.parse(contentTextAsText);
    }

    if (trashHeaderAsText && trashTextAsText) {
        trashHeader = JSON.parse(trashHeaderAsText);
        trashText = JSON.parse(trashTextAsText);
    }
}