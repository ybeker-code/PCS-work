import './style.css'
import getData from './fetch.js'

export default async function app() {
    const div = document.querySelector('#app');
    const list = document.querySelector('#list');
    const subTitle = document.querySelector('#subTitle')
    const header2 = document.querySelector('#header2');
    const pages = ['Blogs', 'Posts', 'Comments'];
    let current = 0;
    let controller;
    const path = [];

    const blogs = await getData(0);

    const blogsMap = blogs.map(element => ({
        username: `Username:  ${element.username}`,
        companyName: `Company Name:  ${element.company.name}`,
        companyCatchPhrase: `Catch Phrase:  ${element.company.catchPhrase}`,
        companybs: `bs:  ${element.company.bs}`,
        website: `website:  ${element.website}`,
        email: `email:  ${element.email}`
    }));

    displayBlogs();

    function displayBlogs() {
        controller = new AbortController();
        subTitle.textContent = pages[current];
        for (let index = 0; index < blogsMap.length; index++) {
            const element = document.createElement('li');
            element.id = blogs[index].id;
            element.classList.add('blog');

            Object.values(blogsMap[index]).forEach(el => {
                const d1 = document.createElement('div');
                d1.textContent = el;
                element.appendChild(d1);
            });
            element.addEventListener('click', (e) => { handleClick(e) }, { signal: controller.signal })
            list.appendChild(element);
        }
    }

    async function displayPosts() {
        const posts = await getData(1, path[current - 1].id);

        controller = new AbortController();
        posts.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('post');
            li.id = element.id
            const sTitle = document.createElement('span');
            sTitle.textContent = 'Title:  ';
            const title = document.createElement('span');
            title.textContent = element.title;
            const sBody = document.createElement('span');
            sBody.textContent = 'Post:  ';
            const body = document.createElement('span');
            body.textContent = element.body;
            const br = document.createElement('br');
            li.append(sTitle, title, br, sBody, body);
            li.addEventListener('click', (e) => { handleClick(e); }, { signal: controller.signal })
            list.appendChild(li);
        })
    }

    async function displayComments() {
        const comments = await getData(2, path[current - 1].id);

        comments.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('comment');
            const sName = document.createElement('span');
            sName.textContent = 'Name:  ';
            const name = document.createElement('span');
            name.textContent = element.name;
            const sEmail = document.createElement('span');
            sEmail.textContent = 'email:  ';
            const br1 = document.createElement('br');
            const br2 = document.createElement('br');
            const email = document.createElement('span');
            email.textContent = element.email;
            const sBody = document.createElement('span');
            sBody.textContent = 'Comment:  ';
            const body = document.createElement('span');
            body.textContent = element.body;
            li.append(sName, name, br1, sEmail, email, br2, sBody, body);

            if (current < 1) {
                li.addEventListener('click', (e) => { handleClick(e); })
            }
            list.appendChild(li);
        })
    }

    async function handleClick(e) {

        path[current] = e.currentTarget;
        subTitle.textContent = pages[++current];


        // make a back button
        const b = document.querySelectorAll('.button');
        b.forEach(element => {
            element.remove();
        });

        makeBackButton();

        // remove blogs and display posts
        cleanUp();

        path[current - 1].classList.add('postTitle');
        controller.abort();
        printPath();

        if (current === 1) {
            displayPosts()
        } else {
            displayComments();
        }
    }

    function makeBackButton() {
        const back = document.createElement('button');
        back.classList.add('button');
        back.textContent = `Back To ${pages[current - 1]}`;
        back.style.position = 'absolute';
        back.style.left = '10px';
        back.addEventListener('click', () => {
            cleanUp();
            path[current - 1] = null;
            back.remove();
            printPath();
            if (--current === 0) {
                displayBlogs();
            } else {
                displayPosts()
                makeBackButton();
            }

        });
        header2.prepend(back);
    }

    function cleanUp() {
        const blogElements = document.querySelectorAll('.blog');
        const postElements = document.querySelectorAll('.post');
        const commentElements = document.querySelectorAll('.comment');

        blogElements.forEach(element => element.remove());
        postElements.forEach(element => element.remove());
        commentElements.forEach(element => element.remove());
    }

    function printPath() {
        for (let index = 1; index >= 0; index--) {
            if (path[index]) { div.prepend(path[index]); }
        }
    }
}