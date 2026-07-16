import { showToast } from '@idbrnd/design-system'

/** 클립보드에 복사하고 DS 토스트로 피드백한다. */
export async function copyWithToast(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    showToast({ variant: 'positive', message: `복사됨: ${text}` })
  } catch {
    showToast({ variant: 'negative', message: '복사에 실패했습니다.' })
  }
}
