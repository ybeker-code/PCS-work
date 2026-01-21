import getData from './fetch'
import { useEffect, useState } from 'react';

export default function Posts(props) {
    const [commentElements, setCommentElements] = useState([])

    const postId = props.thePath[props.current - 1].props.id;

    useEffect(() => {
        (async () => {
            const temp = [];
            const comments = await getData(2, postId);
            comments.forEach(element => {
                temp.push(
                    <li className='comment' key={element.id}>
                        <span>Name:  </span>
                        <span>{element.name}</span>
                        <br />
                        <span>email:  </span>
                        <span>{element.email}</span>
                        <br />
                        <span>Comment:  </span>
                        <span>{element.body}</span>
                    </li>)
            });
            setCommentElements(temp);
        })()
    }, [postId]);

    return (
        <>
            <div id="app">
                <ul id="list">
                    {commentElements}
                </ul>
            </div>
        </>
    );
}




