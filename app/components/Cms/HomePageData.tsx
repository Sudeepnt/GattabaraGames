"use client";

import React, { useState, useEffect } from "react";
import { Upload, Save, Loader2, Home, Info, Send, Sparkles, ArrowLeft } from "lucide-react";
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
  projectStack: {
    projects: Array<{ sub: string; image?: string }>;
  };
  bottomBox: {
    phrases: string[];
    contactEmail: string;
    footerLinks: Array<{ label: string; url: string }>;
  };
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
  projectStack: {
    projects: [
      { sub: "Job Worker Inventory" },
      { sub: "Gattabara Game Studios" },
      { sub: "Vitta Chitta" },
      { sub: "A44 Games" },
      { sub: "The Gentlebros" },
      { sub: "Hadoque" },
    ],
  },
  bottomBox: {
    phrases: ["Gattabara Games.", "crafted with conviction.", "inspired by culture."],
    contactEmail: "contact@gattabaragames.com",
    footerLinks: [  // ADD THIS
      { label: "Careers", url: "#" },
      { label: "Pitch", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "LinkedIn", url: "#" },
      { label: "Newsletter", url: "#" },
    ],
  },
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

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "about" | "pitch">("home");
  const [homeData, setHomeData] = useState<HomePageData>(initialHomeData);
  const [aboutData, setAboutData] = useState<AboutPageData>(initialAboutData);
  const [pitchData, setPitchData] = useState<PitchPageData>(initialPitchData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const ADMIN_PASSWORD = "gg5656";  /********/

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data.home) setHomeData(data.home);
        if (data.about) setAboutData(data.about);
        if (data.contact) setPitchData(data.contact); // Load specifically from 'contact' key for Pitch Page
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
        about: aboutData,
        pitch: pitchData, // This will be saved as 'contact' in the backend action if we update it there, OR we rename strictly.
        // Actually, let's keep it passing as 'pitch' here, but I need to make sure saveCMSData handles it or I rename it to 'contact'
        contact: pitchData, // Pass as contact to match content.json structure
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


  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "home" | "about",
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "home") {
          const newProjects = [...homeData.projectStack.projects];
          newProjects[index].image = reader.result as string;
          setHomeData({
            ...homeData,
            projectStack: { ...homeData.projectStack, projects: newProjects },
          });
        } else {
          const newValues = [...aboutData.values];
          newValues[index].image = reader.result as string;
          setAboutData({ ...aboutData, values: newValues });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-white/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-white/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative z-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Image
                  src="/GGlogo.png"
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
                src="/GGlogo.png"
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
                  <span className="hidden sm:inline">Go Back Home</span>
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

          <div className="flex gap-2 justify-center overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "home"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Home Page</span>
              <span className="sm:hidden">Home</span>
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "about"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Info size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">About Page</span>
              <span className="sm:hidden">About</span>
            </button>
            <button
              onClick={() => setActiveTab("pitch")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${activeTab === "pitch"
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Pitch Page</span>
              <span className="sm:hidden">Pitch</span>
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-black">
                  Project Stack
                </h2>
                <button
                  onClick={() => {
                    setHomeData({
                      ...homeData,
                      projectStack: {
                        ...homeData.projectStack,
                        projects: [...homeData.projectStack.projects, { sub: "New Project" }],
                      },
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 shadow-md"
                >
                  + Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {homeData.projectStack.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-3 sm:p-4 hover:border-gray-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">Project {index + 1}</h3>
                      <button
                        onClick={() => {
                          const newProjects = homeData.projectStack.projects.filter(
                            (_, i) => i !== index
                          );
                          setHomeData({
                            ...homeData,
                            projectStack: { ...homeData.projectStack, projects: newProjects },
                          });
                        }}
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={project.sub}
                          onChange={(e) => {
                            const newProjects = [...homeData.projectStack.projects];
                            newProjects[index].sub = e.target.value;
                            setHomeData({
                              ...homeData,
                              projectStack: {
                                ...homeData.projectStack,
                                projects: newProjects,
                              },
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none placeholder-gray-500 placeholder:text-xs text-gray-900 transition-all text-sm sm:text-base"
                          placeholder={project.sub}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          Project Image
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 hover:border-gray-500 transition-colors cursor-pointer bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "home", index)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {project.image ? (
                            <div className="space-y-2">
                              <img
                                src={project.image}
                                alt={project.sub}
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
                Bottom Box Content
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
