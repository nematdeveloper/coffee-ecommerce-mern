import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ShippingSteps = () => {
  const { t } = useTranslation("home");
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const STEPS = [
    { 
      id: 1, 
      titleKey: "shipping.steps.orderPlaced.title", 
      descKey: "shipping.steps.orderPlaced.desc" 
    },
    { 
      id: 2, 
      titleKey: "shipping.steps.processing.title", 
      descKey: "shipping.steps.processing.desc" 
    },
    { 
      id: 3, 
      titleKey: "shipping.steps.inTransit.title", 
      descKey: "shipping.steps.inTransit.desc" 
    },
    { 
      id: 4, 
      titleKey: "shipping.steps.delivered.title", 
      descKey: "shipping.steps.delivered.desc" 
    },
  ];

  const STEP_DELAY = 600;
  const RESET_DELAY = 1000;

  const startAnimation = () => {
    setActiveStep(0);
    let step = 0;

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      step += 1;
      setActiveStep(step);

      if (step === STEPS.length) {
        clearInterval(intervalRef.current);
        
        timeoutRef.current = setTimeout(() => {
          // Restart animation
          setTimeout(startAnimation, 500);
        }, RESET_DELAY);
      }
    }, STEP_DELAY);
  };

  const stopAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveStep(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? startAnimation() : stopAnimation();
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  const progress = (activeStep / STEPS.length) * 100;

  return (
    <div ref={containerRef} className="py-12 px-4 mt-30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          {t('shipping.title')}
        </h2>
        <p className="text-gray-500">
          {t('shipping.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Steps - Vertical on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Vertical connecting line for mobile */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:hidden">
            <div 
              className="w-full bg-primary transition-all duration-500"
              style={{ height: `${progress}%` }}
            />
          </div>

          {/* Horizontal connecting line for desktop */}
          <div className="hidden md:block absolute left-0 right-0 top-8 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4">
            {STEPS.map((step, index) => {
              const isActive = index < activeStep;
              
              return (
                <div key={step.id} className="relative flex md:flex-col items-start md:items-center">
                  {/* Circle with number */}
                  <div className={`relative  flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold shadow transition-colors duration-300
                    ${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}>
                    {step.id}
                  </div>

                  {/* Content */}
                  <div className="ml-6 md:ml-0 md:mt-4 text-left md:text-center">
                    <h3 className={`font-semibold mb-1 transition-colors duration-300
                      ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                      {t(step.titleKey)}
                    </h3>
                    <p className={`text-sm transition-colors duration-300
                      ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              {t('shipping.progress.label')}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSteps;