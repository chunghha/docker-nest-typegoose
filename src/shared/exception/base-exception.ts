export interface BaseException {
  code: number;
  endpoint?: string;
  level?: string;
  message?: string;
  timestamp: string;
}
