import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-item-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const radius = 400;
  const centerX = 50;
  const centerY = 50;

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

        {/* Circular Timeline */}
        <div className="relative w-full max-w-6xl mx-auto px-4" ref={timelineRef}>
          <div className="circular-timeline" style={{ 
            height: '800px',
            position: 'relative',
            margin: '0 auto'
          }}>
            {/* Center Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="timeline-hub">
                <div className="hub-inner">
                  <span className="hub-text">Experience</span>
                </div>
              </div>
            </div>

            {/* Timeline Items */}
            {experienceData.map((experience, index) => {
              const angle = (index / experienceData.length) * 360;
              const radian = (angle * Math.PI) / 180;
              const x = centerX + (radius / 800) * 100 * Math.cos(radian);
              const y = centerY + (radius / 800) * 100 * Math.sin(radian);

              return (
                <div
                  key={experience.id}
                  className="timeline-item"
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    '--timeline-delay': `${index * 0.2}s`
                  } as React.CSSProperties}
                >
                  {/* Connection Line */}
                  <div 
                    className="timeline-connector"
                    style={{
                      transform: `rotate(${angle + 180}deg)`,
                      transformOrigin: '0 50%'
                    }}
                  />
                  
                  {/* Experience Card */}
                  <div className="experience-card">
                    <div className="card-header">
                      <div className="flex items-start justify-between mb-3">
                        <Building className="text-netflix-red flex-shrink-0 mt-1" size={20} />
                        <div className="ml-3 flex-1">
                          <h3 className="font-semibold text-foreground text-lg mb-1">
                            {experience.title}
                          </h3>
                          <p className="text-netflix-red font-medium text-sm mb-2">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <MapPin size={14} className="mr-2" />
                        {experience.location}
                      </div>
                      
                      <div className="flex items-center text-muted-foreground text-sm mb-4">
                        <Calendar size={14} className="mr-2" />
                        {experience.duration}
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <ul className="space-y-2">
                        {experience.responsibilities.slice(0, 3).map((responsibility, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground leading-relaxed">
                            • {responsibility}
                          </li>
                        ))}
                        {experience.responsibilities.length > 3 && (
                          <li className="text-sm text-netflix-red font-medium">
                            +{experience.responsibilities.length - 3} more achievements
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;