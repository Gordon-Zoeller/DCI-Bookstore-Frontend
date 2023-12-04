import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';

function Main() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default Main;
