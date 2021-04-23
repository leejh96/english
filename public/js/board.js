"use strict"
const pageNumber = document.location.pathname.split('/')[3];
const postCount = document.querySelector('#postCount');
let repeatCount = parseInt(parseInt(postCount.value)/10)+1;
let pageInt = parseInt(pageNumber);
let pageCnt = 3;
const leftBtnSpace = document.querySelector('#leftBtnSpace');
const countingPageNumber = document.querySelector('#countingPageNumber');
const rightBtn = document.querySelector('#rightBtnSpace');
const firstPage = document.querySelector('#firstPage');
const lastPage = document.querySelector('#lastPage');

if(parseInt(postCount.value) % 10 === 0){
    repeatCount -= 1;
}

firstPage.innerHTML = '<a href="/board/page/1">처음 </a> '
if(pageInt === 1){
    leftBtnSpace.innerHTML = '';
}else{
    leftBtnSpace.innerHTML = `<a href="/board/page/${pageInt-1}"><</a> `;
}
for(let i = 0; i < repeatCount; i++){
    if (i >= pageCnt){
        break;
    }else{
        if(pageInt === i+1){
            countingPageNumber.innerHTML += `<a href="/board/page/${i+1}" style="text-decoration : underline;" class="aTags">${i+1}</a> `;

        }else{
            countingPageNumber.innerHTML += `<a href="/board/page/${i+1}" class="aTags">${i+1}</a> `;
        }
    }
}
    
if(pageInt === repeatCount){
    rightBtn.innerHTML ='';
}else{
    if(repeatCount === 0){
        rightBtn.innerHTML ='';
    }else{
        rightBtn.innerHTML = `<a href="/board/page/${pageInt+1}">></a>`;
    }
}

if(pageInt > pageCnt){
    const aTags = document.querySelectorAll('.aTags');
    for(let j = 0; j< aTags.length; j++){
        aTags[j].href = `/board/page/${pageInt - pageCnt + 1 + j}`;
        aTags[j].text = `${pageInt - pageCnt + 1 + j}`;
        if(j === aTags.length-1){
            aTags[j].style.textDecoration = 'underline';
        }
    }
}
lastPage.innerHTML = `<a href="/board/page/${repeatCount}"> 끝</a>`;


const auORti = document.querySelector('#auORti');
const searchText = document.querySelector('#searchText');
const searchBtn = document.querySelector('#searchBtn');
const number = document.querySelectorAll('.number');
const title = document.querySelectorAll('.title');
const author = document.querySelectorAll('.author');
const createText = document.querySelectorAll('.createText');

const table = document.querySelector('#table');
searchBtn.addEventListener('click',()=>{
    const element = auORti.options[auORti.selectedIndex].value
    const text = searchText.value;
    if(!text){
        return alert('검색할 내용을 입력하세요');
    }
    fetch('/board/search', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            element,
            text,
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            while (table.rows.length !== 1){
                table.deleteRow(1);
            }
            for(let i = 0; i< res.post.length; i++){
                let newRow = table.insertRow();
                let number = newRow.insertCell(0);
                let title = newRow.insertCell(1);
                let author = newRow.insertCell(2);
                let createText = newRow.insertCell(3);

                number.innerHTML = i+1;
                title.innerHTML = `<a href="/board/${res.post[i].id}">${res.post[i].title}</a>`;
                author.innerHTML = res.post[i].author;
                createText.innerHTML = res.post[i].createText;
            }
            document.querySelector('#countingPage').innerHTML="";
        }else{
            alert(res.message);
            return location.href = `/board/page/${pageNumber}`;
        }
    })
});