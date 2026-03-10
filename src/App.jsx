import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// BATLYF — Public-Facing Prototype
// Theme → Feature Mapping (Adepoju 2025 & Johnson et al. 2025)
// ═══════════════════════════════════════════════════════════════

const BAT_FACTS = [
  { id: 1, category: "ecology", title: "Pest Controllers", text: "A single little brown bat can eat up to 1,000 mosquito-sized insects per hour, providing natural pest control worth billions annually to agriculture.", icon: "🦟", source: "Ecological Education" },
  { id: 2, category: "social", title: "Social Creatures", text: "Bats form complex social networks, recognizing individuals by their unique vocalizations. Mother bats can find their pup among thousands in a roost.", icon: "👥", source: "Relatable Behaviors" },
  { id: 3, category: "ecology", title: "Pollination Heroes", text: "Over 500 plant species rely on bats for pollination, including agave (tequila!), bananas, and mangoes. Without bats, many ecosystems would collapse.", icon: "🌺", source: "Ecological Education" },
  { id: 4, category: "biology", title: "Echolocation Masters", text: "Bats navigate using ultrasonic pulses up to 200 times per second, creating a detailed 3D sound map of their surroundings in complete darkness.", icon: "📡", source: "Learning Facts" },
  { id: 5, category: "biology", title: "Longevity Champions", text: "Despite their small size, some bat species live over 40 years — far longer than similarly sized mammals. Scientists study them to understand aging.", icon: "⏳", source: "Sticky Information" },
  { id: 6, category: "social", title: "Sharing is Caring", text: "Vampire bats share blood meals with hungry roostmates, even non-relatives. They remember who helped them and return the favor later.", icon: "🤝", source: "Relatable Behaviors" },
  { id: 7, category: "ecology", title: "Seed Dispersers", text: "Fruit bats disperse seeds across vast distances, regenerating forests and maintaining biodiversity. They're essential for tropical forest recovery.", icon: "🌱", source: "Ecological Education" },
  { id: 8, category: "biology", title: "Flight Pioneers", text: "Bats are the only mammals capable of true powered flight. Their wings are actually elongated fingers covered by a thin membrane called patagium.", icon: "✈️", source: "Learning Facts" },
];
const MYTHS_AND_FACTS = [
  { id: 1, statement: "Bats are blind and navigate by luck.", isMyth: true, explanation: "Bats have functional eyes and many species see quite well. They also use echolocation for precise navigation.", theme: "Dispelling Myths" },
  { id: 2, statement: "A single bat can eat thousands of insects in one night.", isMyth: false, explanation: "True! Little brown bats can consume 4,500+ insects per night.", theme: "Learning Facts" },
  { id: 3, statement: "All bats carry rabies.", isMyth: true, explanation: "Less than 1% of bats carry rabies. Never handle a bat with bare hands as a precaution.", theme: "Dispelling Myths" },
  { id: 4, statement: "Bats are the only mammals that can truly fly.", isMyth: false, explanation: "Correct! Flying squirrels glide, but bats achieve true powered flight.", theme: "Learning Facts" },
  { id: 5, statement: "Bats will get tangled in your hair.", isMyth: true, explanation: "Bats have excellent spatial awareness and actively avoid humans.", theme: "Dispelling Myths" },
  { id: 6, statement: "Some bats help make tequila and chocolate possible.", isMyth: false, explanation: "True! Mexican long-nosed bats pollinate agave, and other species pollinate cacao.", theme: "Ecological Education" },
  { id: 7, statement: "Bats are flying rodents.", isMyth: true, explanation: "Bats are more closely related to primates than to mice or rats.", theme: "Dispelling Myths" },
  { id: 8, statement: "Bat populations are declining worldwide.", isMyth: false, explanation: "Unfortunately true. Over 80% of bat species need conservation attention.", theme: "Ecological Education" },
];
const BAT_PROFILES = [
  { id: 1, name: "Luna", species: "Big Brown Bat", age: "4 years", weight: "18g", personality: "Curious explorer — first to investigate new roost spots", diet: "Beetles, moths, flying ants", funFact: "Tracked returning to the same roost for 3 consecutive summers", status: "Active" },
  { id: 2, name: "Echo", species: "Big Brown Bat", age: "6 years", weight: "21g", personality: "Social butterfly — 12+ roostmate connections", diet: "Beetles, wasps, mosquitoes", funFact: "Mother of 8 pups over her lifetime, all raised in the barn", status: "Active" },
  { id: 3, name: "Dusk", species: "Big Brown Bat", age: "2 years", weight: "15g", personality: "Night owl — last to leave, last to return", diet: "Moths, beetles, crickets", funFact: "Smallest pup in birth cohort, now one of the best foragers", status: "Active" },
  { id: 4, name: "Maple", species: "Big Brown Bat", age: "5 years", weight: "20g", personality: "Gentle matriarch — grooms younger bats", diet: "June bugs, moths, flying ants", funFact: "Shares roost warmth with unrelated juveniles during cold snaps", status: "Roosting" },
];
const BADGES = [
  { id: "explorer", name: "Bat Explorer", desc: "Visit all sections", icon: "🗺️" },
  { id: "mythbuster", name: "Myth Buster", desc: "Complete Myth vs Fact", icon: "🔍" },
  { id: "scholar", name: "Bat Scholar", desc: "Read 5 bat facts", icon: "📚" },
  { id: "social", name: "Community Bat", desc: "Share an encounter", icon: "💬" },
  { id: "champion", name: "Bat Champion", desc: "Perfect myth score", icon: "🏆" },
  { id: "immersive", name: "Night Vision", desc: "Explore all media", icon: "🎬" },
];
const COMMUNITY_STORIES = [
  { id: 1, author: "Sarah M.", location: "Hamilton County, OH", date: "Aug 2025", text: "After learning bats eat mosquitoes, we installed a bat house. Now we enjoy summer evenings without bug spray!", likes: 24 },
  { id: 2, author: "Marcus T.", location: "Cincinnati, OH", date: "Jul 2025", text: "My daughter now wants to be a bat biologist after visiting the barn program!", likes: 31 },
  { id: 3, author: "Dr. Reyes", location: "Great Parks, OH", date: "Sep 2025", text: "The myth-busting feature has changed more minds than years of brochures.", likes: 47 },
];
const MICRO_CARDS = [
  { id: 1, front: "How far can a bat fly in one night?", back: "Up to 150 miles! Bats are long-distance commuters.", color: "linear-gradient(135deg,#0f2b1e,#1a3d2e)" },
  { id: 2, front: "What's a group of bats called?", back: "A colony! Bracken Cave in Texas hosts 20 million bats.", color: "linear-gradient(135deg,#1e0f2b,#2e1a3d)" },
  { id: 3, front: "How do baby bats learn to fly?", back: "Pups practice flapping upside down. Mothers encourage them by leaving the roost.", color: "linear-gradient(135deg,#2b1e0f,#3d2e1a)" },
  { id: 4, front: "Why do bats hang upside down?", back: "Specialized tendons lock their feet effortlessly. Hanging lets them launch into flight instantly.", color: "linear-gradient(135deg,#0f1e2b,#1a2e3d)" },
];
const ECOSYSTEM_DATA = [
  { from: "Bats", to: "Insects", label: "eat 4,500+/night" },
  { from: "Bats", to: "Plants", label: "pollinate 500+ species" },
  { from: "Bats", to: "Seeds", label: "disperse across forests" },
  { from: "Insects", to: "Crops", label: "damage without control" },
  { from: "Plants", to: "Humans", label: "food, medicine, oxygen" },
  { from: "Bats", to: "Humans", label: "save $3.7B in pest control" },
];
const SAFETY_ITEMS = [
  { id: 1, title: "Never handle a bat", icon: "🚫", content: "Use thick leather gloves or call wildlife control. Bats may bite if frightened." },
  { id: 2, title: "Bats in your building", icon: "🏠", content: "Don't seal entry points while bats are inside. Contact a licensed exclusion professional." },
  { id: 3, title: "Found a grounded bat?", icon: "🦇", content: "Keep children and pets away. Contact your local wildlife rehabilitation center." },
  { id: 4, title: "Who to contact", icon: "📞", content: "Local animal control, state wildlife agency, or batcon.org for guidance." },
  { id: 5, title: "Attract bats to your yard", icon: "💡", content: "Install a bat house 12-20ft high facing south. Plant night-blooming flowers. Avoid pesticides." },
];
const VIDEO_ITEMS = [
  { id: "emergence", title: "Evening Emergence", desc: "Hundreds streaming out at dusk", dur: "2:34", emoji: "🌅", views: "1.2K" },
  { id: "nursing", title: "Mother & Pup", desc: "Tender nursing moments", dur: "1:48", emoji: "🍼", views: "890" },
  { id: "echovid", title: "Echolocation in Action", desc: "Slow-motion sonar hunting", dur: "3:12", emoji: "📡", views: "2.1K" },
  { id: "grooming", title: "Social Grooming", desc: "Complex social bonds", dur: "1:22", emoji: "🤝", views: "650" },
  { id: "feeding", title: "Night Foraging", desc: "Infrared mid-flight catches", dur: "2:58", emoji: "🦟", views: "1.8K" },
  { id: "seasons", title: "A Year in the Colony", desc: "Four-season time-lapse", dur: "4:15", emoji: "🗓️", views: "3.4K" },
];
const VR_SCENES = [
  { label: "Entrance", desc: "Warm air rises through wooden boards. Faint chirps above.", els: ["🚪","🌿","🪵"] },
  { label: "Roost Chamber", desc: "Dozens of bats cluster on rafters, shifting gently.", els: ["🦇","🦇","🦇","🦇","🦇"] },
  { label: "Observation", desc: "Infrared monitors show pups clinging to mothers.", els: ["🖥️","📷","🔴"] },
  { label: "Dusk Exit", desc: "Bats pour out into twilight, one by one, then in streams.", els: ["🌙","🦇","🦇","✨"] },
];

