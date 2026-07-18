import "../../styles/About.css";
import {
  FaLightbulb,
  FaPalette,
  FaCode,
  FaCloud,
  FaRocket,
} from "react-icons/fa";

function About() {
  return (
    <section id="about" className="about">

      {/* Floating Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="about-container">

        <div className="about-header">
          <span className="about-tag">ABOUT US</span>

          <h2>
            Cloud Storage System
            <br />
            Built by Saran
          </h2>

          <p>
            Cloud Storage System is a secure and user-friendly platform designed
            to store, manage and access files anytime, anywhere. Built using
            modern cloud technologies, it delivers reliability, security and a
            seamless experience across every device.
          </p>
        </div>

        {/* Timeline */}

        {/* Timeline */}

<div className="timeline">

  <div className="timeline-line"></div>

  <div className="timeline-item">
    <div className="timeline-circle">
      <FaLightbulb />
    </div>
    <h4>Idea</h4>
    <p>Planned the Cloud Storage System and its core features.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-circle">
      <FaCode />
    </div>
    <h4>Development</h4>
    <p>Built the backend using FastAPI, JWT and PostgreSQL.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-circle">
      <FaCloud />
    </div>
    <h4>AWS Cloud</h4>
    <p>Integrated Amazon S3 for secure cloud file storage.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-circle">
      <FaPalette />
    </div>
    <h4>Frontend</h4>
    <p>Created a responsive UI using React and modern design.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-circle">
      <FaRocket />
    </div>
    <h4>Launch</h4>
    <p>Ready for deployment and real-world users.</p>
  </div>

</div>

      </div>

    </section>
  );
}

export default About;