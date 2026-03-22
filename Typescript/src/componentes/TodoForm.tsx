import { useState } from "react";
import { INITIAL_TODO_INPUT, TodoInput } from "../types/todo";
import { Box, Paper, Card, TextField, Button } from "@mui/material";
import { TODO_PRIORITIES } from "../constants/todoConstants";

type TodoFormProps = {
    createTodo: (todo: TodoInput) => void;
}

export const TodoForm = ({ createTodo }: TodoFormProps) => {
    const [inputTodo, setInputTodo] = useState<TodoInput>(INITIAL_TODO_INPUT);
    // 追加ボタンの処理
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault(); //←これがないと、送信時（登録ボタン押下時に勝手に画面リロードされてしまう。）
        if (!inputTodo.title.trim()) return;
        //return;は、それ以降のこの関数を実行しない、という意味。
        // つまり空行を除いてタイトルが空だったら、これより下のcreateTodo(サーバーにデータを送る)やsetNewTodo（入力欄を空にする）は実行されない
        createTodo({
            title: inputTodo.title,
            progress: "TODO", // 初期値　つまり、登録時はこの"TODO"決め打ちで選べない
            description: inputTodo.description,
            deadline: inputTodo.deadline === "" ? undefined : inputTodo.deadline,
            priority: inputTodo.priority === undefined ? undefined : inputTodo.priority
        });
        setInputTodo(INITIAL_TODO_INPUT)
    };

    return (
        <form onSubmit={handleAdd}>
            <Box sx={{ margin: '0 auto 32px auto', maxWidth: 588 }} component={Paper}>
                <Card sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        value={inputTodo.title}
                        onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
                        placeholder='タスクを入力して下さい'
                        label="タスク名"
                        variant='filled'
                        sx={{ mb: 1 }}
                    />
                    {/* <TextField
              fullWidth
              value={inputTodo.description}
              onChange={(e) => setInputTodo({ ...inputTodo, description: e.target.value })}
              placeholder='概要を入力してください'
            /> */}
                    <TextField
                        value={inputTodo.deadline}
                        onChange={(e) => setInputTodo({ ...inputTodo, deadline: e.target.value })}
                        type='datetime-local'
                        // min={now}
                        variant='filled'
                        label='締切'
                        sx={{ mr: 2, width: '40%' }}
                    />
                    <TextField
                        value={inputTodo.priority}
                        onChange={(e) => setInputTodo({ ...inputTodo, priority: e.target.value as TodoInput["priority"] })}
                        variant='filled'
                        select
                        label="優先度"
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                        sx={{ p: '1', width: '40%' }}
                    >
                        <option value={undefined}></option>
                        {TODO_PRIORITIES.map((p) => (
                            <option key={p.label} value={p.id}>
                                {p.label}
                            </option>
                        ))}
                    </TextField>
                    <Button type="submit" variant='contained'>登録</Button>
                    {/* type="submit"のボタンが押されると、formタグに送信イベントを発火させる */}
                </Card>
            </Box>
        </form>
    )
}
