"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContactBorders from "./ContactBorders";
import SocialButtons from "./SocialButtons";

interface ContactProps {
  initialHasLoaded?: boolean;
}

const Contact: React.FC<ContactProps> = ({ initialHasLoaded = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="contact-section">
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        Contact
      </motion.h1>
      
      <div className="contact-content">
        <div
          className="contact-content-box"
          style={!isMobile ? {
            marginLeft: '20px',
            marginRight: '-1px',
            position: 'relative'
          } : {}}
        >
          <ContactBorders hasInitialLoaded={false} isMobile={isMobile} />
          
          {/* Social Buttons attached to right border */}
          <SocialButtons section="contact" isMobile={isMobile} />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            liam@bakk3r.com
          </motion.p>
          <motion.p
            className="mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            Based in London, Availible Globally
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Contact;