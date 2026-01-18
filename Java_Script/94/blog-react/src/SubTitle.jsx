export default function SubTitle(props) {
    return (
        <>
            <div id="header2">
                <h3 id="subTitle" className="title">{props.pages[props.current]}</h3>
            </div>
        </>
    )
}