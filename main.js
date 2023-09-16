const pasteBtn = document.querySelector('#pasteBtn');
const output = document.querySelector('#output');
const linkInput = document.querySelector('#link');
const copyBtn = document.querySelector('#copyBtn');
const regex = /(?<=\/d\/)(.*?)(?=\/)/g;

pasteBtn.addEventListener('click', () => {
    navigator.clipboard.readText()
    .then(text => {
        linkInput.value = text;
    })
    .catch(err => {
        console.error('Error Pasting:', err);
    });
});

linkInput.addEventListener('input', () => {
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
});

const copyText = () => {
    const text = output.value;
    if (text.length > 0) {
        navigator.clipboard.writeText(text)
            .then(() => {
                return alert('Text copied to clipboard');
            })
            .catch(err => {
                return alert('An error occurred:', err);
            });
    } else {
        alert('Nothing to copy');
    }
};

copyBtn.addEventListener('click', copyText);
