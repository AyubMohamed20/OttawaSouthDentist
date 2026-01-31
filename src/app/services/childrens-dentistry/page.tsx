'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Check,
  Baby,
  Shield,
  Heart,
  Phone,
  Calendar,
  ArrowRight,
  Smile,
  Star,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  ThumbsUp,
  Stethoscope,
  Droplet,
  Brush,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';

// ============================================================================
// TYPES & DATA
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "When should my child first visit the dentist?",
    answer:
      "We recommend bringing your child for their first dental visit by their first birthday or within 6 months of their first tooth appearing. Early visits help establish good dental habits from a young age and allow us to monitor your child's oral development. These first appointments are usually short and focused on getting your child comfortable in the dental environment.",
    icon: <Baby className="w-5 h-5" />,
  },
  {
    question: "How do you help children who are nervous about the dentist?",
    answer:
      "Our team is specially trained to work with children of all ages and temperaments. We create a calm, friendly environment and use child-friendly language to explain what we're doing. We employ 'show, tell, do' techniques where we show children our tools, explain what they do in simple terms, and then gently proceed with treatment. We always go at your child's pace and celebrate their bravery.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    question: "How often should my child see the dentist?",
    answer:
      "Most children should visit the dentist every 6 months for checkups and professional cleanings. However, some children may benefit from more frequent visits, especially if they're prone to cavities or have specific dental concerns. During each visit, we'll assess your child's individual needs and recommend an appropriate schedule.",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    question: "Are dental X-rays safe for children?",
    answer:
      "Yes, dental X-rays are very safe for children. We use digital X-rays which emit approximately 80% less radiation than traditional film X-rays. We also use lead aprons and take X-rays only when necessary for proper diagnosis. The benefits of detecting hidden problems early far outweigh the minimal radiation exposure.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    question: "What can I do to prepare my child for their dental visit?",
    answer:
      "Keep the conversation positive and avoid using words that might cause fear. Read children's books about visiting the dentist, play pretend dentist at home, and let them know that the dentist is a friendly helper who keeps their smile healthy. Avoid bribing with treats, as this can send mixed messages about dental health.",
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Gentle Approach',
    description: 'Our caring team makes every visit comfortable and stress-free for children and parents alike.',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Preventive Focus',
    description: 'We emphasize prevention with fluoride treatments, sealants, and education to avoid cavities.',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Positive Experiences',
    description: 'Building trust early creates lifelong healthy dental habits and eliminates dental anxiety.',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Education',
    description: 'We teach children proper brushing and flossing techniques in fun, engaging ways.',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
];

const servicesIncluded = [
  {
    step: 1,
    title: 'First Dental Visits',
    description: "Gentle introductions to dentistry for babies and toddlers, focusing on comfort and building trust.",
    icon: <Baby className="w-6 h-6" />,
    color: 'from-violet-400 to-purple-500',
  },
  {
    step: 2,
    title: 'Dental Exams & Cleanings',
    description: 'Regular checkups with age-appropriate cleanings to keep young smiles healthy and cavity-free.',
    icon: <Stethoscope className="w-6 h-6" />,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    step: 3,
    title: 'Fluoride Treatments',
    description: 'Professional fluoride applications to strengthen developing teeth and prevent decay.',
    icon: <Droplet className="w-6 h-6" />,
    color: 'from-teal-400 to-emerald-500',
  },
  {
    step: 4,
    title: 'Dental Sealants',
    description: "Protective coatings applied to back teeth to shield against cavities in hard-to-brush grooves.",
    icon: <Shield className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-500',
  },
  {
    step: 5,
    title: 'Cavity Treatment',
    description: 'Gentle, child-friendly approach to treating cavities with tooth-colored fillings when needed.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-pink-400 to-rose-500',
  },
  {
    step: 6,
    title: 'Habit Counseling',
    description: 'Guidance on thumb-sucking, pacifier use, and other habits that can affect dental development.',
    icon: <ThumbsUp className="w-6 h-6" />,
    color: 'from-indigo-400 to-violet-500',
  },
];

