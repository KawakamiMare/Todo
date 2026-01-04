export interface Todo {
    id: number;
    title: string;
    progress:  "TODO" | "IN_PROGRESS" | "ALMOST_DONE" | "DONE" | "STOPPING";
    description?: string; // TypescriptではLocalDateやLocalDateTime型は存在しないので文字列にする
    deadline?: string;
    priority?: "A" | "B" | "C";
    createdAt: string;
    updatedAt: string;
}  