export const isEmbedded = (): boolean => location.pathname.includes("/embed");

export const getZoomCoefficient = (): number => (isEmbedded() ? 24 : 48);
