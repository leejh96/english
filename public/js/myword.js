const koORen = document.querySelector('#koORen');
const searchText = document.querySelector('#searchText');
const searchBtn = document.querySelector('#searchBtn');
const number = document.querySelectorAll('.number');
const spelling = document.querySelectorAll('.spelling');
const meaning = document.querySelectorAll('.meaning');
const table = document.querySelector('#table');
const pageNumber = document.location.pathname.split('/')[3];
const wordCount = document.querySelector('#wordCount');

searchBtn.addEventListener('click',()=>{
    const lang = koORen.options[koORen.selectedIndex].value
    const text = searchText.value;
    if(!text){
        return alert('검색할 내용을 입력하세요');
    }
    fetch('/myword/search', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            lang,
            text,
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            while (table.rows.length !== 0){
                table.deleteRow(0);
            }
            for(let i = 0; i< res.word.length; i++){
                let newRow = table.insertRow();
                let number = newRow.insertCell(0);
                let spelling = newRow.insertCell(1);
                let meaning = newRow.insertCell(2);
                number.innerHTML = i+1;
                spelling.innerHTML = `<a href="/myword/${res.word[i].id}">${res.word[i].spelling}</a>`;
                meaning.innerHTML = res.word[i].meaning;
            }
        }else{
            alert(res.message);
            return location.href = `/myword/page/${pageNumber}`;
        }
    })
});

let repeatCount = parseInt(parseInt(wordCount.value)/10)+1;
let pageInt = parseInt(pageNumber);
let pageCnt = 3;
const leftBtnSpace = document.querySelector('#leftBtnSpace');
const countingPageNumber = document.querySelector('#countingPageNumber');
const rightBtn = document.querySelector('#rightBtnSpace');

if(parseInt(wordCount.value) % 10 === 0){
    repeatCount -= 1;
}
if(pageInt === 1){
    leftBtnSpace.innerHTML = '';
}else{
    leftBtnSpace.innerHTML = `<a href="/myword/page/${pageInt-1}"><</a> `;
}
for(let i = 0; i < repeatCount; i++){
    if (i >= pageCnt){
        break;
    }else{
        countingPageNumber.innerHTML += `<a href="/myword/page/${i+1}" class="aTags">${i+1}</a> `
    }
}

if(pageInt === repeatCount){
    rightBtn.innerHTML ='';
}else{
    rightBtn.innerHTML = `<a href="/myword/page/${pageInt+1}">></a>`;
}

if(pageInt > pageCnt){
    const aTags = document.querySelectorAll('.aTags');
    console.log(aTags);
    for(let j = 0; j< aTags.length; j++){
        aTags[j].href = `/myword/page/${pageInt - pageCnt + 1 + j}`;
        aTags[j].text = `${pageInt - pageCnt + 1 + j}`;
    }
}