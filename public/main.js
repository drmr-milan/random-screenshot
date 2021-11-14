let url_string = window.location.href;
let url = new URL(url_string)
let l = url.searchParams.get('l')
if(l !== null) loadImg()

function loadImg() {
    let img = document.createElement('img');
    img.id = 'img_ele'; img.dataset.srcc = `https:/${l}`;
    img.src = img.dataset.srcc;

    document.getElementById('img_holder').append(img);
    window.history.pushState('', "Title", '/');
}

document.getElementById('btn_form').addEventListener('click', () => {
    document.getElementById('btn_form').textContent = 'Loading...';
    document.getElementById('btn_form').style.cursor = 'wait';
    document.body.style.cursor = 'wait'
})

let date = new Date()
document.getElementById('current_y').textContent = date.getFullYear();