'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Sparkles,
  Shield,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  Heart,
  Award,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Star,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
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
    question: 'Am I a candidate for dental implants?',
    answer:
      "Most adults with good general health are candidates for dental implants. Adequate jawbone density is needed to support the implant, though bone grafting procedures can help those who have experienced bone loss. During your consultation, we'll evaluate your oral health, medical history, and bone structure to determine if implants are right for you.",
  },
  {
    question: 'How long do dental implants last?',
    answer:
      'With proper care and maintenance, dental implants can last a lifetime. The titanium implant post integrates permanently with your jawbone. The crown (visible tooth portion) may need replacement after 10-15 years due to normal wear, but the implant itself is designed to be a permanent solution.',
  },
  {
    question: 'Is the dental implant procedure painful?',
    answer:
      'The implant procedure is performed under local anesthesia, ensuring you feel no pain during the surgery. Most patients report that the procedure is less uncomfortable than they expected. Post-operative discomfort is typically manageable with over-the-counter pain medication and usually subsides within a few days.',
  },
  {
    question: 'How long does the entire implant process take?',
    answer:
      'The complete implant process typically takes 3-6 months from start to finish. After the implant post is placed, a healing period of 3-6 months allows for osseointegration (bone fusion). Once healed, the abutment and crown are placed. Some cases may qualify for same-day implants with immediate loading.',
  },
  {
    question: 'How do I care for my dental implants?',
    answer:
      'Dental implants are easy to maintain—care for them just like your natural teeth. Brush twice daily, floss regularly, and maintain routine dental checkups. While implants cannot develop cavities, the surrounding gum tissue still needs proper care to prevent gum disease and ensure long-term success.',
  },
];

const benefits = [
  {
    icon: Award,
    title: 'Permanent Solution',
    description:
      'Implants can last a lifetime with proper care, unlike dentures or bridges that need replacement.',
    stat: '25+',
    statLabel: 'Years Lifespan',
  },
  {
    icon: Sparkles,
    title: 'Natural Look & Feel',
    description:
      'Designed to match your natural teeth in color, shape, and function for a seamless smile.',
    stat: '100%',
    statLabel: 'Natural Function',
  },
  {
    icon: Shield,
    title: 'Preserve Bone Health',
    description:
      'Stimulate the jawbone to prevent bone loss that naturally occurs with missing teeth.',
    stat: '0%',
    statLabel: 'Bone Deterioration',
  },
  {
    icon: Heart,
    title: 'Protect Adjacent Teeth',
    description:
      "Unlike bridges, implants don't require altering healthy neighboring teeth for support.",
    stat: '0',
    statLabel: 'Teeth Affected',
  },
];

const procedureSteps = [
  {
    step: 1,
    title: 'Consultation & Planning',
    shortTitle: 'Consult',
    description:
      'Comprehensive assessment including X-rays and 3D imaging to evaluate bone structure and create your personalized treatment plan.',
    details: [
      'Digital X-rays & 3D CT scan',
      'Bone density evaluation',
      'Treatment timeline creation',
      'Cost estimate & financing options',
    ],
    duration: '1 visit',
    icon: Target,
  },
  {
    step: 2,
    title: 'Implant Placement',
    shortTitle: 'Place',
    description:
      'The titanium implant post is surgically placed into your jawbone under local anesthesia. This serves as the root for your new tooth.',
    details: [
      'Local anesthesia administration',
      'Precision-guided placement',
      'Titanium post insertion',
      'Temporary restoration (if applicable)',
    ],
    duration: '1-2 hours',
    icon: Zap,
  },
  {
    step: 3,
    title: 'Osseointegration',
    shortTitle: 'Heal',
    description:
      'Over 3-6 months, the implant fuses with your jawbone through osseointegration, creating a strong, permanent foundation.',
    details: [
      'Bone cells bond to titanium',
      'Regular progress monitoring',
      'Soft diet recommendations',
      'Healing verification X-rays',
    ],
    duration: '3-6 months',
    icon: Clock,
  },
  {
    step: 4,
    title: 'Abutment & Crown',
    shortTitle: 'Restore',
    description:
      'Once healed, a connector piece (abutment) and your custom-made crown are secured, completing your restoration.',
    details: [
      'Abutment attachment',
      'Crown shade matching',
      'Custom crown fabrication',
      'Final placement & adjustments',
    ],
    duration: '2 visits',
    icon: Star,
  },
];

