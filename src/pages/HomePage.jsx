import React from "react";
import '../styles/HomePage.css'

const HomePage = () => {
    return(
        <div className="home-container">
            <img 
                className="main-icon"
                src="/icon/Icon2.svg"
                alt="Logo"/>

            <div className="btn-container">
                <button className="login-btn">Google로 로그인</button>
                <button className="guest-btn" onClick={() => (window.location.href = "/main")}>게스트 계정 이용하기</button>
            </div>
        </div>
    )
}

export default HomePage;