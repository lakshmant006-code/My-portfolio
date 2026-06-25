import React, { useRef, useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollReset from "../../hooks/useScrollReset";
import { useLenisScroll } from "../../hooks/useLenisScroll";
import { useCountupAnimation } from "../../hooks/useCountupAnimation";
import { useCardUnfurling } from "../../hooks/useCardUnfurling";
import Footer from "../../components/Footer/Footer";
import CursorPill from "../../components/CursorPill/CursorPill";
import CaseStudyLayout from "../../components/CaseStudyLayout/CaseStudyLayout";
import {
  CaseStudyStatement,
  CaseStudyStatementBody,
  CaseStudyStatementHeadline,
} from "../../components/CaseStudyStatement/CaseStudyStatement";
import "./MoodleCaseStudy.css";

gsap.registerPlugin(ScrollTrigger);

const MoodleCaseStudy = () => {
  useScrollReset();
  const [isHoveringSeeNextCard, setIsHoveringSeeNextCard] = useState(false);
  const { scrollToElement } = useLenisScroll();

  const impactSectionRef = useRef(null);
  const metricRefs = useRef([]);

  // Refs for scroll animations
  const contextWhatIsMoodleRef = useRef(null);
  const contextMyRoleRef = useRef(null);
  const userFlowImageRef = useRef(null);
  const contextImpactTitleRef = useRef(null);
  const contextImpactMetricsRefs = useRef([]);
  const contextStatementTitleRef = useRef(null);
  const contextStatementContentRef = useRef(null);
  const researchTitleRef = useRef(null);
  const researchOverviewSubtitleRef = useRef(null);
  const solutionTitleRef = useRef(null);
  const solutionVisualIdentityContentRef = useRef(null);
  const solutionItem1TitleRef = useRef(null);
  const solutionItem1ContentRef = useRef(null);
  const solutionItem1VideoRef = useRef(null);
  const solutionItem1CaptionRef = useRef(null);
  const solutionItem2TitleRef = useRef(null);
  const solutionItem2ContentRef = useRef(null);
  const solutionItem2VideoRef = useRef(null);
  const solutionItem2CaptionRef = useRef(null);
  const takeawaysTitleRef = useRef(null);
  const takeawaysItemsRefs = useRef([]);
  const seeNextTitleRef = useRef(null);
  const seeNextGridRef = useRef(null);
  const seeNextCardsRefs = useRef([]);

  const handleSkipToSolution = () => {
    scrollToElement(document.getElementById("moodle-solutions"), {
      duration: 1.2,
    });
  };

  // Countup animation for metrics - memoize to prevent hook re-runs
  const metrics = useMemo(
    () => [
      {
        value: 60,
        prefix: "28-",
        suffix: "",
        elementRef: metricRefs,
        index: 0,
      },
      {
        value: 100,
        prefix: "",
        suffix: "%",
        elementRef: metricRefs,
        index: 1,
      },
      {
        value: 30,
        prefix: "",
        suffix: "%",
        elementRef: metricRefs,
        index: 2,
      },
    ],
    [],
  );

  useCountupAnimation(impactSectionRef, metrics);

  // Use card unfurling hook for See Next section
  useCardUnfurling({
    gridRef: seeNextGridRef,
    cardRefs: seeNextCardsRefs,
    options: {
      peekOffset: 40,
      start: "top 70%",
      end: "top 20%",
      minWidth: 768,
      layoutDelay: 100,
    },
  });

  // Scroll-triggered animations for context section
  useEffect(() => {
    const scrollTriggers = [];

    // Helper function to create scroll trigger animation
    const createScrollAnimation = (ref, delay = 0) => {
      if (!ref || !ref.current) return;
      gsap.set(ref.current, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: delay,
          });
        },
      });
      scrollTriggers.push(trigger);
    };

    // Context Section
    createScrollAnimation(contextWhatIsMoodleRef);
    createScrollAnimation(contextMyRoleRef, 0.1);
    createScrollAnimation(userFlowImageRef, 0.1);
    createScrollAnimation(contextImpactTitleRef, 0.2);
    // Impact metrics with stagger
    contextImpactMetricsRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.set(ref, { opacity: 0, y: 30 });
        const trigger = ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3 + index * 0.1,
            });
          },
        });
        scrollTriggers.push(trigger);
      }
    });
    createScrollAnimation(contextStatementTitleRef);
    createScrollAnimation(contextStatementContentRef, 0.1);

    // Research Section
    createScrollAnimation(researchTitleRef);
    createScrollAnimation(researchOverviewSubtitleRef, 0.1);

    // Development Section
    createScrollAnimation(solutionTitleRef);
    createScrollAnimation(solutionVisualIdentityContentRef, 0.1);

    createScrollAnimation(solutionItem1TitleRef);
    createScrollAnimation(solutionItem1ContentRef, 0.1);
    createScrollAnimation(solutionItem1VideoRef, 0.2);
    createScrollAnimation(solutionItem1CaptionRef, 0.3);

    createScrollAnimation(solutionItem2TitleRef);
    createScrollAnimation(solutionItem2ContentRef, 0.1);
    createScrollAnimation(solutionItem2VideoRef, 0.2);
    createScrollAnimation(solutionItem2CaptionRef, 0.3);

    // Key Takeaways Section
    createScrollAnimation(takeawaysTitleRef);
    takeawaysItemsRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.set(ref, { opacity: 0, y: 30 });
        const trigger = ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: index * 0.1,
            });
          },
        });
        scrollTriggers.push(trigger);
      }
    });

    // See Next Section
    createScrollAnimation(seeNextTitleRef);

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="moodle-case-study">
      <CursorPill isHovering={isHoveringSeeNextCard} text="View case study" />
      <CaseStudyLayout projectId="moodle">
        {/* Hero Section */}
        <section className="moodle-hero-section">
          {/* Hero Before Image - Visual welcome */}
          <div className="moodle-hero-image-container moodle-hero-before">
            <img
              src="/work/moodle/iMac_Mockup_3.png"
              alt="Time Management"
              className="moodle-hero-image"
              style={{ height: "600px" }}
            />
          </div>

          {/* Hero Text Content */}
          <div className="moodle-hero-content">
            {/* Left Column */}
            <div className="moodle-hero-left">
              <h1 className="moodle-hero-title">Time Management</h1>
              <p className="moodle-hero-category">
                Time tracking Web Application
              </p>
              <div className="moodle-hero-details">
                <div className="moodle-hero-detail-item">
                  <div className="moodle-hero-detail-label">TIMELINE</div>
                  <div className="moodle-hero-detail-value">
                    Feb — March 2020
                  </div>
                </div>
                <div className="moodle-hero-detail-item">
                  <div className="moodle-hero-detail-label">ROLE</div>
                  <div className="moodle-hero-detail-value">
                    UX Researcher
                    <br />
                    UX Designer
                    <br />
                    Interaction Designer
                    <br />
                    Full Stack Developer
                  </div>
                </div>
                <div className="moodle-hero-detail-item">
                  <div className="moodle-hero-detail-label">TOOLS</div>
                  <div className="moodle-hero-detail-value">
                    Figma
                    <br />
                    VS Code
                    <br />
                    Cursor AI
                    <br />
                    Supabase SQL
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="moodle-hero-right">
              <p className="moodle-hero-subtitle">
                This is a web application that allows the company to track
                their employees' productivity and helps analyze the insights
                and increase employees' productivity.
              </p>
              <div className="moodle-hero-tags">
                <span className="moodle-hero-tag">Human Interface Design</span>
                <span className="moodle-hero-tag">UX Research</span>
                <span className="moodle-hero-tag">Data Application</span>
                <span className="moodle-hero-tag">Web Development</span>
              </div>
              <button
                className="moodle-skip-to-solution-btn"
                onClick={handleSkipToSolution}
              >
                <div className="moodle-skip-icon-container">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="moodle-skip-arrow"
                  >
                    <path
                      d="M10 5V15M10 15L5 10M10 15L15 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="moodle-skip-text">SKIP TO SOLUTIONS</span>
              </button>
            </div>
          </div>

          {/* Hero After Image - After all text */}
          <div className="moodle-hero-image-container moodle-hero-after">
            <img
              src="/work/moodle/hero.png"
              alt="Time Management"
              className="moodle-hero-image"
              style={{ height: "400px" }}
            />
          </div>
        </section>

        {/* Context Section */}
        <section id="moodle-context" className="moodle-context-section">
          <div className="moodle-context-content">
            {/* Top Row - Two Columns */}
            <div className="moodle-context-top">
              <div className="moodle-context-item" ref={contextWhatIsMoodleRef}>
                <h2 className="moodle-context-title">Goal</h2>
                <p className="moodle-context-description">
                  The goal is to create an intuitive and easy experience for
                  the company to track and oversee the logins and the work
                  load of their employees.
                </p>
              </div>
              <div className="moodle-context-item" ref={contextMyRoleRef}>
                <h2 className="moodle-context-title">User Research</h2>
                <p className="moodle-context-description">
                  The application was something I was pretty confident of
                  from the start. The client gave me all the requirements,
                  and I immediately started giving him ideas, but he wanted a{" "}
                  <span style={{ fontWeight: 600 }}>
                    simple, not sophisticated and easy to navigate
                  </span>{" "}
                  and intuitive design. So I made sure to apply minimalist
                  principles in designing the web application and started
                  designing in Figma.
                </p>
                <p className="moodle-context-description">
                  But before that, I had to decide the different roles of
                  employees that would be using the application. Then I
                  defined the user flow and came up with a development plan
                  for{" "}
                  <span style={{ fontWeight: 600 }}>over 3 weeks</span>.
                </p>
              </div>
            </div>

            {/* User Flow Diagram */}
            <div className="moodle-userflow-image-container" ref={userFlowImageRef}>
              <img
                src="/work/moodle/user-flow.png"
                alt="Time Management Requirements, User Flow, and Roles Diagram"
                className="moodle-userflow-image"
                style={{ aspectRatio: "1360 / 438" }}
              />
            </div>

            {/* Bottom Row - Impact Metrics */}
            <div className="moodle-context-impact" ref={impactSectionRef}>
              <h3 className="moodle-impact-title" ref={contextImpactTitleRef}>
                Impact
              </h3>
              <div className="moodle-impact-metrics">
                <div
                  className="moodle-impact-metric"
                  ref={(el) => (contextImpactMetricsRefs.current[0] = el)}
                >
                  <div
                    className="moodle-impact-value"
                    ref={(el) => (metricRefs.current[0] = el)}
                  >
                    28-0
                  </div>
                  <div className="moodle-impact-label">AGE GROUP</div>
                </div>
                <div
                  className="moodle-impact-metric"
                  ref={(el) => (contextImpactMetricsRefs.current[1] = el)}
                >
                  <div
                    className="moodle-impact-value"
                    ref={(el) => (metricRefs.current[1] = el)}
                  >
                    0%
                  </div>
                  <div className="moodle-impact-label">USAGE</div>
                </div>
                <div
                  className="moodle-impact-metric"
                  ref={(el) => (contextImpactMetricsRefs.current[2] = el)}
                >
                  <div
                    className="moodle-impact-value"
                    ref={(el) => (metricRefs.current[2] = el)}
                  >
                    0%
                  </div>
                  <div className="moodle-impact-label">
                    INCREASE IN PRODUCTIVITY
                  </div>
                </div>
              </div>
            </div>

            {/* Context Statement Section */}
            <div className="moodle-context-statement">
              <h3
                className="moodle-context-statement-title"
                ref={contextStatementTitleRef}
              >
                REQUIREMENTS & USERS
              </h3>
              <CaseStudyStatement
                ref={contextStatementContentRef}
                variant="wide"
              >
                <CaseStudyStatementBody>
                  <span className="moodle-requirements-label">
                    REQUIREMENTS
                  </span>
                  <img
                    src="/work/moodle/frame-145.png"
                    alt="Time Management Requirements"
                    className="moodle-requirements-image"
                    style={{ aspectRatio: "1336 / 400" }}
                  />
                </CaseStudyStatementBody>
                <CaseStudyStatementBody>
                  <span className="moodle-requirements-label">USERS</span>
                  <img
                    src="/work/moodle/frame-147.png"
                    alt="Time Management Users"
                    className="moodle-requirements-image"
                    style={{ aspectRatio: "1460 / 340" }}
                  />
                </CaseStudyStatementBody>
                <CaseStudyStatementBody>
                  <span className="moodle-requirements-label">
                    MOTIVATIONS
                  </span>
                  <br />
                  A platform that can handle multiple functions within a
                  single application to save time.
                </CaseStudyStatementBody>
                <CaseStudyStatementBody>
                  <span className="moodle-requirements-label">
                    PAINPOINTS
                  </span>
                </CaseStudyStatementBody>
              </CaseStudyStatement>
              <div className="moodle-painpoints-tags">
                <span className="moodle-painpoint-tag">Lack of good UX</span>
                <span className="moodle-painpoint-tag">
                  Better user flow
                </span>
                <span className="moodle-painpoint-tag">Save time</span>
                <span className="moodle-painpoint-tag">
                  Security concerns
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="moodle-research" className="moodle-research-section">
          <div className="moodle-research-content">
            <h3 className="moodle-research-title" ref={researchTitleRef}>
              IDEATION
            </h3>

            <CaseStudyStatement ref={researchOverviewSubtitleRef}>
              <CaseStudyStatementBody>
                During the ideation process, I came up with different types
                of screens, but{" "}
                <span style={{ fontWeight: 600 }}>the client</span> wanted
                the most{" "}
                <span style={{ fontWeight: 600 }}>
                  simplistic and easy to navigate
                </span>{" "}
                and intuitive design.
              </CaseStudyStatementBody>
              <CaseStudyStatementBody>
                So I followed Apple's guidelines to provide the best
                experience for the client.
              </CaseStudyStatementBody>
              <CaseStudyStatementBody>
                But one interesting feature was to give our different{" "}
                <span style={{ fontWeight: 600 }}>
                  skillsets to employees
                </span>{" "}
                to improve the skill that they select over time. It helped
                the employees a lot to{" "}
                <span style={{ fontWeight: 600 }}>
                  focus on what they were actually lacking
                </span>{" "}
                in.
              </CaseStudyStatementBody>
            </CaseStudyStatement>

            <div className="moodle-ideation-subsection">
              <h4 className="moodle-ideation-subheading">Color Palette</h4>
              <p className="moodle-ideation-text">
                This project adopted a minimalistic visual style, using
                primary blue and white to build the brand and also convey
                trust. I also followed the 60-30-10 rule to maintain a
                better visual balance.
              </p>
              <div className="moodle-swatch-row">
                <div className="moodle-swatch">
                  <div
                    className="moodle-swatch-block"
                    style={{ background: "#1A56DB" }}
                  />
                  <div className="moodle-swatch-hex">#1A56DB</div>
                  <div className="moodle-swatch-label">PRIMARY</div>
                </div>
                <div className="moodle-swatch">
                  <div
                    className="moodle-swatch-block moodle-swatch-block-bordered"
                    style={{ background: "#FFFFFF" }}
                  />
                  <div className="moodle-swatch-hex">#FFFFFF</div>
                  <div className="moodle-swatch-label">PRIMARY</div>
                </div>
                <div className="moodle-swatch">
                  <div
                    className="moodle-swatch-block"
                    style={{ background: "#000000" }}
                  />
                  <div className="moodle-swatch-hex">#000000</div>
                  <div className="moodle-swatch-label">SECONDARY</div>
                </div>
                <div className="moodle-swatch">
                  <div
                    className="moodle-swatch-block"
                    style={{ background: "#D9D9D9" }}
                  />
                  <div className="moodle-swatch-hex">#D9D9D9</div>
                  <div className="moodle-swatch-label">SECONDARY</div>
                </div>
              </div>
            </div>

            <div className="moodle-ideation-subsection">
              <h4 className="moodle-ideation-subheading">Typography</h4>
              <p className="moodle-ideation-text">
                I used San Serif for this web application for its easy to
                understand, approachable design that aligns with the
                application's clean and emerging aesthetic.
              </p>
              <img
                src="/work/moodle/frame-156.png"
                alt="Time Management Typography"
                className="moodle-type-sample-image"
                style={{ aspectRatio: "807 / 575" }}
              />
            </div>
          </div>
        </section>

        {/* Development Section */}
        <section id="solution-section" className="moodle-solution-section">
          <div className="moodle-solution-content">
            <h3 className="moodle-solution-title" ref={solutionTitleRef}>
              DEVELOPMENT
            </h3>

            <div
              className="moodle-solution-visual-identity-content"
              ref={solutionVisualIdentityContentRef}
            >
              <p className="moodle-solution-visual-identity-text">
                I love{" "}
                <span className="moodle-solution-visual-identity-medium-bold">
                  designing applications
                </span>{" "}
                and seeing them come alive. But I'll tell you, development is
                something out of my league—at least that's what I thought
                until I worked on this project. I learned how databases
                work, and how to code while still maintaining the UI, so it
                doesn't compromise the client's vision.
              </p>
              <p className="moodle-solution-visual-identity-text">
                In this process I also learned how to{" "}
                <span className="moodle-solution-visual-identity-medium-bold">
                  vibe code
                </span>
                . Although I don't use AI for idea generation, using it as a
                tool to build a more functional web application was
                something I enjoyed experimenting with.
              </p>
            </div>

            <div className="moodle-solution-subsection">
              <h4 className="moodle-solution-subheading">
                Low Fidelity Prototypes
              </h4>
              <div className="moodle-wireframe-container">
                <iframe
                  src="/work/moodle/wireframe-lofi-prototypes.html"
                  title="Lo-Fi Wireframes – Time Management"
                  className="moodle-wireframe-frame"
                  style={{ height: "1130px" }}
                  scrolling="no"
                />
              </div>
            </div>

            <div className="moodle-solution-subsection">
              <h4 className="moodle-solution-subheading">
                High Fidelity Prototypes
              </h4>
              <div className="moodle-hifi-gallery">
                <img
                  src="/work/moodle/final-login.png"
                  alt="High-fidelity Login screen"
                  className="moodle-hifi-image"
                  style={{ aspectRatio: "1440 / 1024" }}
                />
                <img
                  src="/work/moodle/final-client-registration.png"
                  alt="High-fidelity Register New Client screen"
                  className="moodle-hifi-image"
                  style={{ aspectRatio: "1440 / 1668" }}
                />
                <img
                  src="/work/moodle/final-admin-client-registration.png"
                  alt="High-fidelity Register New Client screen, admin variant"
                  className="moodle-hifi-image"
                  style={{ aspectRatio: "1440 / 1484" }}
                />
                <img
                  src="/work/moodle/final-user-dashboard.png"
                  alt="High-fidelity User Dashboard screen"
                  className="moodle-hifi-image"
                  style={{ aspectRatio: "1440 / 1024" }}
                />
                <img
                  src="/work/moodle/final-admin-dashboard.png"
                  alt="High-fidelity Admin Dashboard screen"
                  className="moodle-hifi-image"
                  style={{ aspectRatio: "1440 / 1024" }}
                />
              </div>
              <p className="moodle-hifi-caption">
                These high-fidelity screens show the final, coded product: a
                branded login gate, two variations of the Register New Client
                form that capture company details, billing, and portal
                access, and role-specific dashboards for Users and Admins.
                The User Dashboard surfaces day-to-day tools like client and
                project registration, while the Admin Dashboard streamlines
                navigation down to Clients, Time Tracking, and Settings for
                higher-level oversight. Together they reflect the clean,
                minimal visual language defined earlier in the style guide,
                carried through from wireframe to working interface.
              </p>
            </div>

            <div id="moodle-solutions">
            <div className="moodle-solution-item">
              <h4
                className="moodle-solution-item-title"
                ref={solutionItem1TitleRef}
              >
                Solution #1: Centralized Organization & User Management
              </h4>
              <CaseStudyStatement ref={solutionItem1ContentRef}>
                <CaseStudyStatementHeadline>
                  Organization details and the full team roster live in{" "}
                  <span className="moodle-accent-text">one admin view</span>.
                </CaseStudyStatementHeadline>
              </CaseStudyStatement>
              <div className="moodle-solution-media">
                <div
                  className="moodle-solution-video-container"
                  ref={solutionItem1VideoRef}
                >
                  <video
                    src="/work/moodle/organization-user-management.mp4"
                    className="moodle-solution-video"
                    style={{ aspectRatio: "1920 / 1080" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p
                  className="moodle-solution-caption"
                  ref={solutionItem1CaptionRef}
                >
                  Admins can edit organization details and manage the entire
                  user roster from one screen, with the table{" "}
                  <span className="moodle-solution-caption-semi-bold">
                    updating live
                  </span>{" "}
                  as records change. This pulled what used to be scattered
                  admin tasks into the single application the client asked
                  for, saving time on everyday account management.
                </p>
              </div>
            </div>

            <div className="moodle-solution-item">
              <h4
                className="moodle-solution-item-title"
                ref={solutionItem2TitleRef}
              >
                Solution #2: Employee Skill Tracking
              </h4>
              <CaseStudyStatement ref={solutionItem2ContentRef}>
                <CaseStudyStatementHeadline>
                  Every employee profile tracks{" "}
                  <span className="moodle-accent-text">
                    real skills and proficiency
                  </span>
                  .
                </CaseStudyStatementHeadline>
              </CaseStudyStatement>
              <div className="moodle-solution-media">
                <div
                  className="moodle-solution-video-container"
                  ref={solutionItem2VideoRef}
                >
                  <video
                    src="/work/moodle/employee-skill-tracking.mp4"
                    className="moodle-solution-video"
                    style={{ aspectRatio: "1892 / 864" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p
                  className="moodle-solution-caption"
                  ref={solutionItem2CaptionRef}
                >
                  Every user profile includes a Skills section where admins
                  can add a skill and set a proficiency level, alongside
                  address and employment details in the same form. This was
                  one of the more interesting ideas to come out of
                  ideation:{" "}
                  <span className="moodle-solution-caption-semi-bold">
                    giving employees a clear view of where they stood
                  </span>{" "}
                  so they could focus on what they were actually lacking.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section id="moodle-takeaways" className="moodle-takeaways-section">
          <div className="moodle-takeaways-content">
            <h3 className="moodle-takeaways-title" ref={takeawaysTitleRef}>
              PROJECT TAKEAWAYS
            </h3>
            <div
              className="moodle-takeaways-item"
              ref={(el) => (takeawaysItemsRefs.current[0] = el)}
            >
              <p className="moodle-takeaways-description">
                Working in this application has really pushed my limits on
                how to execute a Web Application from the most early stages
                of designing to execution.
              </p>
            </div>
          </div>
        </section>

        {/* See Next Section */}
        <section id="moodle-see-next" className="moodle-see-next-section">
          <div className="moodle-see-next-content">
            <h3 className="moodle-see-next-title" ref={seeNextTitleRef}>
              SEE NEXT
            </h3>
            <div
              className="moodle-see-next-grid"
              ref={seeNextGridRef}
              data-case-study-nav-boundary
            >
              <Link
                to="/venmo"
                className="moodle-see-next-card-link"
                onMouseEnter={() => setIsHoveringSeeNextCard(true)}
                onMouseLeave={() => setIsHoveringSeeNextCard(false)}
              >
                <div
                  className="moodle-see-next-card"
                  ref={(el) => (seeNextCardsRefs.current[0] = el)}
                >
                  <div className="moodle-see-next-image-container">
                    <video
                      src="/work/venmo/thumbnail.mp4"
                      className="moodle-see-next-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <h4 className="moodle-see-next-card-title">
                    Redesigning Venmo's Privacy Controls
                  </h4>
                  <p className="moodle-see-next-card-description">
                    Transforming Venmo's public-by-default privacy model to help
                    users make informed choices without confusion.
                  </p>
                </div>
              </Link>
              <Link
                to="/quizai"
                className="moodle-see-next-card-link"
                onMouseEnter={() => setIsHoveringSeeNextCard(true)}
                onMouseLeave={() => setIsHoveringSeeNextCard(false)}
              >
                <div
                  className="moodle-see-next-card"
                  ref={(el) => (seeNextCardsRefs.current[1] = el)}
                >
                  <div className="moodle-see-next-image-container">
                    <video
                      src="/work/quizai/thumbnail.mp4"
                      className="moodle-see-next-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <h4 className="moodle-see-next-card-title">
                    Rebuilding QuizAI's Approval Flow
                  </h4>
                  <p className="moodle-see-next-card-description">
                    Redesigning approval workflows with smarter logic and
                    clearer audit trails for improved enterprise usability.
                  </p>
                </div>
              </Link>
              <Link
                to="/dandi"
                className="moodle-see-next-card-link"
                onMouseEnter={() => setIsHoveringSeeNextCard(true)}
                onMouseLeave={() => setIsHoveringSeeNextCard(false)}
              >
                <div
                  className="moodle-see-next-card"
                  ref={(el) => (seeNextCardsRefs.current[2] = el)}
                >
                  <div className="moodle-see-next-image-container">
                    <video
                      src="/work/dandi/thumbnail.mp4"
                      className="moodle-see-next-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="Dandi: A Bio-Smart Wearable for PCOS — preview"
                    />
                  </div>
                  <h4 className="moodle-see-next-card-title">
                    Dandi: A Bio-Smart Wearable for PCOS
                  </h4>
                  <p className="moodle-see-next-card-description">
                    Making hormonal health accessible for women through
                    emotionally-resonant design and real-time biosensing.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </CaseStudyLayout>
      <Footer />
    </div>
  );
};

export default MoodleCaseStudy;
