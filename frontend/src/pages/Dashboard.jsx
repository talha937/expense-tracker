import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import SummaryDashboard from "../components/SummaryDashboard";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [clearingAll, setClearingAll] = useState(false);

  const fetchExpenses = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/expenses/`)
      .then((res) => {
        setExpenses(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load expenses.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const bumpRefresh = () => setRefreshKey((k) => k + 1);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
    bumpRefresh();
  };

  const handleExpenseDeleted = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    bumpRefresh();
  };

  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    bumpRefresh();
  };

  const handleClearAll = async () => {
    if (expenses.length === 0) return;
    if (!window.confirm(`Delete all ${expenses.length} expenses? This can't be undone.`)) return;
    setClearingAll(true);
    try {
      await Promise.all(
        expenses.map((exp) =>
          axios.delete(`${import.meta.env.VITE_API_URL}/api/expenses/${exp.id}`)
        )
      );
      setExpenses([]);
      bumpRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to clear all expenses.");
    } finally {
      setClearingAll(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase mb-1">
          Personal Ledger
        </p>
        <motion.h1
          initial={{ scale: 1.4, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
          className="font-display text-5xl font-bold text-[#F7F0EA] inline-block"
        >
          Expense Tracker
        </motion.h1>
      </motion.div>

      <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
      <SummaryDashboard refreshKey={refreshKey} />

      {expenses.length > 0 && (
        <div className="max-w-xl mx-auto mb-3 flex justify-end">
          <button
            onClick={handleClearAll}
            disabled={clearingAll}
            className="text-xs text-[#B8ADA3] hover:text-[#E2574C] disabled:opacity-50 transition-colors"
          >
            {clearingAll ? "clearing…" : "clear all expenses"}
          </button>
        </div>
      )}

      <ExpenseList
        expenses={expenses}
        loading={loading}
        error={error}
        onExpenseDeleted={handleExpenseDeleted}
        onExpenseUpdated={handleExpenseUpdated}
      />
    </>
  );
}

export default Dashboard;