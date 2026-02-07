"use client";

import React, { useState, useEffect } from "react";
import { Upload, Save, Loader2, Home, Info, Send, Sparkles, ArrowLeft, Gamepad2, Briefcase, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { saveCMSData } from '@/app/actions/saveCMS';

interface HomePageData {
  heroText: string;
  header: {
    navItems: Array<{ label: string }>;
  };
  curatedPartnerships: {
    description: string;
    linkText: string;
    linkUrl: string;
  };
  bottomBox: {
    phrases: string[];
    contactEmail: string;
    footerLinks: Array<{ label: string; url: string }>;
  };
}

interface GameData {
  sub: string;
  image?: string;
  description: string;
  developedBy?: string;
  followOn?: Array<{ label: string; url: string }>;
  wishlistOn?: Array<{ label: string; url: string }>;
  availableOn?: Array<{ label: string; url: string }>;
  screenshots?: string[];
  video?: string;
}

interface ProjectData {
  sub: string;
  image?: string;
  description: string;
  developedBy?: string;
  followOn?: Array<{ label: string; url: string }>;
  wishlistOn?: Array<{ label: string; url: string }>;
  availableOn?: Array<{ label: string; url: string }>;
  screenshots?: string[];
  video?: string;
}

interface GGProductionsData {
  heroTagline: string;
  ctaButtonText: string;
  introText: string;
  services: Array<{ title: string; description: string }>;
  projects: Array<ProjectData>;
  clientLogos: string[];
  closingCta: string;
}

interface AboutPageData {
  introText: string[];
  values: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
  careersLink: string;
}

interface PitchPageData {
  formLine1Start: string;
  namePlaceholder: string;
  formLine1End: string;
  formLine2Start: string;
  emailPlaceholder: string;
  formLine2End: string;
  consentText: string;
  buttonText: string;
  companyName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  address3: string;
}

interface PolicyItem {
  title: string;
  content: string;
  lastUpdated: string;
}

interface PolicyPageData {
  cookies: PolicyItem;
  privacy: PolicyItem;
}

const initialHomeData: HomePageData = {
  heroText: "Gattabara Games is a Software design and development company headquartered in Banglore.",
  header: {
    navItems: [
      { label: "GATTABARA GAMES" },
      { label: "Games" },
      { label: "Explore" },
      { label: "Pitch Us" },
    ],
  },
  curatedPartnerships: {
    description: "Gattabara Games curates its partnerships with developers worldwide.",
    linkText: "Learn more here →",
    linkUrl: "#",
  },
  bottomBox: {
    phrases: ["Gattabara Games.", "crafted with conviction.", "inspired by culture."],
    contactEmail: "contact@gattabaragames.com",
    footerLinks: [
      { label: "Careers", url: "#" },
      { label: "Pitch", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "LinkedIn", url: "#" },
      { label: "Newsletter", url: "#" },
    ],
  },
};

const initialGGData: GGProductionsData = {
  heroTagline: "",
  ctaButtonText: "Start a Conversation",
  introText: "",
  services: [],
  projects: [],
  clientLogos: [],
  closingCta: ""
};

const initialAboutData: AboutPageData = {
  introText: [
    "We are an AI-native software company.",
    "We spent a lot of time thinking about our values.",
  ],
  values: [
    {
      title: "Curiosity, creativity and intellectual agility",
      description: "Original thinking and collaboration are at the core.",
      image: "/About1.png",
    },
  ],
  careersLink: "Check out our vacancies on our careers portal.",
};

const initialPitchData: PitchPageData = {
  formLine1Start: "Hi, my name is",
  namePlaceholder: "your name",
  formLine1End: "and I'm exploring a potential partnership with Gattabara Games.",
  formLine2Start: "Get in touch with me at",
  emailPlaceholder: "your e-mail",
  formLine2End: ".",
  consentText: "Hereby I authorise...",
  buttonText: "Send",
  companyName: "Gattabara Games LLP",
  email: "info@gattabaragames.com",
  phone: "+91 9900114038",
  address1: "No. 55...",
  address2: "Bengaluru...",
  address3: "India...",
};

const initialPolicyData: PolicyPageData = {
  cookies: {
    title: "Cookies Policy",
    content: "Content...",
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  privacy: {
    title: "Privacy Policy",
    content: "Content...",
    lastUpdated: new Date().toISOString().split('T')[0]
  }
};

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "games" | "ggproductions" | "about" | "pitch" | "policy">("home");

  const [homeData, setHomeData] = useState<HomePageData>(initialHomeData);
  const [gamesData, setGamesData] = useState<GameData[]>([]);
  const [ggData, setGGData] = useState<GGProductionsData>(initialGGData);
  const [aboutData, setAboutData] = useState<AboutPageData>(initialAboutData);
  const [pitchData, setPitchData] = useState<PitchPageData>(initialPitchData);
  const [policyData, setPolicyData] = useState<PolicyPageData>(initialPolicyData);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const ADMIN_PASSWORD = "gg5656";

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data.home) setHomeData(data.home);
        if (data.games) setGamesData(data.games);
        if (data.ggProductions) {
          setGGData({
            ...data.ggProductions,
            clientLogos: data.ggProductions.clientLogos || []
          });
        }
        if (data.about) setAboutData(data.about);
        if (data.contact) setPitchData(data.contact);
        if (data.policy) setPolicyData(data.policy);
      })
      .catch(error => console.error('Load error:', error));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid password");
      }
      setLoading(false);
    }, 500);
  };


  const handleSave = async () => {
    setSaving(true);

    try {
      const result = await saveCMSData({
        home: homeData,
        games: gamesData,
        ggProductions: ggData,
        about: aboutData,
        contact: pitchData, // Save as 'contact' to match JSON structure
        policy: policyData,
      });

      if (result.success) {
        alert("All changes saved successfully!");
      } else {
        alert(`Error saving changes: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert("Error saving changes");
    }

    setSaving(false);
  };


  const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`File ${file.name} exceeds 2MB limit.`);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setGGData((prev) => ({
            ...prev,
            clientLogos: [...prev.clientLogos, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "games" | "ggproductions" | "about",
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "games") {
          const newGames = [...gamesData];
          newGames[index].image = reader.result as string;
          setGamesData(newGames);
        } else if (type === "ggproductions") {
          const newProjects = [...ggData.projects];
          newProjects[index].image = reader.result as string;
          setGGData({ ...ggData, projects: newProjects });
        } else {
          const newValues = [...aboutData.values];
          newValues[index].image = reader.result as string;
          setAboutData({ ...aboutData, values: newValues });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "games" | "ggproductions",
    index: number
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (type === "games") {
        const newGames = [...gamesData];
        if (!newGames[index].screenshots) newGames[index].screenshots = [];

        Array.from(files).forEach((file) => {
          if (file.size > 10 * 1024 * 1024) {
            alert(`File ${file.name} exceeds 10MB limit.`);
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            newGames[index].screenshots!.push(reader.result as string);
            setGamesData([...newGames]);
          };
          reader.readAsDataURL(file);
        });
      } else {
        const newProjects = [...ggData.projects];
        if (!newProjects[index].screenshots) newProjects[index].screenshots = [];

        Array.from(files).forEach((file) => {
          if (file.size > 10 * 1024 * 1024) {
            alert(`File ${file.name} exceeds 10MB limit.`);
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            newProjects[index].screenshots!.push(reader.result as string);
            setGGData({ ...ggData, projects: newProjects });
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleVideoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "games" | "ggproductions",
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("Video size exceeds 50MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "games") {
          const newGames = [...gamesData];
          newGames[index].video = reader.result as string;
          setGamesData(newGames);
        } else if (type === "ggproductions") {
          const newProjects = [...ggData.projects];
          newProjects[index].video = reader.result as string;
          setGGData({ ...ggData, projects: newProjects });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        {/* Same Login UI as before */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-white/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-white/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative z-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Image
                  src="/logos/GGlogo.png"
                  alt="Gattabara Games Logo"
                  width={100}
                  height={30}
                  className="object-contain"
                />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-5 h-5 text-black animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Content Management System</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                "Access CMS"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/GGlogo.png"
                alt="Gattabara Games Logo"
                width={50}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-black border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 font-medium shadow-sm transition-all hover:shadow text-sm sm:text-base">
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </button>
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-md transition-all hover:shadow-lg text-sm sm:text-base"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span className="hidden sm:inline">Save All Changes</span>
                    <span className="sm:hidden">Save All</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2 justify-center overflow-x-auto pb-1 scrollbar-hide">
            {/* Navigation Tabs */}
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "home"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Home</span>
              <span className="sm:hidden">Home</span>
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "games"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Gamepad2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Games</span>
              <span className="sm:hidden">Games</span>
            </button>
            <button
              onClick={() => setActiveTab("ggproductions")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "ggproductions"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">GG Productions</span>
              <span className="sm:hidden">GG Prod</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "about"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Info size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">About</span>
              <span className="sm:hidden">About</span>
            </button>
            <button
              onClick={() => setActiveTab("pitch")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "pitch"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Pitch</span>
              <span className="sm:hidden">Pitch</span>
            </button>
            <button
              onClick={() => setActiveTab("policy")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "policy"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Policy</span>
              <span className="sm:hidden">Policy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {activeTab === "home" && (
          <div className="space-y-4 sm:space-y-6">

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Hero Section Text
              </h2>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  Main Description
                </label>
                <textarea
                  value={homeData.heroText}
                  onChange={(e) =>
                    setHomeData({
                      ...homeData,
                      heroText: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                  placeholder="Enter the hero section text..."
                />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Header Navigation
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {homeData.header.navItems.map((item, index) => (
                  <div key={index}>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                      Label {index + 1}
                    </label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newItems = [...homeData.header.navItems];
                        newItems[index].label = e.target.value;
                        setHomeData({
                          ...homeData,
                          header: { ...homeData.header, navItems: newItems },
                        });
                      }}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                      placeholder={item.label}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Curated Partnerships Section
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Description
                  </label>
                  <textarea
                    value={homeData.curatedPartnerships.description}
                    onChange={(e) =>
                      setHomeData({
                        ...homeData,
                        curatedPartnerships: {
                          ...homeData.curatedPartnerships,
                          description: e.target.value,
                        },
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                    placeholder={homeData.curatedPartnerships.description}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={homeData.curatedPartnerships.linkText}
                      onChange={(e) =>
                        setHomeData({
                          ...homeData,
                          curatedPartnerships: {
                            ...homeData.curatedPartnerships,
                            linkText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                      placeholder={homeData.curatedPartnerships.linkText}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                      Link URL
                    </label>
                    <input
                      type="text"
                      value={homeData.curatedPartnerships.linkUrl}
                      onChange={(e) =>
                        setHomeData({
                          ...homeData,
                          curatedPartnerships: {
                            ...homeData.curatedPartnerships,
                            linkUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Footer Content
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                    Rotating Phrases
                  </label>
                  {homeData.bottomBox.phrases.map((phrase, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={phrase}
                        onChange={(e) => {
                          const newPhrases = [...homeData.bottomBox.phrases];
                          newPhrases[index] = e.target.value;
                          setHomeData({
                            ...homeData,
                            bottomBox: { ...homeData.bottomBox, phrases: newPhrases },
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                        placeholder={phrase}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={homeData.bottomBox.contactEmail}
                    onChange={(e) =>
                      setHomeData({
                        ...homeData,
                        bottomBox: {
                          ...homeData.bottomBox,
                          contactEmail: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                    placeholder={homeData.bottomBox.contactEmail}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-gray-900">
                      Footer Links
                    </label>
                    <button
                      onClick={() => {
                        setHomeData({
                          ...homeData,
                          bottomBox: {
                            ...homeData.bottomBox,
                            footerLinks: [...(homeData.bottomBox.footerLinks || []), { label: "New Link", url: "#" }],
                          },
                        });
                      }}


                      className="px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800"
                    >
                      + Add Link
                    </button>
                  </div>

                  {(homeData.bottomBox.footerLinks || []).map((link, index) => (

                    <div key={index} className="mb-3 p-3 border-2 border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-gray-900">Link {index + 1}</h4>
                        <button
                          onClick={() => {
                            const newLinks = homeData.bottomBox.footerLinks.filter((_, i) => i !== index);
                            setHomeData({
                              ...homeData,
                              bottomBox: { ...homeData.bottomBox, footerLinks: newLinks },
                            });
                          }}
                          className="text-red-600 hover:text-red-700 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 mb-1">
                            Label
                          </label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...homeData.bottomBox.footerLinks];
                              newLinks[index].label = e.target.value;
                              setHomeData({
                                ...homeData,
                                bottomBox: { ...homeData.bottomBox, footerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                            placeholder="Link name"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 mb-1">
                            URL
                          </label>
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...homeData.bottomBox.footerLinks];
                              newLinks[index].url = e.target.value;
                              setHomeData({
                                ...homeData,
                                bottomBox: { ...homeData.bottomBox, footerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* POLICY TAB */}
        {activeTab === "policy" && (
          <div className="space-y-4 sm:space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Cookies Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Title</label>
                  <input
                    type="text"
                    value={policyData.cookies.title}
                    onChange={(e) => setPolicyData({ ...policyData, cookies: { ...policyData.cookies, title: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Content</label>
                  <textarea
                    value={policyData.cookies.content}
                    onChange={(e) => setPolicyData({ ...policyData, cookies: { ...policyData.cookies, content: e.target.value } })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-y"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Privacy Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Title</label>
                  <input
                    type="text"
                    value={policyData.privacy.title}
                    onChange={(e) => setPolicyData({ ...policyData, privacy: { ...policyData.privacy, title: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Content</label>
                  <textarea
                    value={policyData.privacy.content}
                    onChange={(e) => setPolicyData({ ...policyData, privacy: { ...policyData.privacy, content: e.target.value } })}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-y"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* GAMES TAB */}
        {activeTab === "games" && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-black">
                Company Games
              </h2>
              <button
                onClick={() => {
                  setGamesData([...gamesData, { sub: "New Game", description: "Game Description" }]);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 shadow-md"
              >
                + Add Game
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {gamesData.map((game, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-2xl p-3 sm:p-4 hover:border-gray-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Game {index + 1}</h3>
                    <button
                      onClick={() => {
                        setGamesData(gamesData.filter((_, i) => i !== index));
                      }}
                      className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Game Name
                        </label>
                        <input
                          type="text"
                          value={game.sub}
                          onChange={(e) => {
                            const newGames = [...gamesData];
                            newGames[index].sub = e.target.value;
                            setGamesData(newGames);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder="Project Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Developed By
                        </label>
                        <input
                          type="text"
                          value={game.developedBy || ""}
                          onChange={(e) => {
                            const newGames = [...gamesData];
                            newGames[index].developedBy = e.target.value;
                            setGamesData(newGames);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder="Developer Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                        Description
                      </label>
                      <textarea
                        value={game.description}
                        onChange={(e) => {
                          const newGames = [...gamesData];
                          newGames[index].description = e.target.value;
                          setGamesData(newGames);
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                        placeholder="Game Description"
                      />
                    </div>

                    {/* Socials & Links */}
                    <div className="space-y-6 border-t border-gray-100 pt-3">

                      {/* Video URL */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Video URL (mp4)
                        </label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={game.video || ""}
                            onChange={(e) => {
                              const newGames = [...gamesData];
                              newGames[index].video = e.target.value;
                              setGamesData(newGames);
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                            placeholder="https://example.com/video.mp4"
                          />
                          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50 flex items-center justify-center gap-2">
                            <input
                              type="file"
                              accept="video/mp4,video/x-m4v,video/*"
                              onChange={(e) => handleVideoUpload(e, "games", index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-600">Or upload video (Max 50MB)</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 uppercase">Links & Socials</h4>

                      {/* Follow On */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-bold text-gray-500 uppercase">Follow On</label>
                          <button
                            onClick={() => {
                              const newGames = [...gamesData];
                              const currentLinks = newGames[index].followOn || [];
                              newGames[index].followOn = [...currentLinks, { label: "", url: "" }];
                              setGamesData(newGames);
                            }}
                            className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                          >
                            + Add Link
                          </button>
                        </div>
                        {(game.followOn || []).map((link, linkIndex) => (
                          <div key={linkIndex} className="flex gap-2 mb-2 items-center">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].followOn) {
                                  newGames[index].followOn![linkIndex].label = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-1/3 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="Label (e.g. Twitter)"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].followOn) {
                                  newGames[index].followOn![linkIndex].url = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="URL"
                            />
                            <button
                              onClick={() => {
                                const newGames = [...gamesData];
                                if (newGames[index].followOn) {
                                  newGames[index].followOn = newGames[index].followOn!.filter((_, i) => i !== linkIndex);
                                  setGamesData(newGames);
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {(!game.followOn || game.followOn.length === 0) && (
                          <p className="text-xs text-gray-400 italic">No links added.</p>
                        )}
                      </div>

                      {/* Wishlist On */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-bold text-gray-500 uppercase">Wishlist On</label>
                          <button
                            onClick={() => {
                              const newGames = [...gamesData];
                              const currentLinks = newGames[index].wishlistOn || [];
                              newGames[index].wishlistOn = [...currentLinks, { label: "", url: "" }];
                              setGamesData(newGames);
                            }}
                            className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                          >
                            + Add Link
                          </button>
                        </div>
                        {(game.wishlistOn || []).map((link, linkIndex) => (
                          <div key={linkIndex} className="flex gap-2 mb-2 items-center">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].wishlistOn) {
                                  newGames[index].wishlistOn![linkIndex].label = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-1/3 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="Label (e.g. Steam)"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].wishlistOn) {
                                  newGames[index].wishlistOn![linkIndex].url = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="URL"
                            />
                            <button
                              onClick={() => {
                                const newGames = [...gamesData];
                                if (newGames[index].wishlistOn) {
                                  newGames[index].wishlistOn = newGames[index].wishlistOn!.filter((_, i) => i !== linkIndex);
                                  setGamesData(newGames);
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {(!game.wishlistOn || game.wishlistOn.length === 0) && (
                          <p className="text-xs text-gray-400 italic">No links added.</p>
                        )}
                      </div>

                      {/* Available On */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-bold text-gray-500 uppercase">Available On</label>
                          <button
                            onClick={() => {
                              const newGames = [...gamesData];
                              const currentLinks = newGames[index].availableOn || [];
                              newGames[index].availableOn = [...currentLinks, { label: "", url: "" }];
                              setGamesData(newGames);
                            }}
                            className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                          >
                            + Add Link
                          </button>
                        </div>
                        {(game.availableOn || []).map((link, linkIndex) => (
                          <div key={linkIndex} className="flex gap-2 mb-2 items-center">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].availableOn) {
                                  newGames[index].availableOn![linkIndex].label = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-1/3 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="Label (e.g. App Store)"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => {
                                const newGames = [...gamesData];
                                if (newGames[index].availableOn) {
                                  newGames[index].availableOn![linkIndex].url = e.target.value;
                                  setGamesData(newGames);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder="URL"
                            />
                            <button
                              onClick={() => {
                                const newGames = [...gamesData];
                                if (newGames[index].availableOn) {
                                  newGames[index].availableOn = newGames[index].availableOn!.filter((_, i) => i !== linkIndex);
                                  setGamesData(newGames);
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {(!game.availableOn || game.availableOn.length === 0) && (
                          <p className="text-xs text-gray-400 italic">No links added.</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Media</h4>

                      {/* Main Image */}
                      <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          Main Game Image (Max 10MB)
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "games", index)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {game.image ? (
                            <div className="space-y-2">
                              <img
                                src={game.image}
                                alt={game.sub}
                                className="w-full h-32 md:h-48 object-cover rounded-lg"
                              />
                              <p className="text-xs text-gray-500 text-center">
                                Click to replace
                              </p>
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                              <p className="mt-2 text-xs sm:text-sm text-gray-600">Click to upload main image</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Screenshots */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          Game Screenshots (Max 10MB each)
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50 mb-3">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleScreenshotUpload(e, "games", index)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="text-center py-2">
                            <Upload className="mx-auto h-5 w-5 text-gray-400" />
                            <p className="mt-1 text-xs text-gray-600">Click or drag detailed screenshots here</p>
                          </div>
                        </div>

                        {/* Screenshots Preview Grid */}
                        {game.screenshots && game.screenshots.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {game.screenshots.map((shot, shotIndex) => (
                              <div key={shotIndex} className="relative group aspect-video">
                                <img src={shot} alt="Screenshot" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                <button
                                  onClick={() => {
                                    const newGames = [...gamesData];
                                    if (newGames[index].screenshots) {
                                      newGames[index].screenshots = newGames[index].screenshots!.filter((_, i) => i !== shotIndex);
                                      setGamesData(newGames);
                                    }
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <span className="sr-only">Delete</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GG PRODUCTIONS TAB */}
        {activeTab === "ggproductions" && (
          <div className="space-y-4 sm:space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                General Settings
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={ggData.heroTagline}
                    onChange={(e) => setGGData({ ...ggData, heroTagline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Intro Text
                  </label>
                  <textarea
                    value={ggData.introText}
                    onChange={(e) => setGGData({ ...ggData, introText: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-black">
                  GG Productions Projects
                </h2>
                <button
                  onClick={() => {
                    setGGData({
                      ...ggData,
                      projects: [
                        ...(ggData.projects || []),
                        { sub: "New Project", description: "Project Description", developedBy: "GG Productions" }
                      ]
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 shadow-md"
                >
                  + Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {(ggData.projects || []).map((project, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-3 sm:p-4 hover:border-gray-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">Project {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newProjects = ggData.projects.filter((_, i) => i !== index);
                          setGGData({ ...ggData, projects: newProjects });
                        }}
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                            Project Name
                          </label>
                          <input
                            type="text"
                            value={project.sub}
                            onChange={(e) => {
                              const newProjects = [...ggData.projects];
                              newProjects[index].sub = e.target.value;
                              setGGData({ ...ggData, projects: newProjects });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                            placeholder={project.sub}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                            Developed By
                          </label>
                          <input
                            type="text"
                            value={project.developedBy || ""}
                            onChange={(e) => {
                              const newProjects = [...ggData.projects];
                              newProjects[index].developedBy = e.target.value;
                              setGGData({ ...ggData, projects: newProjects });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                            placeholder="GG Productions"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Description
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...ggData.projects];
                            newProjects[index].description = e.target.value;
                            setGGData({ ...ggData, projects: newProjects });
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder="Project Description"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Video URL (mp4)
                        </label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={project.video || ""}
                            onChange={(e) => {
                              const newProjects = [...ggData.projects];
                              newProjects[index].video = e.target.value;
                              setGGData({ ...ggData, projects: newProjects });
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                            placeholder="https://example.com/video.mp4"
                          />
                          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50 flex items-center justify-center gap-2">
                            <input
                              type="file"
                              accept="video/mp4,video/x-m4v,video/*"
                              onChange={(e) => handleVideoUpload(e, "ggproductions", index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-600">Or upload video (Max 50MB)</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 uppercase">Links & Socials</h4>
                      <div className="space-y-3">
                        {/* Follow On */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase">Follow On</label>
                            <button
                              onClick={() => {
                                const newProjects = [...ggData.projects];
                                const currentLinks = newProjects[index].followOn || [];
                                newProjects[index].followOn = [...currentLinks, { label: "", url: "" }];
                                setGGData({ ...ggData, projects: newProjects });
                              }}
                              className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                            >
                              + Add Link
                            </button>
                          </div>
                          {(project.followOn || []).map((link, linkIndex) => (
                            <div key={linkIndex} className="flex gap-2 mb-2 items-center">
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const newProjects = [...ggData.projects];
                                  if (newProjects[index].followOn) {
                                    newProjects[index].followOn![linkIndex].label = e.target.value;
                                    setGGData({ ...ggData, projects: newProjects });
                                  }
                                }}
                                className="w-1/3 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                                placeholder="Label"
                              />
                              <input
                                type="text"
                                value={link.url}
                                onChange={(e) => {
                                  const newProjects = [...ggData.projects];
                                  if (newProjects[index].followOn) {
                                    newProjects[index].followOn![linkIndex].url = e.target.value;
                                    setGGData({ ...ggData, projects: newProjects });
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                                placeholder="URL"
                              />
                              <button
                                onClick={() => {
                                  const newProjects = [...ggData.projects];
                                  if (newProjects[index].followOn) {
                                    newProjects[index].followOn = newProjects[index].followOn!.filter((_, i) => i !== linkIndex);
                                    setGGData({ ...ggData, projects: newProjects });
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Media</h4>

                        {/* Project Image */}
                        <div className="mb-4">
                          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                            Main Project Image
                          </label>
                          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "ggproductions", index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {project.image ? (
                              <div className="space-y-2">
                                <img
                                  src={project.image}
                                  alt={project.sub}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <p className="text-xs text-gray-500 text-center">Click to replace</p>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <Upload className="mx-auto h-6 w-6 text-gray-400" />
                                <p className="mt-2 text-xs text-gray-600">Click to upload main image</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Screenshots */}
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                            Project Screenshots
                          </label>
                          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50 mb-3">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleScreenshotUpload(e, "ggproductions", index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center py-2">
                              <Upload className="mx-auto h-5 w-5 text-gray-400" />
                              <p className="mt-1 text-xs text-gray-600">Click or drag screenshots here</p>
                            </div>
                          </div>

                          {project.screenshots && project.screenshots.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {project.screenshots.map((shot, shotIndex) => (
                                <div key={shotIndex} className="relative group aspect-video">
                                  <img src={shot} alt="Screenshot" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                  <button
                                    onClick={() => {
                                      const newProjects = [...ggData.projects];
                                      newProjects[index].screenshots = newProjects[index].screenshots!.filter((_, i) => i !== shotIndex);
                                      setGGData({ ...ggData, projects: newProjects });
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow mt-6">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4 pb-3 border-b border-gray-200">
                Client Logos (Rotating Carousel)
              </h2>
              <div className="space-y-4">
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleClientLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload brand logos</p>
                  <p className="text-xs text-gray-400">PNG/JPG up to 2MB each</p>
                </div>

                {ggData.clientLogos && ggData.clientLogos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                    {ggData.clientLogos.map((logo, idx) => (
                      <div key={idx} className="relative group aspect-square bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                        <img src={logo} alt="Client Logo" className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                        <button
                          onClick={() => {
                            const newLogos = ggData.clientLogos.filter((_, i) => i !== idx);
                            setGGData({ ...ggData, clientLogos: newLogos });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-4 sm:space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Introduction Text
              </h2>
              {aboutData.introText.map((text, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Paragraph {index + 1}
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => {
                      const newIntro = [...aboutData.introText];
                      newIntro[index] = e.target.value;
                      setAboutData({ ...aboutData, introText: newIntro });
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                    placeholder={text}
                  />
                </div>
              ))}
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Company Values
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {aboutData.values.map((value, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-3 sm:p-4 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">
                      Value {index + 1}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => {
                            const newValues = [...aboutData.values];
                            newValues[index].title = e.target.value;
                            setAboutData({ ...aboutData, values: newValues });
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder={value.title}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Description
                        </label>
                        <textarea
                          value={value.description}
                          onChange={(e) => {
                            const newValues = [...aboutData.values];
                            newValues[index].description = e.target.value;
                            setAboutData({ ...aboutData, values: newValues });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder={value.description}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          Value Image
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "about", index)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {value.image ? (
                            <div className="space-y-2">
                              <img
                                src={value.image}
                                alt={value.title}
                                className="w-full h-24 sm:h-32 object-cover rounded-lg"
                              />
                              <p className="text-xs text-gray-500 text-center">
                                Click to replace
                              </p>
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                              <p className="mt-2 text-xs sm:text-sm text-gray-600">Click to upload</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Careers Link
              </h2>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  Careers Text
                </label>
                <textarea
                  value={aboutData.careersLink}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, careersLink: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                  placeholder={aboutData.careersLink}
                />
              </div>
            </section>
          </div>
        )}

        {activeTab === "pitch" && (
          <div className="space-y-4 sm:space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Contact Form Setup
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Line 1 Start
                  </label>
                  <input
                    type="text"
                    value={pitchData.formLine1Start}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, formLine1Start: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Line 1 End
                  </label>
                  <input
                    type="text"
                    value={pitchData.formLine1End}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, formLine1End: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Name Placeholder
                  </label>
                  <input
                    type="text"
                    value={pitchData.namePlaceholder}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, namePlaceholder: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Line 2 Start
                  </label>
                  <input
                    type="text"
                    value={pitchData.formLine2Start}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, formLine2Start: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Line 2 End
                  </label>
                  <input
                    type="text"
                    value={pitchData.formLine2End}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, formLine2End: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Email Placeholder
                  </label>
                  <input
                    type="text"
                    value={pitchData.emailPlaceholder}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, emailPlaceholder: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={pitchData.companyName}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, companyName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={pitchData.email}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={pitchData.phone}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={pitchData.address1}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, address1: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={pitchData.address2}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, address2: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Address Line 3
                  </label>
                  <input
                    type="text"
                    value={pitchData.address3}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, address3: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                Other Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Consent Text
                  </label>
                  <textarea
                    value={pitchData.consentText}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, consentText: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none resize-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={pitchData.buttonText}
                    onChange={(e) =>
                      setPitchData({ ...pitchData, buttonText: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
