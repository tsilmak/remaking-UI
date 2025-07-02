import React, { useState, useRef, useEffect } from "react";

type Props = {
  text: string;
  children: React.ReactNode;
  showTooltip?: boolean;
};

const ToolTip = ({ text, children, showTooltip = true }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!tooltipRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let x = container.left + container.width / 2 - tooltip.width / 2;
    let y = container.top - tooltip.height - 12; // 12px gap

    // Horizontal boundary checks
    if (x < 8) {
      x = 8; // 8px padding from left edge
    } else if (x + tooltip.width > viewport.width - 8) {
      x = viewport.width - tooltip.width - 8; // 8px padding from right edge
    }

    // Vertical boundary checks
    if (y < 8) {
      // If tooltip doesn't fit above, show below
      y = container.bottom + 12;
    }

    // If still doesn't fit below, position at top with padding
    if (y + tooltip.height > viewport.height - 8) {
      y = Math.max(8, viewport.height - tooltip.height - 8);
    }

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    // Only show tooltip if showTooltip prop is true
    if (!showTooltip) return;

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a 250ms delay before showing the tooltip
    hoverTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Small delay to ensure tooltip is rendered before calculating position
      setTimeout(calculatePosition, 10);
    }, 250);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if mouse leaves before 250ms
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      requestAnimationFrame(calculatePosition);

      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition);

      return () => {
        window.removeEventListener("resize", calculatePosition);
        window.removeEventListener("scroll", calculatePosition);
      };
    }
  }, [isVisible, text]);

  // Hide tooltip when showTooltip becomes false
  useEffect(() => {
    if (!showTooltip && isVisible) {
      setIsVisible(false);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    }
  }, [showTooltip, isVisible]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        ref={tooltipRef}
        className={`
          fixed z-50 transition-opacity duration-200 pointer-events-none
          bg-[#282828] text-white text-sm rounded px-2 py-1 shadow-lg
          max-w-xs break-words
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ToolTip;
