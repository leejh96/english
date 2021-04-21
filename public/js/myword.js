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
const firstPage = document.querySelector('#firstPage');
const lastPage = document.querySelector('#lastPage');


if(parseInt(wordCount.value) % 10 === 0){
    repeatCount -= 1;
}

firstPage.innerHTML = '<a href="/myword/page/1">처음 </a> '
if(pageInt === 1){
    leftBtnSpace.innerHTML = '';
}else{
    leftBtnSpace.innerHTML = `<a href="/myword/page/${pageInt-1}"><</a> `;
}
for(let i = 0; i < repeatCount; i++){
    if (i >= pageCnt){
        break;
    }else{
        if(pageInt === i+1){
            countingPageNumber.innerHTML += `<a href="/myword/page/${i+1}" style="text-decoration : underline;" class="aTags">${i+1}</a> `;

        }else{
            countingPageNumber.innerHTML += `<a href="/myword/page/${i+1}" class="aTags">${i+1}</a> `;
        }
    }
}
    
if(pageInt === repeatCount){
    rightBtn.innerHTML ='';
}else{
    if(repeatCount === 0){
        rightBtn.innerHTML ='';
    }else{
        rightBtn.innerHTML = `<a href="/myword/page/${pageInt+1}">></a>`;
    }
}

if(pageInt > pageCnt){
    const aTags = document.querySelectorAll('.aTags');
    for(let j = 0; j< aTags.length; j++){
        aTags[j].href = `/myword/page/${pageInt - pageCnt + 1 + j}`;
        aTags[j].text = `${pageInt - pageCnt + 1 + j}`;
        if(j === aTags.length-1){
            aTags[j].style.textDecoration = 'underline';
        }
    }
}
lastPage.innerHTML = `<a href="/myword/page/${repeatCount}"> 끝</a>`;
