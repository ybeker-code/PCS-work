import { NavLink } from 'react-router';

export default function Header() {
    return (
        <>
            <header>
                <h1>Real Estate</h1>
                <nav>
                    <NavLink to={"/"} end>Home</NavLink> | <NavLink to={"/Buy"}>Buy</NavLink> | <NavLink to={"/Sell"}>Sell</NavLink>
                </nav>
            </header>
        </>
    )
}