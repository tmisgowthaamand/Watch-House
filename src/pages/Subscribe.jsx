import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

const steps = [
  {
    title: 'Who is it for?',
    subtitle: 'Select one of the below options to get started.',
    options: [
      { label: 'For me', desc: 'Coffee delivered to your door, on your schedule.', image: '/hero.png' },
      { label: 'For someone else', desc: 'A gift that keeps on giving. Set up a subscription for a friend.', image: '/hero2.png' },
      { label: 'For the office', desc: 'Keep your team caffeinated.', image: '/hero3.png' }
    ]
  },
  {
    title: 'How would you like it?',
    subtitle: 'Choose your preferred format.',
    options: [
      { label: 'Whole Bean', desc: 'For those who grind at home. Maximum freshness.', image: '/hero2.png' },
      { label: 'Ground', desc: 'Pre-ground for convenience. Perfect for filter or cafetière.', image: '/hero.png' },
      { label: 'Nespresso® Pods', desc: 'Compatible pods, speciality coffee.', image: '/hero3.png' }
    ]
  },
  {
    title: 'How much?',
    subtitle: 'Select your bag size.',
    options: [
      { label: '250g', desc: '~17 cups. Perfect for one.', price: '£9.00', image: '/hero3.png' },
      { label: '500g', desc: '~34 cups. For the dedicated drinker.', price: '£16.00', image: '/hero.png' },
      { label: '1kg', desc: '~68 cups. Never run out.', price: '£28.00', image: '/hero2.png' }
    ]
  },
  {
    title: 'How often?',
    subtitle: 'Set your delivery frequency. Change anytime.',
    options: [
      { label: 'Every week', desc: 'For the heaviest of drinkers.', image: '/hero.png' },
      { label: 'Every 2 weeks', desc: 'Our most popular option.', tag: 'Popular', image: '/hero2.png' },
      { label: 'Every 4 weeks', desc: 'A monthly refresh.', image: '/hero3.png' }
    ]
  }
];

