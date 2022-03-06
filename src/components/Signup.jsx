import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Signup() {
  const apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
  });

  let token = localStorage.getItem('token');

  axios.defaults.headers.common['x-auth-token'] = token;

  async function doRegister(e) {
    e.preventDefault();
    if (user.email !== '' && user.password !== '' && user.name !== '') {
      if (user.password.length < 6) {
        toast.error('Error: Password Should Be At Least 6 Digits Long!');
      } else {
        // secure password :)
        await axios
          .post(`${apiUrl}/users`, {
            email: user.email,
            name: user.name,
            password: user.password,
            fav_words: [],
          })
          .then((resp) => {
            toast.success(resp.data.name + ' has been registered successfully!');
            if (resp.status === 200) {
              localStorage.setItem('token', resp.data.token);
              window.location = '/';
            }
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      }
    } else {
      toast.error('Error: Please Fill All Fields');
    }
  }
  function handleInput(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }
  return (
    <div className="signup-wrapper">
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Full Name"
            onChange={(e) => handleInput(e)}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => handleInput(e)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => handleInput(e)}
          />
        </div>

        <button type="button" className="btn btn-primary btn-block" onClick={doRegister}>
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">sign in?</Link>
        </p>
      </form>
    </div>
  );
}
