export const VIDEOS = {
  energyFlow: { src: "/videos/energy-flow.mp4", poster: "/posters/energy-flow.jpg" },
  exploded: {
    src: "/videos/exploded-transformer.mp4",
    poster: "/posters/exploded-transformer.jpg",
  },
  manufacturing: {
    src: "/videos/manufacturing.mp4",
    poster: "/posters/manufacturing.jpg",
  },
} as const;

export type Step = { code: string; title: string; body: string };

export const deliverySteps: Step[] = [
  {
    code: "01",
    title: "Grid demand",
    body: "Utilities, industry, and renewable developers define the load profile — voltage class, rating, impedance, losses, and site conditions. Every SVASCA build starts from the specification, not a catalogue shelf.",
  },
  {
    code: "02",
    title: "In-house design",
    body: "Electrical and mechanical design is executed by our own engineering team — core sizing, winding geometry, insulation coordination, and thermal design optimised for low no-load loss and safe temperature rise.",
  },
  {
    code: "03",
    title: "Precision manufacturing",
    body: "From copper and aluminium wire drawing to CRGO slitting, annealing, winding, and tank fabrication — every core process runs inside our Palwal and Rudrapur plants under a single quality system.",
  },
  {
    code: "04",
    title: "Type-tested proof",
    body: "Units are type-tested at NABL-accredited laboratories — CPRI, ERDA, NTH — and routine-tested in-house on every dispatch. Performance is demonstrated, not assumed.",
  },
  {
    code: "05",
    title: "Engineered delivery",
    body: "Oil-filled, dried, painted, and packed for transit — delivered on schedule with test certificates, ready for commissioning into the grid.",
  },
];

export const energyFlowSteps: Step[] = [
  {
    code: "01",
    title: "Input",
    body: "HV terminals and bushings receive incoming supply — graded insulation and surge coordination protect the active part from system transients.",
  },
  {
    code: "02",
    title: "Core",
    body: "Low-loss CRGO laminations — slit, cut, and annealed in-house — form a magnetic circuit engineered for minimal no-load loss and low noise.",
  },
  {
    code: "03",
    title: "Winding",
    body: "Copper and aluminium conductors drawn and wound in-house. Winding geometry is optimised for short-circuit strength and uniform voltage distribution.",
  },
  {
    code: "04",
    title: "Insulation",
    body: "Kraft paper, pressboard, and processed oil — or VPI resin in dry-type units — build an insulation system dried and verified before energisation.",
  },
  {
    code: "05",
    title: "Cooling",
    body: "Radiators and oil circulation hold winding temperature rise within limits, extending insulation life and preserving overload capacity.",
  },
  {
    code: "06",
    title: "Output",
    body: "LV terminations deliver stepped voltage to the network — with tap changers providing regulation across the specified range.",
  },
  {
    code: "07",
    title: "Protection",
    body: "Buchholz relay, pressure relief, temperature indicators, and earthing provisions guard the unit through decades of service.",
  },
];

export type ProductFamily = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
};

export const productFamilies: ProductFamily[] = [
  {
    id: "power",
    code: "PT-66",
    name: "Power Transformers",
    tagline: "Grid-class capacity for transmission and bulk supply.",
    description:
      "Three-phase power transformers up to 20 MVA in the 66 kV class, built around low-loss CRGO cores and in-house wound copper coils. Designed, manufactured, and routine-tested under one roof, with type tests at CPRI, ERDA, and NTH.",
    specs: [
      { label: "Rating", value: "Up to 20 MVA" },
      { label: "Voltage class", value: "66 kV" },
      { label: "Cooling", value: "ONAN / ONAF" },
      { label: "Tap changer", value: "OCTC / OLTC" },
      { label: "Type testing", value: "CPRI · ERDA · NTH" },
    ],
    features: [
      "Low no-load and load losses",
      "High short-circuit withstand",
      "Dual-ratio options",
      "Low noise design",
    ],
  },
  {
    id: "distribution",
    code: "DT-33",
    name: "Distribution Transformers",
    tagline: "The workhorse of the last mile, up to 33 kV class.",
    description:
      "Single-phase units up to 150 kVA, three-phase units up to 5000 kVA, and hermetically sealed designs up to 2500 kVA. BIS-marked and BEE-approved energy-efficient designs for utility and industrial distribution.",
    specs: [
      { label: "Three phase", value: "Up to 5000 kVA" },
      { label: "Single phase", value: "Up to 150 kVA" },
      { label: "Hermetically sealed", value: "Up to 2500 kVA" },
      { label: "Voltage class", value: "Up to 33 kV" },
      { label: "Efficiency", value: "BEE star-rated" },
    ],
    features: [
      "BIS certified",
      "Low maintenance sealed variants",
      "Compact footprint",
      "High power factor performance",
    ],
  },
  {
    id: "dry",
    code: "VPI-33",
    name: "VPI Dry Type Transformers",
    tagline: "Fire-safe indoor power without oil.",
    description:
      "Vacuum pressure impregnated dry-type transformers up to 3000 kVA in the 33 kV class. Resin-impregnated windings deliver fire safety for buildings, metros, and process plants where oil is not an option.",
    specs: [
      { label: "Rating", value: "Up to 3000 kVA" },
      { label: "Voltage class", value: "33 kV" },
      { label: "Insulation", value: "VPI resin, Class F/H" },
      { label: "Cooling", value: "AN / AF" },
      { label: "Location", value: "Indoor / near-load" },
    ],
    features: [
      "No oil — reduced fire risk",
      "Low partial discharge",
      "Minimal maintenance",
      "Safe for occupied buildings",
    ],
  },
  {
    id: "uss",
    code: "USS-11",
    name: "Unitized Sub-stations",
    tagline: "A complete substation in one engineered package.",
    description:
      "Packaged and unitized substations from 200 kVA to 1250 kVA in the 11 kV class — transformer, HT and LT switchgear integrated in a compact, weather-proof enclosure. Delivered as a tested unit, commissioned in days.",
    specs: [
      { label: "Rating", value: "200 – 1250 kVA" },
      { label: "Voltage class", value: "11 kV" },
      { label: "Configuration", value: "HT + TX + LT integrated" },
      { label: "Enclosure", value: "Weather-proof, compact" },
      { label: "Installation", value: "Plug-and-play" },
    ],
    features: [
      "Factory-tested as a unit",
      "Minimal site civil work",
      "Compact urban footprint",
      "Rapid commissioning",
    ],
  },
  {
    id: "special",
    code: "SP-XX",
    name: "Special Transformers",
    tagline: "Engineered-to-order for demanding applications.",
    description:
      "Auto, furnace, booster, dual-ratio, earthing, generator, induction duty, isolation, mining, rectifier, solar generation, testing, AC/DC drive, and zig-zag transformers — each designed in-house around the duty cycle it must survive.",
    specs: [
      { label: "Variants", value: "15+ application types" },
      { label: "Duty", value: "Furnace · rectifier · solar · mining" },
      { label: "Design", value: "In-house, per application" },
      { label: "Testing", value: "Routine + special tests" },
      { label: "Delivery", value: "Engineered to order" },
    ],
    features: [
      "Application-specific design",
      "Harsh duty-cycle ratings",
      "Solar and drive-duty ready",
      "Zig-zag and earthing variants",
    ],
  },
];

