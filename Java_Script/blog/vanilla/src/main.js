import './style.css'
import getData from './fetch.js'

const div = document.querySelector('#app');
const blogList = document.querySelector('#blogList');
const blogs = await getData();
const blogData = ['company[catchPhrase]', 'company.bs', 'website', 'email'];

console.log(blogs[0], 'blogs[0]');
console.log('blogdate', blogData);


blogs.forEach(element => {
  const e = document.createElement('li');
  e.id = `${element.id}`;

  blogData.forEach(tidbit => {
    //console.log('tidbit', tidbit);


    //console.log('element', element, 'element[tidbit]', element[tidbit], e);
    putInfo(element[tidbit], e);
  });

  blogList.appendChild(e);

});

function putInfo(field, parent) {
  const d1 = document.createElement('div');
  d1.textContent = `${field}`;
  parent.appendChild(d1);
}
console.log(await getData());
console.log(blogData);





