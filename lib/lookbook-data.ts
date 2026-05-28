export type LookCategory = 'alpha-man' | 'suits' | 'accessories' | 'watches' | 'pocket-squares'

export interface Look {
  id: string
  title: string
  category: LookCategory
  description: string
  image: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
}

export const LOOKS: Look[] = [
  {
    id: 'am-01',
    title: 'The Meridian',
    category: 'alpha-man',
    description: 'A dark navy two-piece cut to precision. The suit that defines the room before you speak.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'am-02',
    title: 'The Executive',
    category: 'alpha-man',
    description: 'Charcoal wool, single-breasted. Authority woven into every thread.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'am-03',
    title: 'The Accra Edit',
    category: 'alpha-man',
    description: 'Modern tailoring for the contemporary Ghanaian professional. Sharp. Intentional. Unmistakable.',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'su-01',
    title: 'The Obsidian',
    category: 'suits',
    description: 'Midnight black with a subtle herringbone weave. The formal suit reimagined.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'su-02',
    title: 'The Slate',
    category: 'suits',
    description: 'Cool grey wool in a slim silhouette. Effortless for boardroom or ceremony.',
    image: 'https://images.unsplash.com/photo-1594938298593-13f5edd0e7cc?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'su-03',
    title: 'The Ivory',
    category: 'suits',
    description: 'Cream linen tailored for the tropical heat of Accra without sacrificing refinement.',
    image: 'https://images.unsplash.com/photo-1490114538577-81efdf2ab615?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'portrait',
  },
  {
    id: 'ac-01',
    title: 'Silk Grenadine',
    category: 'accessories',
    description: 'A hand-rolled silk grenadine tie in deep burgundy — the mark of considered dressing.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'ac-02',
    title: 'Rhodium Cufflinks',
    category: 'accessories',
    description: 'Rhodium-plated cufflinks with a brushed finish. Understated. Permanent.',
    image: 'https://images.unsplash.com/photo-1624378515195-6bf9a78a1c7b?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'ac-03',
    title: 'The Collar Bar',
    category: 'accessories',
    description: 'A sterling silver collar bar that elevates a white dress shirt to a statement.',
    image: 'https://images.unsplash.com/photo-1584302175049-0e9f5bf1d06e?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'wa-01',
    title: 'The Chronograph',
    category: 'watches',
    description: 'A precision timepiece in brushed steel. Time is the one luxury you cannot replace.',
    image: 'https://images.unsplash.com/photo-1547996996-0ea84a1f7eba?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'wa-02',
    title: 'The Dress Watch',
    category: 'watches',
    description: 'Thin case, black alligator strap. The watch that disappears under a French cuff.',
    image: 'https://images.unsplash.com/photo-1523275335174-e06d4e1b9fb7?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'wa-03',
    title: 'The Automatic',
    category: 'watches',
    description: 'Self-winding movement visible through a sapphire caseback. Worn by those who notice.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'ps-01',
    title: 'The Ivory Fold',
    category: 'pocket-squares',
    description: 'Hand-rolled ivory linen in a classic presidential fold. The final punctuation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'landscape',
  },
  {
    id: 'ps-02',
    title: 'The Navy Peak',
    category: 'pocket-squares',
    description: 'Deep navy silk with a one-point peak. Geometric. Deliberate. Precise.',
    image: 'https://images.unsplash.com/photo-1591047139059-a238fe4bc8ec?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'landscape',
  },
  {
    id: 'ps-03',
    title: 'The Pocket Puff',
    category: 'pocket-squares',
    description: 'White cotton in a relaxed puff fold — the effortless signal of a man at ease with craft.',
    image: 'https://images.unsplash.com/photo-1517677129461-7e2e1b9e3574?w=600&q=80&auto=format&fit=crop',
    aspectRatio: 'landscape',
  },
]

export const CATEGORY_LABELS: Record<'all' | LookCategory, string> = {
  all: 'All',
  'alpha-man': 'Alpha Man',
  suits: 'Suits',
  accessories: 'Accessories',
  watches: 'Watches',
  'pocket-squares': 'Pocket Squares',
}

export const ALL_CATEGORIES: Array<'all' | LookCategory> = [
  'all',
  'alpha-man',
  'suits',
  'accessories',
  'watches',
  'pocket-squares',
]
