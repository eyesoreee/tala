export const colors = {
  // ── Brand / Primary ────────────────────────────────────────────────────────
  /** Main teal-green accent — buttons, active tabs, links */
  primary: "#277b70",
  /** Darker teal — used in deep text on tinted surfaces */
  primaryDeep: "#294542",
  /** Darkest background tone — camera viewfinder, overlays */
  primaryDarkest: "#1e2e2d",
  /** Text on primary-colored backgrounds (white) */
  onPrimary: "#ffffff",

  // ── Backgrounds ────────────────────────────────────────────────────────────
  /** Main screen background — warm off-white */
  background: "#f8f6f0",
  /** Card / panel surface */
  surface: "#fffefa",
  /** Bottom nav bar background */
  surfaceNav: "#fbfaf6",
  /** Light sage chip / toggle track */
  surfaceChip: "#e8eee8",
  /** Receipt upload zone */
  surfaceMint: "#f4faf7",
  /** Info / hint banner background */
  surfaceHint: "#f0f3ed",

  // ── Stat / summary card tints ──────────────────────────────────────────────
  /** Total Spent card  */
  tintGreen: "#dcebe3",
  /** You Paid card  */
  tintWarm: "#e9e3d7",
  /** You Owe card  */
  tintRed: "#f1ddd3",
  /** Others Owe You card  */
  tintBlue: "#dce6eb",
  /** Debt summary panel  */
  tintSand: "#f0e7dc",
  /** Negative settle button background */
  tintNegativeSubtle: "#f3e0d9",
  /** Positive remind button background */
  tintPositiveSubtle: "#e0eee7",

  // ── Avatar tones (member indicator chips) ──────────────────────────────────
  avatarGreen: "#d9e9df", // Mom
  avatarWarm: "#e8dfd0", // Dad
  avatarBlue: "#dce3ed", // Me / You
  avatarPink: "#eadde4", // Brother / Sister
  avatarSand: "#e4e0d8", // neutral fallback
  avatarMintDark: "#c7ddd3", // current user header avatar

  // ── Text ───────────────────────────────────────────────────────────────────
  /** Primary body & heading text */
  textPrimary: "#263a39",
  /** Secondary label text (form labels, section sub-titles) */
  textSecondary: "#668078",
  /** Muted helper / metadata text */
  textMuted: "#84938e",
  /** Very faint placeholder / legal text */
  textFaint: "#aab6b0",
  /** Inactive tab / icon text */
  textInactive: "#91a09b",
  /** Chevron / decorative icon */
  textDecorative: "#b2beb8",
  /** Avatar foreground text */
  textAvatar: "#31514b",
  /** Debt summary body text */
  textDebt: "#6e6258",
  /** Debt summary amount text */
  textDebtStrong: "#604d3d",
  /** Notes / secondary body text */
  textBody: "#6e7d77",

  // ── Semantic ───────────────────────────────────────────────────────────────
  /** Positive balance (others owe you) */
  positive: "#3c8a70",
  /** Positive balance — lighter variant */
  positiveAlt: "#32745f",
  /** Negative balance (you owe) */
  negative: "#b66155",
  /** Negative balance — button text */
  negativeStrong: "#a2554b",
  /** Join-family accent (blue) */
  accent: "#3d6fa8",

  // ── Borders & dividers ─────────────────────────────────────────────────────
  /** Standard input / card border */
  border: "#e2e7df",
  /** List item separator */
  separator: "#edf0eb",
  /** Bottom nav / warm separator */
  separatorWarm: "#e7e5dc",
  /** Debt panel separator */
  separatorDebt: "#e5d8c9",
  /** Receipt upload dashed border */
  borderDashed: "#c9d8d3",
};

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];

export const tailwindColors = {
  // Brand
  primary: colors.primary,
  "primary-deep": colors.primaryDeep,
  "primary-darkest": colors.primaryDarkest,
  "on-primary": colors.onPrimary,

  // Backgrounds
  background: colors.background,
  surface: colors.surface,
  "surface-nav": colors.surfaceNav,
  "surface-chip": colors.surfaceChip,
  "surface-mint": colors.surfaceMint,
  "surface-hint": colors.surfaceHint,

  // Stat tints
  "tint-green": colors.tintGreen,
  "tint-warm": colors.tintWarm,
  "tint-red": colors.tintRed,
  "tint-blue": colors.tintBlue,
  "tint-sand": colors.tintSand,
  "tint-neg": colors.tintNegativeSubtle,
  "tint-pos": colors.tintPositiveSubtle,

  // Avatars
  "avatar-green": colors.avatarGreen,
  "avatar-warm": colors.avatarWarm,
  "avatar-blue": colors.avatarBlue,
  "avatar-pink": colors.avatarPink,
  "avatar-sand": colors.avatarSand,

  // Text
  "text-primary": colors.textPrimary,
  "text-secondary": colors.textSecondary,
  "text-muted": colors.textMuted,
  "text-faint": colors.textFaint,
  "text-inactive": colors.textInactive,
  "text-decorative": colors.textDecorative,
  "text-avatar": colors.textAvatar,
  "text-debt": colors.textDebt,
  "text-body": colors.textBody,

  // Semantic
  positive: colors.positive,
  "positive-alt": colors.positiveAlt,
  negative: colors.negative,
  "negative-text": colors.negativeStrong,
  accent: colors.accent,

  // Borders
  border: colors.border,
  separator: colors.separator,
  "separator-warm": colors.separatorWarm,
  "separator-debt": colors.separatorDebt,
  "border-dashed": colors.borderDashed,
};
