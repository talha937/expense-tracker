import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const CATEGORIES = [
  "food", "transportation", "entertainment", "utilities",
  "shopping", "health", "education", "other",
];

const CATEGORY_COLORS = {
  food: "#FF8A5B",
  transportation: "#4FB6C6",
  entertainment: "#E2574C",
  utilities: "#FFC178",
  shopping: "#C77DFF",
  health: "#6FCF97",
  education: "#F4A259",
  other: "#B8ADA3",
};

function BudgetTracker({ refreshKey }) {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("food");
  const [limit, setLimit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchBudgets = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/budgets/`)
      .then((res) => setBudgets(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBudgets();
  }, [refreshKey]);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/budgets/`, {
        category,
        monthly_limit: parseFloat(limit),
      });
      setLimit("");
      setShowForm(false);
      fetchBudgets();
    } catch (err) {
      console.error(err);
      setError("Couldn't save that budget.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto mb-6"
    >
      <div className="card-lift bg-[#2A2422] border border-[#F7F0EA]/10 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase">
            Monthly Budgets
          </p>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-xs text-[#FFC178] hover:underline"
          >
            {showForm ? "cancel" : "+ set budget"}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSetBudget}
              className="flex gap-2 mb-4 overflow-hidden"
            >
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#332C29] text-[#F7F0EA] rounded-lg px-3 py-2 outline-none border border-transparent focus:border-[#FF8A5B] capitalize text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                min="1"
                placeholder="Limit ($)"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                required
                className="flex-1 bg-[#332C29] text-[#F7F0EA] font-mono-data placeholder-[#7A716B] rounded-lg px-3 py-2 outline-none border border-transparent focus:border-[#FF8A5B] text-sm"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 rounded-lg text-sm text-[#1E1A18] font-medium disabled:opacity-50"
                style={{ background: "linear-gradient(90deg, #FF8A5B, #FFC178)" }}
              >
                Save
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {error && <p className="text-[#E2574C] text-sm mb-2">{error}</p>}

        {budgets.length === 0 ? (
          <p className="text-[#B8ADA3] text-sm">No budgets set yet.</p>
        ) : (
          <div className="space-y-3">
            {budgets.map((b) => {
              const overBudget = b.percent_used >= 100;
              const nearLimit = b.percent_used >= 80 && !overBudget;
              const barColor = overBudget
                ? "#E2574C"
                : nearLimit
                ? "#FFC178"
                : CATEGORY_COLORS[b.category] || "#FF8A5B";

              return (
                <div key={b.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F7F0EA] text-sm capitalize font-medium">
                      {b.category}
                    </span>
                    <span className="font-mono-data text-xs text-[#B8ADA3]">
                      ${b.spent.toFixed(2)} / ${b.monthly_limit.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#332C29] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(b.percent_used, 100)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                  </div>
                  {overBudget && (
                    <p className="text-[#E2574C] text-xs mt-1">Over budget this month</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BudgetTracker;