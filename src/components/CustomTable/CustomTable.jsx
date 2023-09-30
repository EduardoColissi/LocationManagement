import { Table } from "antd";
import "./style.css";

const CustomTable = ({ columns, data, emptyText }) => {
  return (
    <Table
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={data == undefined ? [] : data}
      columns={columns}
      pagination={true}
      rowKey={(record) => record.id}
      locale={{ emptyText: emptyText }}
      bordered
      size="small"
    />
  );
};

export default CustomTable;
