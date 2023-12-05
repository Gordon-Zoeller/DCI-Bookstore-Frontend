import { Route, Routes } from "react-router-dom";
import Login from '../pages/login/Login';

function Main() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/"/>
                    <Route path="/books"/>
                    <Route path="/books/:search"/>
                    <Route path="/register"/>
                    <Route path='/login' element={<Login />} />
                    <Route path="/profile"/>
                    <Route path="/cart"/>
                    <Route path="*"/>
                </Routes>
            </main>
        </>
    );
};

export default Main;
