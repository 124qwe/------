import { useState, useEffect, useRef } from 'react'
import type { Todo, Priority } from '../types'
import { useTodoStore } from '../store/useTodoStore'
import { useToastStore } from '../store/useToastStore'
import { DEFAULT_CATEGORIES } from '../utils'

interface TodoFormProps {
  todo?: Todo | null
  onClose: () => void
}

export function TodoForm({ todo, onClose }: TodoFormProps) {
  const { addTodo, updateTodo, todos } = useTodoStore()
  const addToast = useToastStore((s) => s.addToast)
  const titleRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(todo?.title ?? '')
  const [description, setDescription] = useState(todo?.description ?? '')
  const [dueDate, setDueDate] = useState(
    todo?.dueDate
      ? new Date(todo.dueDate).toISOString().split('T')[0]
      : ''
  )
  const [priority, setPriority] = useState<Priority>(todo?.priority ?? 'medium')
  const [category, setCategory] = useState(todo?.category ?? '')

  const isEditing = !!todo

  /* ── Auto-focus title input ── */
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  /* ── Derive existing categories from store ── */
  const existingCategories = [
    ...new Set([
      ...DEFAULT_CATEGORIES,
      ...todos.map((t) => t.category),
    ]),
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const data = {
      title: trimmedTitle,
      description: description.trim() || undefined,
      dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
      priority,
      category: category.trim() || '默认',
    }

    if (isEditing && todo) {
      updateTodo(todo.id, { ...data, status: todo.status })
      addToast('任务已更新', 'success')
    } else {
      addTodo(data)
      addToast('任务已创建', 'success')
    }

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-[#8a8478] mb-1.5 tracking-wide">
          标题 <span className="text-red-400">*</span>
        </label>
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入任务标题…"
          className="w-full px-3.5 py-2.5 bg-[#0d0d19] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] placeholder:text-[#5a5448] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/20 transition-all text-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-[#8a8478] mb-1.5 tracking-wide">
          描述
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="添加详细描述（可选）…"
          rows={3}
          className="w-full px-3.5 py-2.5 bg-[#0d0d19] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] placeholder:text-[#5a5448] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/20 transition-all text-sm resize-none"
        />
      </div>

      {/* Row: date / priority / category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Due Date */}
        <div>
          <label className="block text-xs font-medium text-[#8a8478] mb-1.5 tracking-wide">
            截止日期
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#0d0d19] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/20 transition-all text-sm [color-scheme:dark]"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-medium text-[#8a8478] mb-1.5 tracking-wide">
            优先级
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-3.5 py-2.5 bg-[#0d0d19] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/20 transition-all text-sm"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-[#8a8478] mb-1.5 tracking-wide">
            分类
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="自定义"
            list="category-list"
            className="w-full px-3.5 py-2.5 bg-[#0d0d19] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] placeholder:text-[#5a5448] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/20 transition-all text-sm"
          />
          <datalist id="category-list">
            {existingCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#2a2a3e]">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-[#8a8478] hover:text-[#e6e0d0] transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-5 py-2 bg-[#d4a853] text-[#0d0d19] text-sm font-semibold rounded-xl hover:bg-[#c49a3f] active:bg-[#b88d35] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isEditing ? '保存更改' : '创建任务'}
        </button>
      </div>
    </form>
  )
}
