export const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'Διαμέρισμα' },
  { value: 'DETACHED_HOUSE', label: 'Μονοκατοικία' },
  { value: 'PLOT', label: 'Οικόπεδο' },
] as const

export const APARTMENT_TYPES = [
  { value: 'STUDIO', label: 'Studio / Γκαρσονιέρα' },
  { value: 'FLOOR_APARTMENT', label: 'Οροφοδιαμέρισμα' },
  { value: 'LOFT', label: 'Loft' },
  { value: 'PENTHOUSE', label: 'Ρετιρέ' },
] as const

export const TRANSACTION_TYPES = [
  { value: 'SALE', label: 'Πώληση' },
  { value: 'RENT', label: 'Ενοικίαση' },
] as const

export const ENERGY_CLASSES = [
  { value: 'A+', label: 'A+' },
  { value: 'A', label: 'A' },
  { value: 'B+', label: 'B+' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'Z', label: 'Z' },
  { value: 'EXEMPT', label: 'Εξαιρείται' },
] as const

export const FLOOR_OPTIONS = [
  { value: 'BASEMENT', label: 'Υπόγειο', labelShort: 'ΥΠ' },
  { value: 'SEMI_BASEMENT', label: 'Ημιυπόγειο', labelShort: 'ΗΥ' },
  { value: 'GROUND_FLOOR', label: 'Ισόγειο', labelShort: 'ΙΣ' },
  { value: 'SEMI_FLOOR', label: 'Ημιόροφος', labelShort: 'ΗΜ/ΥΠ' },
  { value: '1ST', label: '1ος' },
  { value: '2ND', label: '2ος' },
  { value: '3RD', label: '3ος' },
  { value: '4TH', label: '4ος' },
  { value: '5TH', label: '5ος' },
  { value: '6TH', label: '6ος' },
  { value: '7TH', label: '7ος' },
  { value: '8TH', label: '8ος' },
  { value: '9TH', label: '9ος' },
  { value: '10TH_PLUS', label: '10ος και άνω', labelShort: '10+' },
] as const

export const DETACHED_HOUSE_FLOOR_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4_PLUS', label: '4+' },
] as const

export const CONDITION_OPTIONS = [
  { value: 'NEW', label: 'Νεόδμητο' },
  { value: 'RENOVATED', label: 'Ανακαινισμένο' },
  { value: 'VERY_GOOD', label: 'Πολύ καλή' },
  { value: 'GOOD', label: 'Καλή' },
  { value: 'NEEDS_RENOVATION', label: 'Χρήζει ανακαίνισης' },
  { value: 'UNDER_CONSTRUCTION', label: 'Υπό κατασκευή' },
] as const

export const PLOT_CONDITION_OPTIONS = [
  { value: 'IN_PLANNING_AREA', label: 'Εντός σχεδίου' },
  { value: 'OUT_OF_PLANNING_AREA', label: 'Εκτός σχεδίου' },
  { value: 'OUT_OF_SETTLEMENT', label: 'Εκτός οικισμού' },
  { value: 'UNDER_SPECIAL_REGULATION', label: 'Υπό ένταξη' },
] as const

export const ROOM_NUMBER_OPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5_PLUS', label: '5+' },
] as const
