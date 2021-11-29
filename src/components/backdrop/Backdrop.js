import { motion } from "framer-motion/dist/es/index";
import s from "./Backdrop.module.css";

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className={s.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
