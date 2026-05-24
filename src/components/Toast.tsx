import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { useToastStore } from '../store/useToastStore'

const ICONS = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
}

const STYLES = {
  success: {
    bg: 'bg-emerald-500/8 border-emerald-500/25',
    text: 'text-emerald-300',
    icon: 'text-emerald-400',
  },
  error: {
    bg: 'bg-red-500/8 border-red-500/25',
    text: 'text-red-300',
    icon: 'text-red-400',
  },
  info: {
    bg: 'bg-[#d4a853]/8 border-[#d4a853]/25',
    text: 'text-[#d4a853]',
    icon: 'text-[#e8c04a]',
  },
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type]
        const s = STYLES[toast.type]
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border ${s.bg} backdrop-blur-lg min-w-[280px] max-w-sm shadow-xl animate-slide-in-right`}
          >
            <Icon size={16} className={`flex-shrink-0 ${s.icon}`} />
            <p className={`flex-1 text-sm ${s.text}`}>{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className={`flex-shrink-0 p-0.5 rounded opacity-50 hover:opacity-100 transition-opacity ${s.text}`}
              aria-label="关闭通知"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
