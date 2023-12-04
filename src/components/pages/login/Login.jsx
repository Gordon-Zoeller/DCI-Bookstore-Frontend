import { useState, useContext } from 'react';
import { MyContext } from '../../../context/CreateContext';
import { useNavigate } from 'react-router-dom';
import '../register/form.css';

export default function Login() {
  const { setUser } = useContext(MyContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', token);
        }
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          e.target.reset();

          setTimeout(() => navigate('/books'), 1500);
        } else {
          setLoginError(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // handlers to make error MSGs disappear on input-focus:
  const handleEmailErrorOnFocus = (e) => {
    if (loginError === 'Please make sure your email is correct.')
      setLoginError('');
  };

  const handlePasswordErrorOnFocus = (e) => {
    if (loginError === 'Please make sure your password is correct.')
      setLoginError('');
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin} className='signUp-login-form'>
        {/* render error MSG, if it exists: */}
        {loginError === 'Please make sure your email is correct.' && (
          <p>{loginError}</p>
        )}
        <div>
          <label htmlFor='email'>Email:</label>
          <input onFocus={handleEmailErrorOnFocus} type='email' name='email' />
        </div>

        {loginError === 'Please make sure your password is correct.' && (
          <p>{loginError}</p>
        )}
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            onFocus={handlePasswordErrorOnFocus}
            type='password'
            name='password'
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
}
