import getData from './fetch'
import { useEffect, useState } from 'react';

export default function Posts(props) {

    const [postElements, setPostElements] = useState([])
    const blogId = props.thePath[props.current - 1]?.props.id;

    const getText = (node) => {
        if (typeof node === 'string' || typeof node === 'number') return node;
        if (Array.isArray(node)) return node.map(getText).join('***');
        if (node?.props?.children) return getText(node.props.children);
        return '';
    };

    function handleClick(e, postElement) {

        const newElement = <li className='post' id={postElement.props.id} key={postElement.props.id}>
            <span>Title:  </span>
            <span>{getText(postElement.props.children[1])}</span>
            <br></br>
            <span>Post:  </span>
            <span>{getText(postElement.props.children[4])}</span>
        </li >

        const tempPath = [...props.thePath];
        tempPath[props.current] = newElement;

        props.setThePath(tempPath)
        props.setCurrent(prev => prev + 1)
    }

    useEffect(() => {

        (async () => {
            const temp = [];
            const posts = await getData(1, blogId);

            posts.forEach(element => {
                const postElement = <li className='post' id={element.id} key={element.id} onClick={
                    (e) => {
                        handleClick(e, postElement)
                    }}>
                    <span>Title:  </span>
                    <span>{element.title}</span>
                    <br></br>
                    <span>Post:  </span>
                    <span>{element.body}</span>
                </li >

                temp.push(postElement);
            });

            setPostElements(temp);
        })();
    }, [blogId]);

    return (
        <>
            <div id="app">
                <ul id="list">
                    {postElements}
                </ul>
            </div>
        </>
    );
}