const Subscribe = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef(null);

  const progress = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  const handleSelect = (optionLabel) => {
    setSelections({ ...selections, [step]: optionLabel });
    if (step < steps.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimating(false);
      }, 400);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.title = "Subscription Builder – WatchHouse";
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [step]);

  return (
    <main className="sub-page">
      <div className="sub-split">
        {/* Left: Image Panel */}
        <div className="sub-image-panel">
          <div className="sub-image-bg">
            <OptimizedImage
              src={currentStep.options[0]?.image || '/hero.png'}
              alt="Subscription"
              key={step}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <div className="sub-image-overlay">
            <div className="sub-image-content">
              <h2>Coffee on<br />subscription.</h2>
              <p>10% off, always. Free UK shipping. Pause or cancel anytime.</p>
            </div>
          </div>
        </div>

        {/* Right: Builder Panel */}
        <div className="sub-builder-panel" ref={contentRef}>
          {/* Progress */}
          <div className="sub-progress-area">
            <div className="sub-progress-bar">
              <div className="sub-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="sub-step-count">
              <span className="step-num">Step {step + 1}</span>
              <span className="step-total">of {steps.length}</span>
            </div>
          </div>

          {/* Step Content */}
          <div className={`sub-step-content ${animating ? 'fading' : ''}`}>
            <h1>{currentStep.title}</h1>
            <p className="sub-subtitle">{currentStep.subtitle}</p>

            <div className="sub-options">
              {currentStep.options.map((opt, i) => (
                <button
                  key={opt.label}
                  className={`sub-option-card ${selections[step] === opt.label ? 'selected' : ''}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                  onClick={() => handleSelect(opt.label)}
                >
                  <div className="opt-left">
                    <div className="opt-radio">
                      {selections[step] === opt.label && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      <span className="opt-desc">{opt.desc}</span>
                    </div>
                  </div>
                  <div className="opt-right">
                    {opt.price && <span className="opt-price">{opt.price}</span>}
                    {opt.tag && <span className="opt-tag">{opt.tag}</span>}
                    <ArrowRight size={14} className="opt-arrow" />
                  </div>
                </button>
              ))}
            </div>

            {/* Previous Selections Summary */}
            {step > 0 && (
              <div className="sub-selections-summary">
                {Object.entries(selections).filter(([k]) => Number(k) < step).map(([k, v]) => (
                  <div className="summary-chip" key={k}>
                    <span className="chip-label">{steps[Number(k)].title.replace('?', '')}</span>
                    <span className="chip-value">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="sub-nav-footer">
            {step > 0 ? (
              <button className="sub-back-btn" onClick={goBack}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : <div />}
            {step === steps.length - 1 && selections[step] && (
              <button className="sub-checkout-btn">
                <span>BUILD YOUR<br />SUBSCRIPTION</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .sub-page {
          background: var(--color-bg);
          min-height: 100vh;
        }
        .sub-split {
          display: flex;
          min-height: 100vh;
        }

        /* IMAGE PANEL */
        .sub-image-panel {
          flex: 0 0 45%;
          position: relative;
          overflow: hidden;
        }
        .sub-image-bg {
          position: absolute;
          inset: 0;
        }
        .sub-image-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.6s ease;
          animation: imgFadeIn 0.8s ease forwards;
        }
        @keyframes imgFadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .sub-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%);
          display: flex;
          align-items: flex-end;
          padding: 60px;
        }
        .sub-image-content h2 {
          font-family: var(--font-serif);
          font-size: 3.5rem;
          color: white;
          line-height: 1;
          margin-bottom: 15px;
          font-weight: 500;
        }
        .sub-image-content p {
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1.5;
        }

        /* BUILDER PANEL */
        .sub-builder-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 50px 60px 40px;
          overflow-y: auto;
          background: var(--color-bg);
        }

        /* PROGRESS */
        .sub-progress-area {
          margin-bottom: 50px;
        }
        .sub-progress-bar {
          height: 2px;
          background: rgba(0,0,0,0.1);
          width: 100%;
          margin-bottom: 12px;
        }
        .sub-progress-fill {
          height: 100%;
          background: var(--color-text);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sub-step-count {
          display: flex;
          gap: 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
        }
        .step-total {
          opacity: 0.4;
        }

        /* STEP CONTENT */
        .sub-step-content {
          flex: 1;
          transition: opacity 0.3s, transform 0.3s;
        }
        .sub-step-content.fading {
          opacity: 0;
          transform: translateY(10px);
        }
        .sub-step-content h1 {
          font-family: var(--font-serif);
          font-size: 3.8rem;
          font-weight: 500;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .sub-subtitle {
          font-size: 14px;
          opacity: 0.6;
          margin-bottom: 40px;
          font-weight: 400;
        }

        /* OPTION CARDS */
        .sub-options {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sub-option-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 0;
          border-top: 1px solid rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: optSlideIn 0.5s ease forwards;
          opacity: 0;
          transform: translateY(8px);
          text-align: left;
        }
        .sub-option-card:last-child {
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        @keyframes optSlideIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .sub-option-card:hover {
          padding-left: 8px;
        }
        .sub-option-card.selected {
          padding-left: 8px;
        }
        .opt-left {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }
        .opt-radio {
          width: 22px;
          height: 22px;
          border: 1.5px solid rgba(0,0,0,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          transition: all 0.3s;
        }
        .sub-option-card.selected .opt-radio {
          background: var(--color-text);
          border-color: var(--color-text);
          color: var(--color-bg);
        }
        .opt-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .opt-label {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .opt-desc {
          font-size: 12px;
          opacity: 0.5;
          font-weight: 400;
          line-height: 1.4;
        }
        .opt-right {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
        }
        .opt-price {
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-sans);
        }
        .opt-tag {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          background: var(--color-text);
          color: var(--color-bg);
          padding: 4px 10px;
          border-radius: 0;
        }
        .opt-arrow {
          opacity: 0;
          transition: all 0.3s;
          transform: translateX(-5px);
        }
        .sub-option-card:hover .opt-arrow {
          opacity: 0.5;
          transform: translateX(0);
        }

        /* SELECTIONS SUMMARY */
        .sub-selections-summary {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        .summary-chip {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 8px 14px;
          background: rgba(0,0,0,0.04);
          font-size: 11px;
        }
        .chip-label {
          opacity: 0.5;
          font-weight: 400;
        }
        .chip-value {
          font-weight: 700;
        }

        /* NAVIGATION FOOTER */
        .sub-nav-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          margin-top: auto;
        }
        .sub-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          opacity: 0.5;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .sub-back-btn:hover {
          opacity: 1;
          transform: translateX(-3px);
        }
        .sub-checkout-btn {
          display: flex;
          align-items: center;
          gap: 30px;
          border-top: 1px solid rgba(0,0,0,0.8);
          border-bottom: 1px solid rgba(0,0,0,0.8);
          padding: 15px 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          font-family: var(--font-sans);
          text-align: left;
          transition: all 0.3s;
          animation: optSlideIn 0.5s ease forwards;
        }
        .sub-checkout-btn:hover {
          gap: 40px;
        }
        .sub-checkout-btn span {
          line-height: 1.4;
          color: rgba(0,0,0,0.8);
        }

        @media (max-width: 900px) {
          .sub-split {
            flex-direction: column;
          }
          .sub-image-panel {
            flex: 0 0 35vh;
          }
          .sub-builder-panel {
            padding: 30px 20px;
          }
          .sub-step-content h1 {
            font-size: 2.5rem;
          }
          .sub-image-content h2 {
            font-size: 2rem;
          }
          .sub-image-overlay {
            padding: 30px;
          }
        }
      `}</style>
    </main>
  );
};

export default Subscribe;
