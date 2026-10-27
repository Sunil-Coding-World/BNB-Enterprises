import Logo from "@/components/Logo";
import Calculator from "@/components/site/Calculator";
import { CountUp, RevealOnScroll } from "@/components/site/Effects";
import Header from "@/components/site/Header";
import HeroScene from "@/components/site/HeroScene";
import LeadForm from "@/components/site/LeadForm";
import { DISTRICTS, TODAY } from "@/lib/data";

const services = [
  {
    title: "Residential Rooftop",
    text: "1–10 kW on-grid systems ghar ke liye, full subsidy support ke saath.",
    icon: <path d="M3 11l9-7 9 7v9H3zM8 20v-5h8v5" />,
  },
  {
    title: "Commercial & Industrial",
    text: "Factory, school, hospital, shop: badi capacity, bada bachat, tax benefit.",
    icon: <path d="M3 7h18v14H3zM8 7V3h8v4M7 12h2M11 12h2M15 12h2M7 16h2M11 16h2M15 16h2" />,
  },
  {
    title: "Hybrid & Off-Grid",
    text: "Battery backup ke saath, jahan power cut zyada hote hain.",
    icon: <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM13 7l-3 5h4l-3 5" />,
  },
  {
    title: "AMC & Service",
    text: "Panel cleaning, health check, inverter service. Generation hamesha max.",
    icon: <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />,
  },
];

const steps = [
  ["Free Site Survey", "Roof, shadow aur load check karte hain."],
  ["Quotation & Booking", "Transparent quote, subsidy minus karke."],
  ["Portal Registration", "PM Surya Ghar portal aur CSPDCL approval."],
  ["Installation", "2–3 din mein certified team install karti hai."],
  ["Net Meter + Subsidy", "CSPDCL net meter, phir central + state subsidy aapke account mein."],
];

const whyUs = [
  ["Tier-1 ALMM panels", "Sirf govt. approved (ALMM listed) panels aur branded inverters."],
  ["Subsidy ka poora kaam", "Registration se lekar subsidy credit tak, aapko office ke chakkar nahi lagane."],
  ["Live project tracking", "Har step ka update WhatsApp pe: approval, installation, net meter."],
  ["Easy EMI options", "Bank loan aur EMI mein madad, kam advance mein shuruaat."],
];

const faqs = [
  ["Subsidy kitni milti hai aur kab aati hai?", "PM Surya Ghar yojana mein central subsidy 1 kW pe ₹30,000, 2 kW pe ₹60,000 aur 3 kW ya usse zyada pe ₹78,000 hai. Chhattisgarh sarkar iske upar ₹30,000 tak alag se state subsidy deti hai, yaani kul ₹1,08,000 tak. CSPDCL inspection ke baad subsidy seedha aapke bank account mein aati hai."],
  ["Kya aap mere zile mein aate ho?", "Haan! Hum Raipur, Durg-Bhilai, Bilaspur, Korba, Rajnandgaon, Raigarh, Jagdalpur, Ambikapur samet Chhattisgarh ke sabhi 33 zilon mein survey aur installation karte hain."],
  ["Mere ghar ke liye kitne kW ka system chahiye?", "Generally 1 kW system mahine mein lagbhag 120 units banata hai. Upar wala calculator use kariye, ya free survey book kariye, hum exact size batayenge."],
  ["Installation mein kitna time lagta hai?", "Booking ke baad registration aur CSPDCL approval mein 1–2 hafte, aur installation sirf 2–3 din. Net meter CSPDCL lagata hai, uski application bhi hum karte hain."],
  ["Kya EMI ya loan available hai?", "Haan, kai nationalised banks rooftop solar pe kam interest ka loan dete hain. Hum documentation mein madad karte hain."],
  ["Maintenance kya karna padta hai?", "Mahine mein 2 baar panel ko paani se saaf karna kaafi hai. Hamara AMC plan lene par ye kaam hamari team karti hai."],
];

