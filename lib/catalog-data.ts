export interface Suit {
  id: string
  name: string
  code: string
  cut: string
  pieces: string
  color: 'navy' | 'black' | 'neutral' | 'earth' | 'green'
  colorLabel: string
  img: string
  note: string
}

export interface SuitFilter {
  key: 'all' | Suit['color']
  label: string
}

export interface Package {
  id: string
  name: string
  tag: string
  blurb: string
  hero: string
  shots: string[]
  includes: string[]
}

export interface PocketSquare {
  id: string
  name: string
  color: 'blue' | 'red' | 'black' | 'green' | 'earth' | 'neutral'
  img: string
}

export interface SquareFilter {
  key: 'all' | PocketSquare['color']
  label: string
}

export interface Watch {
  id: string
  name: string
  desc: string
  img: string
}

export interface Pin {
  id: string
  number: string
  name: string
  material: string
  img: string
}

export interface AccessoryItem {
  id: string
  name: string
  desc: string
  swatch: string
  badge: string
  img: string
}

export interface GrwmReel {
  id: string
  episode: string
  title: string
  duration: string
  src: string
}

/* ─── SUITS ─────────────────────────────────────────────── */

export const SUITS: Suit[] = [
  { id: 's1',  name: 'Il Marchese',    code: '6618',  color: 'navy',    colorLabel: 'Notte Navy',      cut: 'Single-breasted', pieces: 'Three-piece', img: '/catalog/suits/s1.jpg',  note: 'A peak-lapel three-piece in deep navy worsted — the house signature, drawn for the man who arrives early and leaves last.' },
  { id: 's2',  name: 'Nero Assoluto',  code: 'QBA68', color: 'black',   colorLabel: 'Absolute Black',  cut: 'Single-breasted', pieces: 'Three-piece', img: '/catalog/suits/s2.jpg',  note: 'Pure black, peak lapel, waistcoat cut close. The uniform of consequence.' },
  { id: 's3',  name: 'The Birmingham', code: '—',     color: 'black',   colorLabel: 'Jet Black',       cut: 'Single-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s3.jpg',  note: 'A lean two-piece with attitude — clean shoulder, soft drape, quietly sharp.' },
  { id: 's4',  name: 'Mezzanotte',     code: '2066',  color: 'black',   colorLabel: 'Midnight',        cut: 'Single-breasted', pieces: 'Three-piece', img: '/catalog/suits/s4.jpg',  note: 'Blue-black worsted that reads ink under light and black after dark.' },
  { id: 's5',  name: 'Il Capitano',    code: '—',     color: 'navy',    colorLabel: 'Royal Navy',      cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s5.jpg',  note: 'Six-on-two double-breasted navy with a confident peak lapel and a maritime cut.' },
  { id: 's6',  name: 'Avorio',         code: '2719',  color: 'neutral', colorLabel: 'Ivory',           cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s6.jpg',  note: 'Ivory double-breasted with antique-gold buttons — for weddings, regattas and entrances.' },
  { id: 's7',  name: 'Il Diplomatico', code: '2086',  color: 'navy',    colorLabel: 'Deep Navy',       cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s7.jpg',  note: 'Navy double-breasted finished with a brass lapel chain. Diplomacy, tailored.' },
  { id: 's8',  name: 'Verde Bosco',    code: '—',     color: 'green',   colorLabel: 'Forest Green',    cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s8.jpg',  note: 'A near-black forest green that only shows its colour when it wants to.' },
  { id: 's9',  name: 'Il Cammello',    code: '—',     color: 'earth',   colorLabel: 'Camel',           cut: 'Double-breasted', pieces: 'Three-piece', img: '/catalog/suits/s9.jpg',  note: 'Warm camel double-breasted three-piece — autumn\'s most persuasive argument.' },
  { id: 's10', name: 'Panna',          code: '2719',  color: 'neutral', colorLabel: 'Cream',           cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s10.jpg', note: 'Soft cream with gold buttons; a lighter cousin to the Avorio.' },
  { id: 's11', name: 'Fumo di Londra', code: '—',     color: 'neutral', colorLabel: 'London Grey',     cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s11.jpg', note: 'Pale London smoke — a double-breasted answer to the grey flannel rule.' },
  { id: 's12', name: 'Pietra',         code: '—',     color: 'neutral', colorLabel: 'Stone',           cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s12.jpg', note: 'Stone-beige double-breasted, cut for warm cities and warmer welcomes.' },
  { id: 's13', name: 'Cioccolato',     code: '—',     color: 'earth',   colorLabel: 'Chocolate',       cut: 'Double-breasted', pieces: 'Three-piece', img: '/catalog/suits/s13.jpg', note: 'Rich chocolate three-piece — the brown that earns a second look.' },
  { id: 's14', name: 'Blu Notte',      code: 'QBA68', color: 'navy',    colorLabel: 'Dark Blue',       cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s14.jpg', note: 'Dark-blue double-breasted with a structured shoulder and a long, lean lapel.' },
  { id: 's15', name: 'Carbone',        code: '2086',  color: 'black',   colorLabel: 'Charcoal',        cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s15.jpg', note: 'Charcoal double-breasted — the most versatile dark in the room.' },
  { id: 's16', name: 'Seta Avorio',    code: '—',     color: 'neutral', colorLabel: 'Ivory Silk',      cut: 'Double-breasted', pieces: 'Two-piece',   img: '/catalog/suits/s16.jpg', note: 'A textured ivory with silk hand and a peak lapel cut high and proud.' },
]

export const SUIT_FILTERS: SuitFilter[] = [
  { key: 'all',     label: 'All' },
  { key: 'navy',    label: 'Navy & Blue' },
  { key: 'black',   label: 'Black & Charcoal' },
  { key: 'neutral', label: 'Ivory · Stone · Grey' },
  { key: 'earth',   label: 'Earth Tones' },
  { key: 'green',   label: 'Green' },
]

/* ─── PACKAGES ──────────────────────────────────────────── */

export const PACKAGES: Package[] = [
  {
    id: 'classic',
    name: 'The Classic Man',
    tag: 'For the traditionalist',
    blurb: 'The grammar of dressing well — a navy-and-red repp tie, a Liberty-floral square, anchored cufflinks, a tie bar and a lapel pin, boxed with our card. Everything a gentleman reaches for on the mornings that matter.',
    hero: '/catalog/packages/classic.jpg',
    shots: ['/catalog/packages/classic.jpg', '/catalog/packages/classic_1.jpg'],
    includes: ['Silk repp tie', 'Floral pocket square', 'Anchor lapel pin', 'Cufflinks', 'Tie bar', 'Goyard-weave card holder'],
  },
  {
    id: 'dapper',
    name: 'The Dapper Man',
    tag: 'For the bold dresser',
    blurb: 'Pattern with confidence. A check tie-and-square pairing for the man who treats colour as punctuation, not decoration — finished with metal that catches the light.',
    hero: '/catalog/packages/dapper_h.jpg',
    shots: ['/catalog/packages/dapper_h.jpg', '/catalog/packages/dapper_1.jpg', '/catalog/packages/dapper_2.jpg'],
    includes: ['Check silk tie', 'Matching pocket square', 'Lapel pin', 'Cufflinks', 'Tie bar'],
  },
  {
    id: 'modern',
    name: 'The Modern Man',
    tag: 'For the minimalist',
    blurb: 'Clean lines, considered colour. A contemporary tie-and-square set in calm tones for the man whose taste does the talking. Less, arranged beautifully.',
    hero: '/catalog/packages/modern_h.jpg',
    shots: ['/catalog/packages/modern_h.jpg', '/catalog/packages/modern_1.jpg', '/catalog/packages/modern_2.jpg'],
    includes: ['Silk tie', 'Pocket square', 'Lapel pin', 'Cufflinks'],
  },
  {
    id: 'new',
    name: 'The New Man',
    tag: 'The starter edit',
    blurb: 'Your first proper set. A striped tie, a red statement square and the essential hardware — the fastest way from getting dressed to being well-dressed.',
    hero: '/catalog/packages/newman_2.jpg',
    shots: ['/catalog/packages/newman_2.jpg', '/catalog/packages/newman_3.jpg'],
    includes: ['Striped silk tie', 'Statement pocket square', 'Lapel pin', 'Cufflinks', 'Tie bar'],
  },
]

/* ─── POCKET SQUARES ────────────────────────────────────── */

export const POCKET_SQUARES: PocketSquare[] = [
  { id: 'ps1',  name: 'Midnight Mosaic',  color: 'blue',    img: '/catalog/squares/ps1.jpg' },
  { id: 'ps2',  name: 'Garden Rose',      color: 'earth',   img: '/catalog/squares/ps2.jpg' },
  { id: 'ps3',  name: 'Navy Leaf',        color: 'blue',    img: '/catalog/squares/ps3.jpg' },
  { id: 'ps4',  name: 'Wild Blossom',     color: 'red',     img: '/catalog/squares/ps4.jpg' },
  { id: 'ps5',  name: 'Ditsy Noir',       color: 'black',   img: '/catalog/squares/ps5.jpg' },
  { id: 'ps6',  name: 'Liberty Sky',      color: 'blue',    img: '/catalog/squares/ps6.jpg' },
  { id: 'ps7',  name: 'Medallion B/W',    color: 'black',   img: '/catalog/squares/ps7.jpg' },
  { id: 'ps8',  name: 'Burgundy Bloom',   color: 'red',     img: '/catalog/squares/ps8.jpg' },
  { id: 'ps9',  name: 'Cardinal Solid',   color: 'red',     img: '/catalog/squares/ps9.jpg' },
  { id: 'ps10', name: 'Teal Meadow',      color: 'green',   img: '/catalog/squares/ps10.jpg' },
  { id: 'ps11', name: 'Midnight Kiss',    color: 'black',   img: '/catalog/squares/ps11.jpg' },
  { id: 'ps12', name: 'Snow Leopard',     color: 'neutral', img: '/catalog/squares/ps12.jpg' },
  { id: 'ps13', name: 'Magenta Weave',    color: 'red',     img: '/catalog/squares/ps13.jpg' },
  { id: 'ps14', name: 'Navy Bouquet',     color: 'blue',    img: '/catalog/squares/ps14.jpg' },
  { id: 'ps15', name: 'Porcelain Tile',   color: 'blue',    img: '/catalog/squares/ps15.jpg' },
  { id: 'ps16', name: 'Cocoa Floral',     color: 'earth',   img: '/catalog/squares/ps16.jpg' },
  { id: 'ps17', name: 'Oxblood Solid',    color: 'red',     img: '/catalog/squares/ps17.jpg' },
  { id: 'ps18', name: 'Royal Pin-Dot',    color: 'blue',    img: '/catalog/squares/ps18.jpg' },
]

export const SQUARE_FILTERS: SquareFilter[] = [
  { key: 'all',     label: 'All' },
  { key: 'blue',    label: 'Blue' },
  { key: 'red',     label: 'Red & Wine' },
  { key: 'black',   label: 'Black & White' },
  { key: 'green',   label: 'Green' },
  { key: 'earth',   label: 'Earth' },
  { key: 'neutral', label: 'Neutral' },
]

/* ─── WATCHES ───────────────────────────────────────────── */

export const WATCHES: Watch[] = [
  { id: 'w1', name: 'Azzurro',      desc: 'Blue croc strap · silver case',   img: '/catalog/watches/w1.jpg' },
  { id: 'w2', name: 'Oro Nero',     desc: 'Black strap · gold sunburst',     img: '/catalog/watches/w2.jpg' },
  { id: 'w3', name: 'Cognac',       desc: 'Tan leather · champagne dial',    img: '/catalog/watches/w3.jpg' },
  { id: 'w4', name: 'Heritage',     desc: 'Brown croc · ivory dial',         img: '/catalog/watches/w4.jpg' },
  { id: 'w5', name: 'Rosa Cushion', desc: 'Rose-gold cushion case',          img: '/catalog/watches/w5.jpg' },
  { id: 'w6', name: 'Scheletro',    desc: 'Open-heart skeleton dial',        img: '/catalog/watches/w6.jpg' },
  { id: 'w7', name: 'Onice',        desc: 'Black cushion · onyx dial',       img: '/catalog/watches/w7.jpg' },
]

/* ─── PINS ──────────────────────────────────────────────── */

export const PINS: Pin[] = [
  { id: 'p01',  number: 'No 01', name: 'Woven Knot',       material: 'Antique Brass', img: '/catalog/pins/b1.jpg' },
  { id: 'p02',  number: 'No 02', name: 'Lone Wolf',        material: 'Aged Silver',   img: '/catalog/pins/b6.jpg' },
  { id: 'p03',  number: 'No 03', name: 'Prowling Panther', material: 'Gunmetal',      img: '/catalog/pins/b25.jpg' },
  { id: 'p04',  number: 'No 04', name: 'Shield & Swords',  material: 'Gunmetal',      img: '/catalog/pins/b26.jpg' },
  { id: 'p05',  number: 'No 05', name: 'Trumpet',          material: 'Crystal Set',   img: '/catalog/pins/b8.jpg' },
  { id: 'p06',  number: 'No 06', name: 'The Camera',       material: 'Hard Enamel',   img: '/catalog/pins/b11.jpg' },
  { id: 'p07',  number: 'No 07', name: 'Laurel Spray',     material: 'Polished Gold', img: '/catalog/pins/b12.jpg' },
  { id: 'p08',  number: 'No 08', name: 'The Stag',         material: 'Gold Stick Pin',img: '/catalog/pins/b33.jpg' },
  { id: 'p09',  number: 'No 09', name: 'Compass',          material: 'Gilt Stick Pin',img: '/catalog/pins/b31.jpg' },
  { id: 'p10',  number: 'No 10', name: 'Anchored',         material: 'Enamel & Silver',img: '/catalog/pins/b24.jpg' },
  { id: 'p11',  number: 'No 11', name: 'Cobalt Bloom',     material: 'Silk Stick Pin',img: '/catalog/pins/b13.jpg' },
  { id: 'p12',  number: 'No 12', name: 'Ballerina',        material: 'Crimson Enamel',img: '/catalog/pins/b9.jpg' },
]

/* ─── ACCESSORIES ───────────────────────────────────────── */

export const ACCESSORIES: AccessoryItem[] = [
  { id: 'acc1', name: 'Lapel Pins',       desc: 'Cast figures & crests · 40+ designs', swatch: 'linear-gradient(135deg,#8f8a82,#3b3a37)', badge: '01 / Lapel',  img: '/catalog/pins/b6.jpg' },
  { id: 'acc2', name: 'Stick Pins',       desc: 'Hand-set stones & enamel',             swatch: 'linear-gradient(135deg,#e6c98c,#b9912f)', badge: '02 / Stick',  img: '/catalog/pins/b33.jpg' },
  { id: 'acc3', name: 'Collar Chains',    desc: 'Chained collar pins · gilt',           swatch: 'linear-gradient(135deg,#d8b25e,#9b7322)', badge: '03 / Collar', img: '/catalog/pins/b2.jpg' },
  { id: 'acc4', name: 'Reversible Belts', desc: 'Italian leather · swivel buckle',      swatch: 'linear-gradient(135deg,#5a3a28,#1c1611)', badge: '04 / Belt',   img: '/catalog/pins/belt1.jpg' },
  { id: 'acc5', name: 'Suspenders',       desc: 'Elastic & leather · boxed',            swatch: 'linear-gradient(135deg,#7a2230,#3a1018)', badge: '05 / Braces', img: '/catalog/pins/susp1.jpg' },
]

/* ─── GRWM REELS ────────────────────────────────────────── */

export const GRWM_REELS: GrwmReel[] = [
  { id: 'r1', episode: 'Episode 12', title: 'The Four-in-Hand, Perfected',      duration: '0:58', src: '/videos/grwm/grwm1.mp4' },
  { id: 'r2', episode: 'Episode 11', title: 'Building a Capsule Suit Wardrobe', duration: '2:14', src: '/videos/grwm/grwm2.mp4' },
  { id: 'r3', episode: 'Episode 10', title: 'Black Tie, Decoded',               duration: '3:02', src: '/videos/grwm/grwm3.mp4' },
  { id: 'r4', episode: 'Episode 09', title: 'A Pocket Square, Three Ways',      duration: '1:36', src: '/videos/grwm/grwm4.mp4' },
]
