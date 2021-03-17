import React from "react";
import { withRouter } from "react-router";
import GoogleButton from "react-google-button";
import Fixing from "./img/fixing.png";
import Logo from "./img/rentLogo.png";
import Hands from "./img/handshake.svg";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Login.css";

const Login = () => {
  return (
    <section className="register-contain">
      <div className="register-header">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-content">
          
        <CarouselProvider
                  playDirection={'forward'}

          totalSlides={2}
          naturalSlideWidth={100}
          naturalSlideHeight={70}
          interval={5000}
          isPlaying={true}
          playDirection='forward'
        >
          <Slider>
              <Slide index={0}>
            <div className="login-content-left">
              <div className="header-info">
                <div className="header-text">
                  <h2>
                    Making <br /> Renting Easy
                  </h2>
                  <p>
                    We help connect landlords and tenants to ensure no task gets
                    left behind. See about us if you need a task manager for
                    your property. We help connect landlords and tenants to
                    ensure no task gets left behind. See about us if you need a
                    task manager for your property.
                  </p>
                
                </div>
                <img src={Fixing} alt="animated-people" />
              </div>
              <div className='dots'>
              <Dot  style={{width: '20px', height: '20px' , border: 'none', borderRadius:'100px'}} slide={0} />  <Dot  style={{width: '20px', height: '20px' , border: 'none', borderRadius:'100px'}} slide={1} />

              </div>
            </div>
           
            </Slide>
            <Slide  className='slideTwo' index={1}>
            <div className="login-content-left">
              <div className="header-info">
                <div className="header-text">
                  <h2>
                    ConnectingLandlords and Tenants
                  </h2>
                  <p>
                    Need a tool to keep in touch with renters. We'll be happy to aid you in creating a pleasant experience for you and your renters.
                  </p>
                </div>
                <img className='hands' src={Hands} alt="animated-people" />
              </div>
              <div className='dots'>
              <Dot style={{width: '20px', height: '20px' , border: 'none', borderRadius:'100px'}} slide={0} />  <Dot  style={{width: '20px', height: '20px' , border: 'none', borderRadius:'100px'}}slide={1} />

              </div>

            </div>
            </Slide>

          </Slider>
        </CarouselProvider>

        <div className="login-content-right">
          <h4>Sign In</h4>
          <p className="create">or create an account</p>
          <p className="spin">
            Give it a spin.
            <br /> I promise it'll be painless.
          </p>
          <form>
            <a href="/auth/google">
              <GoogleButton />
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
