/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Terminal, 
  Code, 
  Cpu, 
  BarChart3, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Target,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  X,
  ExternalLink,
  Users,
  Compass,
  LayoutGrid,
  Info,
  Github
} from 'lucide-react';
import { QUESTION_POOL, Question } from './constants';

// --- Types ---
type QuizState = 'START' | 'QUIZ' | 'RESULT';
type ModalType = 'EXPLORE' | 'CHALLENGES' | 'LEADERBOARD' | 'PRIVACY' | 'TERMS' | 'SUPPORT' | 'DISCORD' | 'GET_STARTED' | null;

export default function App() {
  const [gameState, setGameState] = useState<QuizState>('START');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalXp, setTotalXp] = useState(0);

  // Initialize randomized questions
  const initializeQuiz = () => {
    console.log("Initializing dynamic quiz...");
    const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setCurrentQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalXp(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setGameState('QUIZ');
  };

  const restartQuiz = () => {
    setGameState('START');
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestions[currentQuestionIndex].correctIndex) {
      setScore(s => s + 1);
      setTotalXp(x => x + currentQuestions[currentQuestionIndex].xp);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameState('RESULT');
    }
  };

  const getRank = () => {
    if (score <= 2) return { label: 'Beginner', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' };
    if (score <= 4) return { label: 'Tech Explorer', color: 'bg-secondary-container/20 text-secondary-container border-secondary-container/40' };
    return { label: 'Future Innovator', color: 'bg-primary-container/20 text-primary-container border-primary-container/40' };
  };

  const rank = getRank();

  // --- Modal Content Component ---
  const ModalPortal = ({ type }: { type: ModalType }) => {
    if (!type) return null;

    const contentPool: Record<string, { title: string; icon: any; body: string }> = {
      EXPLORE: {
        title: "Explore FutureSkill",
        icon: Compass,
        body: "Temukan berbagai modul pembelajaran interaktif mulai dari Web Development, Data Science, hingga Machine Learning. Kurikulum kami dirancang untuk mempersiapkanmu menghadapi industri masa depan."
      },
      CHALLENGES: {
        title: "Weekly Challenges",
        icon: LayoutGrid,
        body: "Selesaikan tantangan coding mingguan dan menangkan badge eksklusif. Setiap tantangan akan menguji logika pemecahan masalahmu dalam situasi dunia nyata."
      },
      LEADERBOARD: {
        title: "Global Leaderboard",
        icon: Users,
        body: "Lihat posisi rank kamu dibandingkan dengan ribuan siswa lainnya di seluruh dunia. Berkompetisilah secara sehat untuk menjadi 'Future Innovator' terbaik."
      },
      PRIVACY: {
        title: "Privacy Policy",
        icon: ShieldCheck,
        body: "Privasi datamu adalah prioritas kami. Kami hanya menggunakan data progress quiz untuk personalisasi pengalaman belajarmu. Kami tidak menjual data ke pihak ketiga."
      },
      TERMS: {
        title: "Terms of Service",
        icon: Info,
        body: "Dengan menggunakan platform ini, kamu setuju untuk mengikuti panduan komunitas kami. Dilarang menggunakan bot atau kecurangan dalam mengerjakan quiz."
      },
      SUPPORT: {
        title: "Support Center",
        icon: RotateCcw,
        body: "Ada kendala teknis? Tim bantuan kami siap 24/7. Hubungi kami melalui tiket bantuan atau live chat untuk solusi cepat."
      },
      DISCORD: {
        title: "Join Discord",
        icon: ExternalLink,
        body: "Bergabunglah dengan komunitas Discord kami. Berdiskusi kode, berbagi proyek, dan berkolaborasi dengan sesama antusias teknologi."
      },
      GET_STARTED: {
        title: "Ready to Start?",
        icon: Zap,
        body: "Daftar sekarang untuk menyimpan progress quiz, mendapatkan sertifikat digital, dan mengakses materi premium secara gratis untuk 7 hari pertama."
      }
    };

    const content = contentPool[type] || contentPool.EXPLORE;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface/80 backdrop-blur-md"
        onClick={() => setActiveModal(null)}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-[#0d1c2d] border border-white/10 rounded-3xl p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => setActiveModal(null)}
            className="absolute top-6 right-6 text-[#b9cacb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
              <content.icon className="text-primary-container" size={24} />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">{content.title}</h2>
          </div>
          
          <p className="text-[#b9cacb] text-lg leading-relaxed mb-8">
            {content.body}
          </p>
          
          <button 
            onClick={() => setActiveModal(null)}
            className="w-full py-4 rounded-xl bg-primary-container text-[#051424] font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95"
          >
            Paham, Lanjutkan
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden selection:bg-primary-container selection:text-surface">
      <AnimatePresence>
        {activeModal && <ModalPortal type={activeModal} />}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-grid pointer-events-none opacity-40"></div>
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-50 bg-surface/60 backdrop-blur-xl border-b border-white/5 px-8 h-16 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={restartQuiz}>
          <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-primary-container fill-primary-container/20" />
          </div>
          <span className="text-xl font-display font-bold text-primary-container drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">
            FutureSkill Quiz
          </span>
        </div>
        
        <div className="hidden md:flex gap-6 items-center">
          <nav className="flex gap-4">
            <button onClick={() => setActiveModal('EXPLORE')} className="text-[#b9cacb] hover:text-primary-container text-sm font-medium transition-colors">Explore</button>
            <button onClick={() => setActiveModal('CHALLENGES')} className="text-[#b9cacb] hover:text-primary-container text-sm font-medium transition-colors">Challenges</button>
            <button onClick={() => setActiveModal('LEADERBOARD')} className="text-[#b9cacb] hover:text-primary-container text-sm font-medium transition-colors">Leaderboard</button>
          </nav>
          <button 
            onClick={() => setActiveModal('GET_STARTED')}
            className="bg-primary-container/10 border border-primary-container text-primary-container px-6 py-1.5 rounded-lg text-sm font-bold hover:bg-primary-container hover:text-surface transition-all active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.2)]"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN */}
          {gameState === 'START' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl w-full text-center flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-container/30 bg-primary-container/5 backdrop-blur-sm mb-8">
                <Terminal size={16} className="text-primary-container" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-container">System Initialize</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-primary-container to-secondary-container bg-clip-text text-transparent">
                FutureSkill Quiz
              </h1>
              
              <h2 className="text-xl md:text-2xl text-white font-semibold mb-6">
                Discover Your AI & Coding Power.
              </h2>
              
              <p className="text-[#b9cacb] text-lg max-w-xl mb-12 leading-relaxed">
                Uji pengetahuanmu tentang kecerdasan buatan, teknologi, dan pemrograman dalam simulasi interaktif yang berubah setiap sesi.
              </p>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                <button 
                  onClick={initializeQuiz}
                  className="relative bg-[#051424] border border-primary-container text-white font-display text-2xl font-bold px-12 py-5 rounded-xl flex items-center gap-4 hover:bg-primary-container hover:text-surface transition-all active:scale-95"
                >
                  <Rocket className="w-8 h-8" />
                  Mulai Quiz
                </button>
              </div>

              {/* Decorative Widgets */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full opacity-60">
                {[
                  { icon: Code, label: "Coding Logic", value: "75%", color: "text-primary-container" },
                  { icon: Cpu, label: "AI Memory", value: "90%", color: "text-secondary-container" },
                  { icon: BarChart3, label: "Analytics", value: "60%", color: "text-primary-fixed" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-start gap-4">
                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full bg-current ${item.color}`} style={{ width: item.value }}></div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#b9cacb]">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {gameState === 'QUIZ' && currentQuestions.length > 0 && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl w-full"
            >
              {/* Quiz Header Info */}
              <div className="flex items-center justify-between mb-2 px-2">
                <button onClick={restartQuiz} className="text-[#b9cacb] hover:text-white transition-colors flex items-center gap-2">
                  <RotateCcw size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Keluar</span>
                </button>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-[#b9cacb] uppercase tracking-widest">Total XP</span>
                  <span className="text-2xl font-display font-bold text-primary-container neon-glow">{totalXp.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-container to-secondary-container shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                />
              </div>

              {/* Quiz Card */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden neon-box-glow">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded bg-[#051424] border border-primary-container/30 text-[10px] font-bold text-secondary-container uppercase tracking-widest">
                      {currentQuestions[currentQuestionIndex].category}
                    </div>
                    <span className="text-sm font-bold text-[#b9cacb] uppercase tracking-widest">Node {currentQuestionIndex + 1} / 5</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#b9cacb]">
                    <Clock size={16} />
                    <span className="text-xs font-mono tracking-tighter">SIMULATION ACTIVE</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-12 leading-tight">
                  {currentQuestions[currentQuestionIndex].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {currentQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestions[currentQuestionIndex].correctIndex;
                    
                    let variantClass = "border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-container/40";
                    if (isAnswered) {
                      if (isCorrect) variantClass = "border-primary-container bg-primary-container/10 text-primary-container";
                      else if (isSelected) variantClass = "border-red-500/50 bg-red-500/10 text-red-500";
                      else variantClass = "border-white/5 opacity-40";
                    }

                    return (
                      <button 
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${variantClass}`}
                      >
                        <span className="text-lg font-medium">
                          {String.fromCharCode(65 + idx)}. {option}
                        </span>
                        {isAnswered && isCorrect && <ShieldCheck className="text-primary-container animate-pulse" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-8 border-t border-white/5">
                  <button 
                    disabled={!isAnswered}
                    onClick={handleNext}
                    className={`flex items-center gap-2 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all ${
                      isAnswered 
                        ? "bg-gradient-to-r from-secondary-container to-secondary text-surface hover:scale-[1.05] shadow-[0_0_30px_rgba(255,36,228,0.4)]" 
                        : "bg-white/5 text-on-surface-variant opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestionIndex === currentQuestions.length - 1 ? "Finish Simulation" : "Next Segment"}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {gameState === 'RESULT' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl w-full"
            >
              <div className="bg-[#051424]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden neon-box-glow">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-container/10 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full bg-secondary-container/20 border border-secondary-container/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,36,228,0.2)]">
                    <Trophy className="w-12 h-12 text-secondary-container" />
                  </div>

                  <h1 className="text-sm font-bold text-[#b9cacb] uppercase tracking-[0.3em] mb-4">Simulation Complete</h1>
                  
                  <div className="text-7xl md:text-9xl font-display font-black text-primary-container mb-6 drop-shadow-[0_0_15px_rgba(0,242,255,0.6)] neon-glow tracking-tighter">
                    {totalXp.toLocaleString()}
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest mb-10 ${rank.color}`}>
                    <Target size={16} />
                    {rank.label}
                  </div>

                  <p className="text-[#b9cacb] text-lg max-w-md mx-auto mb-12">
                    Skor akhirmu adalah <span className="text-white font-bold">{score}/5</span>. 
                    {score === 5 ? " Sempurna! Kamu memiliki bakat masa depan yang luar biasa." : " Pencapaian hebat! Terus asah pengetahuan teknismu."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={restartQuiz}
                      className="px-10 py-5 rounded-2xl bg-[#051424] border border-primary-container text-primary-container font-bold uppercase tracking-widest hover:bg-primary-container hover:text-surface transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_20px_40px_rgba(0,242,255,0.15)]"
                    >
                      <RotateCcw size={20} />
                      Main Lagi
                    </button>
                    <button 
                      onClick={() => setActiveModal('LEADERBOARD')}
                      className="px-10 py-5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      Papan Skor
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-50 py-12 px-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-950/60 backdrop-blur-md">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
             <div className="w-6 h-6 rounded bg-primary-container/20 flex items-center justify-center">
                <Github size={14} className="text-primary-container" />
             </div>
             <div className="text-xl font-display font-bold text-white tracking-tight">FutureSkill Academy</div>
          </div>
          <p className="text-xs text-[#b9cacb] max-w-xs mx-auto md:mx-0">© 2024 FutureSkill. Menginspirasi inovator masa depan melalui tantangan teknologi cerdas.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button onClick={() => setActiveModal('PRIVACY')} className="text-xs font-bold uppercase tracking-widest text-[#b9cacb] hover:text-primary-container transition-colors">Privacy</button>
          <button onClick={() => setActiveModal('TERMS')} className="text-xs font-bold uppercase tracking-widest text-[#b9cacb] hover:text-primary-container transition-colors">Terms</button>
          <button onClick={() => setActiveModal('SUPPORT')} className="text-xs font-bold uppercase tracking-widest text-[#b9cacb] hover:text-primary-container transition-colors">Support</button>
          <button onClick={() => setActiveModal('DISCORD')} className="text-xs font-bold uppercase tracking-widest text-secondary-container hover:scale-105 hover:text-secondary transition-all">Discord</button>
        </div>
      </footer>
    </div>
  );
}
