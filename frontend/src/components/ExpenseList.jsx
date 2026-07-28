import { useState } from "react";
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

function ExpenseList({ expenses, loading, error, onExpenseDeleted, onExpenseUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("food");
  const [deletingId, setDeletingId] = useState(null);

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditTitle(exp.title);
    setEditAmount(exp.amount);
    setEditCategory(exp.category);
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
        title: editTitle, amount: parseFloat(editAmount), category: editCategory,
      });
      onExpenseUpdated(res.data);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update expense.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this entry from the ledger?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`);
      onExpenseDeleted(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-center text-[#B8ADA3] font-mono-data mt-10">loading ledger...</p>;
  }
  if (error) {
    return <p className="text-center text-[#E2574C] mt-10">{error}</p>;
  }
  if (expenses.length === 0) {
    return <p className="text-center text-[#B8ADA3] mt-10">No entries yet — add your first expense above.</p>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-2">
      <AnimatePresence>
        {expenses.map((exp, i) => (
          <motion.div
            key={exp.id}
            layout
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: i * 0.03 }}
            className="card-lift bg-[#2A2422] border border-[#F7F0EA]/10 rounded-xl px-4 py-3"
          >
            {editingId === exp.id ? (
              <div className="space-y-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#332C29] text-[#F7F0EA] rounded-lg px-3 py-2 outline-none border border-[#FF8A5B]"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="flex-1 bg-[#332C29] text-[#F7F0EA] font-mono-data rounded-lg px-3 py-2 outline-none border border-[#FF8A5B]"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="bg-[#332C29] text-[#F7F0EA] rounded-lg px-3 py-2 outline-none border border-[#FF8A5B] capitalize"
                  >
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 rounded-lg text-sm bg-[#332C29] text-[#F7F0EA]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEdit(exp.id)}
                    className="px-3 py-1.5 rounded-lg text-sm text-[#1E1A18]"
                    style={{ background: "linear-gradient(90deg, #FF8A5B, #FFC178)" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="flex items-center gap-2 min-w-0">
                  <motion.span
                    whileHover={{ rotate: -4, scale: 1.05 }}
                    className="shrink-0 text-[10px] font-mono-data uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[exp.category] || "#B8ADA3", color: "#1E1A18" }}
                  >
                    {exp.category}
                  </motion.span>
                  <span className="truncate text-[#F7F0EA] font-medium">{exp.title}</span>
                </div>
                <span className="leader-line" />
                <span className="font-mono-data text-[#F7F0EA] font-semibold shrink-0">
                  ${exp.amount.toFixed(2)}
                </span>
                <div className="flex gap-2 ml-3 shrink-0">
                  <button onClick={() => startEdit(exp)} className="text-[#B8ADA3] hover:text-[#FFC178] text-xs">
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    disabled={deletingId === exp.id}
                    className="text-[#B8ADA3] hover:text-[#E2574C] text-xs disabled:opacity-50"
                  >
                    {deletingId === exp.id ? "…" : "delete"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ExpenseList;