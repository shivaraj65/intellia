import React, { useState } from "react";
import RotatingText from "@/components/common/rotating-text/rotatingText";
import ScrollVelocity from "@/components/common/scroll-velocity/scrollvelocity";
import Image from "next/image";
import TiltedCard from "@/components/common/tilted-card/tiltedCard";
import { svgConf } from "@/assets/svgConf";
import GooeyNav from "@/components/common/gooey-nav/gooeyNav";

const widgetsData = [
  {
    name: "Highlights",
    shortDecription:
      "Spotlight messages that matter — personal, public, and on-chain.",
    description: (
      <span>
        What if your profile could truly reflect how others feel about you?
        <div style={{ marginBottom: "1rem" }} />
        Not just stats or self-written bios — but real emotions, real words.
        <div style={{ marginBottom: "1rem" }} />
        <b>Highlights</b> is a lightweight yet powerful widget built on the{" "}
        <b>LUKSO blockchain</b>, designed to add a layer of{" "}
        <b>human credibility and social warmth</b> to your Universal Profile. It
        lets others publicly share messages about you — a shoutout, a thank-you,
        a reflection, or a quiet moment of appreciation —{" "}
        <b>all immutably stored on-chain</b>.
        <div style={{ marginBottom: "1rem" }} />
        It’s not about followers. It’s about being <b>seen, remembered</b> and
        <b> celebrated</b> by your community.
        <div style={{ marginBottom: "1rem" }} />
        Instead of static claims, your profile becomes a{" "}
        <b>living mosaic of reputation</b>, shaped by those you’ve impacted.
        Whether you're a <b>builder, collector, curator, or creator</b>,
        Highlights brings <b>emotional depth, trust, and visibility</b> to how
        you're experienced in the LUKSO ecosystem.
        <div style={{ marginBottom: "1rem" }} />
        Each profile displays the latest 10 highlights, making space intentional
        and meaningful — every message a signal of connection.
        <div style={{ marginBottom: "1rem" }} />
        So go ahead — share the feeling you never got to say.
        <div style={{ marginBottom: "0.5rem" }} />
        Or give someone their moment to be recognized.
      </span>
    ),
    icon: svgConf.highlights[0],
  },
  {
    name: "Polls",
    shortDecription:
      "Ask meaningful questions. Gather on-chain answers. Understand your people.",
    description: (
      <span>
        What if feedback felt more meaningful?
        <div style={{ marginBottom: "1rem" }} />
        What if asking a question could spark real, transparent dialogue — not
        just surface-level engagement?
        <div style={{ marginBottom: "1rem" }} />
        Polls is a decentralized widget built on the <b>LUKSO blockchain</b> ,
        empowering Universal Profile users to ask questions and gather insights
        directly from their community. Whether you're a
        <b> creator shaping your next move</b> , a <b>brand testing an idea</b>,
        or a <b>builder validating a feature</b>
        , Polls helps you tap into collective thinking — openly, trustlessly,
        and on-chain.
        <div style={{ marginBottom: "1rem" }} />
        Every response is securely stored on the blockchain, making your
        feedback <b>verifiable, transparent, and censorship-resistant</b>.
        <div style={{ marginBottom: "1rem" }} />
        This isn’t just another voting tool — it’s a way to turn engagement into
        a two-way conversation. To co-create. To involve others in the journey.
        <div style={{ marginBottom: "1rem" }} />
        With Polls, your Universal Profile becomes a space for collaboration —
        where curiosity leads, and your community has a voice in what comes
        next.
        <div style={{ marginBottom: "1rem" }} />
        Ask better questions.
        <div style={{ marginBottom: "0.5rem" }} />
        Get smarter answers.
        <div style={{ marginBottom: "0.5rem" }} />
        Build together.
      </span>
    ),

    icon: svgConf.polls[2],
  },
  {
    name: "Reviews",
    shortDecription:
      "Collect authentic feedback — transparent, trusted, and on-chain.",
    description: (
      <span>
        What if your reputation could speak for itself?
        <div style={{ marginBottom: "1rem" }} />
        Not just through followers or metrics — but through{" "}
        <b>real, lasting feedback</b> from the people you've impacted.
        <div style={{ marginBottom: "1rem" }} />
        <b>Reviews</b> is a decentralized widget for your Universal Profile,
        designed to collect authentic, public feedback — all immutably stored on
        the LUKSO blockchain. Whether you're a creator, builder, performer, or
        seller, you can craft custom review forms to gather reflections on
        anything you’ve put into the world: a product, a performance, a project,
        or an experience.
        <div style={{ marginBottom: "1rem" }} />
        Every review is <b>tamper-proof, publicly visible</b>, and{" "}
        <b>forever tied to your identity</b>, turning fleeting impressions into
        powerful social proof.
        <div style={{ marginBottom: "1rem" }} />
        This isn’t just about ratings. It’s about building{" "}
        <b>trust, credibility</b>, and a digital presence shaped by the people
        who know your work best.
        <div style={{ marginBottom: "1rem" }} />
        With Reviews, your Universal Profile becomes a trusted source of
        reputation — <b>earned, shared, and backed by the chain.</b>
      </span>
    ),

    icon: svgConf.reviews[3],
  },
];

