import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div
          style={{
            position: "static",
            color: "black",
            paddingTop: 50,
            backgroundColor: "#f1f1f1"
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-4 offset-1 col-sm-2">
                <h5>Links</h5>
                <ul className="list-unstyled">
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Menu</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div className="col-7 col-sm-5">
                <h5>Our Address</h5>
                <address>
                  Address line 1
                  <br />
                  Address line 2
                  <br />
                  San Francisco
                  <br />
                  Phone : +111 111 1111
                  <br />
                  Phone: +111 111 1111
                  <br />
                  email:{" "}
                  <a
                    className="dark_link"
                    href="mailto:email@email.net"
                    className="dark_link"
                  >
                    email@email.net
                  </a>
                </address>
              </div>
              <div className="col-12 col-sm-4 align-self-center">
                <div>
                  <a className="dark_link" href="http://google.com/+">
                    google
                  </a>
                  {"  "}
                  <a
                    className="dark_link"
                    href="http://www.facebook.com/profile.php?id="
                  >
                    facebook
                  </a>
                  {"  "}
                  <a className="dark_link" href="http://www.linkedin.com/in/">
                    linkedin
                  </a>
                  {"  "}
                  <a className="dark_link" href="http://twitter.com/">
                    twitter
                  </a>
                  {"  "}
                  <a className="dark_link" href="http://youtube.com/">
                    youtube
                  </a>
                  {"  "}
                  <a
                    className="dark_link"
                    className="btn btn-social-icon"
                    href="mailto:"
                  >
                    email
                  </a>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <p>© Copyright 2019 Recovery Track</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
