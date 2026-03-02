export const TODO_PROGRESS = [
    { id: "TODO", label: "未着手", },
    { id: "IN_PROGRESS", label: "進行中" },
    { id: "ALMOST_DONE", label: "ほぼ完了" },
    { id: "DONE", label: "完了" },
    { id: "STOPPING", label: "中断中" }
] as const;

export const TODO_PRIORITIES = [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
] as const;