import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Statistics } from './components/Statistics'
import { TodoFilters } from './components/TodoFilters'
import { TodoList } from './components/TodoList'
import { TodoForm } from './components/TodoForm'
import { Modal } from './components/Modal'
import { ToastContainer } from './components/Toast'

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── Header ── */}
        <header className="mb-8">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#d4a853]" />
            <span className="w-2 h-2 rounded-full bg-[#d4a853]/50" />
            <span className="w-2 h-2 rounded-full bg-[#d4a853]/20" />
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#e6e0d0] font-display tracking-tight leading-tight">
            待办事项
          </h1>
          <p className="text-sm text-[#6a6460] mt-1.5">
            管理你的日常任务，保持专注
          </p>
        </header>

        {/* ── Stats ── */}
        <section className="mb-7">
          <Statistics />
        </section>

        {/* ── Filters ── */}
        <section className="mb-6">
          <TodoFilters />
        </section>

        {/* ── Task list ── */}
        <section>
          <TodoList />
        </section>
      </div>

      {/* ── FAB ── */}
      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-13 h-13 bg-[#d4a853] text-[#0d0d19] rounded-full shadow-lg shadow-[#d4a853]/18 flex items-center justify-center hover:bg-[#c49a3f] active:bg-[#b88d35] active:scale-95 transition-all duration-200 hover:scale-105 animate-pulse-glow"
        aria-label="新建任务"
        style={{ width: 52, height: 52 }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* ── Add modal ── */}
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="新建任务"
      >
        <TodoForm onClose={() => setIsFormOpen(false)} />
      </Modal>

      {/* ── Toasts ── */}
      <ToastContainer />
    </div>
  )
}
