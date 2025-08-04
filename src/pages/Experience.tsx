import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Building, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const experienceData = [
  {
    id: 1,
    title: "Trainee Internship",
    company: "Raghavendra and Associates",
    location: "Chennai, India",
    duration: "May 2024 to September 2024",
    responsibilities: [
      "Drafted legal opinions for 10+ national banks, 40+ companies, and 75+ individuals",
      "Prepared and reviewed key legal documents including MOUs, NDA, Sale Deeds, MODTs, Wills, and incorporated arbitration clauses",
      "Led and supervised an 8-member legal team, overseeing the drafting of contracts, legal notices, and client deliverables",
      "Coordinated with senior officials such as Chief Managers, AGMs, and AMs, ensuring clarity and resolution of legal issues"
    ]
  },
  {
    id: 2,
    title: "Legal Researcher Internship",
    company: "Government Pleader, D Gopal (Madras High Court)",
    location: "Chennai, India",
    duration: "April 2024",
    responsibilities: [
      "Researched judicial precedents for land acquisition disputes and patta cancellation",
      "Reviewed Civil Revision Petition filed under the TN Rent Control Act involving tenancy disputes",
      "Analyzed GST Act provisions relevant to tax liability disputes raised in the writ petition",
      "Prepared draft note explaining procedural posture for CRP admission delay and absence of counter stage",
      "Drafted counter affidavit in a tenancy-related Civil Revision Petition challenging eviction under the Rent Control Act"
    ]
  },
  {
    id: 3,
    title: "Legal Intern",
    company: "Saravanan and Associates (Poonamallee Integrated Court)",
    location: "Chennai, India",
    duration: "February 2024 to March 2024",
    responsibilities: [
      "Drafted civil petitions with structured legal reasoning, focusing on factual clarity and statutory compliance",
      "Helped frame leading and cross-examination questions in civil dispute cases",
      "Researched provisions and case law under the Negotiable Instruments Act for active files",
      "Participated in mediation and arbitration proceedings by preparing briefs and summarizing settlements",
      "Conducted research on the MGNREGA Act and its district-level application in Thiruvallur"
    ]
  },
  {
    id: 4,
    title: "Legal Intern",
    company: "Senior Advocate K.Kamaraj (Cuddalore District Court)",
    location: "Cuddalore, India",
    duration: "January 2024",
    responsibilities: [
      "Assisted in drafting observation notes and summarizing interim applications filed under Section 161(1) of the Motor Vehicles Act",
      "Researched the statutory obligations under Section 158 Motor Vehicles Act,1988 to ensure proper production of vehicular documents",
      "Drafted MCOP claim petitions, focusing on negligence, injuries, and quantum of compensation"
    ]
  },
  {
    id: 5,
    title: "Legal Intern",
    company: "Centre for Trade and Investment Law",
    location: "New Delhi, India (Remote)",
    duration: "October 2023",
    responsibilities: [
      "Researched on Investor-State Dispute Settlement (ISDS) and their treatment under India's model BIT and ongoing FTA negotiations",
      "Prepared legal briefing notes on dispute resolution mechanisms under WTO and bilateral trade treaties",
      "Mapped India's existing obligations under FTAs with ASEAN, Japan, and Korea to assess their alignment with current negotiating positions",
      "Summarised key arbitration awards to illustrate the evolution of MFN and National Treatment clauses in cross-border disputes",
      "Researched institutional design options for appellate mechanisms in ISDS reforms proposed by UNCITRAL Working Group III"
    ]
  },
  {
    id: 6,
    title: "Legal Intern",
    company: "Niti Aayog",
    location: "New Delhi, India (Remote)",
    duration: "July 2023",
    responsibilities: [
      "Contributed to research and case law analysis on social justice and women's rights matters across NGOs and judicial forums",
      "Assisted in drafting legal briefs and compiling data to support case presentations by senior legal professionals",
      "Supported the development of a legal dashboard to streamline documentation and case tracking for ongoing matters"
    ]
  },
  {
    id: 7,
    title: "Legal Intern",
    company: "Senior Advocate Jesu (Madras High Court)",
    location: "Chennai, India",
    duration: "November 2022 to February 2023",
    responsibilities: [
      "Conducted legal research on Intellectual Property Rights laws and arbitration frameworks for drafting purposes",
      "Drafted a range of legal documents including petitions, NDAs, MOUs, service agreements, and MODT deeds",
      "Assisted in preparing trademark registration files and reviewing supporting documentation for accuracy and compliance"
    ]
  }
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    const cards = containerRef.current?.querySelectorAll('.experience-vertical-card');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleToggle = (idx: number) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 hero-title">
            My Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of law, technology, and innovation through diverse experiences
            across courts, organizations, and legal institutions.
          </p>
        </div>
        {/* Vertical Card Layout */}
        <div className="container mx-auto px-4 max-w-2xl flex flex-col gap-y-8 items-center" ref={containerRef}>
          {experienceData.map((experience, idx) => {
            const isVisible = visibleCards.includes(idx);
            const isExpandable = experience.responsibilities.length > 3;
            const isExpanded = expanded[idx];
            const shownResponsibilities = isExpandable && !isExpanded
              ? experience.responsibilities.slice(0, 3)
              : experience.responsibilities;
            return (
              <Card
                key={experience.id}
                data-index={idx}
                className={`experience-vertical-card w-full bg-card border border-border rounded-2xl transition-all duration-700 group overflow-hidden shadow-lg hover:scale-[1.015] hover:shadow-2xl ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Building className="text-netflix-red flex-shrink-0" size={24} />
                    <div>
                      <CardTitle className="text-2xl md:text-3xl font-bold mb-1 leading-tight text-foreground">
                        {experience.title}
                      </CardTitle>
                      <div className="text-netflix-red font-medium text-base md:text-lg">
                        {experience.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground text-sm md:text-base">
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {experience.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {experience.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm md:text-base transition-all duration-500">
                    {shownResponsibilities.map((responsibility, idx2) => (
                      <li
                        key={idx2}
                        className={`animate-fade-in-up responsibility-item`}
                        style={{ animationDelay: isExpanded ? `${0.08 * idx2}s` : undefined }}
                      >
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                  {isExpandable && (
                    <button
                      className="mt-3 flex items-center gap-1 text-netflix-red font-semibold focus:outline-none hover:underline transition-colors text-sm md:text-base group/readmore"
                      onClick={() => handleToggle(idx)}
                      aria-expanded={!!isExpanded}
                    >
                      <span>{isExpanded ? 'Show less' : `Read more (${experience.responsibilities.length - 3} more)`}</span>
                      <ChevronDown
                        className={`transition-transform duration-300 group-hover/readmore:rotate-180 ${isExpanded ? 'rotate-180' : ''}`}
                        size={18}
                      />
                    </button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;