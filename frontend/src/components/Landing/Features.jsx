import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaLock,
  FaMobileAlt,
  FaBolt,
} from "react-icons/fa";

import "../../styles/landing/Features.css";

const features = [
  {
    icon: <FaCloudUploadAlt />,
    title: "Fast Upload",
    desc: "Upload files securely with AWS S3 in seconds."
  },
  {
    icon: <FaLock />,
    title: "Secure Storage",
    desc: "JWT authentication and encrypted cloud storage."
  },
  {
    icon: <FaMobileAlt />,
    title: "Access Anywhere",
    desc: "Access your files anytime from any device."
  },
  {
    icon: <FaBolt />,
    title: "Lightning Fast",
    desc: "Optimized APIs and blazing fast performance."
  }
];

function Features() {
  return (
    <section className="landing-features" id="features">

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
      >
        Powerful Features
      </motion.h2>
        
      <p className="landing-features-subtitle">
        Everything you need for secure cloud storage.
      </p>

      <div className="landing-features-grid">

        {features.map((item, index) => (

          <motion.div
            key={index}
            className="landing-feature-card"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: index * .15 }}
            viewport={{ once: true }}
          >

            <div className="landing-feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Features;