const NavItems = [
  { label: "Highlights", href: "#" },
  { label: "Polls", href: "#" },
  { label: "Reviews", href: "#" },
];

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [copied, setCopied] = useState(false);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="landing-page">
      <div className="title-container">
        <div className="content-div">
          <h1 className="title">Intellia widgets</h1>
          <span className="description font2">
            <span className=" font2">Where</span>
            <RotatingText
              texts={[
                "Opinion Meets Intelligence",
                "Feedback Meets Insight",
                "Thought Meets Transparency",
                "Questions Meet Clarity",
                "Votes Meet Vision",
              ]}
              mainClassName="rotating-text-mainclass"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={6000}
            />
          </span>
          <div className="support">
            <div className="support-inner">
              <span>Built on </span>
              <Image
                src={"/images/lukso-full-logo.svg"}
                width={40}
                height={40}
                alt={"lukso logo"}
                className={"lukso-logo"}
              />
              <span> Available on</span>
              <Image
                src={"/images/logo-ue.svg"}
                width={40}
                height={40}
                alt={"UE logo"}
                className={"ue-logo"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="banner-container font2">
        <ScrollVelocity
          texts={[
            "Mini Apps - Big Opinions -",
            "Fully Decentralized - Built for LUKSO -",
          ]}
          velocity={100}
          className="custom-scroll-text font2"
        />
      </div>
      <div className="widget-section">
        <h1 className="widgets-title title">Explore Intellia Widgets</h1>
        <p className="font2 widgets-description">
          Modular, decentralized components for polls, reviews, and highlights.
          Plug them into any Universal Profile.
        </p>
        <div className="widgets-container">
          {widgetsData.map((data: any, index: number) => {
            return (
              <TiltedCard
                key={data.icon.name + index}
                imageSrc={data.icon.src.src}
                altText={data.icon.name}
                captionText=""
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="230px"
                imageWidth="230px"
                rotateAmplitude={25}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">{data.name}</p>
                }
              />
            );
          })}
        </div>

        <div className="more-info-container">
          <GooeyNav
            items={NavItems}
            animationTime={300}
            particleCount={25}
            particleDistances={[50, 5]}
            particleR={300}
            timeVariance={300}
            colors={[23]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          {activeIndex >= 0 && activeIndex < 3 ? (
            <React.Fragment>
              <div className="more-description font2">
                <span>{widgetsData[activeIndex].description}</span>
              </div>
              <div className="copy-link-container">
                <div>
                  {widgetsData[activeIndex].name === "Highlights" ? (
                    <div className="copylink">
                      <input
                        type="text"
                        value={"https://intellia-widgets.vercel.app/highlights"}
                        readOnly
                        className="link-input font2"
                      />
                      <button
                        onClick={() => {
                          handleCopy(
                            "https://intellia-widgets.vercel.app/highlights"
                          );
                        }}
                        className="copy-button"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ) : widgetsData[activeIndex].name === "Polls" ? (
                    <div className="copylink">
                      <input
                        type="text"
                        value={"https://intellia-widgets.vercel.app/polls"}
                        readOnly
                        className="link-input font2"
                      />
                      <button
                        onClick={() => {
                          handleCopy(
                            "https://intellia-widgets.vercel.app/polls"
                          );
                        }}
                        className="copy-button"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ) : widgetsData[activeIndex].name === "Reviews" ? (
                    <div className="copylink">
                      <input
                        type="text"
                        value={"https://intellia-widgets.vercel.app/reviews"}
                        readOnly
                        className="link-input font2"
                      />
                      <button
                        onClick={() => {
                          handleCopy(
                            "https://intellia-widgets.vercel.app/reviews"
                          );
                        }}
                        className="copy-button"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <h1 className="integration-title title">
                  Integrate with Your Universal Profile
                </h1>

                <div className="how-to-use font1">
                  <ol className="steps">
                    <li className="step">
                      Visit{" "}
                      <a
                        href="https://universaleverything.io/"
                        target="_blank"
                        className="link"
                      >
                        universaleverything.io
                      </a>{" "}
                      and log in with your UP wallet.
                    </li>
                    <li className="step">Click "Add a new content".</li>
                    <li className="step">Select "Website or Mini-App".</li>
                    <li className="step">Paste the widget URL and Submit</li>
                    <li className="step">
                      Your widget is now live on your Universal Profile!
                    </li>
                  </ol>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <></>
          )}
        </div>
      </div>
      <footer className="footer">
        <p className="footer-company title">Intellia Widgets</p>
        <p className="footer-text">
          Made with 💖 in INDIA by{" "}
          <a
            href="https://github.com/shivaraj65"
            target="_blank"
            className="github-link"
          >
            shivaraj
          </a>
        </p>
      </footer>
    </div>
  );
};

export default React.memo(LandingPage);
