import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../services/todoService";
import { error } from "console";
import { Todo } from "../types/todo";

export const useTodos = () => {
    const queryClient = useQueryClient();

    // データの取得
    const todosQuery = useQuery({
        queryKey: ['todos'], // キャッシュのキー
        queryFn: todoService.getAll,
    });

    // データの作成
    const createTodoMutation = useMutation({
        mutationFn: todoService.create,
        onSuccess: () => {
        // 成功したら'todos'キーのキャッシュを無効化して再取得
            queryClient.invalidateQueries({queryKey:['todos']});
        },
    });

    // データの更新
    const updateTodoMutation = useMutation({
        mutationFn: ({id, todo}: {id: number; todo: Todo }) =>
            todoService.update(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
    
    // データの削除
    const deleteTodoMutation = useMutation({
        mutationFn: todoService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    return {
        todos: todosQuery.data ?? [], // データがない場合はから配列
        isLoading: todosQuery.isLoading,
        isError: todosQuery.isError,
        error: todosQuery.error,
        createTodo: createTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate,
        deleteTodo: deleteTodoMutation.mutate,
    };
}