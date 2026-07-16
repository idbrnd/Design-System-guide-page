import generated from './tokens.generated.json'

export interface TokenEntry {
  name: string
  varName: string
  value: string
  resolved: string
}

export interface TypographyToken extends TokenEntry {
  fontWeight: string
  fontSize: string
  fontFamily: string
}

export interface Tokens {
  palette: Record<string, TokenEntry[]>
  category: TokenEntry[]
  alpha: TokenEntry[]
  semantic: TokenEntry[]
  interaction: TokenEntry[]
  etc: TokenEntry[]
  typography: TypographyToken[]
  dimension: TokenEntry[]
  layout: TokenEntry[]
  radius: TokenEntry[]
  shadow: TokenEntry[]
}

export const tokens = generated as unknown as Tokens
