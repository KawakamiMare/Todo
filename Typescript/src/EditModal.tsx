import React, { useEffect, useState } from "react";
import './EditModal.css';
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Todo } from "./types/todo";

const EditModal = ({ open, onClose, todo }: { open: boolean; onClose: () => void; todo: Todo | null; }) => {
    const [editTitle, setEditTitle] = useState("");
    useEffect(() => {
        todo && setEditTitle(todo.title)
    }, [todo]);
    // 開かれてたら、以下を返す
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>タスクの編集</DialogTitle>
            <DialogContent>
                <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    label="課題名"
                    variant="standard"
                    fullWidth
                />
                <p>概要:{todo?.description}</p>
                <p>期限:{todo?.deadline}</p>
                <p>優先度:{todo?.priority}</p>
                <p>進捗:{todo?.progress}</p>


            </DialogContent>

        </Dialog>

    )
}
export default EditModal;