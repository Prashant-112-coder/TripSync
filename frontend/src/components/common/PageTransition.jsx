import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="page-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
