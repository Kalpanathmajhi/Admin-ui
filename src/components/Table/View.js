import { Table } from "react-bootstrap";

import TableBody from "./Body";
import TableHead from "./Head";

const TableView = ({ columns, data, selected, onAllSelect, onSelect, delete: handleDelete }) => (
  <>
    <Table responsive bordered hover>
      <TableHead
        columns={columns}
        checked={selected.length === data.length}
        onSelect={onAllSelect}
      />

      <TableBody
        columns={columns}
        data={data}
        onSelect={onSelect}
        selected={selected}
        delete={handleDelete}
      />
    </Table>
  </>
);

export default TableView;
