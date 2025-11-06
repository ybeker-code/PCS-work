(function () {
    const span = document.querySelector('span');
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
        span.appendChild(part);
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
}());