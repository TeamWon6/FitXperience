import React from 'react'

export default function LandingPageComponent() {
  return (
    <div>
        <div id="page-wrapper">
        <header id="header">
            <div class="logo">
                <img id="header-img" src="https://cdn-icons-png.flaticon.com/512/617/617690.png"
                    alt="smartwatch logo" />
                <h1>WatcHouse</h1>
            </div>

            <nav id="nav-bar">
                <ul>
                    <li><a class="nav-link" href="#home">Home</a></li>
                    <li><a class="nav-link" href="#services">Services</a></li>
                    <li><a class="nav-link" href="#price">Price</a></li>
                </ul>
            </nav>

            <form id="form" action="https://www.freecodecamp.com/email-submit">
                <label for="email"><input id="email" name="email" type="email" placeholder="Enter E-mail address"
                        required /></label>
                <input id="submit" type="submit" value="Join us" class="button" />
            </form>
        </header>

        <section id="home" class="two-column">
            <div>
                <span>
                    <p class="sub">Everything on your wrist</p>
                    <p class="heading">Top-Notch<br />technology</p>
                </span>
            </div>
            <div><img src="https://www.pngmart.com/files/13/Smartwatch-PNG-Pic.png" class="main-img"
                    alt="three smartwatches" />
            </div>
        </section>
        <section id="services" class="two-column">
            <div>
                <span>
                    <p class="heading">Services</p>
                    <h3>5-year warranty</h3>
                    <p class="desc">We’ll repair or replace your device for any covered issue for 5 years after you
                        receive your product.</p>
                    <h3>Free shipping</h3>
                    <p class="desc">All orders containing a device include free shipping.</p>
                    <h3>60-day returns</h3>
                    <p class="desc">We’re accepting 30-days returns — no questions asked.</p>
                    <h3>Secured payments</h3>
                    <p class="desc">Shop with confidence: all payment details are protected via SSL encryption.</p>
                </span>
            </div>
            <div><iframe id="video" src="https://www.youtube.com/embed/31va8DebLeA" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen> </iframe>
            </div>
        </section>

        <div id="price" class="center">
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
        </section>
    </div>
    </div>
  )
}
