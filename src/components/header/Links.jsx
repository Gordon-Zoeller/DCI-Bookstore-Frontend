import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/CreateContext";

function Links() {
    const {user} = useContext(MyContext);
    return (
        <>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/books">Books</NavLink></li>
                {
                    user ?
                    <li><NavLink to="/profile">Profile</NavLink></li> :
                    <>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </>
                }
                <li><NavLink to="/cart">Cart</NavLink></li>
            </ul>
        </>
    );
};

export default Links;