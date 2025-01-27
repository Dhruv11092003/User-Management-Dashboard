import "./index.css"
import React from 'react';

const Header=()=>{
    return(
        <div className="header-container">
        <div className="header-main-container">
            <div className="logo-container">
                <img src="userLogo.png" alt="logo" className="logo-icon"/>
                <h1 className="logo-heading">User Management Dashboard</h1>
            </div>
        </div>
        </div>
    )
}

export default Header