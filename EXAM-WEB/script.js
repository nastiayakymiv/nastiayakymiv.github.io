const paragraph1 = document.getElementById('paragraph1');
        const paragraph2 = document.getElementById('paragraph2');
        const paragraph3 = document.getElementById('paragraph3');
        const resultInput = document.getElementById('result');
        let clickCount = 0;
        function handleClick() {
            clickCount++;
            resultInput.value = clickCount;
        }
paragraph1.addEventListener('click', handleClick);
paragraph2.addEventListener('click', handleClick);
paragraph3.addEventListener('click', handleClick);