export const colors = {
  // ── Brand / Primary (teal-green — your core identity) ───────────────────────
  /** Main teal-green accent — buttons, active tabs, links */
  primary: "#277b70",
  /** Text/icons placed ON primary-colored surfaces */
  onPrimary: "#ffffff",
  /** Tinted "container" surface for primary elements (pills, selected chips, FAB tint) */
  primaryContainer: "#dcebe3",
  /** Text/icons placed ON primaryContainer */
  onPrimaryContainer: "#123128",
  /** Primary used AS a screen/section background (Material's primary-tinted bg) */
  primaryBg: "#f3f8f6",
  /** Text/icons placed ON primaryBg */
  onPrimaryBg: "#1c332f",
  /** Darker teal — deep text on tinted surfaces */
  primaryDeep: "#294542",
  /** Darkest background tone — camera viewfinder, overlays */
  primaryDarkest: "#1e2e2d",

  // ── Secondary (warm sand/gold — "You Paid", debt, receipts) ────────────────
  /** Secondary accent — secondary buttons, selected filter chips */
  secondary: "#9c7c3e",
  /** Text/icons placed ON secondary-colored surfaces */
  onSecondary: "#ffffff",
  /** Tinted container surface for secondary elements */
  secondaryContainer: "#e9e3d7",
  /** Text/icons placed ON secondaryContainer */
  onSecondaryContainer: "#3e3117",
  /** Secondary used AS a screen/section background */
  secondaryBg: "#faf7f0",
  /** Text/icons placed ON secondaryBg */
  onSecondaryBg: "#3e3117",
  /** Deep secondary — for strong emphasis text on tinted surfaces */
  secondaryDeep: "#5c4a26",

  // ── Tertiary (cool blue — "Others Owe You", links to other members, accent) ─
  /** Tertiary accent — join-family, info actions, tertiary buttons */
  tertiary: "#3d6fa8",
  /** Text/icons placed ON tertiary-colored surfaces */
  onTertiary: "#ffffff",
  /** Tinted container surface for tertiary elements */
  tertiaryContainer: "#dce6eb",
  /** Text/icons placed ON tertiaryContainer */
  onTertiaryContainer: "#152c40",
  /** Tertiary used AS a screen/section background */
  tertiaryBg: "#f2f6f9",
  /** Text/icons placed ON tertiaryBg */
  onTertiaryBg: "#1c344a",
  /** Deep tertiary — for strong emphasis text on tinted surfaces */
  tertiaryDeep: "#284f78",

  // ── Backgrounds (neutral) ────────────────────────────────────────────────────
  /** Main screen background — warm off-white */
  background: "#f8f6f0",
  /** Text/icons placed ON the main background */
  onBackground: "#263a39",
  /** Card / panel surface */
  surface: "#fffefa",
  /** Text/icons placed ON surface */
  onSurface: "#263a39",
  /** Bottom nav bar background */
  surfaceNav: "#fbfaf6",
  /** Light sage chip / toggle track */
  surfaceChip: "#e8eee8",
  /** Receipt upload zone */
  surfaceMint: "#f4faf7",
  /** Info / hint banner background */
  surfaceHint: "#f0f3ed",
  /** Slightly raised surface (modals, sheets) */
  surfaceVariant: "#eef0ea",
  /** Text/icons placed ON surfaceVariant */
  onSurfaceVariant: "#4c5751",

  // ── Stat / summary card tints ────────────────────────────────────────────────
  /** Total Spent card */
  tintGreen: "#dcebe3",
  /** You Paid card */
  tintWarm: "#e9e3d7",
  /** You Owe card */
  tintRed: "#f1ddd3",
  /** Others Owe You card */
  tintBlue: "#dce6eb",
  /** Debt summary panel */
  tintSand: "#f0e7dc",
  /** Negative settle button background */
  tintNegativeSubtle: "#f3e0d9",
  /** Positive remind button background */
  tintPositiveSubtle: "#e0eee7",

  // ── Avatar tones (member indicator chips) ────────────────────────────────────
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

  // ── Semantic (balance states) ────────────────────────────────────────────────
  /** Positive balance (others owe you) */
  positive: "#3c8a70",
  /** Positive balance — lighter variant */
  positiveAlt: "#32745f",
  /** Negative balance (you owe) */
  negative: "#b66155",
  /** Negative balance — button text */
  negativeStrong: "#a2554b",
  /** Join-family accent (blue) — alias of tertiary, kept for back-compat */
  accent: "#3d6fa8",

  // ── Error (kept distinct from "negative" balance color for real error states) ─
  /** Destructive actions, validation errors */
  error: "#b3261e",
  /** Text/icons placed ON error-colored surfaces */
  onError: "#ffffff",
  /** Tinted container surface for error banners/fields */
  errorContainer: "#f9dedc",
  /** Text/icons placed ON errorContainer */
  onErrorContainer: "#410e0b",

  // ── Borders & dividers ────────────────────────────────────────────────────────
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

  // ── Outline (Material-style neutral outline roles) ────────────────────────────
  /** Default outline for unfocused inputs/icons */
  outline: "#79837d",
  /** Faint outline for decorative dividers */
  outlineVariant: "#c3ccc6",
};

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];

