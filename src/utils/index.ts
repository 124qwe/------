import { format, isToday, isPast, isTomorrow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatDateShort(timestamp: number): string {
  const d = new Date(timestamp)
  if (isToday(d)) return '今天'
  if (isTomorrow(d)) return '明天'
  return format(d, 'M月d日', { locale: zhCN })
}

export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm', { locale: zhCN })
}

export function formatDueDate(timestamp: number): string {
  const d = new Date(timestamp)
  if (isToday(d)) return '今天'
  if (isTomorrow(d)) return '明天'
  return format(d, 'M月d日', { locale: zhCN })
}

export function isOverdue(timestamp: number): boolean {
  return isPast(new Date(timestamp)) && !isToday(new Date(timestamp))
}

export function isDueToday(timestamp: number): boolean {
  return isToday(new Date(timestamp))
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export const DEFAULT_CATEGORIES = ['工作', '生活', '学习']

export const PRIORITY_LABELS: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}
