import { Search, X } from 'lucide-react'
import { useTodoStore } from '../store/useTodoStore'
import { PRIORITY_LABELS } from '../utils'
import type { Priority, Status } from '../types'

const STATUS_TABS: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待办' },
  { value: 'completed', label: '已完成' },
]

const PRIORITY_OPTIONS: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: '全部优先级' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

export function TodoFilters() {
  const filters = useTodoStore((s) => s.filters)
  const setFilters = useTodoStore((s) => s.setFilters)
  const resetFilters = useTodoStore((s) => s.resetFilters)
  const todos = useTodoStore((s) => s.todos)

  const categories = [...new Set(todos.map((t) => t.category))]

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all'

  return (
    <div className="space-y-3">
      {/* ── Search ── */}
      <div className="relative">
        <Search
          size="16"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5448] pointer-events-none"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="搜索任务标题或描述…"
          className="w-full pl-10 pr-10 py-2.5 bg-[#16162a] border border-[#2a2a3e] rounded-xl text-[#e6e0d0] placeholder:text-[#5a5448] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/15 transition-all text-sm"
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => setFilters({ search: '' })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a5448] hover:text-[#8a8478] transition-colors"
            aria-label="清除搜索"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status tabs */}
        <div className="flex bg-[#16162a] rounded-lg border border-[#2a2a3e] overflow-hidden">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilters({ status: tab.value })}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filters.status === tab.value
                  ? 'bg-[#d4a853] text-[#0d0d19]'
                  : 'text-[#6a6460] hover:text-[#e6e0d0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority select */}
        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ priority: e.target.value as Priority | 'all' })
          }
          className="px-3 py-1.5 bg-[#16162a] border border-[#2a2a3e] rounded-lg text-xs text-[#8a8478] focus:outline-none focus:border-[#d4a853] transition-colors cursor-pointer"
          aria-label="按优先级筛选"
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Category select */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="px-3 py-1.5 bg-[#16162a] border border-[#2a2a3e] rounded-lg text-xs text-[#8a8478] focus:outline-none focus:border-[#d4a853] transition-colors cursor-pointer"
          aria-label="按分类筛选"
        >
          <option value="all">全部分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs text-[#8a8478] hover:text-[#e6e0d0] transition-colors"
          >
            清除筛选
          </button>
        )}
      </div>
    </div>
  )
}
