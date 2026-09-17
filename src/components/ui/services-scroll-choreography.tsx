"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ServicesScrollChoreographyProps {
  className?: string;
  images: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    hero: string;
  };
}

export function ServicesScrollChoreography({
  className,
  images,
}: ServicesScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    mass: 1.2,
    restDelta: 0.001,
  });

  const xLeft = "-20vw";
  const xRight = "20vw";
  const yTop = "-14vh";
  const yBottom = "14vh";

  // Exact Componentry choreography for the four layer cards:
  // phase 1 = diagonal movement
  // phase 2 = stack alignment to centre
  const tlX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yBottom, yBottom, "0vh", "0vh"]);

  const brX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yTop, yTop, "0vh", "0vh"]);

  const blX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yBottom, yBottom, "0vh", "0vh"]);

  const trX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yTop, yTop, "0vh", "0vh"]);

  // All four layer cards fade only after they have converged.
  const layerOpacity = useTransform(smoothProgress, [0.74, 0.84], [1, 0]);

  // Fifth card is a separate hero reveal after the first four stack.
  const heroOpacity = useTransform(smoothProgress, [0.76, 0.83, 1], [0, 1, 1]);
  const heroWidth = useTransform(smoothProgress, [0.76, 0.82, 0.94, 1], ["36vw", "36vw", "92vw", "92vw"]);
  const heroHeight = useTransform(smoothProgress, [0.76, 0.82, 0.94, 1], ["24vh", "24vh", "78vh", "78vh"]);
  const heroScale = useTransform(smoothProgress, [0.76, 0.86, 1], [0.92, 1, 1]);

  const baseImageClasses =
    "absolute left-1/2 top-1/2 w-[36vw] h-[24vh] overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-[#E8E2DB] shadow-2xl will-change-transform rounded-[18px]";

  return (
    <div ref={containerRef} className={cn("relative h-[320vh] w-full", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">

          <motion.div
            style={{ x: tlX, y: tlY, opacity: layerOpacity }}
            className={cn(baseImageClasses, "z-10")}
          >
            <img src={images.topLeft} alt="01 Traffic" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{ x: brX, y: brY, opacity: layerOpacity }}
            className={cn(baseImageClasses, "z-20")}
          >
            <img src={images.bottomRight} alt="03 Conversion" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{ x: blX, y: blY, opacity: layerOpacity }}
            className={cn(baseImageClasses, "z-30")}
          >
            <img src={images.bottomLeft} alt="02 Capture" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{ x: trX, y: trY, opacity: layerOpacity }}
            className={cn(baseImageClasses, "z-40")}
          >
            <img src={images.topRight} alt="04 Infrastructure" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{
              opacity: heroOpacity,
              width: heroWidth,
              height: heroHeight,
              scale: heroScale,
            }}
            className={cn(baseImageClasses, "z-50 origin-center bg-[#2F3A45]")}
          >
            <img src={images.hero} alt="05 Modular by Design" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
