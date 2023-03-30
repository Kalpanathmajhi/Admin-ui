import React, { useState } from "react";
import TableRow from "./Row";

const TableBody = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (id) => {
    const selected = selectedRows.includes(id);
    if (selected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <tbody>
      {props.data.map((el, idx) => (
        <TableRow
          columns={props.columns}
          key={idx}
          checked={selectedRows.indexOf(el.id) >= 0}
          delete={props.delete}
          onSelect={handleRowSelect}
          el={el}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
