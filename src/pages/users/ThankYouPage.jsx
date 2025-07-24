import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", textAlign: "center" }}>
            <FaCheckCircle size={80} className="text-success mb-4" />
            <h2>Thank You!</h2>
            <p>Your books have been checked out successfully.</p>
            <Button variant="primary" onClick={handleBackToHome}>
                Go to Home
            </Button>
        </div>
    );
};

export default ThankYouPage;
