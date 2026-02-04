import React from 'react';
import { Press_Start_2P } from 'next/font/google';
import styles from './LiquidText.module.css';

const pixelFont = Press_Start_2P({
    subsets: ['latin'],
    weight: ['400'],
});

interface LiquidTextProps {
    text?: string;
}

const LiquidText: React.FC<LiquidTextProps> = ({ text = "Coming Soon..." }) => {
    return (
        <div className={`${styles.container} ${pixelFont.className}`}>
            <div className={styles.content}>
                <h2>{text}</h2>
                <h2>{text}</h2>
            </div>
        </div>
    );
};

export default LiquidText;
