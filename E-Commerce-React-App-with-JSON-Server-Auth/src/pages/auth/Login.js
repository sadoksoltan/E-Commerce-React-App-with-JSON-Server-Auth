import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext';

export function Login() {
  const { userCredentials, setUserCredentials } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userCredentials) {
      navigate('/'); // Redirect to the Home component if userCredentials is not null
    }
  }, [userCredentials, navigate]);

  const loginUser = async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(event.currentTarget);
    const loginData = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('http://localhost:3005/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log('Server Response:', data);
      if (response.ok) {
        console.log('Authentication successful');
        setUserCredentials(data); // Update userCredentials state
        localStorage.setItem('credentials', JSON.stringify(data)); // Save data in local storage
        navigate('/'); // Redirect to the Home component
      } else {
        // Handle other cases (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container my-4">
      <div className="mx-auto rounded border p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-5">Welcome, please login</h2>

        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password" />
          </div>

          <div className="row mb-3">
            <div className="col d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="col d-grid">
              <a className="btn btn-outline-primary" href="/" role="button">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}