"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, Brain, Send, Sparkles, Loader2, Activity, 
  ArrowRight, AlertCircle, Shield, Globe, Users, 
  Bell, ChevronRight, Star,
  Circle,
  Check,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Existing animation components remain the same
const SuccessAnimation = () => (
  <motion.div className="relative w-24 h-24 mx-auto">
    <motion.div
      className="absolute inset-0 border-4 rounded-full"
      initial={{ borderColor: "rgba(59, 130, 246, 0)", scale: 0.8 }}
      animate={{
        borderColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.6)", "rgba(59, 130, 246, 0)"],
        scale: [0.8, 1.1, 1],
        rotate: 360
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full">
        <Star className="h-8 w-8 text-white" />
      </div>
    </motion.div>
  </motion.div>
);

const ParticlesBackground = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 bg-blue-500/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const StatsCard = ({ number, label, icon: Icon }: { number: string; label: string; icon: React.ElementType }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="text-center p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
  >
    <div className="flex items-center justify-center mb-2">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
      {number}
    </h3>
    <p className="text-xs sm:text-sm text-gray-400">{label}</p>
  </motion.div>
);

const FeatureCard = ({ 
  icon: Icon, 
  title,
  description,
  color,
  delay 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: { from: string; to: string };
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative p-4 sm:p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm overflow-hidden"
  >
    <motion.div 
      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `linear-gradient(135deg, ${color.from}10, ${color.to}10)`,
      }} 
    />
    <div className="relative z-10">
      <div className="p-2 sm:p-3 w-fit rounded-xl bg-gradient-to-r" style={{
        backgroundImage: `linear-gradient(135deg, ${color.from}, ${color.to})`
      }}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <h3 className="mt-4 text-base sm:text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs sm:text-sm text-gray-400">{description}</p>
      <motion.div 
        className="mt-4 flex items-center text-xs sm:text-sm font-medium text-blue-400"
        whileHover={{ x: 5 }}
      >
        Learn more <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
      </motion.div>
    </div>
  </motion.div>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        className="fixed inset-y-0 right-0 w-full sm:w-64 bg-gray-900 shadow-lg z-50 p-6"
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="space-y-6 mt-12">
          {['Home', 'Features', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-lg text-gray-300 hover:text-blue-400 transition-colors"
              onClick={onClose}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "",
    organization: "",
    interests: [] as string[]
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 5;
        return Math.min(oldProgress + diff, 92);
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const generatedCode = `OPTIX${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          name: formData.name 
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send welcome email');
      }

      setSubmitted(true);
      setReferralCode(generatedCode);
      
      toast({
        title: "Welcome to OptiMediX! 🎉",
        description: "You're now part of the future of eye care. Check your email for confirmation.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your submission. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="default"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-6xl mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 mr-2" />
                <span className="text-xs sm:text-sm text-blue-400">Leading in AI Ophthalmology</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  Revolutionizing
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  Eye Care with AI
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join the network of forward-thinking eye care professionals using AI to transform patient outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-2 sm:gap-4"
            >
              <StatsCard number="99.9%" label="Accuracy Rate" icon={Brain} />
              <StatsCard number="2.5M+" label="Analyses Run" icon={Activity} />
              <StatsCard number="50+" label="Partner Clinics" icon={Users} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs sm:text-sm text-gray-400"
            >
              <div className="flex items-center">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 mr-2" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 mr-2" />
                Global Network
              </div>
              <div className="flex items-center">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 mr-2" />
                24/7 Support
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="mt-8 lg:mt-0">
            <Card className="bg-gray-900/80 border-blue-500/30 shadow-2xl backdrop-blur-xl w-full max-w-md mx-auto">
              <CardHeader className="text-center relative pb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-2 sm:p-3 shadow-lg"
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </motion.div>
                
                <CardTitle className="text-2xl sm:text-3xl font-bold mt-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    Join the Innovation
                  </span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-400">
                  Limited spots available for early access
                </CardDescription>
              </CardHeader>

              <CardContent>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        {currentStep === 1 && (
                          <>
                            <Input
                              placeholder="Full Name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              required
                              className="bg-gray-800/50 border-gray-700 h-10 sm:h-12 text-sm sm:text-base"
                            />
                            <Input
                              type="email"
                              placeholder="Professional Email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              required
                              className="bg-gray-800/50 border-gray-700 h-10 sm:h-12 text-sm sm:text-base"
                            />
                          </>
                        )}
                        
                        {currentStep === 2 && (
                          <>
                            <Select onValueChange={(value: string) => setFormData({...formData, role: value})}>
                              <SelectTrigger className="bg-gray-800/50 border-gray-700 h-10 sm:h-12 text-sm sm:text-base">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ophthalmologist">Ophthalmologist</SelectItem>
                                <SelectItem value="optometrist">Optometrist</SelectItem>
                                <SelectItem value="researcher">Researcher</SelectItem>
                                <SelectItem value="clinic-owner">Clinic Owner</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input
                              placeholder="Organization Name"
                              value={formData.organization}
                              onChange={(e) => setFormData({...formData, organization: e.target.value})}
                              className="bg-gray-800/50 border-gray-700 h-10 sm:h-12 text-sm sm:text-base"
                            />
                          </>
                        )}
                      </div>

                      <div className="flex justify-between pt-2">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="bg-gray-800/50 h-9 sm:h-10 text-sm sm:text-base"
                          >
                            Back
                          </Button>
                        )}
                        
                        {currentStep < 2 ? (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="ml-auto h-9 sm:h-10 text-sm sm:text-base"
                          >
                            Next <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="ml-auto h-9 sm:h-10 text-sm sm:text-base"
                          >
                            {isLoading ? (
                              <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                            ) : (
                              <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                            Join Waitlist
                          </Button>
                        )}
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      <SuccessAnimation />
                      
                      <div className="text-center space-y-2">
                        <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                          Welcome to OptiMediX!
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400">You're now part of an exclusive network of healthcare innovators</p>
                      </div>

                      <Alert className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-200">Your Exclusive Referral Code</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded-md">
                            <code className="font-mono text-sm sm:text-base font-bold text-blue-400">{referralCode}</code>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                              onClick={() => {
                                navigator.clipboard.writeText(referralCode);
                                toast({
                                  title: "Copied to clipboard",
                                  duration: 2000,
                                });
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                          <p className="text-xs text-gray-400">Share this code with colleagues to unlock additional benefits</p>
                        </div>
                      </Alert>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-400">Next steps:</span>
                          <span className="text-blue-400">1/3 completed</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center">
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mr-2" />
                            <span className="text-xs sm:text-sm text-gray-300">Join waitlist</span>
                          </div>
                          {[
                            'Check your email for verification',
                            'Complete your profile setup'
                          ].map((step, index) => (
                            <div key={index} className="p-2 sm:p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center">
                              <Circle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-2" />
                              <span className="text-xs sm:text-sm text-gray-400">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex justify-center">
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Early access spots</span>
                    <span>{Math.max(0, 100 - progress).toFixed(0)}% remaining</span>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-24"
        >
          <div className="text-center space-y-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Leading Clinics Choose OptiMediX</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
              Join healthcare providers worldwide who are transforming patient care with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            <FeatureCard
              icon={Eye}
              title="Advanced Diagnostics"
              description="Real-time analysis with 99.9% accuracy using state-of-the-art deep learning models"
              color={{ from: "#3B82F6", to: "#1D4ED8" }}
              delay={0.7}
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered Insights"
              description="Predictive analytics and personalized treatment recommendations powered by neural networks"
              color={{ from: "#8B5CF6", to: "#6D28D9" }}
              delay={0.8}
            />
            <FeatureCard
              icon={Activity}
              title="Smart Monitoring"
              description="Continuous patient monitoring with automated alerts and trend analysis"
              color={{ from: "#10B981", to: "#059669" }}
              delay={0.9}
            />
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 sm:mt-24"
        >
          <div className="text-center space-y-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trusted by Industry Leaders</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
              See what healthcare professionals are saying about OptiMediX
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            {[
              {
                quote: "OptiMediX has revolutionized how we diagnose and treat eye conditions. The accuracy is remarkable.",
                author: "Dr. Sarah Chen",
                role: "Chief Ophthalmologist",
                institution: "Pacific Eye Institute"
              },
              {
                quote: "The AI-powered insights have significantly improved our diagnostic accuracy and patient outcomes.",
                author: "Dr. Michael Roberts",
                role: "Clinical Director",
                institution: "Vision Care Centers"
              },
              {
                quote: "A game-changer for our practice. The platform has streamlined our workflow considerably.",
                author: "Dr. Emma Thompson",
                role: "Lead Optometrist",
                institution: "EyeCare Excellence"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="p-4 sm:p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="space-y-3 sm:space-y-4">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                  <p className="text-sm sm:text-base text-gray-300 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-white">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs sm:text-sm text-blue-400">{testimonial.institution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 sm:mt-24 text-center space-y-4 pb-8"
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm px-4">
            <p>&copy; 2024 OptiMediX. All rights reserved.</p>
            <p>Transforming eye care with artificial intelligence.</p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}