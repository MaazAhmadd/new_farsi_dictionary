import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {
  const history = useHistory();
  let apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['x-auth-token'] = token;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handleInput(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    if (user.email !== '' && user.password !== '') {
      await axios
        .post(apiUrl + '/auth', { email: user.email, password: user.password })
        .then((resp) => {
          toast.success('Logged in successfully!');
          if (resp.status === 200) {
            localStorage.setItem('token', resp.data);
            // history.goBack();
            window.location.href = '/';
          }
        })
        .catch((ex) => {
          toast.error(ex.response.data);
        });
    } else {
      toast.error('Error: Please Fill All Fields');
    }
  }

  return (
    <div className="login-wrapper">
      <form>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input onChange={handleInput} id="email" type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={handleInput}
            id="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <button type="button" onClick={doLogin} className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          if not registered Already <Link to="/signup">register now?</Link>
        </p>
      </form>
    </div>
  );
}
