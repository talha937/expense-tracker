import { motion } from "framer-motion";
import BudgetTracker from "../components/BudgetTracker";

function Budgets() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase mb-1">
          Monthly Limits
        </p>
        <h1 className="font-display text-4xl font-bold text-[#F7F0EA]">
          Budgets
        </h1>
      </motion.div>

      <BudgetTracker refreshKey={0} />
    </>
  );
}

export default Budgets;