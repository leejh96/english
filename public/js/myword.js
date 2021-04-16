const koORen = document.querySelector('#koORen');
const searchText = document.querySelector('#searchText');
const searchBtn = document.querySelector('#searchBtn');
const number = document.querySelectorAll('.number');
const spelling = document.querySelectorAll('.spelling');
const meaning = document.querySelectorAll('.meaning');
const table = document.querySelector('#table');
searchBtn.addEventListener('click',()=>{
    const lang = koORen.options[koORen.selectedIndex].value
    const text = searchText.value;
    if(!text){
        return alert('검색할 내용을 입력하세요');
    }
    console.log(table.tBody.rows.length)
    fetch('/myword/search/', {
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
        console.log(res);
        if(res.success){
            for(let i = 0; i< tbody.rows.length; i++){
                tbody.deleteRow();
            }
            for(let i = 0; i< res.word.length; i++){
                number[i].innerHTML = i+1;
                spelling[i].innerHTML = res.word[i].spelling;
                meaning[i].innerHTML = res.word[i].meaning;
            }
        }else{
            alert(res.message);
            return location.href = '/myword';
        }
    })


});