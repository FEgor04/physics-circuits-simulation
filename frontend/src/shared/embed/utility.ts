export const isEmbedded = (): boolean => location.pathname.includes("/embed");

export const getZoomCoefficient = (): number => (isEmbedded() ? 20 : 35);
