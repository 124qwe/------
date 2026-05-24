技术设计文档 (TECH_DESIGN.md)
1. 技术栈选型
核心框架: React 18 + TypeScript (严格模式)
构建工具: Vite (提供极速冷启动和 HMR)
状态管理: Zustand (结合 persist 中间件实现极简的 LocalStorage 同步)
样式方案: Tailwind CSS (原子化 CSS，快速构建响应式 UI)
日期处理: date-fns (轻量级，支持 Tree-shaking)
图标库: Lucide-React / Heroicons (可选，提供美观的 SVG 图标)
2. 数据模型设计 (Data Models)
TypeScript

// src/types/index.ts

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'completed';

export interface Todo {
  id: string;              // 唯一标识 (UUID 或 Date.now().toString())
  title: string;           // 标题
  description?: string;    // 描述
  dueDate?: number | null; // 截止日期 (时间戳)
  priority: Priority;      // 优先级
  category: string;        // 分类
  status: Status;          // 状态
  createdAt: number;       // 创建时间
  updatedAt: number;       // 更新时间
}

export interface FilterState {
  searchQuery: string;
  status: Status | 'all';
  priority: Priority | 'all';
  category: string | 'all';
}
3. 状态管理设计 (Zustand Store)
使用 Zustand 构建全局 Store，并利用 persist 中间件自动写入 LocalStorage。

TypeScript

// src/store/useTodoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, FilterState } from '../types';

interface TodoStore {
  todos: Todo[];
  filters: FilterState;
  
  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  
  // Getters (在 Zustand 中可以通过 custom hooks 计算，或者直接在此定义衍生状态)
  categories: string[];
}
4. 目录结构规划
text

src/
├── assets/         # 静态资源
├── components/     # UI 组件
│   ├── ui/         # 基础复用组件 (Button, Input, Modal 等)
│   ├── Todo/       # 业务组件
│   │   ├── TodoForm.tsx      # 表单组件 (新建/编辑)
│   │   ├── TodoItem.tsx      # 单个任务卡片
│   │   ├── TodoList.tsx      # 任务列表
│   │   └── TodoFilters.tsx   # 搜索与筛选栏
│   └── Dashboard/
│       └── Statistics.tsx    # 统计面板
├── hooks/          # 自定义 Hooks (如 useTodoStats 用于计算完成率)
├── store/          # Zustand 状态管理
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数 (日期格式化等)
├── App.tsx         # 根组件 (布局组合)
└── main.tsx        # 入口文件