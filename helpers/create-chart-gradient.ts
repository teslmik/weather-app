import { ChartArea } from "chart.js";

export const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const colorStart = "#B3FC4F";
  const colorEnd = "#173102";

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
};
