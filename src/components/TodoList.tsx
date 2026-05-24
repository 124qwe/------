import { useMemo, useState } from 'react'
import { ClipboardList, Plus } from 'lucide-react'
import { useTodoStore } from '../store/useTodoStore'
import { useToastStore } from '../store/useToastStore'
import { TodoItem } from './TodoItem'
import { TodoForm } from './TodoForm'
import { Modal } from './Modal'
import type { Todo } from '../types'

export function TodoList() {
  const todos = useTodoStore((s) => s.todos)
  const filters = useTodoStore((s) => s.filters)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const addToast = useToastStore((s) => s.addToast)

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  /* ── Filter & sort ── */
  const visibleTodos = useMemo(() => {
    let result = [...todos]

    // Status
    if (filters.status !== 'all') {
      result = result.filter((t) => t.status === filters.status)
    }
    // Priority
    if (filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority)
    }
    // Category
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category)
    }
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      )
    }

    // Sort: pending first, then newest
    result.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1
      }
      return b.createdAt - a.createdAt
    })

    return result
  }, [todos, filters])

  const isFiltered =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all'

  /* ── Handlers ── */
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingTodo(null)
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteTodo(deleteId)
    addToast('任务已删除', 'info')
    setDeleteId(null)
  }

  const handleAddNew = () => {
    setEditingTodo(null)
    setIsFormOpen(true)
  }

  return (
    <>
      {/* ── Empty state ── */}
      {visibleTodos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#16162a] border border-[#2a2a3e] flex items-center justify-center mb-5">
            <ClipboardList size={28} className="text-[#5a5448]" />
          </div>
          <p className="text-sm text-[#6a6460] mb-1">
            {isFiltered
              ? '没有匹配的任务'
              : '还没有任务，开始创建第一个吧'}
          </p>
          {!isFiltered && (
            <button
              type="button"
              onClick={handleAddNew}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#d4a853] text-[#0d0d19] text-sm font-semibold rounded-xl hover:bg-[#c49a3f] transition-colors"
            >
              <Plus size={16} />
              创建任务
            </button>
          )}
        </div>
      )}

      {/* ── List ── */}
      {visibleTodos.length > 0 && (
        <div className="space-y-2">
          {visibleTodos.map((todo, idx) => (
            <div
              key={todo.id}
              style={{ animationDelay: `${idx * 40}ms` }}
              className="animate-slide-in"
            >
              <TodoItem
                todo={todo}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onToggle={toggleTodo}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Edit / Add modal ── */}
      <Modal
        open={isFormOpen}
        onClose={handleFormClose}
        title={editingTodo ? '编辑任务' : '新建任务'}
      >
        <TodoForm todo={editingTodo} onClose={handleFormClose} />
      </Modal>

      {/* ── Delete confirmation ── */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="确认删除"
      >
        <div className="space-y-5">
          <p className="text-sm text-[#8a8478] leading-relaxed">
            确定要删除这个任务吗？此操作无法撤销。
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 text-sm text-[#8a8478] hover:text-[#e6e0d0] transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-5 py-2 bg-red-500/90 text-white text-sm font-medium rounded-xl hover:bg-red-500 transition-colors"
            >
              删除
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
