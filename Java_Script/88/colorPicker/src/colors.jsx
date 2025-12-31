
export default function Colors(props) {

    const { color, bgColor } = props;

    return (
        <>
            <div id="display" style={{ color, backgroundColor: bgColor }}>What color is this?</div>
        </>
    );
}