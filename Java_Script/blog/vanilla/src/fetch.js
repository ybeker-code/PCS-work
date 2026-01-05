export default async function getData(event) {
    //event.preventDefault();
    try {
        const r = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if (!r.ok) {
            throw new Error(`${r.status} - ${r.statusText}`);
        }
        const data = await r.json();
        return data;
    }
    catch (e) {
        console.error(e);
    };
}