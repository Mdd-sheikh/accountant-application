import React, { useEffect, useRef } from "react";
import "./LandingPageThree.css";
import { assests } from "../../assets/assests";

const LandingPageThree = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    let lastX = 0;
    let lastY = 0;

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);

      hero.style.setProperty("--x", `${currentX}px`);
      hero.style.setProperty("--y", `${currentY}px`);

      const speed = Math.min(
        Math.hypot(targetX - lastX, targetY - lastY) * 0.04,
        1
      );

      hero.style.setProperty("--speed", speed);

      const rect = hero.getBoundingClientRect();
      const offsetX = (currentX - rect.width / 2) * 0.02;
      const offsetY = (currentY - rect.height / 2) * 0.02;

      text.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      lastX = targetX;
      lastY = targetY;

      requestAnimationFrame(animate);
    };

    const setPosition = (x, y) => {
      const rect = hero.getBoundingClientRect();
      targetX = x - rect.left;
      targetY = y - rect.top;
    };

    hero.addEventListener("mousemove", (e) =>
      setPosition(e.clientX, e.clientY)
    );

    hero.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) {
          setPosition(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );

    animate();
  }, []);

  return (
    <div className="landingpagethree">
      <div className="landing-page-three-container" ref={heroRef}>
        <div className="text-wrapper" ref={textRef}>
          <h1>
            Invisible security. Unbreakable trust.
            <span className="lock-video">
              <video
                src={assests.clock_video}
                autoPlay
                loop
                muted
                playsInline
              />
            </span>
          </h1>

          <p>Your data stays private. Always encrypted.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageThree;
