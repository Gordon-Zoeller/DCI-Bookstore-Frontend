import { Route, Routes } from "react-router-dom";

function Main() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/"/>
                    <Route path="/books"/>
                    <Route path="/books/:search"/>
                    <Route path="/register"/>
                    <Route path="/login"/>
                    <Route path="/profile"/>
                    <Route path="/cart"/>
                    <Route path="*"/>
                </Routes>
            </main>
        </>
    );
};

export default Main;