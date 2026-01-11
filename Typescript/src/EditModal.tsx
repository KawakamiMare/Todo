import React from "react";
import './EditModal.css';

const EditModal = (props: { showEditModal: any; }) => {
    console.log("Modal Props:", props.showEditModal)
    // モーダルが開かれてなければ、ここで帰る（何も描画しない）
    if (!props.showEditModal) {
        return null;
    }

    // 開かれてたら、以下を返す
    return (
        <div className="modal">
            <h1>編集画面</h1>
        
        </div>
    )
}
export default EditModal;