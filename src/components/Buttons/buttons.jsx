import React from "react";
import "./buttons.css";

const Buttons = ({onChange, checked, onClickDelete, onClickEdit}) => {

  return (
            <div className="task__btn-bar">
              <input
                className="form__input-check"
                type="checkbox"
                onChange={onChange}
                checked={checked}
              />
              <button className="btn" onClick={onClickDelete}>
                ❌
              </button>
              <button className="btn" onClick={onClickEdit}>
                ✏️
              </button>
            </div>
  );
};

export default Buttons;