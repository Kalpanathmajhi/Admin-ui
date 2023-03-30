import { useState } from "react";
import "./Table.css";

const TableRow = ({ columns, el, selected, delete: handleDelete, onSelect }) => {
  const [editable, setEditable] = useState(false);

  const handleToggle = () => {
    onSelect(el.id);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    // call api endpoint with patch here if the details need to be persisted
  };

  return (
    <tr id={el.id} className={selected ? "selected" : "unselected"}>
      {/* Checkbox */}
      <td id="checkbox">
        <input
          type="checkbox"
          checked={selected}
          onChange={handleToggle}
          value={el.id}
        />
      </td>

      {/* All other columns */}
      {columns.map((columnName) => (
        <td
          key={`${columnName}-${el.id}`}
          id={`${columnName}-${el.id}`}
          className={columnName}
          contentEditable={editable}
        >
          {el[columnName]}
        </td>
      ))}

      <td id="actions">
        {/* Conditionally render save button */}
        {editable && (
          <button onClick={handleSave}>
            <img
              src="https://img.icons8.com/material-rounded/24/000000/save.png"
              alt="save-button"
            />
          </button>
        )}

        {/* Disable the edit button when editing */}
        <button disabled={editable} onClick={handleEdit}>
          <img
            className="icon"
            src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/256/edit-icon.png"
            alt="edit button"
          />
        </button>

        {/* Disable the delete button when editing */}
        <button disabled={editable} onClick={() => handleDelete(el.id)}>
          <img
            className="icon"
            src="https://icons.veryicon.com/png/o/miscellaneous/simple-linear-icon-10/delete-1133.png"
            alt="delete button"
          />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;

