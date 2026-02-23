import { TODO_PROGRESS } from "../constants/todoConstants";
import { TODO_PRIORITIES } from "../constants/todoConstants";

export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;  

export type ProgressType = typeof TODO_PROGRESS[number]["id"]; // TODO_PRPGRESS の配列の、何番目でもいいから中身の要素をとってきてそのidプロパティの型だけを引き抜く
export type PriorityType = typeof TODO_PRIORITIES[number]["id"];

export interface Todo {
    id: number;
    title: string;
    progress: ProgressType;
    description?: string;
    deadline?: string; // TypescriptではLocalDateやLocalDateTime型は存在しないので文字列にする
    priority?: PriorityType;
    createdAt: string;
    updatedAt: string;
}

export const INITIAL_TODO_INPUT: TodoInput = {
    title: "",
    description: "",
    progress: "TODO", 
    deadline: "",
    priority: "B", 
};