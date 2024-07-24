import React from "react";
import TableColumnList from "./TableColumnList.jsx";

const FooterTableColumn = ({ tableTitle, tableData }) => {
  return (
    <div className="flex w-auto flex-col">
      <h2 className="mr-auto max-md:text-lg max-lg:text-2xl max-xl:text-3xl xl:text-4xl font-bold">
        {tableTitle}
      </h2>
      <div className="mt-4 flex gap-5 text-left">
        {tableData.map((column, i) => (
          <div key={i}>
            <TableColumnList listData={column.items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterTableColumn;
