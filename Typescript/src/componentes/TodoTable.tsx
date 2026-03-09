import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Checkbox, TablePagination, Box } from "@mui/material";
import { Todo } from "../types/todo";
import { getPriorityColor, getProgressColor } from "../utils/todoUtils";
import { useState } from "react";
type TodoTableProps = {
    todos: Todo[]; //　配列なのでTodo[]型　Serviceを見ればわかる→なんでserviceを見ようってなったんだ？
    deleteTodo: (id: number) => void;
    onOpenModal: (todo: Todo) => void;
}

export const TodoTable = ({ todos, deleteTodo, onOpenModal }: TodoTableProps) => {
    const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    const rowsPerPage = 9;
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    return (
        <Box>
            <Paper sx={{ margin: '0 auto', maxWidth: 900 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableCell
                            role="chekBox"
                            aria-checked
                        ></TableCell>

                        <TableCell sx={{ width: '30%' }}>タイトル</TableCell>
                        <TableCell sx={{ width: '30%' }}>概要</TableCell>
                        <TableCell sx={{ width: '10%' }}>締切</TableCell>
                        <TableCell sx={{ width: '9%' }}>優先度</TableCell>
                        <TableCell sx={{ width: '10%' }}>進捗状況</TableCell>
                    </TableHead >
                    <TableBody>
                        {/* ↑<ul>の直下に<li>がないといけない。urは順序のないリスト */}
                        {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(todo => (
                            // ↓mapの直下のタグではkeyが必要。画面を書き換える際に、変わりやすい index ではなく、唯一の id を指定しないと適切に処理できない（削除とか）
                            <TableRow
                                key={todo.id}
                                hover>
                                <TableCell>
                                    <Checkbox
                                    />
                                </TableCell>
                                <TableCell>
                                    <span style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => onOpenModal(todo)}
                                    >
                                        {todo.title}
                                    </span>
                                </TableCell>
                                {/* divと同じで、グループ化するみたいなやつ。divより短く、一部を装飾する。ここではタイトルだけを青くしている */}
                                <TableCell>{todo.description || "ー"}</TableCell>
                                <TableCell>{todo.deadline || "ー"}</TableCell>
                                <TableCell>{todo.priority ? <Chip label={todo.priority} color={getPriorityColor(todo.priority!)} /> : "ー"}</TableCell>
                                <TableCell><Chip label={todo.progress} color={getProgressColor(todo.progress)} variant='outlined' /></TableCell>
                                <TableCell><Button variant='outlined' onClick={() => { if (window.confirm("本当に削除してよろしいですか？")) deleteTodo(todo.id) }}>削除</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={todos.length}
                    page={page} //現在のページ数 
                    rowsPerPage={rowsPerPage} //１ページに何件表示するか
                    onPageChange={handleChangePage} //ページを変えたときの処理
                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}