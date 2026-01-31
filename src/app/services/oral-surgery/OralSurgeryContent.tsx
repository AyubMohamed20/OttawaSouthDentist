'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Stethoscope,
  AlertCircle,
  Pill,
  Syringe,
  Activity,
  ThermometerSnowflake,
  Utensils,
  BedDouble,
  Cigarette,
  Droplets,
  CircleCheckBig,
  Award,
  Users,
  GraduationCap,
  Timer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  CircleDot,
  Gauge,
  Waves,
  HeartPulse,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is tooth extraction painful?',
    answer:
      "Extractions are performed with local anesthesia so you won't feel pain during the procedure. You may feel some pressure, but no sharp pain. Some discomfort is normal during healing but is easily manageable with over-the-counter or prescribed pain medication. We'll provide detailed aftercare instructions to ensure a comfortable recovery.",
  },
  {
    question: 'How long is recovery after wisdom teeth removal?',
    answer:
      'Most patients recover within a few days to a week after wisdom teeth removal. The first 2-3 days typically involve the most swelling and discomfort, which gradually improves. Following post-operative instructions—including rest, ice application, and soft foods—helps ensure smooth healing. Most people return to normal activities within a week.',
  },
  {
    question: 'What should I eat after oral surgery?',
    answer:
      'Soft foods are recommended for the first few days after oral surgery. Good options include yogurt, smoothies, mashed potatoes, soup (not too hot), scrambled eggs, and applesauce. Avoid hard, crunchy, or spicy foods that could irritate the surgical site. Stay hydrated but avoid using straws, as the suction can dislodge blood clots.',
  },
  {
    question: 'When do wisdom teeth need to be removed?',
    answer:
      'Wisdom teeth often need removal when they are impacted (unable to emerge properly), causing crowding or damage to adjacent teeth, partially erupted and prone to infection, or causing pain and discomfort. We use X-rays and examination to determine if your wisdom teeth require removal and discuss the best timing for the procedure.',
  },
  {
    question: 'What is bone grafting and when is it needed?',
    answer:
      'Bone grafting is a procedure that rebuilds jawbone that has been lost due to tooth extraction, gum disease, or injury. It\'s often needed before dental implant placement to ensure there\'s enough bone to support the implant. The graft material encourages your body to regenerate natural bone, creating a strong foundation for future restoration.',
  },
];

