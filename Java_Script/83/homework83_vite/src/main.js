import { person1 } from './person.js';
import './style.css';
import dayjs from 'dayjs';

person1.print();

const myDiv = document.createElement('div');
myDiv.innerText = 'Hello World';
document.body.appendChild(myDiv);

const now = dayjs();
console.log(now.format('dddd, MMMM D, YYYY h:mm:ss A'));
