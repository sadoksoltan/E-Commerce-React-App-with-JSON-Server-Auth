import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';

export function Navbar() {
    const { cart } = useContext(AppContext);
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserCredentials(null); // Définir l'état userCredentials sur null
        navigate('/login'); // Rediriger vers le composant Login
    };
   
    
    return (
        <nav>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="navbar-brand" to="#">
                                    <i className="bi bi-basket2-fill" />
                                    Best Store
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/contact">
                                    Contact
                                </Link>
                            </li>
                            
                        </ul>
                        {userCredentials === null ? (
                            <ul className="navbar-nav">

                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark me-2" href="/cart">
                                            <i className="bi bi-cart4 text-danger h3"></i>
                                            <span className="badge rounded-pill bg-danger"
                                                style={{ verticalAlign: "top" }}>{cart.length}</span>
                                        </a>
                                    </li>
                                </ul>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                                {userCredentials.user.role === 'admin' ? (
                                   
                                    <li className="nav-item dropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link text-dark me-2" href="/cart">
                                                    <i className="bi bi-cart4 text-danger h3"></i>
                                                    <span className="badge rounded-pill bg-danger"
                                                        style={{ verticalAlign: "top" }}> 2 </span>
                                                </a>
                                            </li>
                                        
                                        <a
                                            className="nav-link dropdown-toggle"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Admin
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/admin/products">
                                                    Products
                                                </Link>
                                            </li>
                                            <li>
                                              <Link className="dropdown-item" to="/admin/contacts">
                                                    Contact liste
                                                </Link>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <a className="dropdown-item" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                        </ul>
                                    </li>
                            

                                ) : (
                                    <li className="nav-item dropdown">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link text-dark me-2" href="/cart">
                                                    <i className="bi bi-cart4 text-danger h3"></i>
                                                    <span className="badge rounded-pill bg-danger"
                                                        style={{ verticalAlign: "top" }}> 2 </span>
                                                </a>
                                            </li>
                                        
                                        <a
                                            className="nav-link dropdown-toggle"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Client
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/admin/products">
                                                    Products
                                                </Link>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <a className="dropdown-item" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </nav>
    );
}
export function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start bg-light text-muted">
                {/* Section: Social media */}
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    {/* Left */}
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github" />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3" />
                                    Company name
                                </h6>
                                <p>
                                    الصادق سلطان وشركائه
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Angular
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        React
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Vue
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Laravel
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Pricing
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Settings
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Orders
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Help
                                    </a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">



                                <p>
                                    <i className="fas fa-home me-3" /> New York, NY 10012, US
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3" />
                                    soltansadok3@gmail.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3" /> + 216 21 56 89 78
                                </p>
                                <p>

                                    <i className="fas fa-print me-3" /> + 216 25 89 78 21
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    © 2021 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </a>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </>

    )
}