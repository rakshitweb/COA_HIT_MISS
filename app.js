const mainForm = document.querySelector('form');
let cacheArr, valueBtn;
let cacheSize, word, tag, block;
let maxSize;
let values;
let binaryValue = [];
let cache = [];
const br = document.createElement('br');

const finalDestination = (count) => {
    for(let i=0;i<Math.pow(2,block);i++){
        cache.push({
            validBit: 0,
            tag: "dontCare"
        });
    }
    const result = document.querySelector('.result')
    for(let i=0;i<count;i++){
        let charVal = binaryValue[i];
        let charTag = charVal.slice(0,tag);
        let charBlock = charVal.slice(tag,tag+block);
        let intBlock = parseInt(charBlock);
        let sum=0;
        let j=0;
        let t;
        while(intBlock!=0){
            t = intBlock%10;
            intBlock = parseInt(intBlock/10);
            sum = sum + t*(Math.pow(2,j));
            j=j+1;
        }
        // console.log(`${charBlock} - ${sum}`)
        const newLi = document.createElement('li');
        if(cache[sum].validBit==0 || (cache[sum].validBit==1 && cache[sum].tag != charTag)){
            cache[sum].validBit=1;
            cache[sum].tag = charTag;
            newLi.innerHTML = `<strong>${values[i].value}</strong> - <strong><i>MISS</i></strong> - (${charVal})`;
        }
        else{
            newLi.innerHTML = `<strong>${values[i].value}</strong> - <strong><i>HIT</i></strong>  - (${charVal})`;
        }
        result.insertAdjacentElement('beforeend', newLi);
    }
}

const processFormat = (count) => {
    let remain;
    for(let i=0;i<count;i++){
        let curr = binaryValue[i];
        remain = cacheSize - curr.length;
        while(remain!=0){
            curr = `0${curr}`;
            remain = remain - 1;
        }
        binaryValue[i] = curr;
    }
    finalDestination(count);
}

const convertToBinary = (count) => {
    let binary;
    let temp;
    for(let i=0;i<count;i++){
        let val = parseInt(values[i].value);
        binary="";
        while(val>0){
            temp = val%2;
            val=parseInt(val/2);
            binary = `${temp}${binary}`;
        }
        binaryValue.push(binary)
    }
    processFormat(count);
}

const validateValues = (count) => {
    let flag=0;
    for(let i=0;i<count;i++){
        if(parseInt(values[i].value)>=maxSize){
            values[i].classList.add('border-red');
            flag=1;
        }
        else{
            values[i].classList.add('border-green');
        }
    }
    if(flag==0){
        // console.log('Correct Sequence');
        convertToBinary(count);
    }else{
        alert(`INCORRECT VALUES FOUND! (SHOULD NOT BE GREATER THAN ${maxSize-1})`);
    }
}

const addDiv = (count) => {
    const listDiv = document.querySelector('.values');
    for(let i=0;i<count;i++){
        const input = document.createElement('input');
        input.required = true;
        input.classList.add('value','margin');
        input.type = "number";
        input.min = "0";
        input.value = 0;
        let description = `Value ${i + 1}`;
        input.placeholder = description;
        listDiv.insertAdjacentElement('beforeend', input);
    }
    listDiv.insertAdjacentElement('beforeend', br)
    values = document.querySelectorAll('.value');
    const button = document.createElement('button');
    button.innerText="Proceed";
    button.classList.add('value-btn','btn','btn-success')
    listDiv.insertAdjacentElement('beforeend', button)
    valueBtn = document.querySelector('.value-btn')
    valueBtn.addEventListener('click', ()=>{
        validateValues(count);
    })
}

mainForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    cacheArr = document.querySelectorAll('.cacheSize')
    word = parseInt(cacheArr[2].value);
    block = parseInt(cacheArr[1].value);
    tag = parseInt(cacheArr[0].value);
    cacheSize = tag + block + word;
    maxSize = Math.pow(2,cacheSize);
    const count = document.querySelector('.count');
    addDiv(count.value);
})

