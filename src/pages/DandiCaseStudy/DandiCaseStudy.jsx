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
  CaseStudyStatementHeadline,
} from "../../components/CaseStudyStatement/CaseStudyStatement";
import "./DandiCaseStudy.css";

gsap.registerPlugin(ScrollTrigger);

const DANDI_FLOWER_IMAGES = [1, 2, 3, 4, 5, 6].map(
  (n) => `/work/dandi/flower${n}.png`,
);

const DANDI_FEATURES = [
  {
    video: "/work/dandi/sol1.mp4",
    title: "Mobile View 1: Login/Explore",
    headlineLead: "One login, ",
    headlineHighlight: "every trail open.",
    caption:
      "A clean, simple login and explore screen gets users from sign-in to discovering nearby trails in seconds — no clutter, no friction.",
  },
  {
    video: "/work/dandi/sol2.mp4",
    title: "Mobile View 2: Trails",
    headlineLead: "Find a trail, ",
    headlineHighlight: "see what it's really like.",
    caption:
      "Real photos, ratings, and trail info pulled together so hikers know exactly what to expect before they ever leave the house.",
  },
  {
    video: "/work/dandi/sol3.mp4",
    title: "Mobile View 3: Communities",
    headlineLead: "Find your people, ",
    headlineHighlight: "not just your path.",
    caption:
      "Campus clubs like the ASU Outdoors Club get a home inside the app — members, trip plans, and shared experiences all in one place.",
  },
  {
    video: "/work/dandi/sol4.mp4",
    title: "Mobile View 4: Shop",
    headlineLead: "The right gear, ",
    headlineHighlight: "without buying it outright.",
    caption:
      "A built-in shop lets users rent or buy hiking and camping gear directly through the community they're already part of, keeping costs down for students.",
  },
];

