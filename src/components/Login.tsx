import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, isAuthenticated, message } = useSelector((state: RootState) => state.auth)
 

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }) as any);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  useEffect(() => {
    if (user || isAuthenticated) {
      navigate('/dashboard');
    }
  }, [user, isAuthenticated, dispatch, navigate]);


  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={handleLogin} className="box">
                <h1 className="title is-2">Sign In</h1>
                {message && message === "Success to register" ? ( // Check if the message is "success to register"
                  <div className="notification is-success">
                    {message}
                  </div>
                ) : (
                  // Tampilkan pesan error jika message tidak null dan bukan "success to register"
                  message && (
                    <div className="notification is-danger">
                      {message}
                    </div>
                  )
                )}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default Login;
