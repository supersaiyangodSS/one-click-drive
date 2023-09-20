const pasteBtn = document.querySelector('#pasteBtn');
const output = document.querySelector('#output');
const linkInput = document.querySelector('#link');
const copyBtn = document.querySelector('#copyBtn');
const regex = /(?<=\/d\/)(.*?)(?=\/)/g;
const alertBox = document.querySelector('.alert');

const showAlert = (msg) => {
    alertBox.innerText = msg;
    alertBox.style.top = '10px'
    setInterval(() => {
        alertBox.style.top = '-50px'
    }, 3000);
}

const pasteFn =  () => {
    navigator.clipboard.readText()
    .then(text => {
        linkInput.value = text;
    })
    .catch(err => {
        console.error('Error Pasting:', err);
    });
}

const getLink = () => {
    const linkValue = linkInput.value;
    const idMatch = linkValue.match(regex);
    if (linkInput.value.length > 0) {

        if (idMatch && idMatch[0]) {
            const fileId = idMatch[0];
            output.innerText = `https://drive.google.com/uc?export=download&id=${fileId}`;
        } else {
            output.innerText = 'Invalid Link Provided';
        }
    }
    else {
        output.innerText = ''
    }
}


const copyText = () => {
    const text = output.value;
    if (text.length > 0) {
        navigator.clipboard.writeText(text)
            .then(() => {
                return showAlert('Link copied to clipboard');
            })
            .catch(err => {
                return console.error('An error occurred:', err);
            });
    } else {
        showAlert('Nothing to copy');
    }
};

pasteBtn.addEventListener('click', pasteFn);
linkInput.addEventListener('input', getLink);
copyBtn.addEventListener('click', copyText);
