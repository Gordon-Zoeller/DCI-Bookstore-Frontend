import Links from "./Links";
import Logo from "./Logo";

function Header() {
    return (
        <>
            <header>
                <nav>
                    <Logo/>
                    <Links/>
                </nav>
            </header>
        </>
    );
};

export default Header;