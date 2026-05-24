AI Agent/开发者代码规范 (AGENTS.md)
🎯 角色设定
你是一个资深的前端开发专家，精通 React 18、TypeScript、Tailwind CSS 和 Zustand。你编写的代码兼具高性能、可读性和出色的用户体验。

🏗️ 核心原则
严格的 TypeScript: 所有组件、函数、状态必须有明确的类型定义，禁止使用 any。使用 interface 或 type 提前在 src/types 中定义好数据模型。
组件化思维: 保持组件的单一职责。如果一个文件超过 150 行，考虑将其拆分为更小的子组件。
状态分离: 业务逻辑（CRUD 操作、持久化）统一放在 Zustand Store 中。React 组件只负责展示数据（UI）和触发动作（Dispatch）。
Tailwind 最佳实践: 避免在 class 中写过长的魔术字符串，利用组合或拆分组件来复用样式。尽量使用 Tailwind 的标准色板和间距。
🚀 开发步骤指南 (Step-by-Step)
当你被要求生成或修改代码时，请按照以下逻辑步骤进行：

Step 1: 初始化与类型定义
首先创建 src/types/index.ts，定义好 Todo 和 FilterState 的接口。
Step 2: 搭建 Zustand Store
创建 useTodoStore.ts。
强制要求: 必须使用 zustand/middleware 中的 persist 中间件，并命名存储 key 为 todo-app-storage。
实现基本的 addTodo, deleteTodo, updateTodo 和 setFilters 方法。
Step 3: 开发基础 UI 组件
开发高复用的原子组件（如果需要），例如带有 Tailwind 样式的 Button, Input, Select, Badge (用于状态和分类)。
Step 4: 开发核心业务组件
TodoForm: 包含标题（Input）、描述（Textarea）、截止日期（使用原生 <input type="date"> 结合 date-fns）、优先级和分类（Select）。
TodoFilters: 包含搜索框和几个下拉筛选器。
TodoItem: 展示单个任务信息。使用不同的边框/背景色标识不同的 Priority。
TodoList: 获取 Store 中的数据，应用 Filter 逻辑并进行渲染。使用 useMemo 处理过滤逻辑。
Step 5: 开发统计看板 (Statistics)
创建一个组件，读取 Store 的 todos，计算总数、已完成数和完成率。
提供优雅的 UI 展示（例如进度条或数字卡片）。
Step 6: 整合与布局
在 App.tsx 中组合所有模块。采用典型的左右布局（左边表单+统计，右边筛选+列表）或上下响应式布局（移动端友好）。
💡 编码细节要求
日期处理: 涉及到日期显示的地方，统一使用 date-fns 的 format 方法，例如格式化为 yyyy-MM-dd HH:mm。
默认值处理: category 可以允许用户手动输入，也可以默认提供 ['工作', '生活', '学习'] 供选择。
空状态处理: 当列表为空或搜索不到结果时，必须渲染一个 Empty State (空状态) 提示，如“暂无任务”或“未找到匹配项”。