const relatedServices = [
  {
    title: 'Preventive Dentistry',
    description: 'Comprehensive preventive care including sealants and fluoride for the whole family.',
    href: '/services/preventive-dentistry',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Routine Checkups',
    description: 'Regular examinations and cleanings to maintain healthy teeth and gums.',
    href: '/services/routine-checkups',
    icon: <Check className="w-6 h-6" />,
  },
  {
    title: 'Dental Hygiene',
    description: 'Professional cleanings and hygiene education for optimal oral health.',
    href: '/services/dental-hygiene',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const trustBadges = [
  { icon: <Award className="w-5 h-5" />, label: 'Kid-Friendly Certified' },
  { icon: <Shield className="w-5 h-5" />, label: 'Safe & Gentle' },
  { icon: <Heart className="w-5 h-5" />, label: 'Family Focused' },
  { icon: <Star className="w-5 h-5" />, label: '5-Star Reviews' },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

const bouncySpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 15,
};

const floatingAnimation = {
  y: [-10, 10, -10],
  rotate: [-3, 3, -3],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

// ============================================================================
// DECORATIVE COMPONENTS
// ============================================================================

// Animated tooth character/mascot
function ToothMascot({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={floatingAnimation}
    >
      {/* Tooth body */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-t-full rounded-b-[40%]"
        style={{
          boxShadow: "0 8px 32px rgba(114, 47, 55, 0.15), inset 0 -4px 12px rgba(0,0,0,0.05)",
          border: "3px solid #f0f0f0",
        }}
      >
        {/* Eyes */}
        <motion.div
          className="absolute top-[30%] left-[25%] w-[15%] h-[20%] bg-[#1e293b] rounded-full"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.div
          className="absolute top-[30%] right-[25%] w-[15%] h-[20%] bg-[#1e293b] rounded-full"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* Blush */}
        <div className="absolute top-[45%] left-[10%] w-[18%] h-[12%] bg-pink-300/50 rounded-full blur-[2px]" />
        <div className="absolute top-[45%] right-[10%] w-[18%] h-[12%] bg-pink-300/50 rounded-full blur-[2px]" />
        {/* Smile */}
        <motion.div
          className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[40%] h-[15%] border-b-4 border-[#722F37] rounded-b-full"
          animate={{ scaleX: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Sparkle */}
        <motion.div
          className="absolute top-[15%] right-[20%] w-2 h-2 bg-white rounded-full"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// Floating bubbles decoration
function FloatingBubbles() {
  const bubbles = [
    { size: 40, x: "10%", y: "20%", delay: 0, duration: 6 },
    { size: 60, x: "80%", y: "15%", delay: 1, duration: 7 },
    { size: 30, x: "70%", y: "60%", delay: 2, duration: 5 },
    { size: 50, x: "20%", y: "70%", delay: 0.5, duration: 8 },
    { size: 35, x: "90%", y: "40%", delay: 1.5, duration: 6 },
    { size: 45, x: "5%", y: "50%", delay: 2.5, duration: 7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-[#722F37]/5 to-[#722F37]/10"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated stars decoration
function AnimatedStars() {
  const stars = [
    { x: "15%", y: "10%", size: 24, delay: 0 },
    { x: "85%", y: "20%", size: 20, delay: 0.3 },
    { x: "75%", y: "80%", size: 28, delay: 0.6 },
    { x: "25%", y: "85%", size: 22, delay: 0.9 },
    { x: "50%", y: "5%", size: 18, delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400"
          style={{ left: star.x, top: star.y }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Star className={`w-${star.size / 4} h-${star.size / 4}`} fill="currentColor" style={{ width: star.size, height: star.size }} />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// INTERACTIVE COMPONENTS
// ============================================================================

// Animated benefit card with hover effects
function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...springTransition, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <motion.div
        className={`relative p-8 rounded-3xl ${benefit.bgColor} border-2 border-[rgba(0,0,0,0)] overflow-hidden`}
        animate={{
          borderColor: isHovered ? "rgba(114, 47, 55, 0.2)" : "rgba(0, 0, 0, 0)",
          y: isHovered ? -8 : 0,
        }}
        transition={bouncySpring}
      >
        {/* Background decoration */}
        <motion.div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${benefit.color} opacity-10`}
          animate={{
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 90 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Icon container */}
        <motion.div
          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 text-white shadow-lg`}
          animate={{
            rotate: isHovered ? 5 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={bouncySpring}
        >
          {benefit.icon}

          {/* Sparkle effect */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.h3
          className="font-bold text-xl text-[#1e293b] mb-3"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {benefit.title}
        </motion.h3>
        <p className="text-[#64748b] leading-relaxed">{benefit.description}</p>
      </motion.div>
    </motion.div>
  );
}

// Interactive service step card
function ServiceStepCard({ service, index }: { service: typeof servicesIncluded[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ ...springTransition, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative p-6 rounded-2xl bg-white border border-[#EDE5DD] overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? "0 20px 40px -12px rgba(114, 47, 55, 0.2)"
            : "0 4px 12px -4px rgba(114, 47, 55, 0.1)",
          y: isHovered ? -4 : 0,
        }}
        transition={springTransition}
      >
        {/* Step number badge */}
        <motion.div
          className={`absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ ...bouncySpring, rotate: { duration: 0.5 } }}
        >
          {service.step}
        </motion.div>

        {/* Icon */}
        <motion.div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color}/10 flex items-center justify-center mb-4 ml-8`}
          animate={{
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className={`bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}>
            {service.icon}
          </span>
        </motion.div>

        {/* Content */}
        <h3 className="font-semibold text-lg text-[#1e293b] mb-2 ml-8">{service.title}</h3>
        <p className="text-sm text-[#64748b] leading-relaxed ml-8">{service.description}</p>

        {/* Hover decoration */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated FAQ Accordion
function AnimatedFAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            className={`rounded-2xl border-2 overflow-hidden ${
              openIndex === index
                ? 'border-[#722F37]/30 bg-gradient-to-br from-white to-[#FDF8F3]/50 shadow-lg'
                : 'border-[#EDE5DD] bg-white hover:border-[#722F37]/10'
            }`}
            animate={{
              y: openIndex === index ? -2 : 0,
            }}
            transition={springTransition}
          >
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2 rounded-2xl"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  openIndex === index
                    ? 'bg-gradient-to-br from-[#722F37] to-[#5a252c] text-white'
                    : 'bg-[#FDF8F3] text-[#722F37]'
                }`}
                animate={{
                  rotate: openIndex === index ? 5 : 0,
                  scale: openIndex === index ? 1.05 : 1,
                }}
                transition={bouncySpring}
              >
                {item.icon}
              </motion.div>

              <span className="font-semibold text-[#1e293b] flex-1">{item.question}</span>

              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={springTransition}
                className={`flex-shrink-0 ${openIndex === index ? 'text-[#722F37]' : 'text-[#64748b]'}`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 text-[#64748b] leading-relaxed ml-14">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Animated procedure explanation card
function ProcedureExplanation() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Welcome & Warm-Up",
      description: "We greet your child with a friendly smile and let them explore our kid-friendly space",
      icon: <Smile className="w-8 h-8" />,
      color: "from-pink-400 to-rose-500",
    },
    {
      title: "Chair Ride Time",
      description: "The dental chair becomes a fun spaceship or race car - whichever they prefer!",
      icon: <Star className="w-8 h-8" />,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Tooth Counting",
      description: "We count teeth together like a fun game while gently checking for any issues",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Sparkle Polish",
      description: "Special toothpaste in yummy flavors makes teeth super shiny and clean",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Prize Time!",
      description: "Every brave visitor gets to pick a prize from our treasure chest",
      icon: <Award className="w-8 h-8" />,
      color: "from-violet-400 to-purple-500",
    },
  ];

  return (
    <div className="relative">
      {/* Step indicators */}
      <div className="flex justify-center gap-3 mb-12">
        {steps.map((step, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              activeStep === index
                ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                : 'bg-[#FDF8F3] text-[#64748b] hover:bg-[#F5EDE5]'
            }`}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={bouncySpring}
          >
            {step.icon}
            {activeStep === index && (
              <motion.div
                className="absolute -bottom-2 w-2 h-2 rounded-full bg-[#722F37]"
                layoutId="activeIndicator"
                transition={springTransition}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={springTransition}
          className="text-center"
        >
          <motion.div
            className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${steps[activeStep]?.color} flex items-center justify-center text-white mb-6 shadow-xl`}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {steps[activeStep]?.icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-[#1e293b] mb-3">
            Step {activeStep + 1}: {steps[activeStep]?.title}
          </h3>
          <p className="text-[#64748b] text-lg max-w-md mx-auto">
            {steps[activeStep]?.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
          className="w-12 h-12 rounded-full bg-white border-2 border-[#EDE5DD] flex items-center justify-center text-[#722F37] hover:border-[#722F37]/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </motion.button>
        <motion.button
          onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#722F37] to-[#5a252c] flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

// Trust badge component
function TrustBadge({ badge, index }: { badge: typeof trustBadges[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springTransition, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#EDE5DD] shadow-sm"
    >
      <span className="text-[#722F37]">{badge.icon}</span>
      <span className="font-medium text-[#1e293b] text-sm">{badge.label}</span>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ChildrensDentistryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <main id="main-content" className="min-h-screen overflow-hidden">
        {/* ================================================================== */}
        {/* HERO SECTION */}
        {/* ================================================================== */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5]"
        >
          {/* Animated background elements */}
          <FloatingBubbles />
          <AnimatedStars />

          {/* Large decorative circles */}
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-200/30 to-rose-200/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springTransition, delay: 0.2 }}
              >
                {/* Breadcrumb */}
                <nav className="mb-6" aria-label="Breadcrumb">
                  <ol className="flex items-center gap-2 text-sm">
                    <li>
                      <Link href="/" className="text-[#64748b] hover:text-[#722F37] transition-colors">
                        Home
                      </Link>
                    </li>
                    <li className="text-[#64748b]">/</li>
                    <li>
                      <Link href="/services" className="text-[#64748b] hover:text-[#722F37] transition-colors">
                        Services
                      </Link>
                    </li>
                    <li className="text-[#64748b]">/</li>
                    <li className="text-[#722F37] font-medium">Children&apos;s Dentistry</li>
                  </ol>
                </nav>

                {/* Title with animated gradient */}
                <motion.h1
                  className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.3 }}
                >
                  <span className="text-[#1e293b]">Happy Smiles for </span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#722F37] via-pink-500 to-[#722F37] bg-clip-text text-transparent">
                      Little Ones
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 200 12"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <motion.path
                        d="M2 8C50 2 150 2 198 8"
                        stroke="url(#underlineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                      <defs>
                        <linearGradient id="underlineGradient" x1="0" y1="0" x2="200" y2="0">
                          <stop offset="0%" stopColor="#722F37" />
                          <stop offset="50%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#722F37" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-[#64748b] leading-relaxed mb-8 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.4 }}
                >
                  Creating magical dental experiences for your little ones. Our gentle, kid-friendly approach helps children develop healthy habits and beautiful smiles that last a lifetime.
                </motion.p>

                {/* Trust badges */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.5 }}
                >
                  {trustBadges.map((badge, index) => (
                    <TrustBadge key={index} badge={badge} index={index} />
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.6 }}
                >
                  <Link href="/contact#book">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={bouncySpring}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        leftIcon={<Calendar className="w-5 h-5" />}
                      >
                        Book Your Child&apos;s Visit
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.a
                    href="tel:+16137331118"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-white text-[#722F37] border-2 border-[#722F37]/20 hover:border-[#722F37]/40 hover:bg-[#FDF8F3] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37]/50 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={bouncySpring}
                  >
                    <Phone className="w-5 h-5" />
                    (613) 733-1118
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Hero Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ ...springTransition, delay: 0.4 }}
              >
                {/* Main image */}
                <motion.div
                  className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={springTransition}
                >
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/hygiene/hygiene-03.jpg"
                      alt="Child receiving gentle dental care at Ottawa South Dental"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/20 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Floating mascot */}
                <motion.div
                  className="absolute -top-8 -left-8 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...bouncySpring, delay: 0.8 }}
                >
                  <ToothMascot size="lg" />
                </motion.div>

                {/* Floating info card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-[#EDE5DD] z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.9 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-lg"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Baby className="w-7 h-7" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-[#1e293b] text-lg">First Visit by Age 1</p>
                      <p className="text-sm text-[#64748b]">Recommended timing</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats card */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#722F37] to-[#5a252c] rounded-2xl p-5 text-white shadow-xl z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...bouncySpring, delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="w-8 h-8 text-amber-300" fill="currentColor" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-2xl">1000+</p>
                      <p className="text-sm text-white/80">Happy Kids</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ================================================================== */}
        {/* BENEFITS SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(114,47,55,0.05)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF8F3] border border-[#EDE5DD] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">Why Kids Love Us</span>
              </motion.div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1e293b] tracking-tight mb-4">
                Why Choose Us for Your Child&apos;s Care
              </h2>
              <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
                We understand that visiting the dentist can be daunting for children. Our team creates a welcoming environment where kids feel safe and excited about caring for their teeth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* PROCEDURE EXPLANATION SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden">
          <FloatingBubbles />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EDE5DD] mb-6 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-[#722F37]">The Dental Adventure</span>
              </motion.div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1e293b] tracking-tight mb-4">
                What Happens at a Visit?
              </h2>
              <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
                Every dental visit is an adventure! Here&apos;s what your child can expect when they come to see us.
              </p>
            </motion.div>

            <ProcedureExplanation />
          </div>
        </section>

        {/* ================================================================== */}
        {/* DETAILED DESCRIPTION SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={springTransition}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF8F3] border border-[#EDE5DD] mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <BookOpen className="w-4 h-4 text-[#722F37]" />
                  <span className="text-sm font-medium text-[#722F37]">Our Philosophy</span>
                </motion.div>

                <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1e293b] tracking-tight mb-6">
                  Setting the Foundation for Lifelong Oral Health
                </h2>

                <div className="space-y-4 text-[#64748b] leading-relaxed text-lg">
                  <p>
                    Children&apos;s dental care is about more than just healthy teeth—it&apos;s about building confidence and establishing habits that will last a lifetime. At Ottawa South Dental, we specialize in making dental visits fun and educational for children of all ages.
                  </p>
                  <p>
                    From a child&apos;s first tooth to their teenage years, we provide comprehensive care tailored to each developmental stage. Our team understands child psychology and uses age-appropriate techniques to ensure every visit is a positive experience.
                  </p>
                  <p>
                    We work closely with parents to provide guidance on nutrition, oral hygiene routines, and developmental milestones. By partnering together, we can help your child grow up with a healthy, beautiful smile and a positive attitude toward dental care.
                  </p>
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={springTransition}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Smile className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-[#1e293b] mb-1">Did you know?</p>
                      <p className="text-[#64748b]">
                        Children who have positive dental experiences early in life are more likely to maintain good oral health habits as adults.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={springTransition}
              >
                <motion.div
                  className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={springTransition}
                >
                  <div className="aspect-square relative">
                    <Image
                      src="/images/hygiene/hygiene-08.jpg"
                      alt="Child smiling during a dental visit"
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-20"
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Small tooth mascot */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...bouncySpring, delay: 0.5 }}
                >
                  <ToothMascot size="sm" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SERVICES INCLUDED SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden">
          <AnimatedStars />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EDE5DD] mb-6 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Stethoscope className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">Complete Care</span>
              </motion.div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1e293b] tracking-tight mb-4">
                Our Children&apos;s Dental Services
              </h2>
              <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
                Comprehensive dental care designed specifically for children, from infancy through adolescence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesIncluded.map((service, index) => (
                <ServiceStepCard key={index} service={service} index={index} />
              ))}
            </div>

            {/* Special callout */}
            <motion.div
              className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#722F37] to-[#5a252c] text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              {/* Background decoration */}
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-10 h-10 text-amber-300" fill="currentColor" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-2xl mb-2">Making Dental Visits Fun!</h3>
                  <p className="text-white/80 text-lg">
                    We celebrate every visit with prizes and positive reinforcement, helping children look forward to their dental appointments.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* FAQ SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF8F3] border border-[#EDE5DD] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm font-medium text-[#722F37]">Parent Resources</span>
              </motion.div>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#1e293b] tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#64748b] text-lg">
                Common questions parents ask about children&apos;s dental care.
              </p>
            </motion.div>

            <AnimatedFAQAccordion items={faqs} />

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#64748b] mb-4">Have more questions about your child&apos;s dental health?</p>
              <motion.a
                href="tel:+16137331118"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline"
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Call us at (613) 733-1118
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* RELATED SERVICES SECTION */}
        {/* ================================================================== */}
        <section className="relative py-24 bg-gradient-to-br from-[#FDF8F3] via-white to-[#F5EDE5] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <h2 className="font-display font-bold text-4xl text-[#1e293b] tracking-tight mb-4">
                Related Services
              </h2>
              <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
                Explore other services for your family&apos;s dental care needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <motion.a
                  key={index}
                  href={service.href}
                  className="group relative p-6 rounded-2xl bg-white border border-[#EDE5DD] overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springTransition, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(114, 47, 55, 0.2)" }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FDF8F3] to-[#EDE5DD] flex items-center justify-center mb-5 text-[#722F37]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={bouncySpring}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="font-semibold text-lg text-[#1e293b] mb-2 group-hover:text-[#722F37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{service.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#722F37]">
                    <span>Learn more</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#722F37] font-semibold hover:underline group"
              >
                View All Services
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* CTA SECTION */}
        {/* ================================================================== */}
        <section className="relative overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#5a252c] to-[#4a1f24]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5"
              animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Floating tooth mascot */}
            <motion.div
              className="absolute top-10 right-[15%]"
              animate={floatingAnimation}
            >
              <ToothMascot size="md" />
            </motion.div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-4 h-4 text-pink-300" />
                <span className="text-sm font-medium text-white/90">Start Their Journey</span>
              </motion.div>

              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
                Give Your Child a Healthy Start
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
                Schedule your child&apos;s dental appointment today and set them on the path to a lifetime of healthy smiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact#book">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={bouncySpring}
                  >
                    <Button variant="secondary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                      Book an Appointment
                    </Button>
                  </motion.div>
                </Link>
                <motion.a
                  href="tel:+16137331118"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-lg bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#722F37]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={bouncySpring}
                >
                  <Phone className="w-5 h-5" />
                  (613) 733-1118
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
