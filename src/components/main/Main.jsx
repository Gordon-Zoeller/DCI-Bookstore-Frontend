import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';

function Main() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/"/>
                    <Route path="/books"/>
                    <Route path="/books/:search"/>
                    <Route path='/login' element={<Login />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile"/>
                    <Route path="/cart"/>
                    <Route path="*"/>
                </Routes>
            </main>
        </>
    );
};

export default Main;
