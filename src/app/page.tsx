"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Zap, Brain, Send, Sparkles, Loader2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

const MotionBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.2, 0.4],
          background: [
            "radial-gradient(circle at 30% 30%, #1a365d 0%, transparent 70%)",
            "radial-gradient(circle at 70% 70%, #1a365d 0%, transparent 70%)",
            "radial-gradient(circle at 30% 30%, #1a365d 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(66, 153, 225, 0.1) 10px, rgba(66, 153, 225, 0.1) 20px)"
        }}
      />
    </div>
  );
};

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[Eye, Brain, Activity].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: index * 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + index * 30}%`,
            top: `${20 + index * 20}%`,
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  label, 
  color, 
  delay 
}: {
  icon: React.ElementType;
  label: string;
  color: { from: string; to: string };
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center"
      >
        <div className="relative p-3 rounded-full bg-gray-800/80 shadow-lg">
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
              filter: "blur(8px)",
            }}
          />
          <Icon className="h-8 w-8 relative z-10 text-white" />
        </div>
        <span className="text-sm mt-3 text-gray-300 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
};

const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    if (!response.ok) throw new Error('Failed to send email');
    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default function Component() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 1, 100);
        if (newProgress === 100) clearInterval(timer);
        return newProgress;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendWelcomeEmail(email, name);
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Welcome to OptiMediX! Check your email for confirmation.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <MotionBackground />
      <FloatingIcons />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="bg-gray-900/80 border-blue-500/30 shadow-2xl backdrop-blur-xl">
          <CardHeader className="text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-3 shadow-lg"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mt-4">
                OptiMediX
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Next-Generation AI Ocular Diagnostics
              </CardDescription>
            </motion.div>
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
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Join Waitlist
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mx-auto w-16 h-16"
                  >
                    <Sparkles className="h-16 w-16 text-blue-500" />
                  </motion.div>
                  <p className="font-semibold text-xl text-blue-400">Thank you for joining!</p>
                  <p className="text-gray-300">Check your email for confirmation.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter>
            <div className="w-full space-y-6">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg font-semibold text-center text-blue-400"
              >
                Why OptiMediX?
              </motion.h3>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Eye,
                    label: "MLDiagnostics",
                    color: { from: "#3B82F6", to: "#1D4ED8" }
                  },
                  {
                    icon: Brain,
                    label: "AI Analysis",
                    color: { from: "#8B5CF6", to: "#6D28D9" }
                  },
                  {
                    icon: Activity,
                    label: "AI Monitoring",
                    color: { from: "#10B981", to: "#059669" }
                  }
                ].map((feature, index) => (
                  <FeatureCard
                    key={index}
                    {...feature}
                    delay={0.7 + index * 0.1}
                  />
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-gray-400 text-sm z-10"
      >
        <p>&copy; 2024 OptiMediX. All rights reserved.</p>
        <p className="mt-2">Transforming eye care with artificial intelligence.</p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 w-64"
        >
          <p className="text-xs mb-1">Waitlist Progress</p>
          <Progress
            value={progress}
            className="h-2 bg-gray-800"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-700"
          />
        </motion.div>
      </motion.footer>
    </div>
  );
}