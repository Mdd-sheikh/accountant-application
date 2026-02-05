import React from "react";
import { motion } from "framer-motion";
import "./LandingPageFive.css";

const features = [
  {
    title: "GST Billing and Invoicing",
    icon: "📋",
    points: [
      "Create GST Invoices",
      "Auto Calculate Taxes",
      "E-Way Bill Generation",
    ],
    footer: "Faster Billing, Fewer Mistakes",
  },
  {
    title: "Accounting and Ledger",
    icon: "📄",
    points: [
      "Track Expense & Income",
      "Manage Ledgers",
      "Bank Reconciliation",
    ],
    footer: "Complete Financial Report",
  },
  {
    title: "Multi User Access",
    icon: "👥",
    points: [
      "Role Based Permission",
      "Activity Logs",
      "Secure Login",
    ],
    footer: "Collaborate Securely With Your Team",
  },
  {
    title: "Business Insights and Reports",
    icon: "📈",
    points: [
      "Sales Analysis",
      "Profit & Loss Report",
      "Customizable Dashboard",
    ],
    footer: "Make Smarter Business Decisions",
  },
  {
    title: "Payment Tracking and Collection",
    icon: "💰",
    points: [
      "Send Payment Reminders",
      "Take Dues",
      "Multiple Payment Options",
    ],
    footer: "Never Miss a Payment",
  },
  {
    title: "Cloud Backup",
    icon: "☁️",
    points: [
      "Automatic Backups",
      "Data Encryption",
      "Access From Any Device",
    ],
    footer: "Your Data Is Always Safe",
  },
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

const LandingPageFive = () => {
  return (
    <div className="features-wrapper">
      <div className="features-grid">
        {features.map((item, index) => (
          <motion.div
            className="feature-card"
            key={index}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ scale: 1.03 }}
          >
            <div className="icon-box">{item.icon}</div>

            <h3>{item.title}</h3>

            <ul>
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <hr />
            <p className="card-footer">{item.footer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageFive;
