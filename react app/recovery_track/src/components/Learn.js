import React, { Component } from "react";
class Learn extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-2 sidenav"></div>
            <div className="col-sm-8 text-center">
              <br />
              <strong>
                Knee Physical Therapy : Range of Motion Physical Therapy
                Exercises for Knees
              </strong>
              <br />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/CUNb9hXWIno?start=16;end=30"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <br />
              <br />
              <br />
              <br />
              <strong>
                Knee Physical Therapy : Quad Range of Motion Physical Therapy
                Exercises for Knees{" "}
              </strong>{" "}
              <br />
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/5c41xIsp37o?start=22;end=31"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="col-sm-2 sidenav"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn;