const DandiCaseStudy = () => {
  useScrollReset();
  const [isHoveringSeeNextCard, setIsHoveringSeeNextCard] = useState(false);
  const { scrollToElement } = useLenisScroll();

  const contextWhatIsRef = useRef(null);
  const contextMyRoleRef = useRef(null);
  const whereWeBeganTitleRef = useRef(null);
  const whereWeBeganText1Ref = useRef(null);
  const whereWeBeganVideoRef = useRef(null);
  const whereWeBeganText2Ref = useRef(null);
  const whereWeBeganText3Ref = useRef(null);
  const whatWeFoundTitleRef = useRef(null);
  const whatWeFoundStatRef = useRef(null);
  const whatWeFoundStatsRef = useRef(null);
  const whatWeFoundBodyRef = useRef(null);
  const solutionTitleRef = useRef(null);
  const visualIdentityRef = useRef(null);
  const physicalComponentRef = useRef(null);
  const featureItemRefs = useRef([]);
  const takeawaysTitleRef = useRef(null);
  const takeawaysItemRef = useRef(null);
  const seeNextTitleRef = useRef(null);
  const seeNextGridRef = useRef(null);
  const seeNextCardsRefs = useRef([]);

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

  useEffect(() => {
    const scrollTriggers = [];

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
            delay,
          });
        },
      });
      scrollTriggers.push(trigger);
    };

    createScrollAnimation(contextWhatIsRef, 0.08);
    createScrollAnimation(contextMyRoleRef, 0.12);
    createScrollAnimation(whereWeBeganTitleRef, 0.06);
    createScrollAnimation(whereWeBeganText1Ref, 0.1);
    createScrollAnimation(whereWeBeganVideoRef, 0.14);
    createScrollAnimation(whereWeBeganText2Ref, 0.18);
    createScrollAnimation(whereWeBeganText3Ref, 0.22);
    createScrollAnimation(whatWeFoundTitleRef, 0.06);
    createScrollAnimation(whatWeFoundStatRef, 0.1);
    createScrollAnimation(whatWeFoundStatsRef, 0.14);
    createScrollAnimation(whatWeFoundBodyRef, 0.18);
    createScrollAnimation(solutionTitleRef, 0.06);
    createScrollAnimation(visualIdentityRef, 0.1);
    createScrollAnimation(physicalComponentRef, 0.14);
    createScrollAnimation(takeawaysTitleRef, 0.06);
    createScrollAnimation(takeawaysItemRef, 0.1);
    createScrollAnimation(seeNextTitleRef, 0.06);

    featureItemRefs.current.forEach((node, index) => {
      if (!node) return;
      gsap.set(node, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: node,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(node, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.06 + index * 0.04,
          });
        },
      });
      scrollTriggers.push(trigger);
    });

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="dandi-case-study">
      <CursorPill isHovering={isHoveringSeeNextCard} text="View case study" />
      <CaseStudyLayout projectId="dandi">
      <section className="dandi-hero-section">
        <div className="dandi-hero-image-container dandi-hero-before">
          <img
            src="/work/dandi/hero-before.png"
            alt="Hiku — a mobile application for hiking enthusiasts"
            className="dandi-hero-image"
          />
        </div>

        <div className="dandi-hero-content">
          <div className="dandi-hero-left">
            <div className="dandi-hero-title-group">
              <h1 className="dandi-hero-title">
                Hiku: A Mobile Application for Hiking Enthusiasts
              </h1>
            </div>
            <div className="dandi-hero-details">
              <div className="dandi-hero-detail-item">
                <div className="dandi-hero-detail-label">ROLE</div>
                <div className="dandi-hero-detail-value">
                  UX Researcher, UX Designer
                </div>
              </div>
              <div className="dandi-hero-detail-item">
                <div className="dandi-hero-detail-label">DURATION</div>
                <div className="dandi-hero-detail-value">Nov – Mar 2024</div>
              </div>
              <div className="dandi-hero-detail-item">
                <div className="dandi-hero-detail-label">TOOLS</div>
                <div className="dandi-hero-detail-value">Figma</div>
              </div>
            </div>
          </div>

          <div className="dandi-hero-right">
            <p className="dandi-hero-subtitle">
              Connecting hiking and camping enthusiasts through community,
              shared experiences, and a convenient way to buy or rent the
              gear they need for their next adventure.
            </p>
            <div className="dandi-hero-tags">
              <span className="dandi-hero-tag">Mobile</span>
              <span className="dandi-hero-tag">Human Interface Design</span>
              <span className="dandi-hero-tag">UX Research</span>
            </div>
            <button
              type="button"
              className="dandi-skip-to-solution-btn"
              onClick={handleSkipToSolution}
            >
              <div className="dandi-skip-icon-container">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dandi-skip-arrow"
                  aria-hidden
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
              <span className="dandi-skip-text">SKIP TO FEATURES</span>
            </button>
          </div>
        </div>

        <div className="dandi-hero-image-container dandi-hero-after">
          <img
            src="/work/dandi/hero-after.png"
            alt="Hiku — a mobile application for hiking enthusiasts"
            className="dandi-hero-image"
          />
        </div>
      </section>

      <section
        id="dandi-context"
        className="dandi-context-section"
        aria-labelledby="dandi-context-heading"
      >
        <div className="dandi-context-content">
          <div className="dandi-context-top">
            <div className="dandi-context-item" ref={contextWhatIsRef}>
              <h3 id="dandi-context-heading" className="dandi-context-title">
                What is Hiku?
              </h3>
              <p className="dandi-context-description">
                Hiku is a mobile application that connects hiking and camping
                enthusiasts, making it easy to build communities and share
                outdoor experiences. It provides a convenient platform to buy
                or rent hiking and camping gear, ensuring users are
                well-prepared for their next adventure.
              </p>
            </div>
            <div className="dandi-context-item" ref={contextMyRoleRef}>
              <h3 className="dandi-context-title">My Role</h3>
              <p className="dandi-context-description">
                As UX Researcher and Designer, I led user interviews and a
                quantitative survey to understand hikers&apos; needs, then
                translated those findings into wireframes and high-fidelity
                screens — focusing on simple, intuitive navigation from the
                very first screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="dandi-where-we-began"
        className="dandi-where-we-began-section"
        aria-labelledby="dandi-where-we-began-heading"
      >
        <div className="dandi-where-we-began-content">
          <h2
            id="dandi-where-we-began-heading"
            className="dandi-impact-title dandi-where-we-began-heading"
            ref={whereWeBeganTitleRef}
          >
            User Research
          </h2>
          <p
            className="dandi-where-we-began-body dandi-where-we-began-body--above-video"
            ref={whereWeBeganText1Ref}
          >
            The research process involved conducting audio interviews with 20
            to 55 year olds, focusing on understanding their experience and
            challenges related to hiking and camping. By asking thoughtful
            questions, I was able to{" "}
            <span className="dandi-accent-text">
              empathize with their needs and gain valuable insights.
            </span>
          </p>
          <div
            className="dandi-where-we-began-video-wrap"
            ref={whereWeBeganVideoRef}
          >
            <video
              className="dandi-where-we-began-video"
              src="/work/dandi/jitter.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Ambient motion for the research section"
            />
          </div>
          <p
            className="dandi-where-we-began-body dandi-where-we-began-body--below-video"
            ref={whereWeBeganText2Ref}
          >
            The process also included a quantitative assessment, where
            students were asked whether they&apos;d use the app&apos;s
            planned features and products —{" "}
            <span className="dandi-accent-text">
              giving further clarity on their preferences and needs.
            </span>
          </p>
          <p
            className="dandi-where-we-began-body dandi-where-we-began-body--closing"
            ref={whereWeBeganText3Ref}
          >
            Combined with the interviews, this ensured a well-rounded
            understanding of what the target audience actually wanted.
          </p>
        </div>
      </section>

      <section
        id="dandi-what-we-found"
        className="dandi-what-we-found-section"
        aria-labelledby="dandi-what-we-found-heading"
      >
        <div className="dandi-what-we-found-content">
          <h2
            id="dandi-what-we-found-heading"
            className="dandi-impact-title"
            ref={whatWeFoundTitleRef}
          >
            Who&apos;s Our Audience?
          </h2>
          <CaseStudyStatement
            ref={whatWeFoundStatRef}
            className="dandi-what-we-found-statement"
          >
            <CaseStudyStatementHeadline>
              Hiku&apos;s core audience spans{" "}
              <span className="dandi-accent-text">18 to 55</span> year
              olds — young adults and lifelong hiking enthusiasts alike.
            </CaseStudyStatementHeadline>
          </CaseStudyStatement>
          <div className="dandi-what-we-found-stats" ref={whatWeFoundStatsRef}>
            <figure className="dandi-what-we-found-stat dandi-what-we-found-stat--image-left">
              <div className="dandi-what-we-found-stat-media">
                <img
                  src="/work/dandi/stat-1.png"
                  alt="Illustration for student usage interest in Hiku"
                  className="dandi-what-we-found-stat-image"
                  loading="lazy"
                />
              </div>
              <figcaption className="dandi-what-we-found-stat-copy">
                <p className="dandi-what-we-found-stat-lead">In fact,</p>
                <p className="dandi-stat-metric-line">
                  <span className="dandi-stat-metric">40%</span>
                </p>
                <p className="dandi-what-we-found-stat-body">
                  of students surveyed said they&apos;d actively use the
                  app&apos;s core features,
                </p>
              </figcaption>
            </figure>
            <figure className="dandi-what-we-found-stat dandi-what-we-found-stat--text-left">
              <div className="dandi-what-we-found-stat-media">
                <img
                  src="/work/dandi/stat-11.png"
                  alt="Illustration for reduced trip-planning time with Hiku"
                  className="dandi-what-we-found-stat-image"
                  loading="lazy"
                />
              </div>
              <figcaption className="dandi-what-we-found-stat-copy">
                <p className="dandi-what-we-found-stat-lead">and</p>
                <p className="dandi-stat-metric-line">
                  <span className="dandi-stat-metric">20%</span>
                </p>
                <p className="dandi-what-we-found-stat-body">
                  said it would meaningfully cut down their trip-planning
                  time.
                </p>
              </figcaption>
            </figure>
          </div>
          <p
            className="dandi-context-description dandi-what-we-found-lede"
            ref={whatWeFoundBodyRef}
          >
            Many are students living in dorms, looking for activities and
            clubs that are active on campus — plus community members who
            already love hiking and want{" "}
            <span className="dandi-accent-text">
              like-minded people to share it with.
            </span>
          </p>
        </div>
      </section>

      <section
        id="solution-section"
        className="dandi-solution-section"
        aria-labelledby="dandi-solution-heading"
      >
        <div className="dandi-solution-content">
          <h3
            id="dandi-solution-heading"
            className="dandi-solution-title"
            ref={solutionTitleRef}
          >
            FEATURES
          </h3>

          <div
            className="dandi-visual-identity-overview"
            ref={visualIdentityRef}
          >
            <h4 className="dandi-visual-identity-subtitle">Visual Identity</h4>
            <p className="dandi-visual-identity-description">
              This project followed a clean and natural visual style, using
              earthy greens and soft neutrals to fit outdoor exploration. We
              followed the 60-30-10 rule to balance visual hierarchy and
              emphasize call-to-action buttons, creating a seamless and
              engaging user journey. I used Average Sans throughout for its
              easy to understand, approachable feel.
            </p>
            <div className="dandi-visual-identity-flowers">
              {DANDI_FLOWER_IMAGES.map((src, index) => (
                <div
                  key={src}
                  className="dandi-visual-identity-flower-wrap"
                  tabIndex={0}
                >
                  <img
                    src={src}
                    alt={`Hand-drawn floral motif ${index + 1} of 6`}
                    className="dandi-visual-identity-flower"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="dandi-physical-component" ref={physicalComponentRef}>
            <h4 className="dandi-visual-identity-subtitle">
              Wire Frames (High Fidelity)
            </h4>
            <p className="dandi-visual-identity-description">
              Before any visual polish, I mapped out the core flows — trail
              discovery, gear rental, and community check-ins — as
              high-fidelity wireframes to validate navigation and make sure
              every screen earned its place.
            </p>
            <div className="dandi-physical-component-image-container">
              <img
                src="/work/dandi/ear-cuff.png"
                alt="Hiku high-fidelity wireframes"
                className="dandi-physical-component-image"
                loading="lazy"
              />
            </div>
          </div>

          <p className="dandi-visual-identity-description dandi-features-intro">
            I love designing experiences that bring people closer to nature.
            This app blends community, commerce, and the outdoors into one
            experience — and that&apos;s exactly what changed with Hiku. I
            learned how to structure an app not just around aesthetics, but
            around function and emotion: how to map trails, connect people,
            and help them prepare for a trip into the wild.
          </p>

          {DANDI_FEATURES.map((feature, index) => (
            <div
              key={feature.video}
              className="dandi-feature-item"
              ref={(el) => {
                featureItemRefs.current[index] = el;
              }}
            >
              <h4 className="dandi-feature-item-title">{feature.title}</h4>
              <CaseStudyStatement>
                <CaseStudyStatementHeadline>
                  {feature.headlineLead}
                  <span className="dandi-accent-text">
                    {feature.headlineHighlight}
                  </span>
                </CaseStudyStatementHeadline>
              </CaseStudyStatement>
              <div className="dandi-feature-media">
                <div className="dandi-feature-video-container">
                  <video
                    className="dandi-feature-video"
                    src={feature.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <p className="dandi-feature-caption">{feature.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Takeaway Section */}
      <section id="dandi-takeaways" className="dandi-takeaways-section">
        <div className="dandi-takeaways-content">
          <h3 className="dandi-solution-title" ref={takeawaysTitleRef}>
            PROJECT TAKEAWAYS
          </h3>
          <div className="dandi-takeaways-item" ref={takeawaysItemRef}>
            <h4 className="dandi-takeaways-title-text">
              From a simple idea to something people could use in the wild.
            </h4>
            <p className="dandi-takeaways-description">
              Working on this application has really pushed my limits on how
              to execute a mobile application from the most early stages of
              designing to execution.
            </p>
          </div>
        </div>
      </section>

      <section id="dandi-see-next" className="dandi-see-next-section">
        <div className="dandi-see-next-content">
          <h3 className="dandi-see-next-title" ref={seeNextTitleRef}>
            SEE NEXT
          </h3>
          <div
            className="dandi-see-next-grid"
            ref={seeNextGridRef}
            data-case-study-nav-boundary
          >
            <Link
              to="/quizai"
              className="dandi-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="dandi-see-next-card"
                ref={(el) => {
                  seeNextCardsRefs.current[0] = el;
                }}
              >
                <div className="dandi-see-next-image-container">
                  <video
                    src="/work/quizai/thumbnail.mp4"
                    className="dandi-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h4 className="dandi-see-next-card-title">
                  Rebuilding QuizAI&apos;s Approval Flow
                </h4>
                <p className="dandi-see-next-card-description">
                  Redesigning approval workflows with smarter logic and clearer
                  audit trails for improved enterprise usability.
                </p>
              </div>
            </Link>
            <Link
              to="/moodle"
              className="dandi-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="dandi-see-next-card"
                ref={(el) => {
                  seeNextCardsRefs.current[1] = el;
                }}
              >
                <div className="dandi-see-next-image-container">
                  <video
                    src="/work/moodle/thumbnail.mp4"
                    className="dandi-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h4 className="dandi-see-next-card-title">
                  Time Management: A Productivity Tracking Web App
                </h4>
                <p className="dandi-see-next-card-description">
                  Helping a company track employee productivity through an
                  intuitive, easy-to-navigate time management dashboard.
                </p>
              </div>
            </Link>
            <Link
              to="/venmo"
              className="dandi-see-next-card-link"
              onMouseEnter={() => setIsHoveringSeeNextCard(true)}
              onMouseLeave={() => setIsHoveringSeeNextCard(false)}
            >
              <div
                className="dandi-see-next-card"
                ref={(el) => {
                  seeNextCardsRefs.current[2] = el;
                }}
              >
                <div className="dandi-see-next-image-container">
                  <video
                    src="/work/venmo/thumbnail.mp4"
                    className="dandi-see-next-image"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <h4 className="dandi-see-next-card-title">
                  Redesigning Venmo&apos;s Privacy Controls
                </h4>
                <p className="dandi-see-next-card-description">
                  Transforming Venmo&apos;s public-by-default privacy model to
                  help users make informed choices without confusion.
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

export default DandiCaseStudy;
