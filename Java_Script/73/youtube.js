(async function () {
    'use strict';

    const videoListDom = document.querySelector('#videoListDom');
    const videoDom = document.querySelector('#videoDom');

    const videoList = await getJson('videoList.json');
    videoList.forEach(element => {
        const newVideo = document.createElement("span");
        newVideo.addEventListener('click', () => playVideo(element.url));
        const image = document.createElement("img");
        if (element.image) {
            image.setAttribute('src', element.image);
        }
        else {
            image.setAttribute('src', 'media/images/free-video-icon-831-thumb.png');
        }
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('alt', element.alt);
        newVideo.textContent = element.name;
        newVideo.appendChild(image);
        videoListDom.appendChild(newVideo);
    });

    // Ajax function 
    async function getJson(url) {
        try {
            const r = await fetch(url);
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            return await r.json();
        }
        catch (e) {
            console.error(e);
        };
    }

    function playVideo(url) {
        videoDom.style.display = 'block';
        videoDom.setAttribute('src', url);
    }
}());