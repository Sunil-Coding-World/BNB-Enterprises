import * as motion from "motion/react-client";

// Re-mounts on every admin navigation, so each page fades in.
export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