function FlyingBat({ style }) {
  return (
    <svg viewBox="0 0 80 40" style={{ width: "100%", height: "100%", ...style }}>
      <g fill="currentColor" opacity="0.7">
        <ellipse cx="40" cy="22" rx="5" ry="6" />
        <path d="M35 20Q20 8 5 14Q15 10 25 16Q30 14 35 18Z" className="bwl" />
        <path d="M45 20Q60 8 75 14Q65 10 55 16Q50 14 45 18Z" className="bwr" />
        <circle cx="38" cy="19" r="1" fill="#86efac" opacity="0.8" />
        <circle cx="42" cy="19" r="1" fill="#86efac" opacity="0.8" />
      </g>
    </svg>
  );
}

function SectionHead({ theme, title, desc }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "10px", color: "#22c55e", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "8px", fontWeight: "600" }}>{theme}</div>
      <h2 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "6px", letterSpacing: "-0.5px" }}>{title}</h2>
      {desc && <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>{desc}</p>}
    </div>
  );
}

function SonarRings({ active, phase }) {
  if (!active) return null;
  return (<div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    {Array.from({ length: phase }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: `${60+i*40}px`, height: `${60+i*40}px`, marginLeft: `${-(30+i*20)}px`, marginTop: `${-(30+i*20)}px`, borderRadius: "50%", border: `1.5px solid rgba(34,197,94,${0.5-i*0.05})`, opacity: Math.max(0.1, 0.6-i*0.06) }} />
    ))}
  </div>);
}

