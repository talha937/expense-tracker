import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const CATEGORIES = [
  "food", "transportation", "entertainment", "utilities",
  "shopping", "health", "education", "other",
];

const emptyForm = { title: "", amount: "", category: "food", description: "" };

function AddExpenseForm({ onExpenseAdded }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleClearForm = () => {
    setForm(emptyForm);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/expenses/`, {
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        description: form.description || null,
      });
      onExpenseAdded(res.data);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError("Couldn't add that. Check the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative max-w-xl mx-auto mb-6"
    >
      <div className="card-lift bg-[#2A2422] border border-[#F7F0EA]/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-3">
          <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase">
            New Entry
          </p>
          <button
            type="button"
            onClick={handleClearForm}
            className="text-xs text-[#B8ADA3] hover:text-[#FFC178] transition-colors"
          >
            clear form
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="What did you spend on?"
            value={form.title}
            onChange={update("title")}
            required
            className="w-full bg-[#332C29] text-[#F7F0EA] placeholder-[#7A716B] rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] transition-colors"
          />

          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A716B] font-mono-data">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={update("amount")}
                required
                className="w-full bg-[#332C29] text-[#F7F0EA] placeholder-[#7A716B] font-mono-data rounded-lg pl-7 pr-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] transition-colors"
              />
            </div>
            <select
              value={form.category}
              onChange={update("category")}
              className="bg-[#332C29] text-[#F7F0EA] rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] capitalize transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Note (optional)"
            value={form.description}
            onChange={update("description")}
            rows={2}
            className="w-full bg-[#332C29] text-[#F7F0EA] placeholder-[#7A716B] rounded-lg px-3 py-2.5 outline-none border border-transparent focus:border-[#FF8A5B] resize-none transition-colors"
          />
        </div>

        {error && <p className="text-[#E2574C] text-sm mt-3">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="w-full mt-4 text-[#1E1A18] font-medium rounded-lg py-2.5 transition-opacity disabled:opacity-50"
          style={{ background: "linear-gradient(90deg, #FF8A5B, #FFC178)" }}
        >
          {submitting ? "Recording..." : "Add to Ledger"}
        </motion.button>
      </div>

      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-24 border-2 border-[#FFC178] text-[#FFC178] font-mono-data text-xs uppercase px-3 py-1 rounded pointer-events-none"
          >
            Recorded ✓
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default AddExpenseForm;