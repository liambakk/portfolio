"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutBorders from "./AboutBorders";
import AboutProfileBorders from "./AboutProfileBorders";

interface AboutProps {
  initialHasLoaded?: boolean;
}

const About: React.FC<AboutProps> = ({ initialHasLoaded = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="about-section">
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        About
      </motion.h1>
      
      <div className="about-content">
        <div
          className="about-content-wrapper"
          style={!isMobile ? {
            position: 'relative',
            width: '100%'
          } : {}}
        >
          <div
            className="about-content-box"
            style={!isMobile ? {
              marginLeft: '20px',
              marginRight: '-1px',
              position: 'relative'
            } : {}}
          >
            <AboutBorders hasInitialLoaded={false} isMobile={isMobile} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            >
              Product designer with over 7 years of experience focused on developing and maintaining design systems.
            </motion.p>
            <motion.p
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            >
              Currently working as a Design System Expert, creating scalable and consistent design solutions.
            </motion.p>
          </div>
          
          {/* Extended border container for profile image - only on about page */}
          {!isMobile && (
            <>
              <AboutProfileBorders hasInitialLoaded={false} isMobile={isMobile} />
              
              {/* Profile image container */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
                style={{
                  position: 'absolute',
                  left: 'calc(-50vw + 1px)',
                  top: '-279px',
                  right: '19px',
                  height: 'calc(100% + 579px)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  padding: '40px'
                }}
              >
                <div style={{ 
                  position: 'relative', 
                  width: '280px', 
                  height: '380px',
                  marginBottom: '80px',
                  marginLeft: '300px'
                }}>
                  <Image
                    src="/liamlook.jpg"
                    alt="Liam Bakker"
                    fill
                    sizes="280px"
                    quality={90}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;