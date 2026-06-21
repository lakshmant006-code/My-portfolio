import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollReset from "../../hooks/useScrollReset";
import { useLenisScroll } from "../../hooks/useLenisScroll";
import { useCardUnfurling } from "../../hooks/useCardUnfurling";
import Footer from "../../components/Footer/Footer";
import CursorPill from "../../components/CursorPill/CursorPill";
import CaseStudyLayout from "../../components/CaseStudyLayout/CaseStudyLayout";
import {
  CaseStudyStatement,
  CaseStudyStatementBody,
  CaseStudyStatementHeadline,
} from "../../components/CaseStudyStatement/CaseStudyStatement";
import "./QuizAICaseStudy.css";

gsap.registerPlugin(ScrollTrigger);

const QuizAICaseStudy = () => {
  useScrollReset();
  const [isHoveringSeeNextCard, setIsHoveringSeeNextCard] = useState(false);
  const { scrollToElement } = useLenisScroll();

  // Refs for scroll animations
  const contextWhatIsQuizAIRef = useRef(null);
  const contextMyRoleRef = useRef(null);
  const researchTitleRef = useRef(null);
  const researchOverviewSubtitleRef = useRef(null);
  const researchOverviewImageRef = useRef(null);
  const researchFindingImageRef = useRef(null);
  const designApproachTitleRef = useRef(null);
  const designApproach1TitleRef = useRef(null);
  const designApproach1ContentRef = useRef(null);
  const designApproach1ImageRef = useRef(null);
  const designApproach2TitleRef = useRef(null);
  const designApproach2ContentRef = useRef(null);
  const designApproach2Image1Ref = useRef(null);
  const designApproach3TitleRef = useRef(null);
  const designApproach3ContentRef = useRef(null);
  const designApproach3ImageRef = useRef(null);
  const solution1TitleRef = useRef(null);
  const solution1ContentRef = useRef(null);
  const solution1VideoRef = useRef(null);
  const solution1CaptionRef = useRef(null);
  const solution2TitleRef = useRef(null);
  const solution2ContentRef = useRef(null);
  const solution2VideoRef = useRef(null);
  const solution2CaptionRef = useRef(null);
  const solution3TitleRef = useRef(null);
  const solution3ContentRef = useRef(null);
  const solution3VideoRef = useRef(null);
  const solution3CaptionRef = useRef(null);
  const solution4TitleRef = useRef(null);
  const solution4ContentRef = useRef(null);
  const solution4VideoRef = useRef(null);
  const solution4CaptionRef = useRef(null);
  const reflectionTitleRef = useRef(null);
  const reflectionContentRef = useRef(null);
  const seeNextTitleRef = useRef(null);
  const seeNextGridRef = useRef(null);
  const seeNextCardsRefs = useRef([]);

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

  const handleSkipToSolution = () => {
    scrollToElement(document.getElementById("solution-section"), {
      duration: 1.2,
    });
  };

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
    createScrollAnimation(contextWhatIsQuizAIRef);
    createScrollAnimation(contextMyRoleRef, 0.1);

    // Research Section
    createScrollAnimation(researchTitleRef);
    createScrollAnimation(researchOverviewSubtitleRef, 0.1);
    createScrollAnimation(researchOverviewImageRef, 0.2);
    createScrollAnimation(researchFindingImageRef);

    // Design Approach Section
    createScrollAnimation(designApproachTitleRef);
    // Design Approach 1
    createScrollAnimation(designApproach1TitleRef);
    createScrollAnimation(designApproach1ContentRef, 0.1);
    createScrollAnimation(designApproach1ImageRef, 0.2);
    // Design Approach 2
    createScrollAnimation(designApproach2TitleRef);
    createScrollAnimation(designApproach2ContentRef, 0.1);
    createScrollAnimation(designApproach2Image1Ref, 0.2);
    // Design Approach 3
    createScrollAnimation(designApproach3TitleRef);
    createScrollAnimation(designApproach3ContentRef, 0.1);
    createScrollAnimation(designApproach3ImageRef, 0.2);

    // Solution Section
    // Solution 1
    createScrollAnimation(solution1TitleRef);
    createScrollAnimation(solution1ContentRef, 0.1);
    createScrollAnimation(solution1VideoRef, 0.2);
    createScrollAnimation(solution1CaptionRef, 0.3);
    // Solution 2
    createScrollAnimation(solution2TitleRef);
    createScrollAnimation(solution2ContentRef, 0.1);
    createScrollAnimation(solution2VideoRef, 0.2);
    createScrollAnimation(solution2CaptionRef, 0.3);
    // Solution 3
    createScrollAnimation(solution3TitleRef);
    createScrollAnimation(solution3ContentRef, 0.1);
    createScrollAnimation(solution3VideoRef, 0.2);
    createScrollAnimation(solution3CaptionRef, 0.3);
    // Solution 4
    createScrollAnimation(solution4TitleRef);
    createScrollAnimation(solution4ContentRef, 0.1);
    createScrollAnimation(solution4VideoRef, 0.2);
    createScrollAnimation(solution4CaptionRef, 0.3);

    // Reflection Section
    createScrollAnimation(reflectionTitleRef);
    createScrollAnimation(reflectionContentRef, 0.1);

    // See Next Section
    createScrollAnimation(seeNextTitleRef);

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="quizai-case-study">
      <CursorPill isHovering={isHoveringSeeNextCard} text="View case study" />
      <CaseStudyLayout projectId="quizai">
      {/* Hero Section */}
      <section className="quizai-hero-section">
        {/* Hero Before Image - Visual welcome */}
        <div className="quizai-hero-image-container quizai-hero-before">
          <img
            src="/work/quizai/hero-before.png"
            alt="Quiz AI Approval Flow Redesign"
            className="quizai-hero-image"
          />
        </div>

        {/* Hero Text Content */}
        <div className="quizai-hero-content">
          {/* Left Column */}
          <div className="quizai-hero-left">
            <h1 className="quizai-hero-title">
              AI Powered Notetaking Application
            </h1>
            <div className="quizai-hero-details">
              <div className="quizai-hero-detail-item">
                <div className="quizai-hero-detail-label">ROLE</div>
                <div className="quizai-hero-detail-value">
                  UX Researcher, UX Designer,<br />
                  Interaction Designer, and Developer
                </div>
              </div>
              <div className="quizai-hero-detail-item">
                <div className="quizai-hero-detail-label">DURATION</div>
                <div className="quizai-hero-detail-value">
                  September — November 2024 (10 weeks)
                </div>
              </div>
              <div className="quizai-hero-detail-item">
                <div className="quizai-hero-detail-label">TOOLS</div>
                <div className="quizai-hero-detail-value">
                  Figma, React, TypeScript, Node.js, Cursor
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="quizai-hero-right">
            <p className="quizai-hero-subtitle">
              To create an intuitive and easy experience for students to
              maintain and improve their productivity.
            </p>
            <div className="quizai-hero-tags">
              <span className="quizai-hero-tag">Human Interface Design</span>
              <span className="quizai-hero-tag">UX Research</span>
              <span className="quizai-hero-tag">Data Application</span>
              <span className="quizai-hero-tag">Web Development</span>
            </div>
            <button
              className="quizai-skip-to-solution-btn"
              onClick={handleSkipToSolution}
            >
              <div className="quizai-skip-icon-container">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="quizai-skip-arrow"
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
              <span className="quizai-skip-text">SKIP TO SOLUTION</span>
            </button>
          </div>
        </div>

        {/* Hero After Image - After all text */}
        <div className="quizai-hero-image-container quizai-hero-after">
          <img
            src="/work/quizai/hero-new.png"
            alt="Quiz AI Approval Flow Redesign"
            className="quizai-hero-image"
          />
        </div>
      </section>

      {/* Context Section */}
      <section id="quizai-context" className="quizai-context-section">
        <div className="quizai-context-content">
          {/* Top Row - Two Columns */}
          <div className="quizai-context-top">
            <div className="quizai-context-item" ref={contextWhatIsQuizAIRef}>
              <h2 className="quizai-context-title">What is Quiz AI?</h2>
              <p className="quizai-context-description">
                This is a web application that allows students to upload their
                notes and generate summaries and quizzes leveraging OpenAI API
                based on the notes that are uploaded.
              </p>
            </div>
            <div className="quizai-context-item" ref={contextMyRoleRef}>
              <h2 className="quizai-context-title">My Role</h2>
              <p className="quizai-context-description">
                I wore multiple hats across this project — conducting user
                research with students, translating findings into interaction
                patterns, and building the full-stack implementation. I owned
                the end-to-end experience from early sketches through shipped
                code, collaborating closely with stakeholders to shape both the
                product vision and its technical execution.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Research Section */}
      <section id="quizai-research" className="quizai-research-section">
        <div className="quizai-research-content">
          <h3 className="quizai-research-title" ref={researchTitleRef}>
            RESEARCH
          </h3>

          <div className="quizai-research-overview">
            <CaseStudyStatement ref={researchOverviewSubtitleRef}>
              <CaseStudyStatementHeadline as="h4">
                What's <span className="quizai-accent-text">really</span> going
                on?
              </CaseStudyStatementHeadline>
              <CaseStudyStatementHeadline as="h4">
                Research &amp; User Discovery
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                The project began with understanding the study habits,
                challenges, and goals of students, teachers, and
                self-learners. Research revealed that users often struggle to
                organize learning materials and convert them into effective
                study resources.
              </CaseStudyStatementBody>
              <CaseStudyStatementHeadline as="h4">
                Key Insights &amp; Problem Definition
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                Users highlighted common pain points such as time-consuming
                quiz creation, information overload, and difficulty tracking
                learning progress. They also expressed a strong need for
                personalized learning experiences and meaningful feedback to
                improve retention.
              </CaseStudyStatementBody>
              <CaseStudyStatementHeadline as="h4">
                Design Impact &amp; Feature Direction
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                These findings directly influenced the development of
                AI-powered quizzes, automated summaries, study groups, and
                progress tracking features. Every design decision was guided
                by the goal of creating a seamless, engaging, and
                personalized learning experience.
              </CaseStudyStatementBody>
            </CaseStudyStatement>
            <div
              className="quizai-research-image-container"
              ref={researchOverviewImageRef}
            >
              <img
                src="/work/quizai/user-journey.png"
                alt="User Journey"
                className="quizai-research-image"
              />
            </div>
          </div>

          {/* Research Finding */}
          <div className="quizai-research-finding">
            <div
              className="quizai-research-image-container"
              ref={researchFindingImageRef}
            >
              <iframe
                src="/work/quizai/design-process/index.html"
                title="Design Process – QuizAI"
                className="quizai-research-image quizai-wireframe-frame"
                style={{ height: "700px" }}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design Approach Section */}
      <section id="quizai-design-approach" className="quizai-design-approach-section">
        <div className="quizai-design-approach-content">
          <h3
            className="quizai-design-approach-title"
            ref={designApproachTitleRef}
          >
            DESIGN APPROACH
          </h3>

          {/* Design Approach #1 */}
          <div className="quizai-design-approach-item">
            <CaseStudyStatement
              ref={designApproach1ContentRef}
              variant="narrow"
              className="quizai-design-approach-statement"
            >
              <CaseStudyStatementHeadline
                as="h4"
                ref={designApproach1TitleRef}
              >
                Redesigning the Approval Flow
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                The redesigned flow introduces{" "}
                <span style={{ fontWeight: 600 }}>clear terminal states</span>{" "}
                for all rejection paths and{" "}
                <span style={{ fontWeight: 600 }}>
                  fallback user assignments
                </span>{" "}
                to prevent workflow breakdowns.
              </CaseStudyStatementBody>
            </CaseStudyStatement>
            <div
              className="quizai-design-approach-image-container"
              ref={designApproach1ImageRef}
            >
              <img
                src="/work/quizai/redesigned-approval-flowchart.png"
                alt="Redesigned Approval Flowchart"
                className="quizai-design-approach-image"
              />
            </div>
          </div>

          {/* Design Approach #2 */}
          <div className="quizai-design-approach-item">
            <CaseStudyStatement
              ref={designApproach2ContentRef}
              className="quizai-design-approach-statement"
            >
              <CaseStudyStatementHeadline
                as="h4"
                ref={designApproach2TitleRef}
              >
                From Research to Design
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                To address the systemic issues, I moved approvals from buried
                modals to{" "}
                <span style={{ fontWeight: 600 }}>
                  its own dedicated section with full navigation and visibility
                </span>
                .
              </CaseStudyStatementBody>
            </CaseStudyStatement>
            <div
              className="quizai-design-approach-image-container"
              ref={designApproach2Image1Ref}
            >
              <iframe
                src="/work/quizai/wireframe-lofi-flows.html"
                title="Lo-Fi Wireframes – QuizAI"
                className="quizai-design-approach-image quizai-wireframe-frame"
                style={{ height: "650px" }}
                scrolling="no"
              />
            </div>
          </div>

          {/* Design Approach #3 */}
          <div className="quizai-design-approach-item">
            <CaseStudyStatement
              ref={designApproach3ContentRef}
              className="quizai-design-approach-statement"
            >
              <CaseStudyStatementHeadline
                as="h4"
                ref={designApproach3TitleRef}
              >
                Validating Through Iteration
              </CaseStudyStatementHeadline>
              <CaseStudyStatementBody>
                Over 3 weeks of weekly validation sessions with users and
                stakeholders, I iterated my designs over 4 critical areas based
                on the feedback I received:
              </CaseStudyStatementBody>
            </CaseStudyStatement>
            <div
              className="quizai-design-approach-image-container"
              ref={designApproach3ImageRef}
            >
              <img
                src="/work/quizai/iteration-grid.png"
                alt="Iteration Grid"
                className="quizai-design-approach-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution-section" className="quizai-solution-section">
        <div className="quizai-solution-content">
          {/* Solution #1 */}
          <div className="quizai-solution-item">
            <h4 className="quizai-solution-item-title" ref={solution1TitleRef}>
              Solution #1: Dedicated Approval Section
            </h4>
            <CaseStudyStatement ref={solution1ContentRef}>
              <CaseStudyStatementHeadline>
                All approval actions live in{" "}
                <span className="quizai-accent-text">one interface</span>.
              </CaseStudyStatementHeadline>
            </CaseStudyStatement>
            <div className="quizai-solution-media">
              <div
                className="quizai-solution-video-container"
                ref={solution1VideoRef}
              >
                <video
                  src="/work/quizai/sol-1.mp4"
                  className="quizai-solution-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <p className="quizai-solution-caption" ref={solution1CaptionRef}>
                The dedicated approval section reduced navigation from{" "}
                <span style={{ fontWeight: 600 }}>5+ clicks to 1</span>, cutting
                discovery time by{" "}
                <span className="quizai-solution-caption-bold">73%</span>.
              </p>
            </div>
          </div>

          {/* Solution #2 */}
          <div className="quizai-solution-item">
            <h4 className="quizai-solution-item-title" ref={solution2TitleRef}>
              Solution #2: Visual Multi-Tier Flow Builder
            </h4>
            <CaseStudyStatement ref={solution2ContentRef}>
              <CaseStudyStatementHeadline>
                The flow builder transforms from single-step logic to{" "}
                <span className="quizai-accent-text">
                  flexible, multi-tier approval chains
                </span>
                .
              </CaseStudyStatementHeadline>
            </CaseStudyStatement>
            <div className="quizai-solution-media">
              <div
                className="quizai-solution-video-container"
                ref={solution2VideoRef}
              >
                <video
                  src="/work/quizai/sol-2.mp4"
                  className="quizai-solution-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <p className="quizai-solution-caption" ref={solution2CaptionRef}>
                The visual flow builder prevents workflow breakdowns by making
                complex approval logic{" "}
                <span style={{ fontWeight: 600 }}>
                  transparent and manageable
                </span>
                .
              </p>
            </div>
          </div>

          {/* Solution #3 */}
          <div className="quizai-solution-item">
            <h4 className="quizai-solution-item-title" ref={solution3TitleRef}>
              Solution #3: Comprehensive Audit Trails
            </h4>
            <CaseStudyStatement ref={solution3ContentRef}>
              <CaseStudyStatementHeadline>
                Every deduction displays{" "}
                <span className="quizai-accent-text">complete history</span>{" "}
                with timestamps, actions, and decision context.
              </CaseStudyStatementHeadline>
            </CaseStudyStatement>
            <div className="quizai-solution-media">
              <div
                className="quizai-solution-video-container"
                ref={solution3VideoRef}
              >
                <video
                  src="/work/quizai/sol-3.mp4"
                  className="quizai-solution-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <p className="quizai-solution-caption" ref={solution3CaptionRef}>
                Comprehensive audit trails eliminated guesswork by giving
                analysts{" "}
                <span style={{ fontWeight: 600 }}>
                  full context at a glance
                </span>
                .
              </p>
            </div>
          </div>

          {/* Solution #4 */}
          <div className="quizai-solution-item">
            <h4 className="quizai-solution-item-title" ref={solution4TitleRef}>
              Solution #4: Stopping Endless Cycles
            </h4>
            <CaseStudyStatement ref={solution4ContentRef}>
              <CaseStudyStatementHeadline>
                Users can{" "}
                <span className="quizai-accent-text">
                  flag misassigned deductions
                </span>{" "}
                and <span className="quizai-accent-text">reroute</span> them.
              </CaseStudyStatementHeadline>
            </CaseStudyStatement>
            <div className="quizai-solution-media">
              <div
                className="quizai-solution-video-container"
                ref={solution4VideoRef}
              >
                <video
                  src="/work/quizai/sol-4.mp4"
                  className="quizai-solution-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <p className="quizai-solution-caption" ref={solution4CaptionRef}>
                <span style={{ fontWeight: 600 }}>
                  Clear misassignment handling
                </span>{" "}
                eliminated the confusion that caused 35% of deductions to cycle
                back for multiple reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reflection Section */}
      <section id="quizai-reflection" className="quizai-reflection-section">
        <div className="quizai-reflection-content">
          <h3 className="quizai-reflection-title" ref={reflectionTitleRef}>
            REFLECTION
          </h3>
          <div className="quizai-reflection-item" ref={reflectionContentRef}>
            <h4 className="quizai-reflection-title-text">
              This was my first design role as Quiz AI's only designer, handling
              both product design and development.
            </h4>
            <p className="quizai-reflection-description">
              Without design mentorship in an unfamiliar domain (CPG brands) and
              learning Ruby on the fly, I had to define my own pace and trust my
              instincts—a stark shift from structured internships. Collaborating
              directly with engineering and customer success also taught me to
              communicate design decisions effectively and gave me genuine input
              on product direction. This environment proved I could bridge
              design and development while delivering a complete 0→1 overhaul.{" "}
              <span style={{ fontWeight: 600 }}>Thank you Quiz AI!</span>
            </p>
          </div>
        </div>
      </section>

      {/* See Next Section */}
      <section id="quizai-see-next" className="quizai-see-next-section">
        <div className="quizai-see-next-content">
          <h3 className="quizai-see-next-title" ref={seeNextTitleRef}>
            SEE NEXT
          </h3>
          <div
            className="quizai-see-next-grid"
            ref={seeNextGridRef}
            data-case-study-nav-boundary
          >
            <Link
              to="/moodle"
              className="quizai-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="quizai-see-next-card"
                ref={(el) => (seeNextCardsRefs.current[0] = el)}
              >
                <div className="quizai-see-next-image-container">
                  <video
                    src="/work/moodle/thumbnail.mp4"
                    className="quizai-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h4 className="quizai-see-next-card-title">
                  Moodle: AI-Powered Feline Pain Detection for Cat Owners
                </h4>
                <p className="quizai-see-next-card-description">
                  Making clinical-grade pain monitoring accessible to cat owners
                  through intuitive mobile design and privacy-first AI.
                </p>
              </div>
            </Link>
            <Link
              to="/venmo"
              className="quizai-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="quizai-see-next-card"
                ref={(el) => (seeNextCardsRefs.current[1] = el)}
              >
                <div className="quizai-see-next-image-container">
                  <video
                    src="/work/venmo/thumbnail.mp4"
                    className="quizai-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h4 className="quizai-see-next-card-title">
                  Redesigning Venmo's Privacy Model
                </h4>
                <p className="quizai-see-next-card-description">
                  Shifting from public-by-default to private-by-default with
                  privacy controls surfaced where users make decisions.
                </p>
              </div>
            </Link>
            <Link
              to="/dandi"
              className="quizai-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="quizai-see-next-card"
                ref={(el) => (seeNextCardsRefs.current[2] = el)}
              >
                <div className="quizai-see-next-image-container">
                  <video
                    src="/work/dandi/thumbnail.mp4"
                    className="quizai-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Dandi: A Bio-Smart Wearable for PCOS — preview"
                  />
                </div>
                <h4 className="quizai-see-next-card-title">
                  Dandi: A Bio-Smart Wearable for PCOS
                </h4>
                <p className="quizai-see-next-card-description">
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

export default QuizAICaseStudy;
