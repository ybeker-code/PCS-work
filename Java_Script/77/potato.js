(function () {
    'use strict';
    const crate = document.querySelector('#crate');
    const reset = document.querySelector('#reset');
    let activePart = {
        part: '',
        offsetx: '',
        offsety: '',
        index: ''
    };
    let topZindex = localStorage.getItem('top') || 0;
    let parts = JSON.parse(localStorage.getItem('parts')) || [];
    const fileNames = ['body - Copy', 'body', 'earLeft', 'earRight', 'eyes1',
        'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'mouth1',
        'mouth2', 'mouth3', 'nose1', 'nose2', 'hair'];
    for (let index = 0; index < 16; index++) {
        const part = document.createElement('img');
        part.classList.add('part');
        part.id = `${index}`;
        part.setAttribute('src', `parts/${fileNames[index]}.png`);
        part.addEventListener('mousedown', e => {
            e.preventDefault();
            activePart.part = e.target;
            activePart.offsetx = e.offsetX;
            activePart.offsety = e.offsetY;
            activePart.index = index;
            activePart.part.style.zIndex = ++topZindex;
            parts[activePart.index].zindex = topZindex;
            localStorage.setItem('parts', JSON.stringify(parts));
            localStorage.setItem('topZindex', topZindex);
        });
        crate.appendChild(part);
        if (parts[index]) {
            part.style.zIndex = parts[index].zindex;
            part.style.left = parts[index].left;
            part.style.top = parts[index].top;
        }
        if (parts.length < fileNames.length) {
            parts.push({ top: '', left: '', zindex: '' });
        }
    }
    document.addEventListener('mousemove', e => {
        if (activePart.part) {
            activePart.part.style.left = (`${e.pageX - activePart.offsetx}px`);
            activePart.part.style.top = ('top', `${e.pageY - activePart.offsety}px`);
            parts[activePart.index].left = activePart.part.style.left;
            parts[activePart.index].top = activePart.part.style.top;
            localStorage.setItem('parts', JSON.stringify(parts));
        }
    });
    document.addEventListener('mouseup', () => {
        activePart.part = '';
    });
    reset.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    // Sound
    let playing = localStorage.getItem('playing') || true;
    const soundTracks = ['fun.mp3', 'smile.mp3'];
    let activeSound = localStorage.getItem('activeSound') || 0;
    const soundId = document.querySelector('#soundId');
    changeSound();
    const play = document.querySelector('#play');
    play.addEventListener('click', playpause);
    const playImage = document.querySelector('#playImage');

    function playpause() {
        if (playing) {
            soundId.pause();
            playImage.setAttribute('src', 'images/play.png');
        } else {
            soundId.play();
            playImage.setAttribute('src', 'images/pause.png');
        }
        playing = !playing;
        localStorage.setItem('playing', playing);
    }
    const switchButton = document.querySelector('#switch');
    switchButton.addEventListener('click', () => {
        changeSound();
    });

    function changeSound() {
        if (activeSound < soundTracks.length - 1) {
            activeSound++;
        } else {
            activeSound = 0;
        }
        localStorage.setItem('activeSound', activeSound);
        soundId.setAttribute('src', `sound/${soundTracks[activeSound]}`);
        soundId.load();
        soundId.play();
        //soundId.
    }
}());