const implantComponents = [
  {
    name: 'Crown',
    description: 'Custom-made porcelain tooth that matches your natural teeth',
    position: { top: '5%', height: '25%' },
    color: '#F5F5F5',
    gradient: 'from-white via-neutral-100 to-neutral-200',
  },
  {
    name: 'Abutment',
    description: 'Titanium connector that links the crown to the implant post',
    position: { top: '30%', height: '15%' },
    color: '#C0C0C0',
    gradient: 'from-neutral-300 via-neutral-400 to-neutral-500',
  },
  {
    name: 'Implant Post',
    description: 'Medical-grade titanium screw that fuses with your jawbone',
    position: { top: '45%', height: '35%' },
    color: '#808080',
    gradient: 'from-neutral-400 via-neutral-500 to-neutral-600',
  },
  {
    name: 'Jawbone',
    description: 'Natural bone that integrates with the titanium implant',
    position: { top: '80%', height: '20%' },
    color: '#FDF8F3',
    gradient: 'from-[#F5EDE5] via-[#EDE5DD] to-[#DDD5CD]',
  },
];

const comparisonData = [
  {
    feature: 'Lifespan',
    implant: '25+ years',
    implantScore: 100,
    bridge: '5-15 years',
    bridgeScore: 50,
    denture: '5-10 years',
    dentureScore: 35,
  },
  {
    feature: 'Bone Preservation',
    implant: 'Stimulates growth',
    implantScore: 100,
    bridge: 'No protection',
    bridgeScore: 20,
    denture: 'Accelerates loss',
    dentureScore: 10,
  },
  {
    feature: 'Adjacent Teeth',
    implant: 'No alteration',
    implantScore: 100,
    bridge: 'Requires grinding',
    bridgeScore: 30,
    denture: 'May cause damage',
    dentureScore: 25,
  },
  {
    feature: 'Stability',
    implant: 'Permanent',
    implantScore: 100,
    bridge: 'Fixed',
    bridgeScore: 75,
    denture: 'Removable',
    dentureScore: 40,
  },
  {
    feature: 'Eating Ability',
    implant: 'Full function',
    implantScore: 100,
    bridge: 'Near normal',
    bridgeScore: 80,
    denture: 'Limited',
    dentureScore: 45,
  },
];

const implantTypes = [
  {
    title: 'Single Tooth Implants',
    description:
      'Replace individual missing teeth without affecting neighboring teeth. Ideal for single tooth loss from injury, decay, or extraction.',
    image: '/images/implants/implants-01.jpg',
    features: ['Standalone restoration', 'No adjacent tooth modification', 'Natural appearance'],
  },
  {
    title: 'Multiple Tooth Implants',
    description:
      'Restore several teeth with strategically placed implants. Perfect for patients missing 2-4 adjacent teeth.',
    image: '/images/implants/implants-02.jpg',
    features: ['Implant-supported bridge', 'Cost-effective solution', 'Preserved bone structure'],
  },
  {
    title: 'Implant-Supported Bridges',
    description:
      'Replace multiple adjacent teeth with implant-anchored bridges. No removable appliance needed.',
    image: '/images/implants/implants-03.jpg',
    features: ['Fixed restoration', 'Fewer implants needed', 'Long-term stability'],
  },
  {
    title: 'All-on-4 Full Arch',
    description:
      'Complete upper or lower arch restoration supported by just four strategically angled implants.',
    image: '/images/implants/implants-04.jpg',
    features: ['Full arch in one day', 'Minimal implants', 'Maximum stability'],
  },
];

