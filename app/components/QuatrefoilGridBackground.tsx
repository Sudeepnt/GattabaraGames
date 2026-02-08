import React from 'react';

interface QuatrefoilGridBackgroundProps {
    strokeColor?: string;
    opacity?: number;
}

const QuatrefoilGridBackground = ({ strokeColor = "#ffffff", opacity = 0.125 }: QuatrefoilGridBackgroundProps) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="quatrefoil-grid"
                        x="0"
                        y="0"
                        width="160"
                        height="160"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* 4-pointed diamond star shape - centered and more visible */}
                        <path
                            d="M 40,2 C 35,15 25,25 10,30 C 25,35 35,45 40,58 C 45,45 55,35 70,30 C 55,25 45,15 40,2 Z"
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="0.5"
                            opacity={opacity}
                            transform="translate(40, 50) scale(2.4)"
                            style={{ transformOrigin: '40px 30px' }}
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#quatrefoil-grid)" />
            </svg>
        </div>
    );
};

export default QuatrefoilGridBackground;
