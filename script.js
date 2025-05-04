document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
  
    if (path === "/index.html") {
        createImageMemes();
        createVideoMemes();
    } else if (path === "/images.html") {
        createImageMemes();
    } else if (path === "/videos.html") {
        createVideoMemes();
    }
  });



  function fullscreen(el) {
    const mDiv = el.closest('.meme');
    if (!mDiv) return;

    const imgs = mDiv.querySelectorAll('img');
    const videos = mDiv.querySelectorAll('video');

    let src = '';
    let type = 'image';

    for (let img of imgs) {
        if (!img.src.includes('fullscreen') && !img.src.includes('download')) {
            src = img.src;
            type = 'image';
            break;
        }
    }

    if (!src && videos.length > 0) {
        src = videos[videos.length - 1].src;
        type = 'video';
    }

    if (!src) return;

    const fsDiv = document.createElement('div');
    fsDiv.id = 'img-fs';
    fsDiv.className = 'img-fs';

    if (type === 'image') {
        fsDiv.innerHTML = `<img class="img-fs-content" src="${src}" alt="fullscreen">`;
    } else {
        fsDiv.innerHTML = `<video class="img-fs-content" src="${src}" controls autoplay></video>`;
    }

    document.body.appendChild(fsDiv);

    fsDiv.addEventListener('click', () => {
        fsDiv.remove();
    });
}

function createImageMemes() {
    fetch('images.json')
    .then(response => response.json())
    .then(images => {
        const memeContainer = document.querySelector('.meme-container');
        images.forEach(name => {
        const memeDiv = document.createElement('div');
        memeDiv.className = "meme";
        memeDiv.innerHTML = `
            <div class="panel">
            <a href="memes/${name}" download>
                <img src="images/download.png" alt="download">
            </a>
            <a class="fullscreen-icon" href="#img-fs" onclick="fullscreen(this)">
                <img src="images/fullscreen.png" alt="fullscreen">
            </a>
            </div>
            <img src="memes/${name}" alt="${name}">
        `;
        memeContainer.appendChild(memeDiv);
        });
    });
}

function createVideoMemes() {
    fetch('videos.json')
    .then(response => response.json())
    .then(images => {
        const memeContainer = document.querySelector('.meme-container');
        images.forEach(name => {
        const memeDiv = document.createElement('div');
        memeDiv.className = "meme";
        memeDiv.innerHTML = `
            <div class="panel">
            <a href="memes/${name}" download>
                <img src="images/download.png" alt="download">
            </a>
            <a class="fullscreen-icon" href="#img-fs" onclick="fullscreen(this)">
                <img src="images/fullscreen.png" alt="fullscreen">
            </a>
            </div>
            <video controls src="memes/${name}" type="video/mp4" alt="${name}">
        `;
        memeContainer.appendChild(memeDiv);
        });
    });
}