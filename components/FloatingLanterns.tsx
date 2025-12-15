"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Lantern = {
  left: number;
  delay: number;
  duration: number;
};

export default function FloatingLanterns() {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 6,
    }));
    setLanterns(data);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lanterns.map((lantern, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-6 h-10 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full opacity-70 blur-sm"
          style={{ left: `${lantern.left}%` }}
          animate={{ y: [-20, -900], opacity: [0, 1, 0] }}
          transition={{
            duration: lantern.duration,
            repeat: Infinity,
            delay: lantern.delay,
          }}
        />
      ))}
    </div>
  );
}
