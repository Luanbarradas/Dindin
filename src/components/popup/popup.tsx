import React from "react";
import "./style.css";
import { PopupProps } from "../../interfaces/transaction";

export const ConfirmDeletePopup: React.FC<PopupProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirm-delete-popup">
            <p>Apagar Item?</p>
            <div className="popup-buttons">
                <button className="popup-buttonYes" onClick={onConfirm}>Sim</button>
                <button className="popup-buttonNo" onClick={onCancel}>Não</button>
            </div>
        </div>
    );
};