// ═══ MAIN ═══
export default function BatLyfPublic() {
  const [view, setView] = useState("landing");
  const [heroReady, setHeroReady] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const [mythIdx, setMythIdx] = useState(0);
  const [mythScore, setMythScore] = useState({ c: 0, t: 0 });
  const [mythAns, setMythAns] = useState(null);
  const [mythDone, setMythDone] = useState(false);
  const [selBat, setSelBat] = useState(null);
  const [flipped, setFlipped] = useState(new Set());
  const [visited, setVisited] = useState(new Set(["landing"]));
  const [factsRead, setFactsRead] = useState(new Set());
  const [badges, setBadges] = useState(new Set());
  const [story, setStory] = useState("");
  const [storySent, setStorySent] = useState(false);
  const [badgeNotif, setBadgeNotif] = useState(null);
  const [ecoNode, setEcoNode] = useState(null);
  const [safeOpen, setSafeOpen] = useState(null);
  const [mediaTab, setMediaTab] = useState("livefeed");
  const [echoOn, setEchoOn] = useState(false);
  const [echoPh, setEchoPh] = useState(0);
  const [vrAngle, setVrAngle] = useState(0);
  const [vrZoom, setVrZoom] = useState(1);
  const [playVid, setPlayVid] = useState(null);
  const [factFilter, setFactFilter] = useState("all");
  const echoRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => { if (view !== "landing") setVisited(p => { const n = new Set(p); n.add(view); return n; }); if (visited.size >= 6 && !badges.has("explorer")) award("explorer"); }, [view]);
  useEffect(() => { if (factsRead.size >= 5 && !badges.has("scholar")) award("scholar"); }, [factsRead]);

  const award = (id) => { setBadges(p => new Set([...p, id])); setBadgeNotif(BADGES.find(b => b.id === id)); setTimeout(() => setBadgeNotif(null), 3500); };
  const handleMyth = (m) => { const c = MYTHS_AND_FACTS[mythIdx]; const ok = m === c.isMyth; setMythAns({ ok, exp: c.explanation }); setMythScore(p => ({ c: p.c + (ok ? 1 : 0), t: p.t + 1 })); };
  const nextMyth = () => { if (mythIdx < MYTHS_AND_FACTS.length - 1) { setMythIdx(p => p + 1); setMythAns(null); } else { setMythDone(true); if (!badges.has("mythbuster")) award("mythbuster"); if (mythScore.c === MYTHS_AND_FACTS.length) award("champion"); } };
  const resetMyths = () => { setMythIdx(0); setMythAns(null); setMythScore({ c: 0, t: 0 }); setMythDone(false); };
  const startEcho = () => { setEchoOn(true); setEchoPh(0); if (echoRef.current) clearInterval(echoRef.current); echoRef.current = setInterval(() => { setEchoPh(p => { if (p >= 8) { clearInterval(echoRef.current); setEchoOn(false); return 0; } return p + 1; }); }, 400); };

  const echoObjs = [{ name: "Moth", dist: "2.3m", emoji: "🦋", at: 2 },{ name: "Branch", dist: "4.1m", emoji: "🌿", at: 3 },{ name: "Bat", dist: "1.5m", emoji: "🦇", at: 4 },{ name: "Water", dist: "8.7m", emoji: "💧", at: 5 },{ name: "Building", dist: "12m", emoji: "🏠", at: 6 }];

  // Categorized navigation
  const navCategories = [
    { label: "Home", id: "dashboard", icon: "🏠", items: null },
    { label: "Learn", icon: "📚", items: [
      { id: "facts", l: "Bat Facts", i: "📖" },
      { id: "myths", l: "Myth vs Fact", i: "🔍" },
      { id: "cards", l: "Quick Learn", i: "🃏" },
      { id: "ecosystem", l: "Ecosystem", i: "🌿" },
    ]},
    { label: "Explore", icon: "🔭", items: [
      { id: "profiles", l: "Meet the Bats", i: "🦇" },
      { id: "media", l: "Bat Media & VR", i: "🎬" },
    ]},
    { label: "Connect", icon: "🤝", items: [
      { id: "community", l: "Community", i: "💬" },
      { id: "safety", l: "Safety Guide", i: "🛡️" },
      { id: "badges", l: "My Badges", i: "🏅" },
    ]},
  ];
  const [openDrop, setOpenDrop] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close dropdowns on view change
  useEffect(() => { setOpenDrop(null); setMobileOpen(false); }, [view]);

  // ═══ CINEMATIC LANDING ═══
  const Landing = () => (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "linear-gradient(180deg,#020810 0%,#06101d 30%,#0a1628 55%,#0c1a20 75%,#0f1f15 100%)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* 120 stars */}
      {Array.from({ length: 120 }, (_, i) => ({ x: Math.random()*100, y: Math.random()*100, s: Math.random()*2.5+0.5, d: Math.random()*4, du: 2+Math.random()*3 })).map((s, i) => (
        <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: `${s.s}px`, height: `${s.s}px`, background: "#fff", borderRadius: "50%", boxShadow: s.s > 1.5 ? `0 0 ${s.s*3}px rgba(255,255,255,0.3)` : "none" }} />
      ))}

      {/* Moon */}
      <div style={{ position: "absolute", top: "8%", right: "15%", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #f5f0d0, #d4c98a 60%, #a89860 100%)", boxShadow: "0 0 60px rgba(245,240,208,0.15), 0 0 120px rgba(245,240,208,0.08), inset -15px -10px 30px rgba(100,90,50,0.4)", opacity: heroReady ? 1 : 0, transition: "opacity 2s ease 0.5s" }}>
        <div style={{ position: "absolute", top: "25%", left: "30%", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(150,140,100,0.25)" }} />
        <div style={{ position: "absolute", top: "55%", left: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "rgba(150,140,100,0.2)" }} />
        <div style={{ position: "absolute", top: "35%", left: "60%", width: "8px", height: "8px", borderRadius: "50%", background: "rgba(150,140,100,0.15)" }} />
      </div>

      {/* Treeline */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "200px", zIndex: 2 }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200V120c20-10 30-50 50-60s30 20 50 10 20-40 40-50 30 15 50 5 25-35 45-40 20 25 40 15 30-45 50-50 25 30 45 20 15-30 35-35 30 20 50 10 20-45 40-50 25 25 45 15 30-40 50-45 20 30 40 20 30-50 50-55 25 30 45 20 15-25 35-30 30 15 50 5 20-40 40-45 25 25 45 15 30-35 50-40 20 20 40 10 30-45 50-50 25 30 45 20 20-30 40-35V200z" fill="#050d06" />
      </svg>

      {/* Flying bats */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${12+(i%4)*15+Math.sin(i)*8}%`, color: "#1a2a1f", width: `${22+(i%3)*10}px`, opacity: 0.3+(i%3)*0.15, zIndex: 1, filter: `blur(${i > 5 ? 1 : 0}px)` }}><FlyingBat /></div>
      ))}

      {/* Fireflies */}
      {[...Array(24)].map((_, i) => (
        <div key={`f${i}`} style={{ position: "absolute", left: `${10+Math.random()*80}%`, top: `${45+Math.random()*45}%`, width: "3px", height: "3px", borderRadius: "50%", background: i%3===0 ? "#86efac" : i%3===1 ? "#fde68a" : "#93c5fd", zIndex: 3, boxShadow: `0 0 8px ${i%3===0 ? "rgba(134,239,172,0.6)" : i%3===1 ? "rgba(253,230,138,0.5)" : "rgba(147,197,253,0.4)"}` }} />
      ))}

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "800px", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(40px)", transition: "all 1.5s cubic-bezier(0.16,1,0.3,1) 0.8s" }}>
        <div style={{ width: "80px", height: "80px", margin: "0 auto 24px", background: "linear-gradient(135deg,rgba(34,197,94,0.15),rgba(16,185,129,0.08))", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", boxShadow: "0 0 40px rgba(34,197,94,0.15), 0 0 80px rgba(34,197,94,0.05)", backdropFilter: "blur(10px)" }}>🦇</div>
        <p style={{ fontSize: "13px", letterSpacing: "6px", textTransform: "uppercase", color: "rgba(134,239,172,0.7)", marginBottom: "16px", fontWeight: "500" }}>Welcome to</p>
        <h1 style={{ fontSize: "clamp(52px,11vw,96px)", fontWeight: "900", lineHeight: "0.9", marginBottom: "20px", background: "linear-gradient(135deg,#e8e6e1 0%,#86efac 40%,#22c55e 70%,#16a34a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-4px", filter: "drop-shadow(0 0 30px rgba(34,197,94,0.2))" }}>BatLyf</h1>
        <p style={{ fontSize: "clamp(16px,2.5vw,22px)", color: "rgba(232,230,225,0.75)", lineHeight: "1.6", marginBottom: "40px", fontWeight: "300", maxWidth: "550px", margin: "0 auto 40px" }}>
          Discover the hidden world of bats through interactive stories, immersive experiences, and real science.
          <br /><span style={{ color: "rgba(134,239,172,0.65)", fontSize: "0.85em" }}>Learn to coexist with nature's most misunderstood creatures.</span>
        </p>
        <button onClick={() => setView("dashboard")} style={{ padding: "18px 52px", borderRadius: "16px", border: "1px solid rgba(34,197,94,0.3)", background: "linear-gradient(135deg,rgba(34,197,94,0.12),rgba(16,185,129,0.06))", color: "#86efac", fontSize: "18px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", backdropFilter: "blur(10px)", boxShadow: "0 0 30px rgba(34,197,94,0.1), inset 0 1px 0 rgba(255,255,255,0.09)", transition: "all 0.3s" }}>
          Enter the Night →
        </button>
        <div style={{ display: "flex", gap: "36px", justifyContent: "center", marginTop: "52px", opacity: heroReady ? 1 : 0, transition: "opacity 1.5s ease 2.2s" }}>
          {[{ v: "1,400+", l: "bat species" },{ v: "$3.7B", l: "pest control value" },{ v: "500+", l: "plants pollinated" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: "26px", fontWeight: "800", color: "rgba(134,239,172,0.65)" }}>{s.v}</div><div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "2px", marginTop: "4px" }}>{s.l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", zIndex: 10, textAlign: "center", opacity: heroReady ? 0.35 : 0, transition: "opacity 1s ease 3s" }}>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "3px", marginBottom: "6px" }}>CLICK TO ENTER</div>
        <div style={{ fontSize: "16px" }}>↓</div>
      </div>
    </div>
  );

  // ═══ DASHBOARD ═══
  const Dashboard = () => {
    const cards = [
      { v: "facts", icon: "📖", title: "Bat Facts", desc: "Guided knowledge modules", theme: "Learning Facts", c: "#22c55e" },
      { v: "myths", icon: "🔍", title: "Myth vs Fact", desc: "Interactive challenge", theme: "Dispelling Myths", c: "#f59e0b" },
      { v: "profiles", icon: "🦇", title: "Meet the Bats", desc: "Individual personalities", theme: "Appreciation", c: "#8b5cf6" },
      { v: "media", icon: "🎬", title: "Bat Media & VR", desc: "Live feed, 360° cave, echolocation", theme: "Entertainment", c: "#ec4899" },
      { v: "ecosystem", icon: "🌿", title: "Ecosystem", desc: "Web of life connections", theme: "Ecological Education", c: "#06b6d4" },
      { v: "cards", icon: "🃏", title: "Quick Learn", desc: "Flip-card micro-learning", theme: "Sticky Information", c: "#f97316" },
      { v: "community", icon: "💬", title: "Community", desc: "Share bat encounters", theme: "Community", c: "#14b8a6" },
      { v: "safety", icon: "🛡️", title: "Safety Guide", desc: "Coexistence tips", theme: "Public Understanding", c: "#eab308" },
    ];
    return (<div>
      <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(135deg,#06101d,#0c1a20,#0f1f15)", padding: "48px 40px", marginBottom: "32px", border: "1px solid rgba(34,197,94,0.06)" }}>
        {[...Array(25)].map((_, i) => <div key={i} style={{ position: "absolute", left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: `${1+Math.random()}px`, height: `${1+Math.random()}px`, background: "#fff", borderRadius: "50%", opacity: 0.15+Math.random()*0.25 }} />)}
        {[...Array(3)].map((_, i) => <div key={`hb${i}`} style={{ position: "absolute", color: "rgba(134,239,172,0.06)", width: `${20+i*6}px`, top: `${15+i*20}%`, right: `${8+i*12}%` }}><FlyingBat /></div>)}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "10px", color: "rgba(134,239,172,0.65)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "14px", fontWeight: "600" }}>Your Discovery Hub</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: "900", lineHeight: "1.1", marginBottom: "10px", letterSpacing: "-1.5px" }}>What will you<br /><span style={{ color: "#22c55e" }}>discover tonight?</span></h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: "1.6" }}>Explore interactive modules designed from research with bat ecologists and community members.</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "12px", marginBottom: "32px" }}>
        {cards.map((cd, i) => (
          <div key={cd.v} className="dash-card" onClick={() => setView(cd.v)} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px", padding: "24px", cursor: "pointer",
            position: "relative", overflow: "hidden",
            "--delay": `${i * 0.06}s`,
            "--accent": cd.c
          }}>
            <div className="dash-card-glow" style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: `radial-gradient(circle,${cd.c}10,transparent 70%)`, opacity: 0, transition: "opacity 0.3s" }} />
            <div style={{ fontSize: "28px", marginBottom: "14px" }}>{cd.icon}</div>
            <div style={{ fontSize: "16px", fontWeight: "700", marginBottom: "5px", position: "relative" }}>{cd.title}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.5", position: "relative" }}>{cd.desc}</div>
            <div style={{ marginTop: "12px", fontSize: "9px", color: cd.c, letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", opacity: 0.6, position: "relative" }}>{cd.theme}</div>
            {visited.has(cd.v) && <div style={{ position: "absolute", top: "10px", right: "10px", background: `${cd.c}15`, color: cd.c, fontSize: "9px", padding: "2px 7px", borderRadius: "5px", fontWeight: "600" }}>✓</div>}
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.06)", borderRadius: "20px", padding: "28px", textAlign: "center" }}>
        <div style={{ fontSize: "9px", color: "#22c55e", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Did You Know?</div>
        <p style={{ fontSize: "16px", fontWeight: "500", lineHeight: "1.6", color: "rgba(232,230,225,0.85)", maxWidth: "560px", margin: "0 auto" }}>{BAT_FACTS[factIdx].text}</p>
        <button onClick={() => { setFactIdx(p => (p+1)%BAT_FACTS.length); setFactsRead(p => new Set([...p, BAT_FACTS[factIdx].id])); }} style={{ marginTop: "18px", padding: "9px 22px", borderRadius: "10px", border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.05)", color: "#86efac", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Next Fact →</button>
      </div>
    </div>);
  };

  // ═══ ALL OTHER VIEWS — compact ═══
  const Facts = () => (<div>
    <SectionHead theme="Learning Facts + Ecological Education" title="Guided Knowledge Modules" desc="Tap each card to explore" />
    <div style={{ display: "flex", gap: "5px", marginBottom: "18px", flexWrap: "wrap" }}>
      {["all","ecology","biology","social"].map(c => <button key={c} onClick={() => setFactFilter(c)} style={{ padding: "6px 14px", borderRadius: "7px", border: `1px solid ${factFilter===c?"rgba(34,197,94,0.25)":"rgba(255,255,255,0.09)"}`, background: factFilter===c?"rgba(34,197,94,0.08)":"transparent", color: factFilter===c?"#86efac":"#4b5563", fontSize: "11px", cursor: "pointer", textTransform: "capitalize", fontWeight: factFilter===c?"700":"400" }}>{c==="all"?"All":c}</button>)}
    </div>
    {BAT_FACTS.filter(f => factFilter==="all"||f.category===factFilter).map((f,i) => (
      <div key={f.id} onClick={() => setFactsRead(p => new Set([...p,f.id]))} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "8px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={{ fontSize: "22px", marginRight: "8px" }}>{f.icon}</span><span style={{ fontSize: "15px", fontWeight: "700" }}>{f.title}</span><p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6", marginTop: "6px" }}>{f.text}</p><span style={{ display: "inline-block", fontSize: "9px", color: "#22c55e", background: "rgba(34,197,94,0.06)", padding: "2px 7px", borderRadius: "4px", marginTop: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>{f.source}</span></div>{factsRead.has(f.id) && <span style={{ color: "#22c55e", fontSize: "14px" }}>✓</span>}</div>
      </div>
    ))}
    <p style={{ fontSize: "11px", color: "#8b95a5", marginTop: "10px" }}>{factsRead.size}/8 read</p>
  </div>);

  const Myths = () => (<div>
    <SectionHead theme="Dispelling Myths" title="Myth vs Fact Challenge" desc="Classify each statement" />
    <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "24px", padding: "36px", textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
      {!mythDone ? (<>
        <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "18px" }}>{MYTHS_AND_FACTS.map((_,i) => <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: i<mythIdx||(i===mythIdx&&mythAns)?"#22c55e":i===mythIdx?"rgba(134,239,172,0.65)":"rgba(255,255,255,0.1)", transition: "all 0.3s" }} />)}</div>
        <div style={{ fontSize: "12px", color: "#8b95a5", marginBottom: "14px" }}>Q{mythIdx+1}/{MYTHS_AND_FACTS.length} • {mythScore.c}/{mythScore.t}</div>
        <p style={{ fontSize: "19px", fontWeight: "600", lineHeight: "1.5", marginBottom: "26px" }}>"{MYTHS_AND_FACTS[mythIdx].statement}"</p>
        {!mythAns && <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}><button onClick={() => handleMyth(true)} style={{ padding: "13px 34px", borderRadius: "14px", border: "2px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.05)", color: "#fca5a5", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>🚫 Myth</button><button onClick={() => handleMyth(false)} style={{ padding: "13px 34px", borderRadius: "14px", border: "2px solid rgba(34,197,94,0.35)", background: "rgba(34,197,94,0.05)", color: "#86efac", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>✅ Fact</button></div>}
        {mythAns && (<><div style={{ padding: "16px", borderRadius: "14px", background: mythAns.ok?"rgba(34,197,94,0.05)":"rgba(239,68,68,0.05)", border: `1px solid ${mythAns.ok?"rgba(34,197,94,0.12)":"rgba(239,68,68,0.12)"}`, marginTop: "14px", textAlign: "left" }}><div style={{ fontSize: "13px", fontWeight: "700", color: mythAns.ok?"#22c55e":"#ef4444", marginBottom: "4px" }}>{mythAns.ok?"✓ Correct!":"✗ Not quite!"}</div><p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{mythAns.exp}</p></div><button onClick={nextMyth} style={{ marginTop: "14px", padding: "9px 22px", borderRadius: "10px", border: "1px solid rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.05)", color: "#86efac", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{mythIdx<MYTHS_AND_FACTS.length-1?"Next →":"Results"}</button></>)}
      </>) : (<div><div style={{ fontSize: "48px", marginBottom: "10px" }}>{mythScore.c===MYTHS_AND_FACTS.length?"🏆":"📚"}</div><h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "6px" }}>{mythScore.c===MYTHS_AND_FACTS.length?"Perfect!":mythScore.c+"/"+MYTHS_AND_FACTS.length}</h3><button onClick={resetMyths} style={{ marginTop: "14px", padding: "11px 26px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>Try Again</button></div>)}
    </div>
  </div>);

  const Profiles = () => (<div>
    <SectionHead theme="Appreciation + Relatable Behaviors" title="Meet Our Bats" desc="Individual bats with unique stories" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "12px" }}>
      {BAT_PROFILES.map((b,i) => (<div key={b.id} onClick={() => setSelBat(selBat===b.id?null:b.id)} style={{ background: selBat===b.id?"rgba(139,92,246,0.05)":"rgba(255,255,255,0.08)", border: `1px solid ${selBat===b.id?"rgba(139,92,246,0.15)":"rgba(255,255,255,0.08)"}`, borderRadius: "18px", padding: "22px", cursor: "pointer", transition: "all 0.3s" }}>
        <div style={{ fontSize: "32px", marginBottom: "6px" }}>🦇</div><div style={{ fontSize: "19px", fontWeight: "800" }}>{b.name}</div><div style={{ fontSize: "10px", color: "#8b5cf6", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>{b.species}</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}><strong style={{ color: "#7a8494" }}>Age:</strong> {b.age} · <strong style={{ color: "#7a8494" }}>Wt:</strong> {b.weight}</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.5", marginTop: "4px" }}>{b.personality}</div>
        {selBat===b.id && <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}><strong style={{ color: "#7a8494" }}>Diet:</strong> {b.diet}</div><div style={{ fontSize: "12px", color: "#86efac", fontStyle: "italic", marginTop: "6px" }}>💡 {b.funFact}</div></div>}
        <div style={{ display: "inline-block", marginTop: "8px", fontSize: "10px", padding: "2px 9px", borderRadius: "10px", background: b.status==="Active"?"rgba(34,197,94,0.08)":"rgba(59,130,246,0.08)", color: b.status==="Active"?"#86efac":"#93c5fd", fontWeight: "600" }}>{b.status}</div>
      </div>))}
    </div>
  </div>);

  const Ecosystem = () => { const nodes = ["Bats","Insects","Plants","Seeds","Crops","Humans"]; const em = { Bats:"🦇",Insects:"🦟",Plants:"🌿",Seeds:"🌱",Crops:"🌾",Humans:"👤" }; const ac = ecoNode ? ECOSYSTEM_DATA.filter(c => c.from===ecoNode||c.to===ecoNode) : []; return (<div><SectionHead theme="Ecological Education" title="Ecosystem Explorer" desc="Tap to see connections" /><div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>{nodes.map(n => <div key={n} onClick={() => setEcoNode(ecoNode===n?null:n)} style={{ padding: "12px 20px", borderRadius: "14px", cursor: "pointer", textAlign: "center", minWidth: "90px", border: `2px solid ${ecoNode===n?"#22c55e":"rgba(255,255,255,0.08)"}`, background: ecoNode===n?"rgba(34,197,94,0.06)":"rgba(255,255,255,0.08)", transition: "all 0.3s" }}><div style={{ fontSize: "20px" }}>{em[n]}</div><div style={{ fontSize: "12px", fontWeight: "700", marginTop: "3px" }}>{n}</div></div>)}</div>{ecoNode ? <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "18px" }}><h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Connections: {ecoNode}</h3>{ac.map((c,i) => <div key={i} style={{ padding: "9px 12px", borderRadius: "10px", background: "rgba(34,197,94,0.03)", border: "1px solid rgba(34,197,94,0.06)", marginBottom: "6px", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}><strong style={{ color: "#86efac" }}>{c.from}</strong> → <strong style={{ color: "#86efac" }}>{c.to}</strong>: {c.label}</div>)}</div> : <p style={{ textAlign: "center", color: "#8b95a5", fontSize: "12px", padding: "20px" }}>↑ Tap above to explore</p>}</div>); };

  const Cards = () => (<div><SectionHead theme="Sticky Information" title="Quick Learn Cards" desc="Tap to flip" /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "12px" }}>{MICRO_CARDS.map((c,i) => { const f = flipped.has(c.id); return (<div key={c.id} onClick={() => setFlipped(p => { const n=new Set(p); n.has(c.id)?n.delete(c.id):n.add(c.id); return n; })} style={{ minHeight: "190px", borderRadius: "18px", padding: "26px", cursor: "pointer", background: f?c.color:"rgba(255,255,255,0.08)", border: `1px solid ${f?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.08)"}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: f?"flex-start":"center", textAlign: f?"left":"center", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>{!f ? <><div style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.4" }}>{c.front}</div><div style={{ fontSize: "10px", color: "#8b95a5", marginTop: "10px" }}>Tap to reveal</div></> : <div style={{ fontSize: "13px", lineHeight: "1.7", color: "rgba(255,255,255,0.7)" }}>{c.back}</div>}</div>); })}</div></div>);

  const Media = () => { const ts = (a) => ({ padding: "9px 18px", borderRadius: "11px", cursor: "pointer", fontSize: "12px", fontWeight: a?"700":"400", border: `1px solid ${a?"rgba(236,72,153,0.25)":"rgba(255,255,255,0.08)"}`, background: a?"rgba(236,72,153,0.06)":"rgba(255,255,255,0.08)", color: a?"#f9a8d4":"#4b5563", transition: "all 0.2s" }); return (<div>
    <SectionHead theme="Entertainment + Interactive Technologies" title="Bat Media & Immersive Experiences" desc="Watch, explore, experience" />
    <div style={{ display: "flex", gap: "6px", marginBottom: "22px", flexWrap: "wrap" }}>{[{id:"livefeed",l:"🎥 Videos"},{id:"vr",l:"🥽 360° Cave"},{id:"echo",l:"📡 Echolocation"}].map(t => <button key={t.id} onClick={() => setMediaTab(t.id)} style={ts(mediaTab===t.id)}>{t.l}</button>)}</div>

    {mediaTab==="livefeed" && <div>
      <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(239,68,68,0.12)", marginBottom: "22px" }}>
        <div style={{ height: "280px", position: "relative", background: "radial-gradient(ellipse at center,#141428,#050510)" }}>
          {[...Array(12)].map((_,i) => <div key={i} style={{ position: "absolute", left: `${12+Math.sin(i*1.2)*30+20}%`, top: `${8+(i%5)*16}%`, fontSize: `${14+(i%3)*3}px`, opacity: 0.35, color: "#4a6a5a" }}>🦇</div>)}
          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: "7px" }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} /><span style={{ fontSize: "10px", color: "#fca5a5", fontWeight: "600" }}>LIVE</span></div>
          <div style={{ position: "absolute", bottom: "12px", right: "12px", fontSize: "9px", color: "#8b95a5", background: "rgba(0,0,0,0.6)", padding: "3px 8px", borderRadius: "5px" }}>🌡️ 28.4°C • 🦇 47</div>
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.15)" }}><div style={{ fontSize: "13px", fontWeight: "700" }}>Live Colony — Barn Maternity Roost</div><div style={{ fontSize: "10px", color: "#8b95a5", marginTop: "2px" }}>Peak at dusk 8:30–9:15 PM</div></div>
      </div>
      <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Featured Videos</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
        {VIDEO_ITEMS.map((v,i) => <div key={v.id} onClick={() => setPlayVid(playVid===v.id?null:v.id)} style={{ background: playVid===v.id?"rgba(236,72,153,0.04)":"rgba(255,255,255,0.08)", border: `1px solid ${playVid===v.id?"rgba(236,72,153,0.15)":"rgba(255,255,255,0.08)"}`, borderRadius: "14px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s" }}>
          <div style={{ height: "110px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0d1a12,#1a0d1a)", position: "relative" }}><span style={{ fontSize: "32px" }}>{v.emoji}</span><span style={{ position: "absolute", bottom: "5px", right: "6px", background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: "9px", padding: "2px 5px", borderRadius: "3px" }}>{v.dur}</span></div>
          <div style={{ padding: "10px" }}><div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "2px" }}>{v.title}</div><div style={{ fontSize: "10px", color: "#8b95a5" }}>{v.desc}</div></div>
          {playVid===v.id && <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,0.03)", background: "rgba(236,72,153,0.02)", fontSize: "11px", color: "#f9a8d4", textAlign: "center" }}>▶ Playing...</div>}
        </div>)}
      </div>
    </div>}

    {mediaTab==="vr" && <div>
      <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(139,92,246,0.12)", marginBottom: "18px" }}>
        <div style={{ height: "320px", position: "relative", background: `radial-gradient(ellipse at ${50+vrAngle*10}% 50%,#1e1435,#050508)`, transition: "background 0.5s" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", fontSize: `${24*vrZoom}px`, transition: "font-size 0.3s" }}>{VR_SCENES[vrAngle].els.map((e,i) => <span key={i} style={{ opacity: 0.75 }}>{e}</span>)}</div>
          <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.7)", padding: "5px 10px", borderRadius: "8px", border: "1px solid rgba(139,92,246,0.15)" }}><div style={{ fontSize: "9px", color: "#a78bfa", fontWeight: "600", letterSpacing: "1px" }}>🥽 360°</div><div style={{ fontSize: "12px", fontWeight: "700", marginTop: "1px" }}>{VR_SCENES[vrAngle].label}</div></div>
          <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", background: "rgba(0,0,0,0.7)", padding: "10px 14px", borderRadius: "10px" }}><p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", lineHeight: "1.5" }}>{VR_SCENES[vrAngle].desc}</p></div>
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", gap: "5px" }}>{VR_SCENES.map((s,i) => <button key={i} onClick={() => setVrAngle(i)} style={{ padding: "4px 10px", borderRadius: "7px", border: `1px solid ${vrAngle===i?"rgba(139,92,246,0.25)":"rgba(255,255,255,0.08)"}`, background: vrAngle===i?"rgba(139,92,246,0.08)":"transparent", color: vrAngle===i?"#c4b5fd":"#374151", fontSize: "10px", cursor: "pointer", fontWeight: vrAngle===i?"700":"400" }}>{s.label}</button>)}</div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}><button onClick={() => setVrZoom(Math.max(0.6,vrZoom-0.2))} style={{ width: "24px", height: "24px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#7a8494", cursor: "pointer", fontSize: "12px" }}>−</button><span style={{ fontSize: "10px", color: "#8b95a5", minWidth: "28px", textAlign: "center" }}>{Math.round(vrZoom*100)}%</span><button onClick={() => setVrZoom(Math.min(2,vrZoom+0.2))} style={{ width: "24px", height: "24px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#7a8494", cursor: "pointer", fontSize: "12px" }}>+</button></div>
        </div>
      </div>
    </div>}

    {mediaTab==="echo" && <div>
      <div style={{ background: "linear-gradient(135deg,#0a1a0a,#0a0a1a)", border: "1px solid rgba(34,197,94,0.08)", borderRadius: "20px", padding: "30px", textAlign: "center" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "4px" }}>Echolocation Simulator</h3>
        <p style={{ fontSize: "12px", color: "#8b95a5", marginBottom: "24px", maxWidth: "420px", margin: "0 auto 24px" }}>Emit an ultrasonic pulse and watch objects reveal in darkness.</p>
        <div style={{ width: "260px", height: "260px", margin: "0 auto 22px", borderRadius: "50%", position: "relative", background: "radial-gradient(circle,rgba(34,197,94,0.03),rgba(0,0,0,0.3))", border: "1px solid rgba(34,197,94,0.06)" }}>
          <SonarRings active={echoOn} phase={echoPh} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "24px", filter: echoOn?"drop-shadow(0 0 12px rgba(34,197,94,0.6))":"none", transition: "filter 0.3s" }}>🦇</div>
          {echoObjs.map((o,i) => { const a=(i/echoObjs.length)*Math.PI*2-Math.PI/2; const r=70+(i%3)*20; return <div key={i} style={{ position: "absolute", left: `${130+Math.cos(a)*r-12}px`, top: `${130+Math.sin(a)*r-12}px`, width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", opacity: echoPh>=o.at?1:0.06, transition: "all 0.5s", filter: echoPh>=o.at?"drop-shadow(0 0 6px rgba(34,197,94,0.5))":"none" }}>{o.emoji}</div>; })}
        </div>
        <button onClick={startEcho} disabled={echoOn} style={{ padding: "13px 32px", borderRadius: "14px", border: "2px solid rgba(34,197,94,0.25)", background: echoOn?"rgba(34,197,94,0.1)":"linear-gradient(135deg,rgba(34,197,94,0.08),rgba(16,185,129,0.04))", color: "#86efac", fontSize: "14px", fontWeight: "700", cursor: echoOn?"default":"pointer", opacity: echoOn?0.5:1 }}>{echoOn?`Scanning ${echoPh}/8`:"🔊 Emit Pulse"}</button>
        {echoPh>0 && <div style={{ marginTop: "18px", textAlign: "left", background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,255,255,0.03)" }}><div style={{ fontSize: "9px", color: "#22c55e", fontWeight: "600", letterSpacing: "1px", marginBottom: "6px" }}>DETECTED:</div>{echoObjs.filter(o => echoPh>=o.at).map((o,i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 0", fontSize: "11px", color: "rgba(255,255,255,0.6)" }}><span style={{ fontSize: "13px" }}>{o.emoji}</span><strong style={{ color: "#e8e6e1" }}>{o.name}</strong><span>— {o.dist}</span></div>)}</div>}
      </div>
    </div>}
  </div>); };

  const Community = () => (<div><SectionHead theme="Community Interaction" title="Bat Encounters" desc="Stories and sharing" />{COMMUNITY_STORIES.map((s,i) => <div key={s.id} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px", marginBottom: "8px" }}><div style={{ fontSize: "13px", fontWeight: "700" }}>{s.author}</div><div style={{ fontSize: "10px", color: "#8b95a5", marginBottom: "6px" }}>{s.location} • {s.date}</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{s.text}</div><div style={{ fontSize: "11px", color: "#22c55e", marginTop: "6px" }}>❤️ {s.likes}</div></div>)}
    <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px", marginTop: "16px" }}><h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px" }}>Share Yours</h3>{!storySent ? <><textarea value={story} onChange={e => setStory(e.target.value)} placeholder="Your bat experience..." style={{ width: "100%", minHeight: "90px", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px", color: "#e8e6e1", fontSize: "12px", resize: "vertical", outline: "none", fontFamily: "inherit" }} /><button onClick={() => { setStorySent(true); if(!badges.has("social")) award("social"); }} disabled={story.length<10} style={{ marginTop: "8px", padding: "9px 22px", borderRadius: "10px", border: "none", background: story.length>=10?"linear-gradient(135deg,#16a34a,#22c55e)":"rgba(255,255,255,0.03)", color: story.length>=10?"#fff":"#374151", fontSize: "12px", fontWeight: "700", cursor: story.length>=10?"pointer":"default" }}>Submit</button></> : <p style={{ textAlign: "center", color: "#86efac", fontSize: "12px", padding: "12px" }}>✅ Thanks! Pending review.</p>}</div>
  </div>);

  const Safety = () => (<div><SectionHead theme="Public Understanding + Safety" title="Safety Guide" desc="Verified by biologists" />{SAFETY_ITEMS.map((s,i) => <div key={s.id} onClick={() => setSafeOpen(safeOpen===s.id?null:s.id)} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${safeOpen===s.id?"rgba(234,179,8,0.12)":"rgba(255,255,255,0.08)"}`, borderRadius: "14px", padding: "14px 16px", marginBottom: "6px", cursor: "pointer", transition: "all 0.3s" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: "700" }}><span>{s.icon} {s.title}</span><span style={{ color: "#8b95a5", fontSize: "14px" }}>{safeOpen===s.id?"−":"+"}</span></div>{safeOpen===s.id && <div style={{ marginTop: "8px", fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{s.content}</div>}</div>)}</div>);

  const BadgesView = () => (<div><SectionHead theme="Entertainment + Gamification" title="My Badges" desc={`${badges.size}/${BADGES.length} earned`} /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "12px" }}>{BADGES.map((b,i) => <div key={b.id} style={{ padding: "22px", borderRadius: "16px", textAlign: "center", background: badges.has(b.id)?"rgba(34,197,94,0.05)":"rgba(255,255,255,0.01)", border: `1px solid ${badges.has(b.id)?"rgba(34,197,94,0.12)":"rgba(255,255,255,0.09)"}`, opacity: badges.has(b.id)?1:0.25 }}><div style={{ fontSize: "30px", marginBottom: "6px" }}>{b.icon}</div><div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "2px" }}>{b.name}</div><div style={{ fontSize: "10px", color: "#8b95a5" }}>{b.desc}</div>{badges.has(b.id) && <div style={{ marginTop: "6px", fontSize: "9px", color: "#22c55e", fontWeight: "700" }}>✓ EARNED</div>}</div>)}</div></div>);

  const R = () => { switch(view) { case "landing": return <Landing />; case "dashboard": return <Dashboard />; case "facts": return <Facts />; case "myths": return <Myths />; case "profiles": return <Profiles />; case "ecosystem": return <Ecosystem />; case "cards": return <Cards />; case "media": return <Media />; case "community": return <Community />; case "safety": return <Safety />; case "badges": return <BadgesView />; default: return <Dashboard />; } };

  return (
    <div onClick={(e) => { if (!e.target.closest('[data-dropdown]')) setOpenDrop(null); }} style={{ minHeight: "100vh", background: "#0c1220", color: "#e8e6e1", fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif" }}>
      {badgeNotif && <div style={{ position: "fixed", top: "76px", right: "20px", zIndex: 300, background: "linear-gradient(135deg,#0f1f15,#132218)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "14px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}><span style={{ fontSize: "26px" }}>{badgeNotif.icon}</span><div><div style={{ fontSize: "9px", color: "#7a8494", letterSpacing: "1px" }}>BADGE EARNED</div><div style={{ fontSize: "13px", fontWeight: "700", color: "#86efac" }}>{badgeNotif.name}</div></div></div>}

      {view !== "landing" && <header style={{ background: "rgba(5,10,18,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.03)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px" }}>
          <div onClick={() => setView("dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,rgba(34,197,94,0.12),rgba(16,185,129,0.06))", border: "1px solid rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", boxShadow: "0 0 12px rgba(34,197,94,0.08)" }}>🦇</div>
            <span style={{ fontSize: "16px", fontWeight: "800", background: "linear-gradient(135deg,#86efac,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BatLyf</span>
          </div>

          {/* Desktop nav — categorized with dropdowns */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {navCategories.map((cat) => {
              if (!cat.items) {
                // Simple link (Home)
                return <button key={cat.id} onClick={() => setView(cat.id)} style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: view === cat.id ? "rgba(34,197,94,0.08)" : "transparent", color: view === cat.id ? "#86efac" : "#6b7280", fontSize: "12px", fontWeight: view === cat.id ? "700" : "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>{cat.icon} {cat.label}</button>;
              }
              // Dropdown category
              const isActive = cat.items.some(it => it.id === view);
              const isOpen = openDrop === cat.label;
              return (
                <div key={cat.label} style={{ position: "relative" }} data-dropdown="true">
                  <button onClick={() => setOpenDrop(isOpen ? null : cat.label)} style={{ padding: "6px 12px", borderRadius: "8px", border: "none", background: isActive ? "rgba(34,197,94,0.08)" : isOpen ? "rgba(255,255,255,0.08)" : "transparent", color: isActive ? "#86efac" : "#6b7280", fontSize: "12px", fontWeight: isActive ? "700" : "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                    {cat.icon} {cat.label} <span style={{ fontSize: "8px", marginLeft: "2px", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
                  </button>
                  {isOpen && (
                    <div style={{ position: "absolute", top: "100%", left: "0", marginTop: "4px", background: "rgba(10,15,25,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "6px", minWidth: "180px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", zIndex: 200 }}>
                      {cat.items.map(item => (
                        <button key={item.id} onClick={() => { setView(item.id); setOpenDrop(null); }} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "8px 12px", borderRadius: "8px", border: "none", background: view === item.id ? "rgba(34,197,94,0.08)" : "transparent", color: view === item.id ? "#86efac" : "#9ca3af", fontSize: "12px", fontWeight: view === item.id ? "600" : "400", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                          <span>{item.i}</span> {item.l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="desktop-nav" style={{ fontSize: "11px", color: "#8b95a5" }}><span style={{ color: "#86efac" }}>🏅{badges.size}</span> • {visited.size} areas</div>

            {/* Hamburger — mobile only */}
            <button className="mobile-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", flexDirection: "column", gap: "4px", padding: "6px", background: "transparent", border: "none", cursor: "pointer" }}>
              <span style={{ width: "20px", height: "2px", background: mobileOpen ? "#86efac" : "#6b7280", borderRadius: "1px", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ width: "20px", height: "2px", background: mobileOpen ? "transparent" : "#6b7280", borderRadius: "1px", transition: "all 0.2s" }} />
              <span style={{ width: "20px", height: "2px", background: mobileOpen ? "#86efac" : "#6b7280", borderRadius: "1px", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile slide-out menu */}
        {mobileOpen && (
          <div className="mobile-menu" style={{ padding: "8px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            {navCategories.map((cat) => {
              if (!cat.items) {
                return <button key={cat.id} onClick={() => { setView(cat.id); setMobileOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 12px", borderRadius: "8px", border: "none", background: view === cat.id ? "rgba(34,197,94,0.08)" : "transparent", color: view === cat.id ? "#86efac" : "#9ca3af", fontSize: "14px", fontWeight: view === cat.id ? "700" : "400", cursor: "pointer", textAlign: "left" }}>{cat.icon} {cat.label}</button>;
              }
              return (
                <div key={cat.label} style={{ marginTop: "4px" }}>
                  <div style={{ fontSize: "10px", color: "#8b95a5", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 12px 4px", fontWeight: "600" }}>{cat.icon} {cat.label}</div>
                  {cat.items.map(item => (
                    <button key={item.id} onClick={() => { setView(item.id); setMobileOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "9px 12px 9px 24px", borderRadius: "8px", border: "none", background: view === item.id ? "rgba(34,197,94,0.08)" : "transparent", color: view === item.id ? "#86efac" : "#9ca3af", fontSize: "13px", fontWeight: view === item.id ? "600" : "400", cursor: "pointer", textAlign: "left" }}>
                      {item.i} {item.l}
                    </button>
                  ))}
                </div>
              );
            })}
            <div style={{ padding: "10px 12px", fontSize: "11px", color: "#8b95a5", borderTop: "1px solid rgba(255,255,255,0.03)", marginTop: "8px" }}>
              <span style={{ color: "#86efac" }}>🏅 {badges.size} badges</span> • {visited.size} areas explored
            </div>
          </div>
        )}
      </header>}

      {view === "landing" ? R() : <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px" }}>
        {view !== "dashboard" && <button onClick={() => setView("dashboard")} style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#8b95a5", fontSize: "11px", cursor: "pointer", marginBottom: "18px", display: "inline-flex", alignItems: "center", gap: "4px" }}>← Home</button>}
        {R()}
      </main>}

      {view !== "landing" && <footer style={{ maxWidth: "1280px", margin: "40px auto 0", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.09)", textAlign: "center", fontSize: "10px", color: "#6b7580" }}>BatLyf — All Rights Reserved © 2025</footer>}

      <style>{`
        @keyframes twinkle{from{opacity:.1}to{opacity:.8}}
        @keyframes moonGlow{from{box-shadow:0 0 60px rgba(245,240,208,.12)}to{box-shadow:0 0 90px rgba(245,240,208,.2)}}
        @keyframes flyAcross{from{left:-80px}to{left:calc(100% + 80px)}}
        @keyframes firefly{from{opacity:0;transform:translate(0,0)}to{opacity:.8;transform:translate(8px,-8px)}}
        @keyframes batFloat{from{transform:translateY(0) rotate(-3deg)}to{transform:translateY(-10px) rotate(3deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes ctaPulse{0%,100%{box-shadow:0 0 20px rgba(34,197,94,.06)}50%{box-shadow:0 0 40px rgba(34,197,94,.18)}}
        @keyframes scrollBounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes sonarExpand{from{opacity:.5}to{opacity:0}}
        .bwl{transform-origin:35px 20px}
        .bwr{transform-origin:45px 20px}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{display:none}
        button{transition:all .2s}

        /* Dashboard cards — clean hover only, no animations */
        .dash-card{
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .dash-card:hover{
          transform:translateY(-4px);
          border-color:rgba(255,255,255,0.12);
          box-shadow:0 8px 24px rgba(0,0,0,0.3);
        }
        .dash-card:hover .dash-card-glow{
          opacity:1!important;
        }

        /* Desktop nav visible, hamburger hidden */
        .desktop-nav{display:flex!important}
        .mobile-hamburger{display:none!important}
        .mobile-menu{display:block}

        /* Close dropdown when clicking outside */
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .mobile-hamburger{display:flex!important}
        }
        @media(min-width:769px){
          .mobile-menu{display:none!important}
          .mobile-hamburger{display:none!important}
        }
      `}</style>
    </div>
  );
}
