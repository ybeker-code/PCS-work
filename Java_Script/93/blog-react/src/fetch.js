export default async function getData(url, id) {
    const urls = ['https://jsonplaceholder.typicode.com/users', `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`]
    try {
        const r = await fetch(urls[url]);
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