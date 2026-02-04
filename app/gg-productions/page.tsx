import LiquidText from '../components/LiquidText';
import Header from "../components/Header";

export default function GGProductions() {
    return (
        <div className="relative w-full min-h-screen bg-black">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>
            <main>
                <LiquidText text="Coming Soon..." />
            </main>
        </div>
    );
}
