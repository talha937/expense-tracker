import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#FF8A5B", "#4FB6C6", "#E2574C", "#FFC178", "#C77DFF", "#6FCF97", "#F4A259", "#B8ADA3"];

function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);
  const frame = useRef();
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);
  return value;
}

function SummaryDashboard({ refreshKey }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/expenses/summary`)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const animatedTotal = useCountUp(summary?.total_expenses || 0);

  if (loading || !summary || summary.expense_count === 0) return null;

  const chartData = Object.entries(summary.category_breakdown).map(([name, value]) => ({ name, value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="max-w-xl mx-auto mb-8"
    >
      <div className="torn-edge card-lift bg-[#2A2422] rounded-t-2xl px-6 pt-6 pb-8 border border-b-0 border-[#F7F0EA]/10">
        <p className="font-mono-data text-xs tracking-widest text-[#B8ADA3] uppercase mb-1 text-center">
          Total Balance Recorded
        </p>
        <p
          className="font-display text-5xl font-bold text-center mb-1 bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #FF8A5B, #FFC178)" }}
        >
          ${animatedTotal.toFixed(2)}
        </p>
        <p className="font-mono-data text-xs text-[#B8ADA3] text-center mb-5">
          across {summary.expense_count} {summary.expense_count === 1 ? "entry" : "entries"}
        </p>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                innerRadius={45} outerRadius={75} paddingAngle={2}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1E1A18", border: "1px solid #F7F0EA22", borderRadius: "8px", color: "#F7F0EA" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
          {chartData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="capitalize text-[#B8ADA3] font-mono-data">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SummaryDashboard;