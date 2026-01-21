
export default function Blogs(props) {

    const elementsTemp = [];
    let key = 0;

    for (let index = 0; index < props.blogsMap.length; index++) {
        const blogElement = <li className="blog" key={index} onClick={e => {
            handleClick(e, blogElement)
        }}
            id={props.blogsId[index]}>
            {mapIt(index)}</li>
        elementsTemp.push(blogElement);
    }

    function mapIt(index) {
        return Object.values(props.blogsMap[index]).map(item => (
            <div key={++key}>{item}</div>));
    }


    function handleClick(e, blogElement) {

        const newElement = <li className="blog" key={blogElement.key}
            id={blogElement.props.id}>
            {mapIt(blogElement.key)}</li>;

        const tempPath = [...props.thePath];
        tempPath[props.current] = newElement;

        props.setThePath(tempPath);
        props.setCurrent(prev => prev + 1);
    }

    return (
        <>
            <div id="app">
                <ul id="list">
                    {elementsTemp}
                </ul>
            </div>
        </>
    );
}
