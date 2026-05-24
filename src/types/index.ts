export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'completed'

export interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: number
  priority: Priority
  category: string
  status: Status
  createdAt: number
  updatedAt: number
}

export interface FilterState {
  search: string
  status: Status | 'all'
  priority: Priority | 'all'
  category: string | 'all'
}

export type SortBy = 'createdAt' | 'dueDate' | 'priority' | 'title'
export type SortOrder = 'asc' | 'desc'
