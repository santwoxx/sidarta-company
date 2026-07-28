import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, X, ExternalLink, Lock, Menu, MessageCircle, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FluidCursor } from './components/FluidCursor';

// Character figurine data tailored for Sidarta Company (Tech & Creative)
const CHARACTERS = [
  {
    id: 'anadev',
    name: 'Ana Dev',
    role: 'Software & Automations',
    src: '/anadev.png.png',
    bg: '#080312', // Ultra dark purple-black
    panelGradient: 'linear-gradient(135deg, #6d28d9 0%, #1e1b4b 100%)', // Deep violet to indigo-950
    tag: 'DEVELOPER & AUTOMATIONS',
    details: 'Desenvolvimento de softwares sob medida, APIs robustas e automações inteligentes para otimizar processos e acelerar os resultados da sua empresa.',
    techs: ['</> Software', '🤖 Automações', '🧠 IA & Chatbots']
  },
  {
    id: 'carlosgestor',
    name: 'Carlos Gestor',
    role: 'Traffic & Growth',
    src: '/carlosgestor.png.png',
    bg: '#020108', // Pitch black
    panelGradient: 'linear-gradient(135deg, #4338ca 0%, #0f172a 100%)', // Indigo to slate-900
    tag: 'TRAFFIC & PERFORMANCE',
    details: 'Estratégias avançadas de tráfego pago, funis de alta conversão e escala de leads qualificados para multiplicar o faturamento do seu negócio.',
    techs: ['📈 Meta Ads', '🎯 Google Ads', '📊 Funis de Escala']
  },
  {
    id: 'antonydesign',
    name: 'Antony Design',
    role: 'Social Media & Branding',
    src: '/antonydesign.png.png',
    bg: '#0f0114', // Midnight plum
    panelGradient: 'linear-gradient(135deg, #be185d 0%, #3b0764 100%)', // Fuchsia to dark purple
    tag: 'CREATIVE & SOCIAL MEDIA',
    details: 'Posicionamento de marca, design de alto impacto visual e gestão estratégica de redes sociais para gerar desejo, autoridade e conexão.',
    techs: ['🎨 Branding', '📱 Redes Sociais', '🎬 Criação de Conteúdo']
  }
];

const SERVICES = ["Software", "Automação", "Social Media", "Tráfego Pago"];

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  fallbackGradient: string;
  techs: string[];
  stats: { metric: string; label: string };
  liveUrl?: string;
}

// Client projects featured in the Portfolio section
const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'centralautocar',
    title: 'Central AutoCar',
    category: 'Cliente • Site Institucional',
    shortDescription: 'Site institucional de alta conversão para o centro automotivo referência em Itabuna/BA — com agendamento direto via WhatsApp e SEO local.',
    description: 'Site institucional desenvolvido para a Central AutoCar, centro automotivo com 4 filiais na Bahia. O projeto apresenta a vitrine completa de serviços (alinhamento 3D, mecânica geral e pneus), unidades, depoimentos e FAQ, com funil de agendamento direto via WhatsApp, carregamento instantâneo e SEO local otimizado para dominar as buscas da região.',
    image: '/central-autocar-preview.jpg',
    fallbackGradient: 'from-blue-900 via-slate-950 to-black',
    techs: ['React', 'Vite', 'Tailwind CSS', 'Vercel', 'SEO Local'],
    stats: {
      metric: '5.0 ★',
      label: 'Avaliação dos clientes no Google'
    },
    liveUrl: 'https://central-autocar-site.vercel.app/'
  },
  {
    id: 'centralautocenter',
    title: 'Central Auto Center',
    category: 'Cliente • Centro Automotivo',
    shortDescription: 'Plataforma oficial da Central Auto Center apresentando serviços automotivos completos, agendamentos e localização de unidades.',
    description: 'Portal corporativo desenvolvido para a Central Auto Center. Focado em autoridade da marca, captação de clientes, apresentação detalhada de serviços mecânicos, alinhamento 3D e facilidade de agendamento com funil direto via WhatsApp.',
    image: '/central-autocenter-preview.jpg',
    fallbackGradient: 'from-indigo-900 via-purple-950 to-black',
    techs: ['React', 'Vite', 'Tailwind CSS', 'SEO Local', 'WhatsApp Funnel'],
    stats: {
      metric: '+4 Filiais',
      label: 'Atendimento na Região'
    },
    liveUrl: 'https://www.centralautocenter.com.br'
  },
  {
    id: 'centralpneus',
    title: 'Central Pneus',
    category: 'Cliente • Catálogo Digital',
    shortDescription: 'Site especializado na exibição de catálogo de pneus, marcas premium, troca de pneus e orçamento express via WhatsApp.',
    description: 'Solução digital de alta performance desenvolvida para a Central Pneus. Permite que os clientes visualizem marcas, modelos de pneus por aro, serviços de troca e solicitem orçamento imediato diretamente no WhatsApp.',
    image: '/central-pneus-preview.jpg',
    fallbackGradient: 'from-purple-900 via-indigo-950 to-black',
    techs: ['React', 'Vite', 'Tailwind CSS', 'Vercel', 'UI/UX Otimizado'],
    stats: {
      metric: '100%',
      label: 'Otimizado para Mobile'
    },
    liveUrl: 'https://central-pneus-site.vercel.app'
  },
  {
    id: 'wafort',
    title: 'WA Fort',
    category: 'Cliente • Site Corporativo',
    shortDescription: 'Site corporativo de alto impacto visual para a WA Fort, focado em autoridade de mercado, apresentação de soluções e geração de novos leads.',
    description: 'Website institucional desenvolvido sob medida para a WA Fort. Unindo estética moderna, velocidade de carregamento, responsividade e posicionamento estratégico para converter visitantes em clientes qualificados.',
    image: '/wafort-preview.jpg',
    fallbackGradient: 'from-purple-950 via-slate-900 to-black',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'SEO Otimizado', 'Branding'],
    stats: {
      metric: 'Alta Performance',
      label: 'Carregamento Ultra-rápido'
    },
    liveUrl: 'https://wafort.com.br'
  }
];

const FEATURED_PROJECT = PORTFOLIO_PROJECTS[0];

interface MagneticButtonProps {
  onClick: () => void;
  direction: 'down' | 'up';
  label: string;
  isActive: boolean;
}