export type ProcessStage = { code: string; title: string; body: string; tag: string };

export const processStages: ProcessStage[] = [
  {
    code: "01",
    title: "Raw material",
    tag: "INPUT QC",
    body: "Copper, aluminium, CRGO steel, insulation kraft, and transformer oil are inspected against specification before entering the line.",
  },
  {
    code: "02",
    title: "CRGO processing",
    tag: "CORE STEEL",
    body: "Cold-rolled grain-oriented steel is slit, cut, and annealed in-house — preserving the magnetic properties that keep no-load losses low.",
  },
  {
    code: "03",
    title: "Winding",
    tag: "COILS",
    body: "Copper and aluminium conductors, drawn in our own wire-drawing shop, are wound into HV and LV coils with controlled tension and geometry.",
  },
  {
    code: "04",
    title: "Core & coil assembly",
    tag: "ACTIVE PART",
    body: "Laminations are stacked and coils mounted to form the active part — clamped, braced, and checked for ratio and polarity.",
  },
  {
    code: "05",
    title: "Drying",
    tag: "MOISTURE OUT",
    body: "The active part is oven-dried to drive moisture from the insulation system before tanking — the foundation of dielectric strength.",
  },
  {
    code: "06",
    title: "Tank fabrication",
    tag: "STEEL WORK",
    body: "Tanks, radiators, and fittings are fabricated and pressure-tested in-house, then shot-blasted for coating adhesion.",
  },
  {
    code: "07",
    title: "Oil processing",
    tag: "CENTRIFUGE",
    body: "Transformer oil is filtered, degassed, and dehydrated in centrifuging plants until dielectric strength exceeds specification.",
  },
  {
    code: "08",
    title: "Testing",
    tag: "PROOF",
    body: "Every unit passes the full routine test sequence in our in-house test bay; type and special tests run at CPRI, ERDA, and NTH.",
  },
  {
    code: "09",
    title: "Painting",
    tag: "FINISH",
    body: "Multi-coat paint systems are applied and adhesion-tested for the plant, coastal, or desert environment the unit will live in.",
  },
  {
    code: "10",
    title: "Packing & dispatch",
    tag: "DELIVERY",
    body: "Units are sealed, packed, and dispatched with full test documentation — timely delivery is a design parameter, not an afterthought.",
  },
];

export type TestItem = { code: string; name: string; kind: "RT" | "TT" | "ST" };

export const tests: TestItem[] = [
  { code: "T-01", name: "Insulation resistance", kind: "RT" },
  { code: "T-02", name: "Voltage ratio", kind: "RT" },
  { code: "T-03", name: "Vector relationship", kind: "RT" },
  { code: "T-04", name: "Winding resistance", kind: "RT" },
  { code: "T-05", name: "Separate source withstand", kind: "RT" },
  { code: "T-06", name: "Induced overvoltage withstand", kind: "RT" },
  { code: "T-07", name: "No-load loss & current", kind: "RT" },
  { code: "T-08", name: "Load loss & impedance", kind: "RT" },
  { code: "T-09", name: "Temperature rise", kind: "TT" },
  { code: "T-10", name: "Acoustic sound level", kind: "TT" },
  { code: "T-11", name: "Harmonics measurement", kind: "ST" },
  { code: "T-12", name: "Oil dielectric strength", kind: "RT" },
  { code: "T-13", name: "Leakage & pressure", kind: "RT" },
  { code: "T-14", name: "Vacuum test", kind: "ST" },
  { code: "T-15", name: "Paint adhesion", kind: "ST" },
];

export const CONTACT = {
  company: "SVASCA Industries (India) Ltd.",
  unit1: {
    label: "Office & Works",
    address:
      "48th Mile Stone, Delhi-Mathura Road, Village Prithla, Dist. Palwal, Haryana — 121102",
  },
  unit2: {
    label: "Unit 2",
    address:
      "Plot No. 19, Sector 06, I.I.E. SIDCUL, Pant Nagar, Rudrapur, Uttarakhand — 263153",
  },
  emails: ["marketing@svascaindia.com", "info@svascaindia.com"],
  website: "www.svascaindia.com",
} as const;
