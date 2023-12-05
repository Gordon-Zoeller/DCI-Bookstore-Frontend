import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './form.css';

export default function Register() {
  const [errorMsg, setErrorMsg] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch('http://localhost:8000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          e.target.reset();
          toast.success('successful registration!');

          setTimeout(() => {
            navigate('/login');
          }, 1500);
        } else {
          // 'errors' is an ARRAY of OBJECTS (--> access to PATH- and MSG-keys)
          // (it comes from the response-message in the validation.js)
          setErrorMsg(
            res.message.errors.reduce((acc, item) => {
              acc[item.path] = item.msg;
              return acc;
            }, {})
          );
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h1>Register</h1>
      <Toaster position='top-center' />

      <form onSubmit={handleRegistration} className='signUp-login-form'>
        {/* to render the errorMsg only when there is one: */}
        {errorMsg.firstName && <p>{errorMsg.firstName}</p>}
        <div>
          <label htmlFor='firstname'>
            <span>*</span>First name:
          </label>
          <input
            /* on input-focus, errorMsg disappears: */
            onFocus={(e) => setErrorMsg({ ...errorMsg, firstName: '' })}
            type='text'
            name='firstname'
          />
        </div>

        {errorMsg.lastName && <p>{errorMsg.lastName}</p>}
        <div>
          <label htmlFor='lastname'>
            <span>*</span>Last name:
          </label>
          <input
            onFocus={(e) => setErrorMsg({ ...errorMsg, lastName: '' })}
            type='text'
            name='lastname'
          />
        </div>

        {errorMsg.email && <p>{errorMsg.email}</p>}
        <div>
          <label htmlFor='email'>
            <span>*</span>Email:
          </label>
          <input
            onFocus={(e) => setErrorMsg({ ...errorMsg, email: '' })}
            type='email'
            name='email'
          />
        </div>

        {errorMsg.password && <p>{errorMsg.password}</p>}
        <div>
          <label htmlFor='password'>
            <span>*</span>Password:
          </label>
          <input
            onFocus={(e) => setErrorMsg({ ...errorMsg, password: '' })}
            type='password'
            name='password'
          />
        </div>

        <button>Register</button>
      </form>
    </div>
  );
}
