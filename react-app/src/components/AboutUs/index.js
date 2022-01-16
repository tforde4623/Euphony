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
              <i class="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/asia-le-073860103/">
              <i class="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a>
              <i class="fab fa-angellist fa-lg"></i>
            </a>
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Tommy Forde</h2>
          <p>Description</p>
          <div className="profile_links">
            <a href="https://github.com/tforde4623">
              <i class="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/tommyforde/">
              <i class="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a>
              <i class="fab fa-angellist fa-lg"></i>
            </a>
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Adam Cole</h2>
          <p>Description</p>
          <div className="profile_links">
            <a href="https://github.com/030820acc">
              <i class="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/adam-cole-83915a21a/">
              <i class="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a>
              <i class="fab fa-angellist fa-lg"></i>
            </a>
          </div>
        </div>

        <div className="dev_div">
          <h2 className="dark_large">Shannon Zander</h2>
          <p>Hey, I’m Shannon. I attended Whitman College, where I double majored in Classics and Philosophy, graduating with Honors in Major Study in both majors. I’m deeply passionate about linguistics, and I’ve loved coding ever since I figured out that it occupies a similar mental space as reading and writing ancient languages. I’ll be looking for remote software engineering opportunities as of Spring 2022.</p>
          <div className="profile_links">
            <a href="https://github.com/sezder">
              <i class="fab fa-github fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/shannon-e-zander/">
              <i class="fab fa-linkedin-in fa-lg"></i>
            </a>
            <a href="https://angel.co/u/shannon-zander">
              <i class="fab fa-angellist fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;