const trustIndicators = [
  { value: '98%', label: 'Success Rate', icon: TrendingUp },
  { value: '5000+', label: 'Implants Placed', icon: Award },
  { value: '25+', label: 'Years Experience', icon: Clock },
  { value: '100%', label: 'Patient Satisfaction', icon: Star },
];

const financingOptions = [
  {
    title: 'Insurance Coverage',
    description: 'Many dental insurance plans cover a portion of implant treatment',
    icon: Shield,
  },
  {
    title: 'Flexible Financing',
    description: 'Monthly payment plans available through CareCredit and other providers',
    icon: DollarSign,
  },
  {
    title: 'Transparent Pricing',
    description: 'Detailed cost breakdown provided during your consultation',
    icon: CheckCircle2,
  },
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
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
// ANIMATED 3D IMPLANT VISUALIZATION
// ============================================================================

function ImplantVisualization() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [isAssembled, setIsAssembled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="relative">
      {/* Toggle Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => setIsAssembled(!isAssembled)}
          className="group relative px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#722F37]/10 to-[#8B3A42]/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2 text-sm font-medium text-neutral-700">
            <PlayCircle className="w-4 h-4 text-[#722F37]" />
            {isAssembled ? 'Explode View' : 'Assemble View'}
          </span>
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 3D Implant Visualization */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-[#722F37]/5 via-transparent to-transparent rounded-3xl"
            animate={{
              opacity: isInView ? [0.3, 0.5, 0.3] : 0,
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Implant Components */}
          <div className="relative w-32 h-80">
            {implantComponents.map((component, index) => {
              const isHovered = hoveredComponent === component.name;
              const baseOffset = isAssembled ? 0 : (index - 1.5) * 60;

              return (
                <motion.div
                  key={component.name}
                  className="absolute left-0 right-0 cursor-pointer"
                  style={{
                    top: component.position.top,
                    height: component.position.height,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: baseOffset,
                          scale: isHovered ? 1.05 : 1,
                          x: isHovered ? -10 : 0,
                        }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  onMouseEnter={() => setHoveredComponent(component.name)}
                  onMouseLeave={() => setHoveredComponent(null)}
                >
                  {/* Component shape */}
                  <div
                    className={`relative w-full h-full bg-gradient-to-b ${component.gradient} rounded-lg shadow-lg transition-shadow duration-300 ${
                      isHovered ? 'shadow-xl shadow-[#722F37]/20' : ''
                    }`}
                    style={{
                      clipPath:
                        component.name === 'Crown'
                          ? 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)'
                          : component.name === 'Implant Post'
                            ? 'polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)'
                            : component.name === 'Abutment'
                              ? 'polygon(25% 0%, 75% 0%, 80% 100%, 20% 100%)'
                              : 'none',
                    }}
                  >
                    {/* Thread pattern for implant post */}
                    {component.name === 'Implant Post' && (
                      <div className="absolute inset-0 flex flex-col justify-around py-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="h-[2px] bg-neutral-600/30 mx-2 rounded-full" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Label line and text */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4 flex items-center gap-3"
                      >
                        <div className="w-12 h-[2px] bg-gradient-to-r from-[#722F37] to-transparent" />
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-[#722F37]/10 min-w-[200px]">
                          <p className="font-semibold text-[#1e293b] text-sm">{component.name}</p>
                          <p className="text-xs text-neutral-500 mt-1">{component.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Connection indicator lines */}
            {isAssembled && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0.5 : 0 }}
                transition={{ delay: 0.8 }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.line
                    x1="50"
                    y1="28"
                    x2="50"
                    y2="32"
                    stroke="#722F37"
                    strokeWidth="2"
                    strokeDasharray="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <motion.line
                    x1="50"
                    y1="45"
                    x2="50"
                    y2="48"
                    stroke="#722F37"
                    strokeWidth="2"
                    strokeDasharray="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* Component Details */}
        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-2xl font-semibold text-[#1e293b] mb-6"
          >
            Implant Anatomy
          </motion.h3>

          {implantComponents.map((component, index) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                hoveredComponent === component.name
                  ? 'bg-[#722F37]/5 border-[#722F37]/20 shadow-md'
                  : 'bg-white border-neutral-200 hover:border-[#722F37]/10'
              }`}
              onMouseEnter={() => setHoveredComponent(component.name)}
              onMouseLeave={() => setHoveredComponent(null)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${component.gradient} shadow-sm flex items-center justify-center`}
                >
                  <span className="text-sm font-bold text-neutral-700">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1e293b]">{component.name}</h4>
                  <p className="text-sm text-neutral-500">{component.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE PROCEDURE TIMELINE
// ============================================================================

function ProcedureTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="relative">
      {/* Step Navigation - Horizontal Timeline */}
      <div className="relative mb-12">
        {/* Timeline Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-neutral-200 rounded-full" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-[#722F37] to-[#8B3A42] rounded-full"
          initial={{ width: '0%' }}
          animate={{
            width: isInView ? `${(activeStep / (procedureSteps.length - 1)) * 100}%` : '0%',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {procedureSteps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            const StepIcon = step.icon;

            return (
              <motion.button
                key={step.step}
                onClick={() => setActiveStep(index)}
                className="relative flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#722F37] to-[#8B3A42] shadow-lg shadow-[#722F37]/30'
                      : isCompleted
                        ? 'bg-[#722F37]'
                        : 'bg-white border-2 border-neutral-200 group-hover:border-[#722F37]/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <StepIcon
                      className={`w-6 h-6 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-[#722F37]'}`}
                    />
                  )}

                  {/* Pulse ring for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#722F37]"
                      animate={{
                        scale: [1, 1.3, 1.3],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${isActive || isCompleted ? 'text-[#722F37]' : 'text-neutral-500'}`}
                  >
                    {step.shortTitle}
                  </p>
                  <p className="text-xs text-neutral-400">{step.duration}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto">
              <Image
                src={`/images/implants/implants-${String(5 + activeStep).padStart(2, '0')}.jpg`}
                alt={procedureSteps[activeStep]?.title ?? 'Procedure step'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#722F37]">
                  Step {procedureSteps[activeStep]?.step} of {procedureSteps.length}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                  {(() => {
                    const StepIcon = procedureSteps[activeStep]?.icon;
                    return StepIcon ? <StepIcon className="w-6 h-6 text-[#722F37]" /> : null;
                  })()}
                </div>
                <div>
                  <p className="text-sm text-[#722F37] font-medium">Step {procedureSteps[activeStep]?.step}</p>
                  <h3 className="text-2xl font-semibold text-[#1e293b]">
                    {procedureSteps[activeStep]?.title}
                  </h3>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                {procedureSteps[activeStep]?.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium text-[#1e293b] uppercase tracking-wide">
                  What to Expect
                </p>
                {procedureSteps[activeStep]?.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#722F37]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#722F37]" />
                    </div>
                    <span className="text-sm text-neutral-600">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-100">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-[#722F37] hover:bg-[#722F37]/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(procedureSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === procedureSteps.length - 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// ANIMATED COMPARISON CHART
// ============================================================================

function ComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedOption, setSelectedOption] = useState<'implant' | 'bridge' | 'denture'>('implant');

  return (
    <div ref={containerRef}>
      {/* Option Selector */}
      <div className="flex justify-center gap-4 mb-12">
        {[
          { key: 'implant', label: 'Dental Implants', recommended: true },
          { key: 'bridge', label: 'Dental Bridge' },
          { key: 'denture', label: 'Dentures' },
        ].map((option) => (
          <motion.button
            key={option.key}
            onClick={() => setSelectedOption(option.key as 'implant' | 'bridge' | 'denture')}
            className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedOption === option.key
                ? 'bg-[#722F37] text-white shadow-lg shadow-[#722F37]/25'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:border-[#722F37]/20'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.recommended && selectedOption === option.key && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">
                Best
              </span>
            )}
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Comparison Bars */}
      <div className="space-y-6">
        {comparisonData.map((item, index) => (
          <motion.div
            key={item.feature}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1e293b]">{item.feature}</span>
              <span className="text-sm text-neutral-500">
                {selectedOption === 'implant'
                  ? item.implant
                  : selectedOption === 'bridge'
                    ? item.bridge
                    : item.denture}
              </span>
            </div>

            <div className="relative h-8 bg-neutral-100 rounded-full overflow-hidden">
              {/* Background bars (faded) */}
              {selectedOption !== 'implant' && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#722F37]/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${item.implantScore}%` : 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              )}

              {/* Active bar */}
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  selectedOption === 'implant'
                    ? 'bg-gradient-to-r from-[#722F37] to-[#8B3A42]'
                    : selectedOption === 'bridge'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                      : 'bg-gradient-to-r from-neutral-400 to-neutral-500'
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: isInView
                    ? `${selectedOption === 'implant' ? item.implantScore : selectedOption === 'bridge' ? item.bridgeScore : item.dentureScore}%`
                    : 0,
                }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              />

              {/* Score indicator */}
              <motion.div
                className="absolute inset-y-0 flex items-center px-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                <span className="text-sm font-semibold text-white drop-shadow">
                  {selectedOption === 'implant'
                    ? item.implantScore
                    : selectedOption === 'bridge'
                      ? item.bridgeScore
                      : item.dentureScore}
                  %
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10 border border-[#722F37]/10"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#722F37] flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1e293b] mb-1">Why Implants Lead</h4>
            <p className="text-sm text-neutral-600">
              Dental implants consistently outperform other options across all categories.
              They&apos;re the only solution that preserves bone, protects adjacent teeth, and provides
              permanent stability.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// ANIMATED FAQ ACCORDION
// ============================================================================

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
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
                  <span
                    className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-neutral-500'}`}
                  >
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
// TRUST INDICATORS
// ============================================================================

function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {trustIndicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <motion.div
            key={indicator.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative group"
          >
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 transition-all duration-300 hover:border-[#722F37]/20 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#722F37]" />
                </div>
                <div>
                  <motion.p
                    className="text-2xl font-bold text-[#722F37]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {indicator.value}
                  </motion.p>
                  <p className="text-sm text-neutral-500">{indicator.label}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// IMPLANT TYPES SHOWCASE
// ============================================================================

function ImplantTypesShowcase() {
  const [activeType, setActiveType] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Type Selector */}
        <div className="lg:col-span-4 space-y-3">
          {implantTypes.map((type, index) => (
            <motion.button
              key={type.title}
              onClick={() => setActiveType(index)}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                activeType === index
                  ? 'bg-[#722F37] border-[#722F37] shadow-lg shadow-[#722F37]/20'
                  : 'bg-white border-neutral-200 hover:border-[#722F37]/20'
              }`}
            >
              <h4
                className={`font-semibold mb-1 ${activeType === index ? 'text-white' : 'text-[#1e293b]'}`}
              >
                {type.title}
              </h4>
              <p
                className={`text-sm ${activeType === index ? 'text-white/80' : 'text-neutral-500'}`}
              >
                {type.description.slice(0, 60)}...
              </p>
            </motion.button>
          ))}
        </div>

        {/* Type Details */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden"
            >
              <div className="relative h-72">
                <Image
                  src={implantTypes[activeType]?.image ?? ''}
                  alt={implantTypes[activeType]?.title ?? 'Implant type'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {implantTypes[activeType]?.title}
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {implantTypes[activeType]?.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {implantTypes[activeType]?.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium"
                    >
                      <Check className="w-4 h-4" />
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FINANCING SECTION
// ============================================================================

function FinancingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef}>
      <div className="grid lg:grid-cols-3 gap-6">
        {financingOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-[#1e293b] mb-2">{option.title}</h4>
              <p className="text-sm text-neutral-500">{option.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#FDF8F3] to-white border border-[#EDE5DD]"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#722F37] flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1e293b]">Investing in Your Smile</h4>
              <p className="text-sm text-neutral-500">
                Dental implants are a long-term investment that pays dividends in health and
                confidence.
              </p>
            </div>
          </div>
          <Link
            href="/contact#book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white font-medium rounded-xl hover:bg-[#8B3A42] transition-colors"
          >
            Get Your Custom Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
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

        {/* Floating orbs */}
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
            background: 'radial-gradient(circle, rgba(114,47,55,0.15) 0%, transparent 70%)',
          }}
          animate={{
            y: [20, -20, 20],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #722F37 1px, transparent 1px), linear-gradient(to bottom, #722F37 1px, transparent 1px)',
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
                    <Link
                      href="/services"
                      className="text-neutral-500 hover:text-[#722F37] transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="text-neutral-300">/</li>
                  <li className="text-[#722F37] font-medium">Dental Implants</li>
                </ol>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/5 border border-[#722F37]/10 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#722F37] animate-pulse" />
                <span className="text-sm font-medium text-[#722F37]">
                  Gold Standard in Tooth Replacement
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e293b] tracking-tight leading-[1.1] mb-6"
              >
                Dental{' '}
                <span className="relative">
                  <span className="relative z-10 text-[#722F37]">Implants</span>
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
                Restore your smile permanently with the most advanced tooth replacement solution.
                Natural-looking, long-lasting, and designed to function exactly like your real teeth.
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

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 border-2 border-white"
                      />
                    ))}
                  </div>
                  <div className="ml-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">5,000+ Happy Patients</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 aspect-[4/3]">
                <Image
                  src="/images/implants/implants-08.jpg"
                  alt="Patient smiling with dental implants at Ottawa South Dental"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#722F37]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1e293b]">98%</p>
                    <p className="text-sm text-neutral-500">Success Rate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e293b]">Lifetime</p>
                    <p className="text-xs text-neutral-500">Solution</p>
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
// MAIN COMPONENT
// ============================================================================

export function DentalImplantsContent() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <section className="relative py-16 bg-gradient-to-b from-white to-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustIndicators />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Why Choose Implants
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              The Clear Advantage
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Dental implants offer unmatched benefits over traditional tooth replacement options.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#722F37]/20 hover:shadow-xl transition-all duration-500"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#722F37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#722F37]/10 to-[#722F37]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#722F37]" />
                    </div>

                    <h3 className="font-semibold text-lg text-[#1e293b] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      {benefit.description}
                    </p>

                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-2xl font-bold text-[#722F37]">{benefit.stat}</p>
                      <p className="text-xs text-neutral-400 uppercase tracking-wide">
                        {benefit.statLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3D Implant Anatomy Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Technical Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Understanding Your Implant
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore the precision engineering behind every dental implant we place.
            </p>
          </motion.div>

          <ImplantVisualization />
        </div>
      </section>

      {/* Procedure Timeline Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#FDF8F3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Your Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              The Implant Process
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              A step-by-step guide to your dental implant transformation.
            </p>
          </motion.div>

          <ProcedureTimeline />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Compare Options
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              How Implants Stack Up
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              See why dental implants consistently outperform other tooth replacement options.
            </p>
          </motion.div>

          <ComparisonChart />
        </div>
      </section>

      {/* Implant Types Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#722F37]/5 text-[#722F37] text-sm font-medium mb-4">
              Solutions
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Implant Options
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              From single teeth to full arch restoration, we have the right solution for you.
            </p>
          </motion.div>

          <ImplantTypesShowcase />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-white">
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
              Find answers to frequently asked questions about dental implants.
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

      {/* Financing Section */}
      <section className="relative py-24 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              Affordable Care
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight mb-4">
              Investment in Your Future
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We offer flexible financing options to make your implant treatment affordable.
            </p>
          </motion.div>

          <FinancingSection />
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Ready to Restore Your Smile?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Schedule your implant consultation today and discover how dental implants can give you
              a permanent, natural-looking smile you&apos;ll love.
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
