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
        Highlights is a lightweight yet powerful widget built on the LUKSO
        blockchain, designed to bring a layer of human credibility and social
        proof to your Universal Profile. It allows others to leave public
        messages about you — shoutouts, endorsements, gratitude, or reflections
        — which are stored immutably on-chain. These highlights become living
        signals of who you are, how you're perceived, and what you've
        contributed to the ecosystem. <br /> Each Universal Profile can feature
        the latest 10 highlights, making space intentional and meaningful.
        Rather than static bios or self-written claims, Highlights bring
        community-driven reputation to your identity — one message at a time.
        Whether you're a builder, collector, curator, or creator, this widget
        adds a layer of social trust, warmth, and visibility that enhances how
        you're seen in the LUKSO ecosystem.
      </span>
    ),
    icon: svgConf.highlights[12],
  },
  {
    name: "Polls",
    shortDecription:
      "Ask meaningful questions. Gather on-chain answers. Understand your people.",
    description: (
      <span>
        Polls is a decentralized widget that empowers Universal Profile users to
        ask questions and gather feedback — directly from their followers or the
        broader community. Whether you're a creator seeking input, a brand
        testing ideas, or a builder validating features, Polls offers a
        trustless, transparent way to collect opinions and insights.
        <br /> Every response is securely stored on the LUKSO blockchain,
        ensuring authenticity and verifiability. By turning basic engagement
        into constructive, on-chain dialogue, users can make smarter decisions,
        validate ideas, and involve their audience in the creative or
        development process.
        <br /> Polls foster a new layer of interactive expression and
        collaborative feedback, giving more meaning to your Universal Profile
        and your relationship with your community.
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
        Reviews is a decentralized widget that lets users collect public
        feedback directly through their Universal Profile. Whether you're a
        creator, performer, builder, or seller — you can create custom review
        forms to gather responses on anything: your latest product, an event you
        hosted, a service you offer, or a community project you led.
        <br /> Every review is etched on the LUKSO blockchain, ensuring that
        feedback is tamper-proof, publicly visible, and permanently tied to your
        identity. This enables followers and customers to contribute to your
        reputation in a way that’s transparent and verifiable.
        <br /> The Reviews widget turns fleeting feedback into lasting social
        proof, helping you build greater credibility, deeper trust, and a more
        complete digital identity. It's your reputation — backed by the chain.
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
              <span>Built on the </span>
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