function MagneticButton({ onClick, direction, label, isActive }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const isBlackStyle = 
    label === 'Portfólio' || 
    (label === 'Serviços' && direction === 'up') || 
    (label === 'Contato' && direction === 'down');

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: position.x, 
        y: position.y,
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15,
        mass: 0.8,
        opacity: { duration: 0.25 }
      }}
      className={`fixed right-3 sm:right-12 z-[60] flex flex-col items-center gap-1.5 sm:gap-2.5 cursor-pointer group ${
        isBlackStyle ? 'text-black' : 'text-purple-400 hover:text-white'
      }`}
      style={{
        bottom: direction === 'down' ? '1.5rem' : 'auto',
        top: direction === 'up' ? '5.5rem' : 'auto',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-label={direction === 'down' ? `Rolar para ${label}` : `Subir para ${label}`}
    >
      {direction === 'up' && (
        <motion.span 
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? -2 : 0
          }}
          className={`text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-colors ${
            isBlackStyle ? 'text-black' : 'text-purple-400 group-hover:text-purple-300'
          }`}
        >
          {label}
        </motion.span>
      )}
      
      <div className="relative flex items-center justify-center">
        {/* Outer Ring and Icon */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-300 ${
          isBlackStyle 
            ? 'bg-white border-white group-hover:bg-neutral-100 group-hover:border-neutral-250' 
            : 'bg-black/60 border-purple-500/30 group-hover:border-purple-400/60'
        }`}>
          {direction === 'down' ? (
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                isBlackStyle ? 'text-black' : 'text-purple-300 group-hover:text-white'
              }`} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowUp className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                isBlackStyle ? 'text-black' : 'text-purple-300 group-hover:text-white'
              }`} strokeWidth={2.5} />
            </motion.div>
          )}
        </div>
      </div>

      {direction === 'down' && (
        <motion.span 
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? 2 : 0
          }}
          className={`text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-colors ${
            isBlackStyle ? 'text-black' : 'text-purple-400 group-hover:text-purple-300'
          }`}
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  );
}

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState<'hero' | 'portfolio' | 'middle' | 'contact'>('hero');
  const [isSectionTransitioning, setIsSectionTransitioning] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsSectionTransitioning(true);
    const timer = setTimeout(() => {
      setIsSectionTransitioning(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Trigger Contact Modal
  useEffect(() => {
    if (activeSection === 'contact') {
      const delay = window.innerWidth < 768 ? 600 : 4200;
      const timer = setTimeout(() => {
        setShowContactModal(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowContactModal(false);
    }
  }, [activeSection]);

  // Portfolio Modal State
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Middle Section State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contactVideoRef = useRef<HTMLVideoElement>(null);

  // Inner scroll containers
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const contactScrollRef = useRef<HTMLDivElement>(null);

  // Touch navigation state
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const heroTouchStartX = useRef<number | null>(null);

  // Latest values readable from handlers
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;
  const selectedProjectRef = useRef(selectedProject);
  selectedProjectRef.current = selectedProject;

  // Touch vertical swipe logic for section navigation on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    // Verify vertical swipe intent
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      if (selectedProjectRef.current) return;
      const SECTION_ORDER = ['hero', 'portfolio', 'middle', 'contact'] as const;
      const scrollEls: Partial<Record<(typeof SECTION_ORDER)[number], React.RefObject<HTMLDivElement | null>>> = {
        portfolio: portfolioScrollRef,
        middle: middleScrollRef,
        contact: contactScrollRef,
      };

      const section = activeSectionRef.current;
      const dir = deltaY < 0 ? 1 : -1;

      const el = scrollEls[section]?.current;
      if (el && el.scrollHeight > el.clientHeight + 2) {
        const atTop = el.scrollTop <= 5;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          touchStartY.current = null;
          touchStartX.current = null;
          return;
        }
      }

      const currentIndex = SECTION_ORDER.indexOf(section);
      const nextIndex = currentIndex + dir;
      if (nextIndex >= 0 && nextIndex < SECTION_ORDER.length) {
        setActiveSection(SECTION_ORDER[nextIndex]);
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Hero carousel horizontal touch swipe
  const handleHeroTouchStart = (e: React.TouchEvent) => {
    heroTouchStartX.current = e.touches[0].clientX;
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (heroTouchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - heroTouchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
    heroTouchStartX.current = null;
  };

  // Mouse wheel navigation between sections
  useEffect(() => {
    const SECTION_ORDER = ['hero', 'portfolio', 'middle', 'contact'] as const;
    const scrollEls: Partial<Record<(typeof SECTION_ORDER)[number], React.RefObject<HTMLDivElement | null>>> = {
      portfolio: portfolioScrollRef,
      middle: middleScrollRef,
      contact: contactScrollRef,
    };

    let lockedUntil = 0;
    let needsQuiet = false;
    let accum = 0;
    let lastEvent = 0;

    const handleWheel = (e: WheelEvent) => {
      if (selectedProjectRef.current) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const now = performance.now();
      const gap = now - lastEvent;
      lastEvent = now;

      if (now < lockedUntil) {
        needsQuiet = true;
        return;
      }
      if (needsQuiet) {
        if (gap < 300) return;
        needsQuiet = false;
      }
      if (gap > 300) accum = 0;

      const section = activeSectionRef.current;
      const dir = e.deltaY > 0 ? 1 : -1;

      const el = scrollEls[section]?.current;
      if (el && el.scrollHeight > el.clientHeight + 2) {
        const atTop = el.scrollTop <= 2;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          accum = 0;
          needsQuiet = true;
          return;
        }
      }

      accum += e.deltaY;
      if (Math.abs(accum) < 50) return;
      accum = 0;

      const nextIndex = SECTION_ORDER.indexOf(section) + dir;
      if (nextIndex < 0 || nextIndex >= SECTION_ORDER.length) return;

      lockedUntil = now + 1300;
      needsQuiet = true;
      setActiveSection(SECTION_ORDER[nextIndex]);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageText = `Olá! Gostaria de receber uma proposta personalizada da Sidarta.\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*WhatsApp:* ${formData.phone}\n\n` +
      `*Serviços de Interesse:*\n` +
      (selectedServices.length > 0 
        ? selectedServices.map(s => `- ${s}`).join('\n') 
        : 'Nenhum serviço selecionado no checklist (interesse geral)');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (backendUrl) {
      try {
        await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            services: selectedServices,
          }),
        });
      } catch (err) {
        console.error('Failed to submit to backend:', err);
      }
    }

    const whatsappUrl = `https://wa.me/5573991422872?text=${encodeURIComponent(messageText)}`;
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    window.open(whatsappUrl, '_blank');
  };

  // Preload images, videos and handle resize
  useEffect(() => {
    CHARACTERS.forEach((char) => {
      const img = new Image();
      img.src = char.src;
    });

    const previewImg = new Image();
    previewImg.src = FEATURED_PROJECT.image;

    const charProfileImg = new Image();
    charProfileImg.src = '/right profile.png';

    const videosToPreload = [
      '/servicos.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'
    ];
    videosToPreload.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = url;
      document.head.appendChild(link);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Background Video Scrubbing & Auto-Play Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number | undefined;
    let targetTime = 0;
    let isSeeking = false;
    const isMobileDevice = window.innerWidth < 1024;

    // Mobile / Touch devices: force video play so character is animated and visible
    if (isMobileDevice) {
      video.play().catch(() => {
        // Fallback if browser restricts video autoplay
      });
    }

    const performSeek = () => {
      if (video.duration && !isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      if (video.duration) {
        const noseX = window.innerWidth * 0.78;
        let percentage = 0.5;

        if (e.clientX < noseX) {
          const leftPercent = e.clientX / noseX;
          percentage = leftPercent * 0.5;
        } else {
          const rightPercent = (e.clientX - noseX) / (window.innerWidth - noseX);
          percentage = 0.5 + rightPercent * 0.5;
        }
        
        percentage = Math.max(0, Math.min(1, percentage));
        targetTime = percentage * video.duration;
        performSeek();
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (video.duration && Math.abs(video.currentTime - targetTime) > 0.05) {
        performSeek();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    if (!isMobileDevice) {
      video.pause();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]);

  // Mouse Move tracking for 3D character tilt
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 14;
    const tiltY = ((x - centerX) / centerX) * 14;
    
    const container = e.currentTarget;
    container.style.setProperty('--tilt-x', `${tiltX}`);
    container.style.setProperty('--tilt-y', `${tiltY}`);
  };

  const handleHeroMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.style.setProperty('--tilt-x', '0');
    container.style.setProperty('--tilt-y', '0');
  };

  const handlePortfolioMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    const container = e.currentTarget;
    container.style.setProperty('--tilt-x', `${tiltX}`);
    container.style.setProperty('--tilt-y', `${tiltY}`);
  };

  const handlePortfolioMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.style.setProperty('--tilt-x', '0');
    container.style.setProperty('--tilt-y', '0');
  };

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 3;
      } else {
        return (prev + 2) % 3;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 2) % 3) return 'left';
    return 'right';
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-purple-900/50 selection:text-purple-200 antialiased"
      style={{
        fontFamily: "'Inter', sans-serif",
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Electric Purple WebGL Fluid Cursor Effect */}
      <FluidCursor
        simResolution={128}
        dyeResolution={1024}
        densityDissipation={3.5}
        velocityDissipation={2}
        pressure={0.1}
        curl={3}
        splatRadius={0.22}
        splatForce={6000}
      />

      {/* Top Header & Navigation */}
      <header className="fixed top-0 inset-x-0 h-20 sm:h-24 z-[70] flex items-center justify-between px-5 sm:px-12 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveSection('hero')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-xs shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-white leading-none">
              SIDARTA
            </span>
            <span className="text-[7px] font-bold tracking-[0.3em] text-purple-400 uppercase mt-0.5">
              COMPANY
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-md shadow-xl">
          <button
            onClick={() => setActiveSection('hero')}
            className={`text-[10px] font-bold transition-colors uppercase tracking-wider cursor-pointer ${
              activeSection === 'hero' ? 'text-purple-400' : 'text-white/75 hover:text-white'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => setActiveSection('portfolio')}
            className={`text-[10px] font-bold transition-colors uppercase tracking-wider cursor-pointer ${
              activeSection === 'portfolio' ? 'text-purple-400' : 'text-white/75 hover:text-white'
            }`}
          >
            Portfólio
          </button>
          <button
            onClick={() => setActiveSection('middle')}
            className={`text-[10px] font-bold transition-colors uppercase tracking-wider cursor-pointer ${
              activeSection === 'middle' ? 'text-purple-400' : 'text-white/75 hover:text-white'
            }`}
          >
            Serviços
          </button>
          <button
            onClick={() => setActiveSection('contact')}
            className={`text-[10px] font-bold transition-colors uppercase tracking-wider cursor-pointer ${
              activeSection === 'contact' ? 'text-purple-400' : 'text-white/75 hover:text-white'
            }`}
          >
            Contato
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5573991422872?text=Olá! Gostaria de conversar com a equipe da Sidarta Company."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/90 hover:bg-purple-500 text-[9px] font-black text-white uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md shadow-purple-950/40"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Falar Conosco
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-black/60 border border-purple-500/30 text-white hover:text-purple-300 backdrop-blur-md active:scale-95 transition-all cursor-pointer md:hidden"
            aria-label="Abrir menu de navegação"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-purple-400" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[68] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400/90 mb-1">
                Navegação
              </span>

              {[
                { id: 'hero', label: 'Início', tag: '01', desc: 'Conheça nossos especialistas 3D' },
                { id: 'portfolio', label: 'Portfólio', tag: '02', desc: 'Projetos e cases de sucesso' },
                { id: 'middle', label: 'Serviços', tag: '03', desc: 'Software, automação & tráfego' },
                { id: 'contact', label: 'Contato', tag: '04', desc: 'Receba uma proposta sob medida' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                    activeSection === item.id
                      ? 'bg-purple-950/60 border-purple-500/60 text-white shadow-lg shadow-purple-950/50'
                      : 'bg-white/5 border-white/10 text-white/80 active:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-black text-purple-400 font-mono">
                      {item.tag}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-base font-black uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-white/60 font-normal">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${activeSection === item.id ? 'text-purple-400' : 'text-white/30'}`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Bottom WhatsApp CTA */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/5573991422872?text=Olá! Vi o site da Sidarta e gostaria de tirar dúvidas."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-purple-950/60 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Vertical Section Indicators (Dots Bar) */}
      <div className="fixed right-2.5 sm:right-6 top-1/2 -translate-y-1/2 z-[65] flex flex-col items-center gap-2.5 bg-black/50 border border-white/10 backdrop-blur-md p-2 rounded-full shadow-2xl">
        {[
          { id: 'hero', label: 'Início' },
          { id: 'portfolio', label: 'Portfólio' },
          { id: 'middle', label: 'Serviços' },
          { id: 'contact', label: 'Contato' },
        ].map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className="relative group flex items-center justify-center p-1 cursor-pointer"
              aria-label={`Ir para a seção ${sec.label}`}
            >
              <span className={`transition-all duration-300 rounded-full ${
                isActive 
                  ? 'w-2.5 h-6 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]' 
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/70'
              }`} />
              
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-black/90 border border-purple-500/40 text-[9px] font-extrabold uppercase tracking-widest text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slider Container */}
      <div
        className="w-full h-full flex flex-col"
        style={{
          transform: activeSection === 'hero' 
            ? 'translateY(0)' 
            : activeSection === 'portfolio' 
              ? 'translateY(-100%)' 
              : activeSection === 'middle'
                ? 'translateY(-200%)'
                : 'translateY(-300%)',
          scale: isSectionTransitioning ? 0.94 : 1,
          filter: isSectionTransitioning ? 'blur(1px) brightness(0.85)' : 'blur(0px) brightness(1)',
          transition: 'transform 1100ms cubic-bezier(0.85, 0, 0.15, 1), scale 1100ms cubic-bezier(0.85, 0, 0.15, 1), filter 1100ms cubic-bezier(0.85, 0, 0.15, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ==================== SECTION 1: HERO CAROUSEL ==================== */}
        <div
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative w-full h-screen shrink-0 overflow-hidden select-none transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            backgroundColor: CHARACTERS[activeIndex].bg,
          }}
        >
          {/* 1. Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-50 opacity-35 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Cyber Grid Background */}
          <div className="absolute inset-0 cyber-grid pointer-events-none z-[2]" />

          {/* Dynamic Aurora Glow */}
          <div
            className="absolute left-1/2 top-1/2 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full aurora-glow pointer-events-none z-[1] transition-colors duration-[650ms]"
            style={{
              background: `radial-gradient(circle, ${CHARACTERS[activeIndex].id === 'anadev' ? 'rgba(124,58,237,0.25)' : CHARACTERS[activeIndex].id === 'carlosgestor' ? 'rgba(79,70,229,0.25)' : 'rgba(236,72,153,0.25)'} 0%, transparent 70%)`,
            }}
          />

          {/* Hero Foreground Content */}
          <motion.div
            animate={{
              y: activeSection === 'hero' ? 0 : -80,
              opacity: activeSection === 'hero' ? 1 : 0,
              scale: activeSection === 'hero' ? 1 : 0.96,
            }}
            transition={{
              duration: 1.0,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="absolute inset-0 z-10 w-full h-full pointer-events-none"
          >
            <div className="w-full h-full relative pointer-events-auto">
              {/* Giant ghost text "SIDARTA" */}
              <div
                className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
                style={{
                  top: isMobile ? '16%' : '18%',
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(70px, 26vw, 380px)',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.08)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 40px rgba(0,0,0,0.15)',
                }}
              >
                SIDARTA
              </div>

              {/* Character Carousel */}
              <div className="absolute inset-0 z-[3] flex items-center justify-center animate-container">
                {CHARACTERS.map((char, index) => {
                  const role = getRole(index);

                  let style: React.CSSProperties = {};
                  const isShortScreen = windowSize.height < 680;
                  const isTinyScreen = windowSize.height < 550;

                  if (role === 'center') {
                    style = {
                      transform: `translateX(-50%) scale(${isTinyScreen ? 0.95 : isShortScreen ? 1.15 : isMobile ? 1.3 : 1.5})`,
                      filter: 'blur(0px)',
                      opacity: 1,
                      zIndex: 20,
                      left: '50%',
                      height: isTinyScreen ? '32%' : isShortScreen ? '38%' : isMobile ? '44%' : '58%',
                      bottom: isTinyScreen ? '36%' : isShortScreen ? '30%' : isMobile ? '26%' : '14%',
                    };
                  } else if (role === 'left') {
                    style = {
                      transform: 'translateX(-50%) scale(0.95)',
                      filter: 'blur(2px)',
                      opacity: 0.35,
                      zIndex: 10,
                      left: isMobile ? '12%' : '28%',
                      height: isTinyScreen ? '12%' : isShortScreen ? '18%' : isMobile ? '18%' : '24%',
                      bottom: isTinyScreen ? '42%' : isShortScreen ? '36%' : isMobile ? '36%' : '22%',
                      cursor: 'pointer',
                    };
                  } else {
                    style = {
                      transform: 'translateX(-50%) scale(0.95)',
                      filter: 'blur(2px)',
                      opacity: 0.35,
                      zIndex: 10,
                      left: isMobile ? '88%' : '72%',
                      height: isTinyScreen ? '12%' : isShortScreen ? '18%' : isMobile ? '18%' : '24%',
                      bottom: isTinyScreen ? '42%' : isShortScreen ? '36%' : isMobile ? '36%' : '22%',
                      cursor: 'pointer',
                    };
                  }

                  return (
                    <div
                      key={char.id}
                      onClick={() => {
                        if (role === 'left') navigate('prev');
                        if (role === 'right') navigate('next');
                      }}
                      className="absolute aspect-[0.6/1] transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform-filter-opacity flex flex-col justify-end"
                      style={{
                        ...style,
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                      }}
                    >
                      {/* Figurine backing card */}
                      <div
                        className="absolute inset-x-0 bottom-0 top-[18%] rounded-[24px] sm:rounded-[28px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
                        style={{
                          background: char.panelGradient,
                          transform: role === 'center'
                            ? 'rotateX(calc(var(--tilt-x, 0) * 0.35 * 1deg)) rotateY(calc(var(--tilt-y, 0) * 0.35 * 1deg))'
                            : 'none',
                          transition: isAnimating
                            ? 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), background 650ms'
                            : 'transform 40ms linear, background 650ms',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5" />
                        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />
                        <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                      </div>

                      {/* Character Image */}
                      <div className="absolute inset-0 z-20 pointer-events-none overflow-visible">
                        <img
                          src={char.src}
                          alt={char.name}
                          decoding="async"
                          className="absolute w-auto max-w-none select-none pointer-events-none"
                          style={{
                            height: isMobile ? '72%' : '74%',
                            left: role === 'center'
                              ? (isMobile ? '52%' : '58%')
                              : (isMobile ? '55%' : '60%'),
                            bottom: role === 'center' ? (isMobile ? '5%' : '8%') : '12%',
                            transform: role === 'center'
                              ? 'translateX(-50%) scale(1.1) rotateX(calc(var(--tilt-x, 0) * 0.75 * 1deg)) rotateY(calc(var(--tilt-y, 0) * 0.75 * 1deg)) translateZ(45px)'
                              : 'translateX(-50%) scale(0.95)',
                            transformOrigin: role === 'center' ? '50% 40%' : 'center',
                            transition: isAnimating
                              ? 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms, opacity 650ms, left 650ms'
                              : 'transform 40ms linear, filter 650ms, opacity 650ms, left 650ms',
                            filter: role === 'center'
                              ? 'drop-shadow(0 25px 35px rgba(0,0,0,0.75))'
                              : 'drop-shadow(0 10px 15px rgba(0,0,0,0.4)) blur(1px)',
                          }}
                        />
                      </div>

                      {/* Character card details */}
                      <div 
                        className="absolute bottom-2 sm:bottom-6 inset-x-2 sm:inset-x-6 flex flex-col justify-end text-white select-none pointer-events-none z-40"
                        style={{
                          transform: role === 'center'
                            ? 'rotateX(calc(var(--tilt-x, 0) * 0.25 * 1deg)) rotateY(calc(var(--tilt-y, 0) * 0.25 * 1deg)) translateZ(15px)'
                            : 'none',
                          transition: isAnimating
                            ? 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1)'
                            : 'transform 40ms linear',
                        }}
                      >
                        <div className="flex flex-col gap-1 sm:gap-2 mb-1 sm:mb-3">
                          <span className="text-[6px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.2em] font-black bg-white text-black uppercase px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm w-fit select-none shadow-sm">
                            {char.tag}
                          </span>
                          <h3 className="text-[9px] sm:text-sm font-black tracking-[0.1em] sm:tracking-[0.15em] leading-none uppercase px-2 py-1.5 sm:px-3 sm:py-2 border border-white/80 sm:border-2 border-white rounded-lg sm:rounded-xl w-fit bg-black/40 backdrop-blur-md text-white select-none">
                            {char.name}
                          </h3>
                        </div>
                        
                        <div className="hidden sm:flex flex-wrap gap-1.5">
                          {char.techs.map((tech, i) => (
                            <span key={i} className="text-[8px] sm:text-[9px] font-bold bg-black/45 border border-white/10 rounded-md px-2 py-0.5 backdrop-blur-md text-white/90 uppercase tracking-wider shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom-left text + navigation buttons */}
              <div className="absolute bottom-4 left-4 sm:bottom-16 sm:left-24 z-[60] max-w-[240px] sm:max-w-[400px]">
                <span className="text-[8px] sm:text-[9px] font-extrabold tracking-[0.25em] sm:tracking-[0.3em] text-purple-400 uppercase block mb-1 sm:mb-2">
                  EXCLUSIVIDADE • TECNOLOGIA • ESCALA
                </span>
                <p className="text-[9px] sm:text-sm text-white/70 leading-relaxed mb-3 sm:mb-6 font-medium block">
                  {CHARACTERS[activeIndex].details}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('prev')}
                    disabled={isAnimating}
                    className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white/15 hover:border-white text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
                    aria-label="Personagem anterior"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.25} />
                  </button>
                  <button
                    onClick={() => navigate('next')}
                    disabled={isAnimating}
                    className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white/15 hover:border-white text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg"
                    aria-label="Próximo personagem"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.25} />
                  </button>
                </div>
              </div>

              {/* Bottom-right link "EXPLORAR PORTFÓLIO" */}
              <div className="absolute bottom-4 right-14 sm:bottom-16 sm:right-16 z-[60]">
                <button
                  onClick={() => setActiveSection('portfolio')}
                  className="group flex items-center gap-2 sm:gap-3 text-white transition-all duration-200 hover:opacity-100 cursor-pointer"
                  style={{ opacity: 0.9 }}
                >
                  <span
                    className="font-normal uppercase tracking-tight leading-none text-right"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(18px, 3.5vw, 56px)',
                    }}
                  >
                    EXPLORAR PORTFÓLIO
                  </span>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-purple-500/25 group-hover:bg-purple-500/40 flex items-center justify-center transition-colors duration-200 border border-purple-500/30 shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-white transform group-hover:translate-x-1 transition-transform" strokeWidth={2.25} />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== SECTION 2: PORTFOLIO SECTION ==================== */}
        <div 
          id="portfolio"
          onMouseMove={handlePortfolioMouseMove}
          onMouseLeave={handlePortfolioMouseLeave}
          className="relative w-full h-screen shrink-0 bg-[#05020c] border-t border-white/5 overflow-hidden select-none"
        >
          {/* Space / Universe Backdrop */}
          <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 120% 90% at 50% 0%, rgba(46,16,101,0.35) 0%, rgba(5,2,12,0) 55%), radial-gradient(ellipse 100% 70% at 82% 100%, rgba(30,27,75,0.40) 0%, rgba(5,2,12,0) 60%)',
              }}
            />
            <div className="space-stars" />
            <div className="space-stars space-stars-2" />
            <div className="space-stars space-stars-3" />

            <div
              className="nebula"
              style={{
                top: '-12%',
                left: '-10%',
                width: '58vw',
                height: '58vw',
                background: 'radial-gradient(circle, rgba(124,58,237,0.30) 0%, rgba(88,28,135,0.12) 45%, transparent 70%)',
                animation: 'nebula-drift-a 28s ease-in-out infinite',
              }}
            />
            <div
              className="nebula"
              style={{
                bottom: '-20%',
                right: '-12%',
                width: '62vw',
                height: '62vw',
                background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(49,46,129,0.10) 45%, transparent 70%)',
                animation: 'nebula-drift-b 34s ease-in-out infinite',
              }}
            />

            <div className="shooting-star" style={{ top: '14%', right: '8%', animationDelay: '2.5s' }} />
            <div className="shooting-star" style={{ top: '42%', right: '30%', animationDelay: '8s', animationDuration: '14s' }} />
          </div>

          {/* Scrollable Content Container */}
          <div ref={portfolioScrollRef} className="absolute inset-0 overflow-y-auto custom-scrollbar z-10">
            <motion.div
              animate={{
                y: activeSection === 'portfolio' ? 0 : 80,
                opacity: activeSection === 'portfolio' ? 1 : 0,
                scale: activeSection === 'portfolio' ? 1 : 0.96,
              }}
              transition={{
                duration: 1.0,
                ease: [0.85, 0, 0.15, 1],
                delay: activeSection === 'portfolio' ? 0.05 : 0
              }}
              className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 py-20 sm:py-24 md:py-28 flex flex-col justify-start"
            >
              {/* Header */}
              <div className="mb-8 sm:mb-12">
                <div 
                  className={`flex items-center gap-2 mb-2 sm:mb-3 transition-all duration-1000 ${
                    activeSection === 'portfolio' ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
                >
                  <div className="w-8 h-px bg-purple-500/50" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-purple-400 uppercase tracking-[0.3em]">
                    Nossos Cases
                  </span>
                </div>
                <h2 
                  className={`text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase mb-3 transition-all duration-1000 ${
                    activeSection === 'portfolio' ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                  PROJETOS EM <span className="gradient-text-animated font-normal italic font-serif">destaque</span>
                </h2>
                <p 
                  className={`text-xs sm:text-sm text-purple-200/70 max-w-xl transition-all duration-1000 ${
                    activeSection === 'portfolio' ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
                >
                  Uma seleção de soluções de alta performance desenvolvidas sob medida, unindo design de ponta e engenharia de software para gerar resultados reais.
                </p>
              </div>

              {/* Featured Client Preview Card */}
              <div
                className={`group relative mb-12 sm:mb-16 md:mb-20 ${
                  activeSection === 'portfolio' ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: '0.35s',
                  animationFillMode: 'forwards',
                  perspective: '1600px'
                }}
              >
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                    Cliente em destaque — Projeto no ar
                  </span>
                </div>

                <div className="animate-levitate relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Floating badges */}
                  <div
                    className="absolute -top-3 right-4 sm:-top-5 sm:right-12 z-30 float-badge pointer-events-none"
                    style={{ '--z': '90px', animationDelay: '0.4s' } as React.CSSProperties}
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/85 border border-amber-400/40 backdrop-blur-md shadow-lg shadow-amber-950/40">
                      <span className="text-amber-300 text-xs leading-none">★</span>
                      <span className="text-[8px] sm:text-[9px] font-black text-amber-200 uppercase tracking-widest">5.0 no Google</span>
                    </div>
                  </div>

                  {/* 3D Browser frame */}
                  <div
                    onClick={() => setSelectedProject(FEATURED_PROJECT)}
                    className="relative rounded-[20px] sm:rounded-[28px] border border-purple-500/30 bg-[#0a0516]/90 overflow-hidden cursor-pointer shadow-[0_45px_90px_-25px_rgba(0,0,0,0.9),0_0_60px_rgba(139,92,246,0.15)]"
                    style={{
                      transform: 'rotateX(calc(var(--tilt-x, 0) * 0.3 * 1deg)) rotateY(calc(var(--tilt-y, 0) * 0.3 * 1deg))',
                      transition: 'transform 60ms linear, box-shadow 500ms'
                    }}
                  >
                    <div className="relative z-10 flex items-center gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 bg-black/90 border-b border-white/10 backdrop-blur-md">
                      <div className="flex gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 flex justify-center min-w-0">
                        <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-1 max-w-[420px] w-full min-w-0">
                          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" strokeWidth={3} />
                          <span className="text-[8px] sm:text-[10px] text-white/80 font-semibold tracking-wide truncate font-mono">
                            central-autocar-site.vercel.app
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-[250px] sm:h-[380px] md:h-[460px] bg-[#0b1220] overflow-hidden [--frame-h:250px] sm:[--frame-h:380px] md:[--frame-h:460px]">
                      <img
                        src={FEATURED_PROJECT.image}
                        alt="Prévia do site Central AutoCar"
                        decoding="async"
                        draggable={false}
                        className="site-preview-scroll w-full h-auto select-none pointer-events-none"
                      />

                      <div className="shine-layer z-10" />

                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <div className="min-w-0">
                          <span className="text-[8px] sm:text-[9px] font-bold bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-md px-2 py-0.5 uppercase tracking-wider inline-block mb-1.5">
                            {FEATURED_PROJECT.category}
                          </span>
                          <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight mb-1">
                            {FEATURED_PROJECT.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-white/70 font-medium max-w-md line-clamp-2">
                            {FEATURED_PROJECT.shortDescription}
                          </p>
                        </div>
                        <div className="flex gap-2.5 shrink-0">
                          <a
                            href={FEATURED_PROJECT.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-950/50"
                          >
                            Visitar Site <ExternalLink className="w-3 h-3" strokeWidth={3} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="featured-glow" />
              </div>

              {/* Portfolio Projects Grid */}
              <div 
                className={`mt-4 sm:mt-6 mb-8 transition-all duration-1000 ${
                  activeSection === 'portfolio' ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-px bg-purple-500/50" />
                  <h3 className="text-xs sm:text-sm font-black text-purple-300 uppercase tracking-[0.25em]">
                    Mais Cases de Sucesso
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                  {PORTFOLIO_PROJECTS.slice(1).map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedProject(project)}
                      className="group relative rounded-2xl border border-purple-500/25 bg-[#0a0516]/85 p-5 sm:p-6 backdrop-blur-xl hover:border-purple-500/60 transition-all cursor-pointer flex flex-col justify-between shadow-xl shadow-black/70 hover:shadow-purple-950/40 overflow-hidden"
                    >
                      <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      {/* Card Top Preview Screenshot Header */}
                      <div className="relative h-32 sm:h-36 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4 overflow-hidden border-b border-purple-500/20 bg-[#0b1220]">
                        <img
                          src={project.image}
                          alt={`Prévia do site ${project.title}`}
                          decoding="async"
                          className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0516] via-[#0a0516]/40 to-transparent" />
                        
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[8px] sm:text-[9px] font-extrabold text-purple-300 bg-black/80 border border-purple-500/40 rounded-md px-2.5 py-1 uppercase tracking-wider backdrop-blur-md shadow-md">
                            {project.category}
                          </span>
                        </div>

                        {project.liveUrl && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="flex items-center gap-1.5 text-[8px] font-black text-emerald-300 uppercase tracking-widest bg-black/80 border border-emerald-500/40 px-2.5 py-1 rounded-full backdrop-blur-md shadow-md">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                              </span>
                              Ao vivo
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="relative z-10">

                        <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h4>

                        <p className="text-xs text-white/70 font-medium leading-relaxed mb-4 line-clamp-3">
                          {project.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.techs.map((tech) => (
                            <span
                              key={tech}
                              className="text-[8px] font-bold bg-white/5 border border-white/10 text-purple-200/90 rounded-md px-2 py-0.5 uppercase tracking-wider"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-purple-300 leading-none">
                            {project.stats.metric}
                          </span>
                          <span className="text-[8px] font-bold text-white/60 uppercase tracking-wider mt-0.5">
                            {project.stats.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-600/80 hover:bg-purple-500 text-[8px] font-black text-white uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md shadow-purple-950/40"
                          >
                            Visitar <ExternalLink className="w-2.5 h-2.5" strokeWidth={3} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==================== SECTION 3: SERVIÇOS & CHARACTER ("VAMOS ALAVANCAR") ==================== */}
        <div 
          id="inquire"
          className="relative w-full h-screen shrink-0 bg-[#05020c] border-t border-white/5 overflow-hidden"
        >
          {/* Background Video Component with Scrubbing & Auto-Play */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black/40">
            <video
              ref={videoRef}
              src="/servicos.mp4"
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
              className="w-full h-full opacity-85 lg:opacity-75 mix-blend-screen object-cover object-[75%_center] lg:object-right transition-all duration-700"
            />
            {/* Cybernetic Purple & Black Overlay Tints */}
            <div className="absolute inset-0 bg-purple-950/20 mix-blend-color z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#05020c] via-[#05020c]/65 lg:via-[#05020c]/90 to-transparent z-[2]" />
          </div>

          {/* Mobile Character Presentation Layer: sharp, glowing 3D character graphic on right/center side on mobile */}
          <div className="block lg:hidden absolute right-[-15px] sm:right-2 bottom-0 h-[52%] sm:h-[62%] max-w-[52%] pointer-events-none z-[3] opacity-90 select-none">
            <img 
              src="/right profile.png" 
              alt="Sidarta Cyber Specialist"
              className="h-full w-auto object-contain object-bottom filter drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05020c] via-transparent to-transparent" />
          </div>

          {/* Cyber Grid Background */}
          <div className="absolute inset-0 cyber-grid pointer-events-none z-[3] opacity-40" />

          {/* Scrollable Content Container */}
          <div ref={middleScrollRef} className="absolute inset-0 overflow-y-auto custom-scrollbar z-10 flex flex-col justify-center">
            <motion.div 
              animate={{
                y: activeSection === 'middle' ? 0 : 80,
                opacity: activeSection === 'middle' ? 1 : 0,
                scale: activeSection === 'middle' ? 1 : 0.96,
              }}
              transition={{
                duration: 1.0,
                ease: [0.85, 0, 0.15, 1],
                delay: activeSection === 'middle' ? 0.05 : 0
              }}
              className="relative z-10 flex flex-col w-full bg-transparent py-16 lg:py-0 lg:min-h-screen justify-center"
            >
              <main id="spade-hero" className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-16 lg:py-32 flex-1 flex flex-col justify-center">
                
                {/* Static Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-2xl"
                >
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-3">
                    TECNOLOGIA & IMPACTO
                  </span>
                  <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-white leading-[1.12] mb-4 sm:mb-6 select-none w-full uppercase">
                    vamos alavancar<br />o seu negócio?
                  </h1>
                </motion.div>

                {/* Secondary Description Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  <p className="text-xs sm:text-base text-purple-200/80 leading-relaxed font-normal mb-8 sm:mb-12 max-w-xl">
                    Selecione os serviços de desenvolvimento, automação ou social media que você precisa abaixo e fale diretamente conosco via WhatsApp.
                  </p>
                </motion.div>

                {/* Interactive Multi-Select Service Pills */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-8 sm:mb-10 max-w-3xl"
                >
                  <h2 className="text-base sm:text-xl font-extrabold tracking-wider text-purple-300 uppercase mb-1">
                    Qual serviço você procura?
                  </h2>
                  <p className="text-[9px] sm:text-xs text-purple-400/80 mb-6 uppercase tracking-widest font-semibold">
                    Selecione tudo o que se aplica à sua empresa
                  </p>

                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {SERVICES.map((service) => {
                      const isActive = selectedServices.includes(service);
                      return (
                        <motion.button
                          key={service}
                          onClick={() => toggleService(service)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer uppercase tracking-wider active:scale-95 shadow-md ${
                            isActive
                              ? 'bg-purple-600 text-white shadow-purple-950/60 border border-purple-400'
                              : 'bg-black/40 text-purple-200 border border-purple-500/30 hover:bg-purple-500/20'
                          }`}
                        >
                          {isActive ? (
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-purple-500/40" />
                          )}
                          {service}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Contingent Feedback Status Banner */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="max-w-xl"
                >
                  <AnimatePresence mode="wait">
                    {selectedServices.length === 0 ? (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="text-xs sm:text-sm italic text-purple-300/70 font-medium"
                      >
                        * Por favor, selecione uma ou mais especialidades acima para prosseguir.
                      </motion.p>
                    ) : (
                      <motion.div
                        key="banner"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-4 sm:p-5 bg-purple-950/40 border border-purple-500/35 rounded-2xl backdrop-blur-xl shadow-xl">
                          <span className="text-xs sm:text-sm text-purple-100 font-medium">
                            Pronto para falar sobre: <strong className="text-purple-300 font-bold">{selectedServices.join(", ")}</strong>
                          </span>
                          <a
                            href={`https://wa.me/5573991422872?text=Olá! Gostaria de fazer um orçamento sobre: ${selectedServices.join(", ")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-white bg-purple-600 hover:bg-purple-500 rounded-full px-5 py-2.5 transition-all shadow-md shadow-purple-950/50 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider shrink-0"
                          >
                            Vamos Iniciar →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </main>
            </motion.div>
          </div>
        </div>

        {/* ==================== SECTION 4: CONTACT SECTION ==================== */}
        <div 
          id="contact"
          className="relative w-full h-screen shrink-0 bg-[#05020c] border-t border-white/5 flex flex-col justify-start overflow-hidden select-none"
        >
          {/* Background Video */}
          <div className="absolute inset-0 pointer-events-none z-0 select-none w-full h-full overflow-hidden">
            <video
              ref={contactVideoRef}
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover mix-blend-screen transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-purple-600/25 mix-blend-color pointer-events-none" />
          </div>

          <div className="absolute inset-0 cyber-grid pointer-events-none z-[1] opacity-35" />

          {/* Proposal Modal */}
          <div ref={contactScrollRef} className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 z-10 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {showContactModal && (
                <div className="w-full max-w-lg pointer-events-none flex justify-center py-10">
                  {!isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.93, y: 30 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-full bg-[#0a0516]/90 border border-purple-500/40 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.25)] flex flex-col gap-5 select-text pointer-events-auto"
                    >
                      <div>
                        <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">
                          RECEBER PROPOSTA
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                          Proposta Personalizada
                        </h2>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                          Preencha seus dados para receber o orçamento detalhado dos serviços de seu interesse.
                        </p>
                      </div>

                      <div className="bg-purple-950/30 border border-purple-500/25 rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2">
                        <span className="text-[8px] sm:text-[9px] font-bold text-purple-300 uppercase tracking-wider">
                          Serviços de seu interesse:
                        </span>
                        {selectedServices.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 mt-0.5">
                            {selectedServices.map((service) => (
                              <span 
                                key={service} 
                                className="text-[8px] sm:text-[9px] font-extrabold bg-purple-500/25 border border-purple-500/40 text-purple-200 rounded-md px-2 py-0.5 uppercase tracking-wide"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-purple-300/80 italic">
                            Nenhum serviço selecionado ainda. Elaboraremos uma proposta geral.
                          </span>
                        )}
                      </div>

                      {/* Form Fields */}
                      <form onSubmit={handleContactSubmit} className="flex flex-col gap-3.5">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-white/80 uppercase tracking-wider">Nome Completo</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-white/80 uppercase tracking-wider">E-mail</label>
                          <input 
                            type="email" 
                            required
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-white/80 uppercase tracking-wider">WhatsApp / Telefone</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="(00) 00000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-1 flex items-center justify-center gap-2 text-xs font-black text-white bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 rounded-xl py-3.5 transition-all shadow-md shadow-purple-950/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center"
                        >
                          {isSubmitting ? 'Enviando...' : 'Solicitar Proposta no WhatsApp →'}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      className="w-full bg-[#0a0516]/90 border border-purple-500/40 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.25)] flex flex-col items-center text-center gap-5 pointer-events-auto"
                    >
                      <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 text-2xl">
                        ✓
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                          Proposta Solicitada!
                        </h2>
                        <p className="text-xs text-white/70 mt-2 leading-relaxed">
                          Obrigado, <strong>{formData.name}</strong>! Seus dados foram enviados com sucesso. Entraremos em contato em breve.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', phone: '' });
                        }}
                        className="mt-2 text-[10px] font-extrabold text-purple-300 hover:text-white uppercase tracking-wider border border-purple-500/40 hover:border-purple-400 rounded-xl px-6 py-2.5 transition-all cursor-pointer"
                      >
                        Voltar
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pinned Vertical Navigation Arrow Controls */}
      <MagneticButton
        onClick={() => setActiveSection('hero')}
        direction="up"
        label="Início"
        isActive={activeSection === 'portfolio'}
      />

      <MagneticButton
        onClick={() => setActiveSection('middle')}
        direction="down"
        label="Serviços"
        isActive={activeSection === 'portfolio'}
      />

      <MagneticButton
        onClick={() => setActiveSection('portfolio')}
        direction="up"
        label="Portfólio"
        isActive={activeSection === 'middle'}
      />

      <MagneticButton
        onClick={() => setActiveSection('contact')}
        direction="down"
        label="Contato"
        isActive={activeSection === 'middle'}
      />

      <MagneticButton
        onClick={() => setActiveSection('middle')}
        direction="up"
        label="Serviços"
        isActive={activeSection === 'contact'}
      />

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl bg-[#0a0516]/95 border border-purple-500/30 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)] flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/20 hover:border-purple-400 text-white hover:text-purple-300 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {selectedProject.liveUrl ? (
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-[#0b1220] flex flex-col">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black/90 border-b border-white/10 shrink-0">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 min-w-0">
                      <Lock className="w-2 h-2 text-emerald-400 shrink-0" strokeWidth={3} />
                      <span className="text-[8px] text-white/70 font-semibold truncate font-mono">
                        {selectedProject.liveUrl.replace('https://', '').replace(/\/$/, '')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[220px] overflow-y-auto custom-scrollbar bg-[#0b1220]">
                    <img
                      src={selectedProject.image}
                      alt={`Prévia do site — ${selectedProject.title}`}
                      decoding="async"
                      draggable={false}
                      className="w-full h-auto block select-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-black/90 border-t border-purple-500/20 shrink-0">
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-2xl font-black text-purple-300 leading-none">
                        {selectedProject.stats.metric}
                      </span>
                      <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider mt-0.5">
                        {selectedProject.stats.label}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[8px] font-black text-emerald-300 uppercase tracking-widest">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      No ar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-full bg-black flex flex-col justify-end">
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.fallbackGradient} opacity-30`} />
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="relative z-10 p-6 sm:p-8">
                    <div className="inline-flex flex-col bg-purple-950/80 border border-purple-500/30 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                      <span className="text-2xl sm:text-4xl font-black text-purple-300 leading-none">
                        {selectedProject.stats.metric}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-bold text-white/75 uppercase tracking-wider mt-1">
                        {selectedProject.stats.label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Column */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/30">
                <div className="flex-1">
                  <span className="text-[9px] sm:text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-1.5">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                    {selectedProject.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-purple-300/80 uppercase tracking-wider mb-1.5">Sobre o Projeto</h4>
                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-purple-300/80 uppercase tracking-wider mb-2">Tecnologias</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedProject.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] sm:text-[10px] font-bold bg-purple-950/50 border border-purple-500/25 text-purple-300 rounded-md px-2.5 py-1 uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2.5">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-xs font-black text-purple-200 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 rounded-full py-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center"
                    >
                      Visitar Site ao Vivo <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </a>
                  )}
                  <a
                    href={`https://wa.me/5573991422872?text=Olá! Vi o case "${selectedProject.title}" no site da Sidarta e gostaria de um orçamento semelhante.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-xs font-black text-white bg-purple-600 hover:bg-purple-500 rounded-full py-3 transition-all shadow-md shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center"
                  >
                    Fazer Orçamento Semelhante →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
