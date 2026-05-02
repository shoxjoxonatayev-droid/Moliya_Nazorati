import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Utensils, 
  Hotel, 
  User, 
  BarChart3, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Wallet,
  TrendingUp,
  Receipt,
  LayoutDashboard
} from 'lucide-react';

// --- Types ---
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: 'restaurant' | 'hotel' | 'personal';
  amount: number;
  description: string;
  date: string;
}

// --- Components ---

const StatCard = ({ title, amount, type, icon: Icon }: { title: string, amount: number, type: 'plus' | 'minus' | 'neutral', icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${
        type === 'plus' ? 'bg-emerald-50 text-emerald-600' : 
        type === 'minus' ? 'bg-rose-50 text-rose-600' : 
        'bg-blue-50 text-blue-600'
      }`}>
        <Icon size={20} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        type === 'plus' ? 'bg-emerald-100 text-emerald-700' : 
        type === 'minus' ? 'bg-rose-100 text-rose-700' : 
        'bg-blue-100 text-blue-700'
      }`}>
        {type === 'plus' ? '+ Kirim' : type === 'minus' ? '- Chiqim' : 'Balans'}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-black text-gray-900 mt-1">
      {amount.toLocaleString()} <span className="text-sm font-normal text-gray-400">so'm</span>
    </p>
  </div>
);

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('finance_data');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [activeCategory, setActiveCategory] = useState<'restaurant' | 'hotel' | 'personal'>('restaurant');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [isIncome, setIsIncome] = useState(true);

  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      type: isIncome ? 'income' : 'expense',
      category: activeCategory,
      amount: Number(amount),
      description: desc || (activeCategory === 'personal' ? 'Shaxsiy xarajat' : 'Amaliyot'),
      date: new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setDesc('');
  };

  const deleteTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const calculateStats = (cat: 'restaurant' | 'hotel' | 'personal') => {
    const filtered = transactions.filter(t => t.category === cat);
    const inc = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const exp = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { inc, exp, profit: inc - exp };
  };

  const stats = calculateStats(activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 rotate-3 transform transition hover:rotate-0">
              <Bot size={26} />
            </div>
            <div>
                <h1 className="font-black text-xl tracking-tight text-gray-900 leading-tight">Moliya Nazorati</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Professional v2.0</p>
            </div>
          </div>
          
          <nav className="flex bg-gray-100 p-1.5 rounded-2xl">
            {[
              { id: 'restaurant', label: 'Restoran', icon: Utensils },
              { id: 'hotel', label: 'Mehmonxona', icon: Hotel },
              { id: 'personal', label: 'Shaxsiy', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeCategory === tab.id 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Ushbu bo'limda Kirim" amount={stats.inc} type="plus" icon={TrendingUp} />
          <StatCard title="Ushbu bo'limda Chiqim" amount={stats.exp} type="minus" icon={Receipt} />
          <StatCard title={activeCategory === 'personal' ? "Qoldiq" : "Sof Foyda"} amount={stats.profit} type="neutral" icon={Wallet} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-28">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Plus size={24} />
                </div>
                Kiritish
              </h2>
              
              <form onSubmit={addTransaction} className="space-y-6">
                <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setIsIncome(true)}
                    className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isIncome ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Kirim (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsIncome(false)}
                    className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isIncome ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Chiqim (-)
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest px-1">Summa (so'm)</label>
                  <div className="relative">
                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-500 focus:ring-0 outline-none font-black text-lg transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest px-1">Izoh / Batafsil</label>
                  <input 
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Nima uchun?"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-500 focus:ring-0 outline-none font-medium transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all relative overflow-hidden group ${
                    isIncome ? 'bg-emerald-500 shadow-emerald-100' : 'bg-rose-500 shadow-rose-100'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Saqlash
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
              <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
                <div>
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                    <BarChart3 size={24} className="text-indigo-500" />
                    Amaliyotlar Tarixi
                    </h3>
                    <p className="text-sm text-gray-400 font-medium ml-9">Oxirgi kiritilgan ma'lumotlar ro'yxati</p>
                </div>
                <div className="px-5 py-2 bg-indigo-50 rounded-full">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{activeCategory} bo'limi</span>
                </div>
              </div>

              <div className="divide-y divide-gray-50 max-h-[700px] overflow-y-auto scrollbar-hide">
                <AnimatePresence initial={false} mode="popLayout">
                  {transactions.filter(t => t.category === activeCategory).length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-32 text-center text-gray-300 flex flex-col items-center gap-6"
                    >
                      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                        <Receipt size={48} className="opacity-20" />
                      </div>
                      <div className="max-w-[200px]">
                        <p className="font-bold text-gray-400">Hozircha hech qanday ma'lumot yo'q</p>
                        <p className="text-sm mt-1">Yangi ma'lumot qo'shishingiz bilan bu yerda aks etadi.</p>
                      </div>
                    </motion.div>
                  ) : (
                    transactions
                      .filter(t => t.category === activeCategory)
                      .map((tx) => (
                        <motion.div 
                          key={tx.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-6 sm:p-8 flex items-center justify-between hover:bg-gray-50 transition-all group"
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                              tx.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                            }`}>
                              {tx.type === 'income' ? <TrendingUp size={24} /> : <Receipt size={24} />}
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{tx.description}</h4>
                                <p className="text-sm text-gray-400 font-bold mt-0.5">{tx.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className={`font-black text-xl tracking-tight ${
                                tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                                }`}>
                                {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()}
                                </p>
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-0.5">UZS</p>
                            </div>
                            <button 
                              onClick={() => deleteTx(tx.id)}
                              className="text-gray-200 hover:text-rose-500 p-2.5 bg-gray-50 hover:bg-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </motion.div>
                      ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-400">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Moliya Nazorati Pro © 2026</p>
          <div className="flex justify-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </div>
      </footer>
    </div>
  );
}
