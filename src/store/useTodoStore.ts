import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo, FilterState, Priority, Status } from '../types'
import { generateId } from '../utils'

/* ── State ── */
interface TodoState {
  todos: Todo[]
  filters: FilterState
}

/* ── Actions ── */
interface TodoActions {
  addTodo: (data: {
    title: string
    description?: string
    dueDate?: number
    priority: Priority
    category: string
  }) => void
  updateTodo: (id: string, data: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
}

type TodoStore = TodoState & TodoActions

const DEFAULT_FILTERS: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      /* ── Initial state ── */
      todos: [],
      filters: { ...DEFAULT_FILTERS },

      /* ── Actions ── */
      addTodo: (data) =>
        set((state) => ({
          todos: [
            {
              ...data,
              id: generateId(),
              status: 'pending' as Status,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
            ...state.todos,
          ],
        })),

      updateTodo: (id, data) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: Date.now() } : t
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: t.status === 'completed' ? 'pending' : 'completed',
                  updatedAt: Date.now(),
                }
              : t
          ),
        })),

      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial },
        })),

      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
    }),
    { name: 'todo-app-storage' }
  )
)
