export default function Post(props) {
    const { name, body } = props.post
    return (
        <>
            <div>name: {name}</div>
            <p>message: {body}</p>
        </>
    )
}