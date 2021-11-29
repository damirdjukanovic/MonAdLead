import React from "react";
import s from "./MotionButton.module.css";
import { motion } from "framer-motion/dist/es/index";

export default function MotionButton({ text, color, click }) {
  return (
    <div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ backgroundColor: color }}
        className={`${s.createUserButton}`}
        onClick={click}
      >
        {text}
      </motion.button>
    </div>
  );
}
