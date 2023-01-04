import React from 'react'
import Footer from '../components/Footer'

function LandingPage(props) {
    return (
        <React.Fragment>
            <div className="landing-p flex flex-col">
                <img src="/images/logo.png" className="logo"/>
                <div className="stamp font s20 c000">25 : 13 : 40 : 26</div>
            </div> 
            <Footer/>
        </React.Fragment>
    );
}

export default LandingPage;