export interface ChartDataPoint {
  label: string;
  longLabel: string;
  value: number;
  isToday?: boolean;
  breakdown: {
    total: number;
    green: number;
    yellow: number;
    red: number;
  };
}

export interface BarItem {
  x: number;
  y: number;
  width: number;
  height: number;
  dp: ChartDataPoint;
}
