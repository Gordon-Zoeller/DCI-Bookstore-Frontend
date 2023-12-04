import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';

function Main() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default Main;
