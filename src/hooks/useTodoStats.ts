import { useMemo } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import { isToday, isPast } from 'date-fns'

export interface TodoStats {
  total: number
  completed: number
  pending: number
  dueToday: number
  overdue: number
  completionRate: number
}

export function useTodoStats(): TodoStats {
  const todos = useTodoStore((s) => s.todos)

  return useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.status === 'completed').length
    const pending = total - completed

    const now = new Date()
    let dueToday = 0
    let overdue = 0

    for (const t of todos) {
      if (t.status === 'completed' || !t.dueDate) continue
      const d = new Date(t.dueDate)
      if (isToday(d)) dueToday++
      else if (isPast(d)) overdue++
    }

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, pending, dueToday, overdue, completionRate }
  }, [todos])
}
