import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaLock,
  FaAws,
  FaLaptop
} from "react-icons/fa";

import "../../styles/landing/About.css";

function About() {

  const steps = [

    {
      icon: <FaCloudUploadAlt />,
      title: "Upload",
      desc: "Choose Files"
    },

    {
      icon: <FaLock />,
      title: "Encrypt",
      desc: "Secure Transfer"
    },

    {
      icon: <FaAws />,
      title: "AWS S3",
      desc: "Cloud Storage"
    },

    {
      icon: <FaLaptop />,
      title: "Access",
      desc: "Anywhere"
    }

  ];

  return (

    <section className="journey" id="about">

      <motion.div

        initial={{ opacity:0,y:50 }}

        whileInView={{ opacity:1,y:0 }}

        transition={{ duration:.8 }}

        viewport={{ once:true }}

      >

        <h2>

          From Upload To Secure Access

        </h2>

        <p>

          Every file travels through a secure pipeline before
          becoming available anywhere in the world.

        </p>

      </motion.div>

      <div className="journey-flow">

        {steps.map((step,index)=>(

          <>

            <motion.div

              className="journey-card"

              key={index}

              initial={{ opacity:0,y:40 }}

              whileInView={{ opacity:1,y:0 }}

              transition={{
                delay:index*.25
              }}

              viewport={{ once:true }}

            >

              <div className="journey-icon">

                {step.icon}

              </div>

              <h3>{step.title}</h3>

              <span>{step.desc}</span>

            </motion.div>

            {index!==steps.length-1 &&

            <motion.div

              className="journey-arrow"

              initial={{ opacity:0 }}

              whileInView={{ opacity:1 }}

              transition={{
                delay:index*.25+.2
              }}

              viewport={{ once:true }}

            >

              ➜

            </motion.div>

            }

          </>

        ))}

      </div>

    </section>

  );

}

export default About;