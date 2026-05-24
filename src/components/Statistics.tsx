import { ListTodo, CheckCircle, Circle, Calendar, AlertTriangle } from 'lucide-react'
import { useTodoStats } from '../hooks/useTodoStats'

const CARDS = [
  { label: '全部任务', key: 'total' as const, icon: ListTodo, color: 'text-[#d4a853]', bg: 'bg-[#d4a853]/10' },
  { label: '已完成', key: 'completed' as const, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: '待办', key: 'pending' as const, icon: Circle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: '今日到期', key: 'dueToday' as const, icon: Calendar, color: 'text-rose-400', bg: 'bg-rose-500/10' },
]

export function Statistics() {
  const stats = useTodoStats()

  return (
    <div className="space-y-3">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CARDS.map((c) => (
          <div
            key={c.key}
            className="bg-[#16162a] rounded-xl px-4 py-3.5 border border-[#2a2a3e] transition-all hover:border-[#3a3a52] hover:-translate-y-[1px] duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-[#6a6460] tracking-widest uppercase">
                  {c.label}
                </p>
                <p className="text-xl font-bold text-[#e6e0d0] mt-0.5 font-display tracking-tight">
                  {stats[c.key]}
                </p>
              </div>
              <div
                className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}
              >
                <c.icon size={17} className={c.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overdue warning */}
      {stats.overdue > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/6 border border-red-500/18 text-red-400 text-xs">
          <AlertTriangle size={13} className="flex-shrink-0" />
          <span>
            有 <strong className="font-semibold">{stats.overdue}</strong> 个任务已逾期
          </span>
        </div>
      )}

      {/* Progress */}
      {stats.total > 0 && (
        <div className="bg-[#16162a] rounded-xl px-4 py-3.5 border border-[#2a2a3e]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-[#6a6460] tracking-widest uppercase">
              完成进度
            </span>
            <span className="text-xs font-semibold text-[#d4a853] tabular-nums">
              {stats.completionRate}%
            </span>
          </div>
          <div className="h-[5px] bg-[#2a2a3e] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${stats.completionRate}%`,
                background:
                  stats.completionRate === 100
                    ? 'linear-gradient(90deg, #4d9e6b, #6abe85)'
                    : 'linear-gradient(90deg, #d4a853, #e8c04a)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