const surgeryTypes = [
  {
    id: 'simple',
    title: 'Simple Extractions',
    shortTitle: 'Simple',
    description: 'Removal of visible teeth that are damaged, decayed, or need to come out for orthodontic treatment.',
    details: [
      'Minimally invasive procedure',
      'Local anesthesia only',
      'Quick recovery time',
      'Same-day procedure'
    ],
    duration: '15-30 min',
    recovery: '1-2 days',
    icon: CircleCheckBig,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    id: 'surgical',
    title: 'Surgical Extractions',
    shortTitle: 'Surgical',
    description: 'Removal of teeth that are broken at the gum line or haven\'t fully emerged, requiring incision access.',
    details: [
      'Incision required',
      'May need bone removal',
      'Sutures often needed',
      'Comprehensive care'
    ],
    duration: '30-60 min',
    recovery: '3-5 days',
    icon: Stethoscope,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'wisdom',
    title: 'Wisdom Teeth Removal',
    shortTitle: 'Wisdom',
    description: 'Specialized extraction of impacted or problematic wisdom teeth to prevent pain and complications.',
    details: [
      'Expert impaction handling',
      'Sedation options available',
      'All four at once possible',
      'Prevent future issues'
    ],
    duration: '45-90 min',
    recovery: '5-7 days',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'grafting',
    title: 'Bone Grafting',
    shortTitle: 'Grafting',
    description: 'Rebuilding jawbone structure to prepare for dental implants or restore facial support.',
    details: [
      'Multiple graft materials',
      'Prepares for implants',
      'Preserves facial structure',
      'Long-term benefits'
    ],
    duration: '60-120 min',
    recovery: '2-4 weeks',
    icon: Heart,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    id: 'soft-tissue',
    title: 'Soft Tissue Procedures',
    shortTitle: 'Soft Tissue',
    description: 'Biopsies, lesion removal, and other soft tissue treatments for diagnosis and treatment.',
    details: [
      'Diagnostic biopsies',
      'Lesion removal',
      'Tissue reshaping',
      'Precision technique'
    ],
    duration: '30-60 min',
    recovery: '3-7 days',
    icon: Activity,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    id: 'pre-prosthetic',
    title: 'Pre-Prosthetic Surgery',
    shortTitle: 'Pre-Prosthetic',
    description: 'Preparing the mouth for dentures or other prosthetics by reshaping bone or removing excess tissue.',
    details: [
      'Bone smoothing',
      'Tissue reduction',
      'Ridge preparation',
      'Better prosthetic fit'
    ],
    duration: '45-90 min',
    recovery: '1-2 weeks',
    icon: Award,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
];

const sedationOptions = [
  {
    title: 'Local Anesthesia',
    description: 'Numbs only the treatment area while you remain fully conscious',
    icon: Syringe,
    level: 1,
    suitable: ['Simple extractions', 'Minor procedures', 'Patients with no anxiety'],
    features: ['Quick onset', 'Fast recovery', 'Drive yourself home'],
  },
  {
    title: 'Nitrous Oxide',
    description: 'Laughing gas that creates a relaxed, euphoric state during treatment',
    icon: Waves,
    level: 2,
    suitable: ['Mild to moderate anxiety', 'Longer procedures', 'Most patients'],
    features: ['Wears off quickly', 'Adjustable levels', 'Safe for all ages'],
  },
  {
    title: 'Oral Sedation',
    description: 'Prescription medication taken before your appointment for deeper relaxation',
    icon: Pill,
    level: 3,
    suitable: ['Moderate anxiety', 'Complex procedures', 'Dental phobia'],
    features: ['Deep relaxation', 'Little memory of procedure', 'Requires driver'],
  },
  {
    title: 'IV Sedation',
    description: 'Intravenous medication for the deepest level of relaxation while remaining conscious',
    icon: Droplets,
    level: 4,
    suitable: ['Severe anxiety', 'Multiple extractions', 'Extensive surgery'],
    features: ['Immediate effect', 'Fully adjustable', 'Maximum comfort'],
  },
];

const recoveryTimeline = [
  {
    day: 'Day 0',
    title: 'Surgery Day',
    description: 'Rest with head elevated. Apply ice 20 min on/off.',
    tips: ['Bite on gauze for 30-45 min', 'Take prescribed medications', 'Only liquids and soft foods'],
    icon: BedDouble,
    color: 'from-red-500 to-red-600',
  },
  {
    day: 'Day 1-2',
    title: 'Initial Healing',
    description: 'Maximum swelling expected. Continue rest and cold therapy.',
    tips: ['Continue ice therapy', 'Rinse gently with salt water', 'Soft foods only'],
    icon: ThermometerSnowflake,
    color: 'from-orange-500 to-orange-600',
  },
  {
    day: 'Day 3-4',
    title: 'Swelling Peak',
    description: 'Swelling begins to subside. Switch from cold to warm compresses.',
    tips: ['Switch to warm compresses', 'Gentle mouth opening exercises', 'Continue soft foods'],
    icon: HeartPulse,
    color: 'from-amber-500 to-amber-600',
  },
  {
    day: 'Day 5-7',
    title: 'Significant Improvement',
    description: 'Most discomfort resolved. Can gradually return to normal diet.',
    tips: ['Resume normal brushing carefully', 'Avoid surgical site', 'Return to light activities'],
    icon: Utensils,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    day: 'Week 2+',
    title: 'Full Recovery',
    description: 'Surgical site continues healing. Sutures dissolve or are removed.',
    tips: ['Follow-up appointment', 'Full diet resumed', 'Normal activities'],
    icon: Sparkles,
    color: 'from-green-500 to-green-600',
  },
];

const preOpInstructions = [
  {
    title: 'Before Your Procedure',
    icon: Calendar,
    items: [
      'Arrange for someone to drive you home',
      'Wear comfortable, loose-fitting clothing',
      'Remove contact lenses and jewelry',
      'Do not eat or drink 8 hours before if sedation planned',
      'Take prescribed pre-medications as directed',
    ],
  },
  {
    title: 'Medications',
    icon: Pill,
    items: [
      'Inform us of all medications you take',
      'Continue blood pressure medications',
      'Stop blood thinners only if directed',
      'Avoid aspirin 1 week before surgery',
      'Bring list of allergies to appointment',
    ],
  },
  {
    title: 'Health Preparation',
    icon: Heart,
    items: [
      'Get adequate rest the night before',
      'Avoid alcohol 24 hours before surgery',
      'Stop smoking at least 48 hours before',
      'Report any illness or fever immediately',
      'Brush teeth morning of procedure (no swallowing)',
    ],
  },
];

const postOpInstructions = [
  {
    category: 'Do',
    icon: Check,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    items: [
      { text: 'Rest with head elevated', icon: BedDouble },
      { text: 'Apply ice packs 20 min on/off', icon: ThermometerSnowflake },
      { text: 'Take medications as prescribed', icon: Pill },
      { text: 'Eat soft, cool foods', icon: Utensils },
      { text: 'Rinse gently with salt water after 24h', icon: Droplets },
    ],
  },
  {
    category: 'Don\'t',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    items: [
      { text: 'Use straws for 1 week', icon: Droplets },
      { text: 'Smoke or use tobacco', icon: Cigarette },
      { text: 'Touch or probe the surgery site', icon: Activity },
      { text: 'Eat hard, crunchy, or spicy foods', icon: Utensils },
      { text: 'Skip follow-up appointments', icon: Calendar },
    ],
  },
];

const teamCredentials = [
  { label: 'Years Experience', value: '25+', icon: Clock },
  { label: 'Procedures Performed', value: '10,000+', icon: Award },
  { label: 'Patient Satisfaction', value: '98%', icon: Heart },
  { label: 'Continuing Education', value: '100+ hrs/yr', icon: GraduationCap },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// MAGNETIC EFFECT HOOK
// ============================================================================

function useMagnetic(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const magnetic = useMagnetic(0.15);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
          style={{ y }}
        />

        {/* Floating orbs with clinical-yet-warm aesthetic */}
        <motion.div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(114,47,55,0.1) 0%, transparent 70%)',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          }}
          animate={{
            y: [20, -20, 20],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle medical cross pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27 27h6v-6h-6v6zm0 6h6v6h-6v-6zm6 0h6v-6h-6v6zm-12 0h6v-6h-6v6z' fill='%23722F37' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link href="/" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-neutral-300">/</li>
                  <li>
                    <Link href="/services" className="text-neutral-500 hover:text-[#722F37] transition-colors">
                      Services
                    </Link>
                  </li>
                  <li className="text-neutral-300">/</li>
                  <li className="text-[#722F37] font-medium">Oral Surgery</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Safe, Gentle & Experienced Care
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e293b] tracking-tight leading-[1.1] mb-6"
              >
                Oral{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#722F37]">Surgery</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-[#722F37]/10 -skew-x-3 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-xl"
              >
                Expert surgical dental care with your comfort as our priority.
                From wisdom teeth to bone grafting, our experienced team ensures
                safe, gentle procedures and comprehensive recovery support.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  style={{ x: magnetic.x, y: magnetic.y }}
                  onMouseMove={magnetic.handleMouseMove}
                  onMouseLeave={magnetic.handleMouseLeave}
                >
                  <Link
                    href="/contact#book"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A42] text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#722F37]/25"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <Calendar className="w-5 h-5" />
                    <span className="relative">Book Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <a
                  href="tel:+16137336446"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-6446
                </a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-6"
              >
                {[
                  { label: 'Procedures', value: '10K+' },
                  { label: 'Success Rate', value: '98%' },
                  { label: 'Years Exp.', value: '25+' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-[#722F37]">{stat.value}</p>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 aspect-[4/3]">
                <Image
                  src="/images/clinic/clinic-08.jpg"
                  alt="Oral surgery consultation at Ottawa South Dental"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating safety card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Safe & Sterile</p>
                    <p className="text-sm text-neutral-500">Hospital-grade protocols</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating comfort card */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Sedation Options</p>
                    <p className="text-xs text-neutral-500">Maximum comfort</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// PROCEDURE TYPE SHOWCASE
// ============================================================================

function ProcedureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentSurgery = surgeryTypes[activeIndex]!;

  return (
    <div ref={containerRef}>
      {/* Procedure Type Selector - Carousel Style */}
      <div className="relative mb-12">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {surgeryTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={type.id}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex-shrink-0 px-6 py-4 rounded-2xl border-2 transition-all duration-300 min-w-[180px] ${
                  isActive
                    ? 'border-[#722F37] bg-white shadow-lg shadow-[#722F37]/10'
                    : 'border-neutral-200 bg-white hover:border-[#722F37]/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProcedure"
                    className="absolute inset-0 bg-gradient-to-br from-[#722F37]/5 to-transparent rounded-2xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}

                <div className="relative flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-[#722F37]' : 'text-neutral-700'}`}>
                    {type.shortTitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Procedure Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {/* Info Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSurgery.color} flex items-center justify-center shadow-lg`}>
                  {(() => {
                    const Icon = currentSurgery.icon;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1e293b]">
                    {currentSurgery.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Timer className="w-4 h-4" />
                      {currentSurgery.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Activity className="w-4 h-4" />
                      Recovery: {currentSurgery.recovery}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                {currentSurgery.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide">
                  Key Features
                </p>
                {currentSurgery.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full ${currentSurgery.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Check className={`w-3.5 h-3.5 ${currentSurgery.textColor}`} />
                    </div>
                    <span className="text-sm text-neutral-700">{detail}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100">
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-3 transition-all"
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative h-80 lg:h-auto">
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSurgery.color} opacity-10`} />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                {/* Animated procedure visualization */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Central icon */}
                  <motion.div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentSurgery.color} flex items-center justify-center shadow-2xl`}
                    animate={{
                      boxShadow: [
                        '0 25px 50px -12px rgba(114, 47, 55, 0.25)',
                        '0 25px 50px -12px rgba(114, 47, 55, 0.4)',
                        '0 25px 50px -12px rgba(114, 47, 55, 0.25)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {(() => {
                      const Icon = currentSurgery.icon;
                      return <Icon className="w-16 h-16 text-white" />;
                    })()}
                  </motion.div>

                  {/* Orbiting elements */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        x: [
                          Math.cos((i * Math.PI) / 2) * 80 - 16,
                          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 80 - 16,
                          Math.cos((i * Math.PI) / 2) * 80 - 16,
                        ],
                        y: [
                          Math.sin((i * Math.PI) / 2) * 80 - 16,
                          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 80 - 16,
                          Math.sin((i * Math.PI) / 2) * 80 - 16,
                        ],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <CircleDot className={`w-4 h-4 ${currentSurgery.textColor}`} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span className="text-sm font-medium text-neutral-700">
                      <Timer className="w-4 h-4 inline mr-1" />
                      {currentSurgery.duration}
                    </span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <span className="text-sm font-medium text-neutral-700">
                      <Activity className="w-4 h-4 inline mr-1" />
                      {currentSurgery.recovery} recovery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {surgeryTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-[#722F37]' : 'bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SEDATION OPTIONS DISPLAY
// ============================================================================

function SedationOptions() {
  const [selectedLevel, setSelectedLevel] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentSedation = sedationOptions[selectedLevel]!;

  return (
    <div ref={containerRef}>
      {/* Sedation Level Meter */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-neutral-500">Light Sedation</span>
          <span className="text-sm font-medium text-neutral-500">Deep Sedation</span>
        </div>

        <div className="relative h-3 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: isInView ? '100%' : '0%' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Level indicators */}
          {sedationOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedLevel(index)}
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                selectedLevel === index
                  ? 'bg-white border-[#722F37] scale-125 z-10 shadow-lg'
                  : 'bg-white border-neutral-300 hover:border-[#722F37]/50'
              }`}
              style={{ left: `${(index / (sedationOptions.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Selected Option Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-3">
            {/* Main info */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {(() => {
                    const Icon = currentSedation.icon;
                    return <Icon className="w-8 h-8 text-[#722F37]" />;
                  })()}
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-[#1e293b]">
                      {currentSedation.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#722F37]/10 text-[#722F37] text-xs font-semibold">
                      Level {currentSedation.level}
                    </span>
                  </div>
                  <p className="text-neutral-600">{currentSedation.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide mb-3">
                    Best Suited For
                  </p>
                  <ul className="space-y-2">
                    {currentSedation.suitable.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <Check className="w-4 h-4 text-emerald-500" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#1e293b] uppercase tracking-wide mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2">
                    {currentSedation.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-neutral-600"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sedation level visualization */}
            <div className="relative bg-gradient-to-br from-[#FDF8F3] to-[#F5EDE5] p-8 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 10px 40px rgba(114, 47, 55, 0.1)',
                      '0 10px 40px rgba(114, 47, 55, 0.3)',
                      '0 10px 40px rgba(114, 47, 55, 0.1)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Gauge className="w-12 h-12 text-[#722F37]" />
                </motion.div>

                {/* Animated rings based on level */}
                {Array.from({ length: currentSedation.level }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-[#722F37]/20"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 1.5 + i * 0.3, 1.5 + i * 0.3],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm font-medium text-neutral-600">
                  Sedation Level: <span className="text-[#722F37] font-bold">{selectedLevel + 1}/4</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All options grid */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {sedationOptions.map((option, index) => {
          const Icon = option.icon;
          const isSelected = index === selectedLevel;

          return (
            <motion.button
              key={index}
              onClick={() => setSelectedLevel(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#722F37] bg-[#722F37]/5'
                  : 'border-neutral-200 bg-white hover:border-[#722F37]/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-[#722F37]' : 'text-neutral-400'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-[#722F37]' : 'text-neutral-600'}`}>
                  {option.title}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// RECOVERY TIMELINE ANIMATION
// ============================================================================

function RecoveryTimeline() {
  const [activeDay, setActiveDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const currentRecovery = recoveryTimeline[activeDay]!;

  // Auto-play functionality
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPlayback = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setActiveDay((prev) => {
        if (prev >= recoveryTimeline.length - 1) {
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div ref={containerRef}>
      {/* Timeline Navigation */}
      <div className="relative mb-12">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{
            width: isInView ? `${(activeDay / (recoveryTimeline.length - 1)) * 100}%` : '0%',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Day markers */}
        <div className="relative flex justify-between">
          {recoveryTimeline.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeDay;
            const isPast = index < activeDay;

            return (
              <motion.button
                key={index}
                onClick={() => { stopPlayback(); setActiveDay(index); }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} shadow-lg`
                      : isPast
                        ? 'bg-green-500'
                        : 'bg-white border-2 border-neutral-200 hover:border-[#722F37]/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPast && !isActive ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive || isPast ? 'text-white' : 'text-neutral-400'}`} />
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-current"
                      style={{ borderColor: 'inherit' }}
                      animate={{
                        scale: [1, 1.2, 1.2],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <div className="mt-3 text-center">
                  <p className={`text-sm font-semibold ${isActive ? 'text-[#722F37]' : 'text-neutral-700'}`}>
                    {item.day}
                  </p>
                  <p className="text-xs text-neutral-500 max-w-[100px]">{item.title}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
          disabled={activeDay === 0}
          className="p-3 rounded-full bg-white border border-neutral-200 hover:border-[#722F37]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-600" />
        </motion.button>

        <motion.button
          onClick={isPlaying ? stopPlayback : startPlayback}
          className="px-6 py-3 rounded-full bg-[#722F37] text-white font-medium flex items-center gap-2 hover:bg-[#8B3A42] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isPlaying ? 'Pause' : 'Play Timeline'}
        </motion.button>

        <motion.button
          onClick={() => setActiveDay(Math.min(recoveryTimeline.length - 1, activeDay + 1))}
          disabled={activeDay === recoveryTimeline.length - 1}
          className="p-3 rounded-full bg-white border border-neutral-200 hover:border-[#722F37]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 text-neutral-600" />
        </motion.button>
      </div>

      {/* Active Day Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm"
        >
          <div className={`h-2 bg-gradient-to-r ${currentRecovery.color}`} />

          <div className="p-8 lg:p-12">
            <div className="flex items-start gap-6 mb-8">
              <motion.div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentRecovery.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {(() => {
                  const Icon = currentRecovery.icon;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
              </motion.div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${currentRecovery.color} text-white`}>
                    {currentRecovery.day}
                  </span>
                  <h3 className="text-2xl font-bold text-[#1e293b]">
                    {currentRecovery.title}
                  </h3>
                </div>
                <p className="text-lg text-neutral-600">
                  {currentRecovery.description}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FDF8F3] to-white rounded-2xl p-6">
              <p className="text-sm font-semibold text-[#722F37] uppercase tracking-wide mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Tips for This Stage
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {currentRecovery.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#722F37]" />
                    </div>
                    <span className="text-sm text-neutral-700">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// PRE/POST-OPERATIVE CARE GUIDES
// ============================================================================

function CareGuides() {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef}>
      {/* Tab Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl">
          {[
            { key: 'pre' as const, label: 'Pre-Operative Care', icon: Calendar },
            { key: 'post' as const, label: 'Post-Operative Care', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-neutral-600 hover:text-[#722F37]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="careTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
                <Icon className="relative w-5 h-5" />
                <span className="relative">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'pre' ? (
          <motion.div
            key="pre"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {preOpInstructions.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 bg-gradient-to-br from-[#FDF8F3] to-white border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#722F37]" />
                      </div>
                      <h3 className="font-semibold text-lg text-[#1e293b]">{section.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.items.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-start gap-3 text-sm text-neutral-600"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-blue-600" />
                          </div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {postOpInstructions.map((section, sectionIndex) => {
              const SectionIcon = section.icon;
              return (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  <div className={`p-6 ${section.bgColor} border-b border-neutral-100`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                        <SectionIcon className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <h3 className={`font-semibold text-xl ${section.color}`}>
                        {section.category}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {section.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: sectionIndex === 0 ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                          >
                            <div className={`w-10 h-10 rounded-lg ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                              <ItemIcon className={`w-5 h-5 ${section.color}`} />
                            </div>
                            <span className="text-neutral-700">{item.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// SURGEON CREDENTIALS SHOWCASE
// ============================================================================

function TeamCredentials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image and overlay */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <Image
              src="/images/clinic/clinic-14.jpg"
              alt="Ottawa South Dental surgical team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/60 to-transparent" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Our Promise</p>
              <p className="text-white text-2xl font-semibold">
                Experienced care you can trust
              </p>
            </div>
          </div>

          {/* Floating credential badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1e293b]">25+</p>
                <p className="text-sm text-neutral-500">Years Combined</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats and info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-6">
            Expert Surgical Team
          </h3>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            Our dental professionals bring extensive training and experience in oral surgery procedures.
            We combine clinical expertise with a gentle, patient-centered approach to ensure your comfort
            and safety throughout every procedure.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {teamCredentials.map((credential, index) => {
              const Icon = credential.icon;
              return (
                <motion.div
                  key={credential.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#FDF8F3] to-white border border-[#EDE5DD] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#722F37]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <span className="text-sm text-neutral-500">{credential.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#722F37]">{credential.value}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/about/team"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:gap-3 transition-all"
            >
              Meet Our Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ANIMATED FAQ ACCORDION
// ============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen
                ? 'border-[#722F37]/20 bg-white shadow-lg shadow-[#722F37]/5'
                : 'border-neutral-200 bg-white hover:border-[#722F37]/10'
            }`}
          >
            <motion.button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-inset"
              whileHover={{ backgroundColor: 'rgba(114, 47, 55, 0.02)' }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-[#722F37]' : 'bg-neutral-100'
                  }`}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-neutral-500'}`}>
                    {index + 1}
                  </span>
                </motion.div>
                <span className="font-semibold text-[#1e293b] pr-4">{item.question}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className="w-5 h-5 text-[#722F37]" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-14 text-neutral-600 leading-relaxed">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ============================================================================
// RELATED SERVICES
// ============================================================================

function RelatedServices() {
  const services = [
    {
      title: 'Dental Implants',
      description: 'Permanent tooth replacement that may follow extraction once the site has healed.',
      href: '/services/dental-implants',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Missing Teeth Solutions',
      description: 'Explore all options for replacing teeth after extraction, including bridges and dentures.',
      href: '/services/missing-teeth',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Root Canal Treatment',
      description: 'An alternative to extraction that can save your natural tooth when infection is present.',
      href: '/services/root-canal',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={service.href}
              className="group block p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-2 text-[#722F37] font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function OralSurgeryContent() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Procedure Types Showcase */}
      <section className="relative py-24 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Our Procedures
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Oral Surgery Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              From simple extractions to complex surgical procedures, our experienced team provides comprehensive care for all your oral surgery needs.
            </p>
          </motion.div>

          <ProcedureShowcase />
        </div>
      </section>

      {/* Surgeon Credentials */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Experienced Surgical Team
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Our team combines clinical expertise with a gentle, patient-centered approach.
            </p>
          </motion.div>

          <TeamCredentials />
        </div>
      </section>

      {/* Sedation Options */}
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              Comfort Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Sedation & Comfort
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Choose from multiple sedation options to ensure your complete comfort throughout your procedure.
            </p>
          </motion.div>

          <SedationOptions />
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              Recovery Guide
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Recovery Timeline
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Follow along with our interactive timeline to understand what to expect during your healing journey.
            </p>
          </motion.div>

          <RecoveryTimeline />
        </div>
      </section>

      {/* Pre/Post-Operative Care */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              Patient Guide
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Care Instructions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Everything you need to know before and after your oral surgery procedure.
            </p>
          </motion.div>

          <CareGuides />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Find answers to frequently asked questions about oral surgery procedures.
            </p>
          </motion.div>

          <FAQAccordion items={faqs} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 mb-4">Still have questions? We&apos;re happy to help.</p>
            <a
              href="tel:+16137336446"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
            >
              <Phone className="w-5 h-5" />
              Call us at (613) 733-6446
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Related Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Explore More Services
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Discover other services that may complement your oral surgery treatment.
            </p>
          </motion.div>

          <RelatedServices />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />

        {/* Medical cross pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27 27h6v-6h-6v6zm0 6h6v6h-6v-6zm6 0h6v-6h-6v6zm-12 0h6v-6h-6v6z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Safe & Experienced Care</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready for Your Consultation?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Schedule a consultation to discuss your oral surgery needs. Our experienced team will evaluate your situation and recommend the best treatment approach for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact#book"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <a
                href="tel:+16137336446"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (613) 733-6446
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
