export const shareStudy = async () => {
  const url = window.location.href;

  /* web Share API 지원하는 경우 */
  if (navigator.share) {
    try {
      await navigator.share({
        url,
      });
      return { type: 'share' };
    } catch {
      return { type: 'cancel' };
    }
  }

  /* Clipboard API fallback */
  await navigator.clipboard.writeText(url);
  return { type: 'clipboard' };
};
