import { MessageCircle, MapPin, CarFront, Link2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#0c0f0a] text-white font-sans overflow-x-hidden">
      {/* Top Header */}
      <header className="bg-black py-4 px-8 flex items-center justify-between border-b border-white/5 relative z-50">
        <div className="flex items-center gap-3">
          <div className="bg-green-600/10 p-2 rounded-lg border border-green-600/20">
            <CarFront size={24} className="text-green-500" />
          </div>
          <span className="text-xl font-black italic tracking-wider">
            <span className="text-white">Central</span> <span className="text-green-500">Autocenter</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="bg-green-500 text-black px-6 py-1.5 rounded-full font-black text-xs tracking-widest uppercase transition-transform hover:scale-105 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
            Início
          </a>
          <a href="#" className="text-slate-300 hover:text-white font-bold text-xs tracking-widest uppercase transition-colors">
            Serviços
          </a>
          <a href="#" className="text-slate-300 hover:text-white font-bold text-xs tracking-widest uppercase transition-colors">
            Parceiros
          </a>
          <a href="#" className="text-slate-400 hover:text-white font-bold text-xs tracking-widest uppercase transition-colors flex items-center gap-1">
            <Link2 size={14} /> Links
          </a>
        </nav>
      </header>

      {/* Hero Section - First Fold */}
      <section className="relative h-[650px] flex overflow-hidden">
        {/* Background Image of Garage */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80')" }} 
        />
        
        {/* Left Area - White overlay with contact info */}
        <div className="relative z-10 w-full md:w-[45%] lg:w-[35%] bg-white/95 flex flex-col justify-center px-10 md:px-16 clip-diagonal-left shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={32} className="text-green-600" />
            </div>
            <span className="text-black font-black text-2xl md:text-3xl tracking-tight">(73) 99174-1441</span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <MapPin size={40} className="text-green-600" fill="#22c55e" stroke="white" />
            </div>
            <p className="text-slate-800 font-bold text-base md:text-lg leading-snug">
              Itabuna - Central Autocenter<br/>
              BR-415, 4249 - Centro Industrial,<br/>
              Itabuna - BA, 45613-000
            </p>
          </div>
        </div>

        {/* Right Area - Green overlay with huge 3D logo */}
        <div className="absolute top-0 right-0 bottom-0 w-[70%] z-10 clip-diagonal hidden md:flex items-center justify-center overflow-hidden">
          {/* Darker green gradient inside */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-900 to-black opacity-95" />
          
          {/* 3D Logo representation */}
          <div className="relative z-20 flex flex-col items-center transform md:translate-x-12 lg:translate-x-0 scale-90 lg:scale-100">
            <div className="bg-gradient-to-b from-slate-300 to-slate-500 rounded-full p-6 shadow-2xl border-4 border-slate-700 mb-4 animate-float">
               <CarFront size={80} className="text-slate-900" />
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white italic tracking-tighter" style={{ textShadow: "4px 4px 0px #1e293b, 8px 8px 15px rgba(0,0,0,0.8)"}}>
              CENTRAL
            </h1>
            <h2 className="text-5xl lg:text-7xl font-black text-green-500 italic tracking-tighter -mt-2 lg:-mt-4" style={{ textShadow: "3px 3px 0px #064e3b, 6px 6px 15px rgba(0,0,0,0.8)"}}>
              AUTOCENTER
            </h2>
            <div className="flex items-center gap-3 mt-6">
               <span className="text-white/70 font-bold tracking-[0.3em] text-xs">QUALIDADE</span>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
               <span className="text-white/70 font-bold tracking-[0.3em] text-xs">CONFIANÇA</span>
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
               <span className="text-white/70 font-bold tracking-[0.3em] text-xs">DESEMPENHO</span>
            </div>
          </div>
        </div>

        {/* Bottom Green Bar / Counter */}
        <div className="absolute bottom-0 left-0 right-0 h-10 z-20 flex bg-gradient-to-r from-green-600 via-green-500 to-green-700 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] border-t border-green-400/50" />
      </section>

      {/* Second Fold - Information Section */}
      <section className="relative bg-[#0c0f0a] min-h-[500px] flex items-center overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0 bg-particles" />
        
        <div className="container mx-auto px-6 md:px-12 py-20 relative z-10 flex flex-col md:flex-row items-center">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 pt-10">
            <div className="inline-block bg-green-500/20 text-green-400 border border-green-500/30 font-black text-[10px] md:text-xs tracking-widest uppercase px-5 py-2.5 rounded-full mb-8 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
              Mecânica Geral & Pneus em Itabuna/BA
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-[1.05] tracking-tight">
              SEGURANÇA E<br/>
              PERFORMANCE PARA<br/>
              O SEU CAMINHO
            </h2>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 relative h-full flex justify-end mt-16 md:mt-0">
            {/* White angular shape background */}
            <div className="absolute inset-y-0 right-0 w-[120%] bg-white clip-diagonal-left -z-10 translate-x-20 shadow-2xl" />
            
            {/* Tire Image (using a generic tire/wheel from unsplash as placeholder) */}
            <div className="relative z-10 flex justify-end items-end w-full max-w-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1598084991519-c90900bc9df0?auto=format&fit=crop&q=80&w=800" 
                alt="Pneu Premium" 
                className="w-full h-auto object-cover rounded-3xl transform -rotate-12 hover:rotate-0 transition-transform duration-700 shadow-2xl border-4 border-slate-800/20" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#0a0a0a] border border-green-500/50 rounded-full p-2 pr-6 flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.8)] group hover:border-green-400">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
              <CarFront size={18} className="text-slate-300" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide group-hover:text-green-400 transition-colors">
            Fale com o Pneuzinho! 
            <MessageCircle size={16} className="inline ml-2 text-white/50" />
          </span>
        </button>
      </div>

    </div>
  );
}

export default App;
