import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about_us_main">
      <div className="about_image_div"></div>
      <div className="about_content_div">
        <div className="dev_div">
          <h2 className="dark_large">Asia Le</h2>
          <p>Description</p>
          <div className="profile_links">
            <a href="https://github.com/le-as-a">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/asia-le-073860103/">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
            {/* <a>
              <i className="fab fa-angellist fa-lg"></i>
            </a> */}
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Tommy Forde</h2>
          <p>Description</p>
          <div className="profile_links">
            <a href="https://github.com/tforde4623">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/tommyforde/">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
            {/* <a>
              <i className="fab fa-angellist fa-lg"></i>
            </a> */}
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Adam Cole</h2>
          <p>I'm Adam. I have a background in troubleshooting and repair of mechanical systems (HVAC, Automotive). I recently began the career shift into software engineering. I do my best work on a team of skilled and reliable team mates and I enjoy the collective consciousness aspect of creating something together but in parts and watching the final product come together. I will be looking for work starting in February and hope to work in a backend development role.</p>
          <div className="profile_links">
            <a href="https://github.com/030820acc">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/adam-cole-83915a21a/">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
            {/* <a>
              <i className="fab fa-angellist fa-lg"></i>
            </a> */}
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Shannon Zander</h2>
          <p>Hey, I’m Shannon. I attended Whitman College, where I double majored in Classics and Philosophy, graduating with Honors in Major Study in both majors. I’m deeply passionate about linguistics, and I’ve loved coding ever since I figured out that it occupies a similar mental space as reading and writing ancient languages. I’ll be looking for remote software engineering opportunities as of Spring 2022.</p>
          <div className="profile_links">
            <a href="https://github.com/sezder">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/shannon-e-zander/">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a href="https://angel.co/u/shannon-zander">
              <i className="fab fa-angellist fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
