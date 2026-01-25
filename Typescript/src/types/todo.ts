import { TODO_PROGRESS } from "../constants/todoConstants";
import { TODO_PRIORITIES } from "../constants/todoConstants";

export type ProgressType = typeof TODO_PROGRESS[number]["id"];
export type PriorityType = typeof TODO_PRIORITIES[number]["id"];

export interface Todo {
    id: number;
    title: string;
    progress:  ProgressType;
    description?: string; 
    deadline?: string; // TypescriptではLocalDateやLocalDateTime型は存在しないので文字列にする
    priority?: PriorityType;
    createdAt: string;
    updatedAt: string;
}  