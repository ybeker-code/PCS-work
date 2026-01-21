
export default function BackButton(props) {

    function handleClick() {
        const tempPath = [...props.thePath];
        tempPath[props.current - 1] = null;
        props.setThePath(tempPath)
        props.setCurrent(prev => prev - 1)
    }
    return (
        <>
            <button className="button" style={{}}
                onClick={handleClick}>{`Back To ${props.pages[props.current - 1]}`}</button>
        </>
    )

}
