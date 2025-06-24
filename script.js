// document.addEventListener("DOMContentLoaded", () => {
//     const path = window.location.pathname;
  
//     if (path === "/index.html") {
//         createImageMemes();
//         createVideoMemes();
//     } else if (path === "/images.html") {
//         createImageMemes();
//     } else if (path === "/videos.html") {
//         createVideoMemes();
//     }
//   });

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.split("/").pop(); // тільки "index.html", "images.html" тощо
    // console.log("Завантажено, файл:", path);

    if (path === "" || path === "index.html") {
        createImageMemes();
        createVideoMemes();
    } else if (path === "images.html") {
        createImageMemes();
    } else if (path === "videos.html") {
        createVideoMemes();
    } else {
        // console.warn("Шлях не підтримується:", path);
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fsDiv.remove();
        }
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
                <span class="meme-name-in-panel" >${name}</span>
                <div class="panel-right"> 
                    <a href="memes/${name}" download>
                        <img src="images/download.png" alt="download">
                    </a>
                    <a class="fullscreen-icon" href="#img-fs" onclick="fullscreen(this)">
                        <img src="images/fullscreen.png" alt="fullscreen">
                    </a>
                </div>
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
                <span class="meme-name-in-panel" >${name}</span>
                <div class="panel-right"> 
                    <a href="memes/${name}" download>
                        <img src="images/download.png" alt="download">
                    </a>
                    <a class="fullscreen-icon" href="#img-fs" onclick="fullscreen(this)">
                        <img src="images/fullscreen.png" alt="fullscreen">
                    </a>
                </div>
            </div>
            <video controls src="memes/${name}" type="video/mp4" alt="${name}">
        `;
        memeContainer.appendChild(memeDiv);
        });
    });
}

document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const images = document.querySelectorAll(".meme-container .meme");

    images.forEach((item) => {
        const name = item.querySelector("img").getAttribute("data-name").toLowerCase();
        if (name.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});


// Page color change .no-text-color-change t odisable

// const accentInput = document.getElementById('accentColor');

// if (accentInput) {
//   accentInput.addEventListener('input', (e) => {
//     const newColor = e.target.value;
//     applyAccentColor(newColor);
//     localStorage.setItem('accentColor', newColor);
//     document.documentElement.style.setProperty('--accent-color', newColor);

//     const isDark = isDarkColor(newColor);
//     const textColor = isDark ? '#ffffff' : '#000000';

//     document.body.style.color = textColor;

//     document.querySelectorAll('*:not(.no-text-color-change):not(.no-text-color-change *)').forEach(el => {
//       el.style.color = textColor;
//     });

//     document.querySelectorAll('.no-text-color-change td.today').forEach(el => {
//       el.style.color = textColor;
//     });
//   });
// }

// function isDarkColor(hex) {
//   const r = parseInt(hex.substr(1, 2), 16);
//   const g = parseInt(hex.substr(3, 2), 16);
//   const b = parseInt(hex.substr(5, 2), 16);
//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
//   return luminance < 128;
// }

// function applyAccentColor(color) {
//   document.documentElement.style.setProperty('--accent-color', color);

//   const isDark = isDarkColor(color);
//   const textColor = isDark ? '#ffffff' : '#000000';

//   document.body.style.color = textColor;

//   document.querySelectorAll('*:not(.no-text-color-change):not(.no-text-color-change *)')
//     .forEach(el => {
//       el.style.color = textColor;
//     });

//   if (accentInput) {
//     accentInput.value = color;
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const savedColor = localStorage.getItem('accentColor');
//   if (savedColor) {
//     applyAccentColor(savedColor);
//   }
// });