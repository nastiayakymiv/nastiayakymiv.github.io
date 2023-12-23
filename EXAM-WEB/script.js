const paragraphs = document.getElementsByTagName('p');
const resultInput = document.getElementById('result');
let clickCount = 0;
function handleClick() {
    clickCount++;
    resultInput.value = clickCount;
}
for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].addEventListener('click', handleClick);
}