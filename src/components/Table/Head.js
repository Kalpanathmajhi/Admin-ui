import { useCallback } from "react";
import "./Table.css";

const TableHead = ({ columns, onSelect, checked }) => {
  const selectAll = useCallback(() => {
    onSelect();
  }, [onSelect]);

  return (
    <thead>
      <tr>
        <th key="select-all-checkbox">
          <input onChange={selectAll} checked={checked} type="checkbox" />
        </th>

        {columns.map((el, idx) => (
          <th key={idx}>{el}</th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
