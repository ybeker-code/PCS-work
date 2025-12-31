export default function ColorPickers(props) {

    const { setColors, colors } = props;
    let { color, bgColor } = colors;

    function getInput(e) {
        setColors({
            ...colors, [e.target.id]: e.target.value
        })
    }
    if (!color) {
        color = 0;
    }
    return (
        <>
            <form action="" id="form">
                <label htmlFor="color" className="formElement">Choose a color</label>
                <input type="color" id="color" name="color" className="formElement" value={color} onChange={(e) => { getInput(e) }} />
                <label htmlFor="bg" className="formElement">Choose a background color</label>
                <input type="color" id="bgColor" name="bgColor" className="formElement" value={bgColor} onChange={(e) => { getInput(e) }} />
            </form>
        </>
    );
}