export default function Counter(props) {
    const { count, setCount } = props;
    return (
        <>
            <button onClick={() => { setCount(count + 1) }}>click me!</button>
        </>
    )
}