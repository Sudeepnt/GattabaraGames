import GGProductions from '../components/pages/ggproductions';
import Header from "../components/Header";

export default function GGProductionsPage() {
    return (
        <div className="relative w-full min-h-screen bg-black">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>
            <main className="pt-16">
                <GGProductions />
            </main>
        </div>
    );
}
