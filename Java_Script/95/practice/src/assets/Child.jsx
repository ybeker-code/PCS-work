import Counter from "../counter";

export default function Child(props) {
    const { parent, count, setCount } = props;

    return (
        <>
            <div>I am a child of {parent}</div>
            <Counter count={count} setCount={setCount}></Counter>
        </>
    )
}