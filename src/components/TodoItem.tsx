import { memo } from 'react'
import { Check, Pencil, Trash2, Calendar } from 'lucide-react'
import type { Todo } from '../types'
import { formatDueDate, isOverdue } from '../utils'

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const PRIORITY_STYLES: Record<
  string,
  { border: string; badge: string; label: string }
> = {
  high: {
    border: 'border-l-red-500/80',
    badge: 'bg-red-500/12 text-red-400',
    label: '高',
  },
  medium: {
    border: 'border-l-amber-500/80',
    badge: 'bg-amber-500/12 text-amber-400',
    label: '中',
  },
  low: {
    border: 'border-l-emerald-500/80',
    badge: 'bg-emerald-500/12 text-emerald-400',
    label: '低',
  },
}

export const TodoItem = memo(function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggle,
}: TodoItemProps) {
  const pc = PRIORITY_STYLES[todo.priority]
  const done = todo.status === 'completed'
  const taskOverdue = !done && todo.dueDate ? isOverdue(todo.dueDate) : false

  return (
    <div
      className={`group relative flex items-start gap-3.5 px-4 py-3.5 rounded-xl border bg-[#16162a]/70 backdrop-blur-sm transition-all duration-300
        ${pc.border} border-l-[3px] border-[#2a2a3e]
        ${done ? 'opacity-45' : 'hover:bg-[#1a1a30] hover:border-[#3a3a52] hover:-translate-y-[1px]'}
      `}
    >
      {/* ── Checkbox ── */}
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`relative mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          done
            ? 'bg-[#d4a853] border-[#d4a853]'
            : 'border-[#4a4a5e] hover:border-[#d4a853]'
        }`}
        aria-label={done ? '标记为待办' : '标记为已完成'}
      >
        {done && <Check size={11} className="text-[#0d0d19]" strokeWidth={3.5} />}
      </button>

      {/* ── Content ── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-sm font-medium transition-all duration-300 ${
              done ? 'line-through text-[#5a5448]' : 'text-[#e6e0d0]'
            }`}
          >
            {todo.title}
          </h3>

          {/* Actions */}
          <div className="flex gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              type="button"
              onClick={() => onEdit(todo)}
              className="p-1.5 rounded-lg text-[#6a6460] hover:text-[#d4a853] hover:bg-[#d4a853]/8 transition-all"
              aria-label="编辑"
            >
              <Pencil size={13} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-[#6a6460] hover:text-red-400 hover:bg-red-500/8 transition-all"
              aria-label="删除"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Description preview */}
        {todo.description && (
          <p className="mt-0.5 text-xs text-[#6a6460] line-clamp-1">
            {todo.description}
          </p>
        )}

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {/* Priority badge */}
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium leading-none ${pc.badge}`}
          >
            {pc.label}优先级
          </span>

          {/* Category tag */}
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium text-[#8a8478] bg-[#2a2a3e] leading-none">
            {todo.category}
          </span>

          {/* Due date */}
          {todo.dueDate && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium leading-none ${
                taskOverdue
                  ? 'text-red-400 bg-red-500/10'
                  : 'text-[#8a8478] bg-[#2a2a3e]'
              }`}
            >
              <Calendar size={9} />
              {formatDueDate(todo.dueDate)}
              {taskOverdue && ' · 逾期'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
})
