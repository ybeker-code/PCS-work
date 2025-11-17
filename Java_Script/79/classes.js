'use strict';
class Element {
    #children = [];
    constructor(innerText) {
        this.innerText = innerText;
    }
    setInnerText(text) {
        this.innerText = text;
    }
    getInnerText() {
        return this.innerText;
    }
    addChild(child) {
        this.#children.push(child);
    }
    removeChild(child) {
        this.#children.splice(this.#children.indexOf(child), 1);
    }
    getChildren() {
        return this.#children;
    }
    render() {
        console.log(this.innerText);
        this.#children.forEach(element => {
            element.render();
        });
    }
}

class Div extends Element {
    render() {
        console.log('I am a div.');
        super.render();
    }
}

class H1 extends Element {
    render() {
        console.log('I am an h1.');
        super.render();
    }
}

const div1 = new Div('Hello World 1');
const h11 = new H1('Hello World 2');
const h12 = new H1('Hello World 3');
div1.addChild(h11);
div1.addChild(h12);
div1.render();
div1.setInnerText('Mazel Tov!');
div1.removeChild(h11);
div1.render();