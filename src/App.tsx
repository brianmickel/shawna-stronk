import confetti from "canvas-confetti";
import { useRef, useState, useEffect } from "react";
import "./App.css";

const GOLD = ["#FFD700", "#FFC200", "#FFAA00"];

function shootFromSides() {
  const end = Date.now() + 15 * 1000;

  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: GOLD,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: GOLD,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}

function App() {
  const clickCount = useRef(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function handleClick(e: React.MouseEvent | React.TouchEvent) {
    setShowHint(false);

    const x = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const y = "clientY" in e ? e.clientY : e.touches[0].clientY;

    confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      spread: 90,
      particleCount: 150,
      startVelocity: 40,
    });

    clickCount.current += 1;
    if (clickCount.current === 3) {
      shootFromSides();
    }
  }

  return (
    <div className="container" onClick={handleClick} onTouchStart={handleClick}>
      <img
        src="/shawna-stronk.png"
        alt="SHAWNA STRONK"
        className="title-image"
      />
      <p className={`hint${showHint ? " hint--visible" : ""}`}>
        TAP/CLICK THE TEXT
      </p>
    </div>
  );
}

export default App;
