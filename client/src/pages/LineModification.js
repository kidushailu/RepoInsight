import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import './LineModification.css';
import Image from "../images/line-modification.png";

function LineModification() {
    const navigate = useNavigate();
    
    return (
        <div className="container-line-modification">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}><FiArrowLeft size={20}/></button>
                <h3>FileName</h3>
            </div>
            <div className="image-container"><img src={Image} alt="" className="image"/></div>
        </div>
    );
}

export default LineModification;