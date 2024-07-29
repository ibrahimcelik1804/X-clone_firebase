import React from "react";
import { useRef } from "react";

const Dropdown = ({ handleDelete, setIsEditMode }) => {
  const checkbox = useRef();
  return (
    <div>
      <label className="popup">
        <input ref={checkbox} type="checkbox" />
        <div className="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <ul>
            <li>
              <button
                onClick={() => {
                  checkbox.current.checked = false;
                  setIsEditMode(true);
                }}
              >
                <img src="edit.svg" alt="" />
                <span>Düzenle</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <img src="delete.svg" alt="" />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
};

export default Dropdown;
