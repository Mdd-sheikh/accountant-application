import React from "react";
import { motion } from "framer-motion";
import "./LandingPageFour.css";

const businessList = [
  { title: "E-Commerce", icon: "🖥️" },
  { title: "Hardware", icon: "📦" },
  { title: "Electronics", icon: "💻" },
  { title: "Jewellery", icon: "💎" },
  { title: "Supermarkets", icon: "🏪" },
  { title: "Grocery", icon: "🛒" },
  { title: "Medical", icon: "➕" },
  { title: "Lifestyle", icon: "🌿" },
  { title: "Fashion", icon: "👕" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const LandingPageFour = () => {
  return (
    <div className="business-bg">
      {/* Floating Particles */}
      <div className="particles"></div>

      <div className="business-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Made For Every Type Of Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Expert guidance to ensure accurate, compliant, and hassle-free GST
          billing.
        </motion.p>

        <div className="business-grid">
          {businessList.map((item, index) => (
            <motion.div
              className="business-card"
              key={index}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.03 }}
            >
              <div className="left">
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </div>
              <span className="arrow">→</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="explore-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore all features
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPageFour;