export const tailwindColors = {
  // Brand / Primary
  primary: colors.primary,
  "on-primary": colors.onPrimary,
  "primary-container": colors.primaryContainer,
  "on-primary-container": colors.onPrimaryContainer,
  "primary-bg": colors.primaryBg,
  "on-primary-bg": colors.onPrimaryBg,
  "primary-deep": colors.primaryDeep,
  "primary-darkest": colors.primaryDarkest,

  // Secondary
  secondary: colors.secondary,
  "on-secondary": colors.onSecondary,
  "secondary-container": colors.secondaryContainer,
  "on-secondary-container": colors.onSecondaryContainer,
  "secondary-bg": colors.secondaryBg,
  "on-secondary-bg": colors.onSecondaryBg,
  "secondary-deep": colors.secondaryDeep,

  // Tertiary
  tertiary: colors.tertiary,
  "on-tertiary": colors.onTertiary,
  "tertiary-container": colors.tertiaryContainer,
  "on-tertiary-container": colors.onTertiaryContainer,
  "tertiary-bg": colors.tertiaryBg,
  "on-tertiary-bg": colors.onTertiaryBg,
  "tertiary-deep": colors.tertiaryDeep,

  // Backgrounds / surfaces
  background: colors.background,
  "on-background": colors.onBackground,
  surface: colors.surface,
  "on-surface": colors.onSurface,
  "surface-nav": colors.surfaceNav,
  "surface-chip": colors.surfaceChip,
  "surface-mint": colors.surfaceMint,
  "surface-hint": colors.surfaceHint,
  "surface-variant": colors.surfaceVariant,
  "on-surface-variant": colors.onSurfaceVariant,

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
  "avatar-mint-dark": colors.avatarMintDark,

  // Text
  "text-primary": colors.textPrimary,
  "text-secondary": colors.textSecondary,
  "text-muted": colors.textMuted,
  "text-faint": colors.textFaint,
  "text-inactive": colors.textInactive,
  "text-decorative": colors.textDecorative,
  "text-avatar": colors.textAvatar,
  "text-debt": colors.textDebt,
  "text-debt-strong": colors.textDebtStrong,
  "text-body": colors.textBody,

  // Semantic
  positive: colors.positive,
  "positive-alt": colors.positiveAlt,
  negative: colors.negative,
  "negative-text": colors.negativeStrong,
  accent: colors.accent,

  // Error
  error: colors.error,
  "on-error": colors.onError,
  "error-container": colors.errorContainer,
  "on-error-container": colors.onErrorContainer,

  // Borders / outlines
  border: colors.border,
  separator: colors.separator,
  "separator-warm": colors.separatorWarm,
  "separator-debt": colors.separatorDebt,
  "border-dashed": colors.borderDashed,
  outline: colors.outline,
  "outline-variant": colors.outlineVariant,
};
