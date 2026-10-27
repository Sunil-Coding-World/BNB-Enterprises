import * as motion from "motion/react-client";
import Logo from "@/components/Logo";
import Calculator from "@/components/site/Calculator";
import { CountUp, Parallax, ScrollProgress } from "@/components/site/Effects";
import Faq from "@/components/site/Faq";
import Header from "@/components/site/Header";
import HeroScene from "@/components/site/HeroScene";
import LeadForm from "@/components/site/LeadForm";
import { DISTRICTS, TODAY } from "@/lib/data";
import { fadeUp, inView, pop, stagger } from "@/lib/motion";
import { btn, cx, eyebrow } from "@/lib/styles";

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

const slabs = [
  ["1 kW", "₹30,000"],
  ["2 kW", "₹60,000"],
  ["3 kW+", "₹78,000"],
  ["+ CG State", "₹30,000 tak"],
];

const section = "py-[70px] sm:py-24";

function SecHead({ kicker, title, children, dark, className = "mb-12" }: { kicker: string; title: string; children?: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <motion.div {...inView} variants={fadeUp} className={cx("max-w-[680px]", className)}>
      <span className={cx(eyebrow, dark && "text-leaf")}>{kicker}</span>
      <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)]">{title}</h2>
      {children && <p className={cx("mt-3.5", dark ? "text-white/70" : "text-muted")}>{children}</p>}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-night pt-[110px] pb-[60px] text-white">
        <div
          aria-hidden="true"
          className="cell-grid absolute inset-0 origin-bottom [transform:perspective(900px)_rotateX(58deg)_translateY(30%)_scale(2.2)] opacity-35 [--cell:56px] [mask-image:linear-gradient(to_top,#000_10%,transparent_75%)]"
        />
        <Parallax className="absolute -top-20 -right-[140px] size-[340px] sm:-top-[120px] sm:-right-[120px] sm:size-[520px]">
          <div className="size-full animate-sun-pulse rounded-full bg-[radial-gradient(circle,#ffd36b_0%,#ffb21a_35%,rgba(240,123,14,.35)_60%,transparent_72%)] blur-[2px]" />
        </Parallax>

        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div initial="hidden" animate="show" variants={stagger(0.15, 0.1)}>
            <motion.div
              variants={fadeUp}
              className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/15 py-1.5 pr-3.5 pl-1.5 text-[.9rem]"
            >
              <b className="rounded-full bg-leaf px-2.5 py-0.5 text-[.78rem] text-night">CG</b> Poore Chhattisgarh mein · PM Surya Ghar + State Subsidy
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,6vw,4.6rem)] font-extrabold">
              Bijli ka bill{" "}
              <em className="relative whitespace-nowrap text-sun not-italic">
                zero
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[.05em] h-[.12em] origin-left rounded bg-leaf"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </em>{" "}
              karo,
              <br />
              sooraj se kamao.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-[22px] mb-8 max-w-[560px] text-[1.15rem] opacity-80">
              Raipur se Bastar, Bilaspur se Surguja tak, ghar aur business ke liye rooftop solar. Survey, installation, CSPDCL net-metering aur
              ₹1,08,000 tak ki subsidy (central + state) ka poora kaam hum karte hain.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3.5">
              <motion.a href="#demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className={btn("sun")}>
                Book Free Survey →
              </motion.a>
              <motion.a href="#calculator" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className={btn("ghost")}>
                Calculate Savings
              </motion.a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-11 flex flex-wrap gap-7 text-[.9rem] text-white/75 [&_strong]:block [&_strong]:font-display [&_strong]:text-[1.9rem] [&_strong]:text-white">
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mx-auto w-full max-w-[560px] pb-0 sm:pb-[70px] lg:max-w-none"
          >
            <HeroScene />
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2, type: "spring" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 } }}
              className="relative mx-3 -mt-[30px] flex items-center gap-3 rounded-[18px] bg-white px-4 py-3 text-ink shadow-[0_20px_40px_-12px_rgba(0,0,0,.45)] sm:absolute sm:top-2.5 sm:left-2.5 sm:m-0 sm:max-w-[250px] lg:top-[18px] lg:-left-[22px]"
            >
              <span className="grid size-11 flex-none place-items-center rounded-xl bg-good-bg text-2xl" aria-hidden="true">
                🌳
              </span>
              <div>
                <b className="block font-display text-[1.35rem] leading-tight text-leaf-deep">
                  <CountUp to={140} delay={1.4} />+ ped
                </b>
                <small className="block text-[.74rem] leading-snug text-muted">3 kW solar har saal lagbhag itne ped jitna CO₂ bachata hai</small>
              </div>
            </motion.div>
            <motion.aside
              id="subsidy"
              initial="hidden"
              animate="show"
              variants={stagger(0.1, 1.3)}
              className="relative mt-3.5 scroll-mt-[100px] rounded-[20px] border border-white/20 bg-night/80 px-[18px] py-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,.5)] backdrop-blur-md sm:absolute sm:right-2.5 sm:bottom-0 sm:mt-0 sm:w-[250px] lg:-right-3.5"
            >
              <h3 className="mb-0.5 text-base">☀ Govt. Subsidy (Residential)</h3>
              <p className="mb-2 text-[.75rem] opacity-65">PM Surya Ghar: Muft Bijli Yojana</p>
              {slabs.map(([k, v]) => (
                <motion.div key={k} variants={fadeUp} className="flex items-center justify-between border-t border-dashed border-white/20 py-1.5 text-[.9rem]">
                  <span className="opacity-80">{k}</span>
                  <b className="font-display text-[1.1rem] text-sun">{v}</b>
                </motion.div>
              ))}
              <motion.div variants={pop} className="flex items-center justify-between border-t border-white/35 py-1.5 text-[.9rem]">
                <span className="opacity-80">Total</span>
                <b className="font-display text-[1.3rem] text-leaf">₹1,08,000</b>
              </motion.div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className={section}>
        <div className="wrap">
          <SecHead kicker="Solar Savings Calculator" title="Aapka bill batao, hum bachat batayenge.">
            Apna average monthly bill set kariye. System size, cost aur subsidy turant dikhegi.
          </SecHead>
          <Calculator />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={cx(section, "pt-5 sm:pt-5")}>
        <div className="wrap">
          <SecHead kicker="Our Services" title="Survey se subsidy tak, sab ek jagah." />
          <motion.div {...inView} variants={stagger(0.1)} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group rounded-[18px] border border-line bg-white p-7 transition-[box-shadow,border-color] duration-300 hover:border-sun hover:shadow-[0_20px_40px_-20px_rgba(11,26,46,.3)]"
              >
                <div className="mb-[18px] grid size-[54px] place-items-center rounded-[14px] bg-gradient-to-br from-[#fff3d6] to-[#ffe1a3] transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-7 stroke-sun-deep">
                    {s.icon}
                  </svg>
                </div>
                <h3 className="mb-2 text-xl">{s.title}</h3>
                <p className="text-[.95rem] text-muted">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section id="areas" className={cx(section, "pt-10 sm:pt-10")}>
        <div className="wrap grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SecHead kicker="Service Area" title="Poore Chhattisgarh mein, aapke zile tak." className="mb-0">
              Raipur head office se lekar Bastar aur Surguja tak, hamari survey aur installation team har zile mein pahunchti hai.
            </SecHead>
            <motion.div {...inView} variants={stagger(0.1)} className="mt-[26px] flex flex-wrap gap-3.5">
              {[
                ["33", "Zile"],
                ["48 hrs", "Mein site survey"],
                ["CSPDCL", "Net-metering support"],
              ].map(([b, s]) => (
                <motion.div key={s} variants={fadeUp} className="min-w-[120px] flex-1 rounded-[14px] border border-line bg-white px-4 py-3.5">
                  <b className="block font-display text-2xl leading-tight text-leaf-deep">{b}</b>
                  <span className="text-[.85rem] text-muted">{s}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.ul
            {...inView}
            variants={stagger(0.025)}
            className="relative flex flex-wrap gap-2 overflow-hidden rounded-[28px] bg-night p-7"
          >
            <span aria-hidden="true" className="cell-grid pointer-events-none absolute inset-0 opacity-30 [--cell:32px]" />
            {DISTRICTS.map((d, i) => (
              <motion.li
                key={d}
                variants={pop}
                whileHover={{ scale: 1.08 }}
                className={cx(
                  "relative rounded-full border px-3 py-1.5 text-[.85rem] transition-colors",
                  i < 8 ? "border-sun bg-sun font-semibold text-night" : "border-white/20 bg-white/5 text-white/80 hover:bg-leaf/20 hover:text-white",
                )}
              >
                {i < 8 && <span aria-hidden="true">📍</span>}
                {d}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className={cx(section, "bg-gradient-to-b from-[#eef8f2] to-paper")}>
        <div className="wrap">
          <SecHead kicker="How It Works" title="5 simple steps, paperwork hamari zimmedari." />
          <motion.ol {...inView} variants={stagger(0.15)} className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
            {/* dashed connector: vertical on mobile, horizontal on desktop */}
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.2 } } }}
              className="absolute top-0 bottom-0 left-[27px] w-0.5 origin-top bg-[repeating-linear-gradient(180deg,var(--color-leaf)_0_10px,transparent_10px_18px)] lg:hidden"
            />
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2 } } }}
              className="absolute top-7 right-[8%] left-[8%] hidden h-0.5 origin-left bg-[repeating-linear-gradient(90deg,var(--color-leaf)_0_10px,transparent_10px_18px)] lg:block"
            />
            {steps.map(([t, d], i) => (
              <motion.li key={t} variants={fadeUp} className="relative grid grid-cols-[56px_1fr] gap-x-[18px] lg:block lg:px-1.5 lg:text-center">
                <motion.span
                  variants={pop}
                  className="row-span-2 grid size-14 place-items-center rounded-full bg-leaf-deep font-display text-[1.3rem] font-extrabold text-white shadow-[0_0_0_8px_#eef8f2] lg:mx-auto lg:mb-4"
                >
                  {i + 1}
                </motion.span>
                <h3 className="mb-1.5 self-end text-[1.05rem]">{t}</h3>
                <p className="text-[.88rem] text-muted">{d}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className={section}>
        <div className="wrap grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div
            {...inView}
            variants={fadeUp}
            aria-hidden="true"
            className="relative grid aspect-square max-w-[420px] place-items-center overflow-hidden rounded-[28px] bg-night lg:max-w-none"
          >
            <motion.div
              className="absolute top-[8%] right-[10%] size-[90px] rounded-full bg-sun shadow-[0_0_80px_30px_rgba(255,178,26,.5)]"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              variants={stagger(0.07, 0.2)}
              className="grid w-[72%] grid-cols-4 gap-1.5 [transform:perspective(700px)_rotateX(35deg)_rotateZ(-12deg)]"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <motion.i
                  key={i}
                  variants={pop}
                  className="relative aspect-[.62] overflow-hidden rounded-[3px] border-2 border-[#9fb6d3] bg-gradient-to-br from-[#1d4a85] to-[#0f2a50]"
                >
                  <span
                    className="absolute inset-0 -translate-x-[120%] animate-shine bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,.45)_50%,transparent_65%)]"
                    style={{ animationDelay: `${(i % 3) * 0.3}s` }}
                  />
                </motion.i>
              ))}
            </motion.div>
          </motion.div>
          <div>
            <SecHead kicker="Why BNB Enterprises" title="Solar lagwana easy, bharosa pakka." className="mb-0" />
            <motion.div {...inView} variants={stagger(0.12)} className="mt-7 grid gap-[18px]">
              {whyUs.map(([t, d]) => (
                <motion.div
                  key={t}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 rounded-[14px] border border-line bg-white p-[18px]"
                >
                  <motion.span variants={pop} className="grid size-8 flex-none place-items-center rounded-full bg-good-bg font-extrabold text-leaf-deep">
                    ✓
                  </motion.span>
                  <div>
                    <h3 className="text-[1.08rem]">{t}</h3>
                    <p className="text-[.93rem] text-muted">{d}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEMO / SURVEY FORM */}
      <section id="demo" className={cx(section, "relative overflow-hidden bg-night text-white")}>
        <div aria-hidden="true" className="cell-grid absolute inset-0 opacity-25" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SecHead dark kicker="Request a Demo / Free Survey" title="Aaj hi free site survey book kariye." className="mb-5">
              Hamari team 24 ghante mein call karegi aur aapke ghar aakar free survey karegi.
            </SecHead>
            <motion.ul {...inView} variants={stagger(0.1, 0.2)} className="mt-2.5 grid gap-3">
              {["Free roof & shadow analysis", "Exact system size aur savings report", "Subsidy eligibility check", "Koi hidden charge nahi"].map((p) => (
                <motion.li key={p} variants={fadeUp}>
                  <span className="mr-2.5 text-sun" aria-hidden="true">
                    ☀
                  </span>
                  {p}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={section}>
        <div className="wrap">
          <div className="max-w-[820px]">
            <SecHead kicker="FAQ" title="Aapke sawaal, hamare jawab." />
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-night-deep pt-[60px] pb-[30px] text-[.95rem] text-white/70">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr] [&_h4]:mb-3.5 [&_h4]:text-white [&_ul]:grid [&_ul]:gap-2">
            <div>
              <div className="mb-3.5 text-white">
                <Logo />
              </div>
              <p>Clean energy, lower bills, greener India. Rooftop solar for homes &amp; businesses.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="[&_a]:transition-colors [&_a:hover]:text-sun">
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
          <div className="mt-10 flex flex-wrap justify-between gap-2.5 border-t border-white/10 pt-5 text-[.85rem]">
            <span>© {TODAY.slice(0, 4)} BNB Enterprises. All rights reserved.</span>
            <span>Powered by the sun ☀</span>
          </div>
        </div>
      </footer>

      <motion.a
        className="fixed right-5 bottom-5 z-[60] grid size-[58px] place-items-center rounded-full bg-[#25d366] shadow-[0_10px_30px_rgba(37,211,102,.5)]"
        href="https://wa.me/919800000000?text=Hi%20BNB%20Enterprises%2C%20I%20want%20solar%20for%20my%20home"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 1.5 }}
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30 [animation-duration:2.5s]" />
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" className="relative">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" />
        </svg>
      </motion.a>
    </>
  );
}
