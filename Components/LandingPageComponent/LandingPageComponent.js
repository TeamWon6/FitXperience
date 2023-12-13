import React from "react"
import { useRouter } from "next/router"
export default function LandingPageComponent() {
    return (
      <div className="landingPageBody">
          <div id="page-wrapper">
          <header id="header">
              <div class="logo">
                  <img id="header-img" src='/images/logo.jpg'
                      alt="smartwatch logo" />
                  <h1>FitExperience</h1>
              </div>
  
              <nav id="nav-bar">
                  <ul>
                      <li><a class="nav-link" href="#home">Home</a></li>
                      {/* <li><a class="nav-link" href="#services">Services</a></li>
                      <li><a class="nav-link" href="#price">Price</a></li> */}
                      <li><a class="nav-link" href="#price">About Us</a></li>
  
                  </ul>
              </nav>
  
              <form id="form" action="/login">
                  {/* <label for="email"><input id="email" name="email" type="email" placeholder="Enter E-mail address"
                          required /></label> */}
                  <input id="submit" type="submit" value="Log in" class="button"/>
              </form>
          </header>
  
          <section id="home" class="two-column">
              <div>
                  <span>
                      <p class="sub">Elevate Your Fit Journey</p>
                      <p class="heading">FitExperience: Your journey to fitness!</p>
                  </span>
              </div>
              <div><img src='/images/daddu.png' class="main-img"
                      alt="three smartwatches" />
              </div>
          </section>
          <section id="services" class="two-column">
              <div>
                  <span>
                      <p class="heading">About Us</p>
                      <h3>Exercise Display:</h3>
                      <p class="desc">Explore diverse exercises for a dynamic workout experience</p>
                      <h3>Exercise Management</h3>
                      <p class="desc">Effortlessly save and filter exercises for personalized routines.</p>
                      <h3>Meal Plan Storage</h3>
                      <p class="desc">Plan and organize meals easily with FitExperience</p>
                      <h3>BMI Tracking</h3>
                      <p class="desc">Track your progress, including BMI, for a comprehensive overview.</p>
                  </span>
              </div>
              {/* <div><iframe id="video" src="https://www.youtube.com/embed/31va8DebLeA" title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen> </iframe>
              </div> */}
          </section>
  
          {/* <div id="price" class="center">
              <p class="heading">Price</p>
              <p class="gray">Pricing is the method of identifying the value a small business can get in the exchange for
                  the goods and services they sell. As a small business owner, you hopefully sell goods or services for a
                  price that your target market is willing to pay.</p>
          </div>
          <section class="three-column">
              <div>
                  <span>
                      <h3>D258 Smartwatch</h3>
                  </span>
                  <img src="https://www.pngmart.com/files/13/Smartwatch-PNG-Free-Download.png" alt="D258 Smartwatch" />
                  <p>From $150</p>
                  <a href="#" target="_blank" class="buy-btn">Buy</a>
              </div>
              <div>
                  <span>
                      <h3>GX 950 Smartwatch</h3>
                  </span>
                  <img src="https://www.pngmart.com/files/13/Smartwatch-Gadget-PNG-Clipart.png"
                      alt="GX 950 Smartwatch Smartwatch" />
                  <p>From $175</p>
                  <a href="#" target="_blank" class="buy-btn">Buy</a>
              </div>
              <div>
                  <span>
                      <h3>X-Treme Watch</h3>
                  </span>
                  <img src="https://cdn.shopify.com/s/files/1/0550/3480/6331/products/1.png?v=1643737782"
                      alt="D258 Smartwatch" />
                  <p>From $200</p>
                  <a href="#" target="_blank" class="buy-btn">Buy</a>
              </div>
          </section> */}
      </div>
      </div>
    )
  }