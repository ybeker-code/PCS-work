export default function Address(props) {
    console.log(props);

    const { street, city, state, zip } = props;

    return (<foo>You live at {street} in
        {city} {state} {zip}</foo>);
}