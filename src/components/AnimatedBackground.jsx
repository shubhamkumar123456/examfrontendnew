// components/AnimatedBackground.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#1a1a1a]"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Dots */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#BF9B30] rounded-full"
            animate={{
              x: [0, Math.random() * 50, 0],
              y: [0, Math.random() * 50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191,155,48,0.3), transparent 40%)`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