export default function Home() {
  return (
    <>
      <Header />
      <RevealOnScroll />

      <section className="hero">
        <div className="sun" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <div className="badge reveal d1">
              <b>CG</b> Poore Chhattisgarh mein · PM Surya Ghar + State Subsidy
            </div>
            <h1 className="reveal d2">
              Bijli ka bill <em>zero</em> karo,
              <br />
              sooraj se kamao.
            </h1>
            <p className="lead reveal d3">
              Raipur se Bastar, Bilaspur se Surguja tak, ghar aur business ke liye rooftop solar. Survey, installation, CSPDCL net-metering aur
              ₹1,08,000 tak ki subsidy (central + state) ka poora kaam hum karte hain.
            </p>
            <div className="hero-cta reveal d4">
              <a href="#demo" className="btn btn-sun">
                Book Free Survey →
              </a>
              <a href="#calculator" className="btn btn-ghost">
                Calculate Savings
              </a>
            </div>
            <div className="trust reveal d5">
              <div>
                <strong>
                  <CountUp to={500} />+
                </strong>
                Installations
              </div>
              <div>
                <strong>
                  <CountUp to={33} /> Zile
                </strong>
                Poora Chhattisgarh
              </div>
              <div>
                <strong>
                  <CountUp to={25} /> Yr
                </strong>
                Panel Warranty
              </div>
            </div>
          </div>
          <div className="hero-visual reveal d3">
            <HeroScene />
            <div className="eco-chip">
              <span className="eco-icon" aria-hidden="true">🌳</span>
              <div>
                <b>
                  <CountUp to={140} />+ ped
                </b>
                <small>3 kW solar har saal lagbhag itne ped jitna CO₂ bachata hai</small>
              </div>
            </div>
            <aside className="subsidy-card" id="subsidy">
              <h3>☀ Govt. Subsidy (Residential)</h3>
              <p className="sub">PM Surya Ghar: Muft Bijli Yojana</p>
              <div className="slab">
                <span>1 kW</span>
                <b>₹30,000</b>
              </div>
              <div className="slab">
                <span>2 kW</span>
                <b>₹60,000</b>
              </div>
              <div className="slab">
                <span>3 kW+</span>
                <b>₹78,000</b>
              </div>
              <div className="slab">
                <span>+ CG State</span>
                <b>₹30,000 tak</b>
              </div>
              <div className="slab total">
                <span>Total</span>
                <b>₹1,08,000</b>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="calculator">
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">Solar Savings Calculator</span>
            <h2>Aapka bill batao, hum bachat batayenge.</h2>
            <p>Apna average monthly bill set kariye. System size, cost aur subsidy turant dikhegi.</p>
          </div>
          <Calculator />
        </div>
      </section>

      <section id="services" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">Our Services</span>
            <h2>Survey se subsidy tak, sab ek jagah.</h2>
          </div>
          <div className="services">
            {services.map((s) => (
              <div className="svc fade" key={s.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="areas" id="areas">
        <div className="wrap areas-grid">
          <div className="sec-head fade" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Service Area</span>
            <h2>Poore Chhattisgarh mein, aapke zile tak.</h2>
            <p>Raipur head office se lekar Bastar aur Surguja tak, hamari survey aur installation team har zile mein pahunchti hai.</p>
            <div className="area-stats">
              <div>
                <b>33</b>
                <span>Zile</span>
              </div>
              <div>
                <b>48 hrs</b>
                <span>Mein site survey</span>
              </div>
              <div>
                <b>CSPDCL</b>
                <span>Net-metering support</span>
              </div>
            </div>
          </div>
          <ul className="area-chips fade">
            {DISTRICTS.map((d, i) => (
              <li key={d} className={i < 8 ? "hub" : ""}>
                {i < 8 && <span aria-hidden="true">📍</span>}
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="process">
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">How It Works</span>
            <h2>5 simple steps, paperwork hamari zimmedari.</h2>
          </div>
          <div className="steps">
            {steps.map(([t, d]) => (
              <div className="step fade" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why">
        <div className="wrap why">
          <div className="panel-art fade" aria-hidden="true">
            <div className="sun-s" />
            <div className="panels">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
          <div>
            <div className="sec-head fade" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Why BNB Enterprises</span>
              <h2>Solar lagwana easy, bharosa pakka.</h2>
            </div>
            <div className="why-list">
              {whyUs.map(([t, d]) => (
                <div className="fade" key={t}>
                  <span className="tick">✓</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="demo" id="demo">
        <div className="wrap demo-grid">
          <div>
            <div className="sec-head" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Request a Demo / Free Survey</span>
              <h2>Aaj hi free site survey book kariye.</h2>
              <p>Hamari team 24 ghante mein call karegi aur aapke ghar aakar free survey karegi.</p>
            </div>
            <ul className="perks">
              <li>Free roof &amp; shadow analysis</li>
              <li>Exact system size aur savings report</li>
              <li>Subsidy eligibility check</li>
              <li>Koi hidden charge nahi</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section id="faq">
        <div className="wrap faq">
          <div className="sec-head fade">
            <span className="eyebrow">FAQ</span>
            <h2>Aapke sawaal, hamare jawab.</h2>
          </div>
          {faqs.map(([q, a]) => (
            <details className="fade" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="foot">
            <div>
              <div style={{ color: "#fff", marginBottom: 14 }}>
                <Logo />
              </div>
              <p>Clean energy, lower bills, greener India. Rooftop solar for homes &amp; businesses.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#calculator">Savings Calculator</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#subsidy">Subsidy</a></li>
                <li><a href="#demo">Free Survey</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>📞 +91 98XXX XXXXX</li>
                <li>✉ info@bnbenterprises.in</li>
                <li>📍 Raipur, Chhattisgarh</li>
                <li>🗺 Service: Chhattisgarh ke sabhi 33 zile</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {TODAY.slice(0, 4)} BNB Enterprises. All rights reserved.</span>
            <span>Powered by the sun ☀</span>
          </div>
        </div>
      </footer>

      <a
        className="wa"
        href="https://wa.me/919800000000?text=Hi%20BNB%20Enterprises%2C%20I%20want%20solar%20for%20my%20home"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" />
        </svg>
      </a>
    </>
  );
}
