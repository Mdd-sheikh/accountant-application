import React, { useEffect, useRef } from "react";
import "./LandingPageThree.css";
import { assests } from "../../assets/assests";

const LandingPageThree = () => {
  const items = [
    "Create Invoice", "Get Paid Faster", "Auto Reminders", "Recurring Billing",
    "50+ Integrations", "Bank-Level Security", "Real-Time Analytics", "Mobile Ready",
    "Create Invoice", "Get Paid Faster", "Auto Reminders", "Recurring Billing",
    "50+ Integrations", "Bank-Level Security", "Real-Time Analytics", "Mobile Ready",
  ];

  return (
  <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />{item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LandingPageThree;
