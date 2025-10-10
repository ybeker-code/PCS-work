/* global $ */
(function () {
    'use strict';
    const button = $('#button');
    const input = $('#input');
    const display = $('#display');
    const icon = $('#icon');
    let file;

    button.on('click', loadFile);

    function loadFile(event) {
        event.preventDefault();
        icon.css('display', 'block');
        setTimeout(getFile, 2000);
    }
    async function getFile() {
        try {
            const response = await fetch(input.val());
            if (!response.ok) {
                icon.css('display', 'none');
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            file = await response.json();
            icon.css('display', 'none');
            display.append(file.message);
        } catch (e) {
            icon.css('display', 'none');
            // eslint-disable-next-line no-undef
            pcsMessageBox({ msg: `Unable to load. ${e.message}` });
        }
    };
}());
