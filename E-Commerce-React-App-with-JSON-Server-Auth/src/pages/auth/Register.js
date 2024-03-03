import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../../AppContext';


export function Register() {
    const { setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();

    const RegisterUSer = async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
        const formData = new FormData(event.currentTarget);
        const registrationData = Object.fromEntries(formData.entries());
        delete registrationData.confirmPassword;
        try {
            const response = await fetch('http://localhost:3005/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });
            const data = await response.json();
            console.log('Server Response:', data);
            if (response.ok) {

                setUserCredentials(data);
                localStorage.setItem('credentials', JSON.stringify(data));
                navigate('/');
            } else {

            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="container my-4">

            <div className="row">
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create new Account</h2>

                    <form onSubmit={RegisterUSer}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">First Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="firstname" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Last Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lastname" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="email" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Phone Number</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="phone" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Address</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="address" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="password" name="password" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Confirm Password</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="password" name="confirmPassword" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary" >Register</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <a className="btn btn-outline-primary" href="/" role="button">Cancel</a>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}