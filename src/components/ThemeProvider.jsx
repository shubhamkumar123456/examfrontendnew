import React from 'react';
import { motion } from 'framer-motion';

const ThemeProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // console.log(rect)
    // console.log(e.clientX)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="min-h-[91.7vh] w-full overflow-hidden text-white bg-gradient-to-br  from-black via-[#1a1a1a] to-[#2a2a2a]  relative"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#BF9B30] rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, Math.sin(i) * 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(i * 5)}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191,155,48,0.15), transparent 25%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a] to-transparent"></div>

      {children}
    </div>
  );
};

export default ThemeProvider;
