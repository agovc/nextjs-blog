import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";

interface RowData {
  id: number;
  name: string;
  role: string;
  newBusinessQuota: string;
  booked: string;
  children: RowData[];
}

interface RowProps {
  data: RowData;
  depth: number;
  openRows: { [key: number]: boolean };
  onToggle: (id: number) => void;
}

interface TableProps {
  rows: RowProps["data"][];
}

const Row = (props: RowProps) => {
  const { data, depth, openRows, onToggle } = props;
  const isOpen = openRows[data.id] || false;
  const hasChildren = data.children.length > 0;
  const paddingLeft = 20 * depth;

  return (
    <>
      <TableRow>
        <TableCell>
          <div style={{ paddingLeft }} className={`flex`}>
            <div className="w-8 flex items-center">
              {hasChildren && (
                <button onClick={() => onToggle(data.id)}>
                  {isOpen ? <ChevronDown /> : <ChevronRight />}
                </button>
              )}
            </div>
            <div>
              <div className="font-semibold">{data.name}</div>
              <div>{data.role}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>{data.newBusinessQuota}</TableCell>
        <TableCell>{data.booked}</TableCell>
      </TableRow>
      {isOpen &&
        hasChildren &&
        data.children.map((child) => (
          <Row
            key={child.id}
            data={child}
            openRows={openRows}
            onToggle={onToggle}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

const CollapsableTable = (props: TableProps) => {
  const { rows } = props;
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Name</TableHead>
          <TableHead scope="col">New Business Quota</TableHead>
          <TableHead scope="col">Booked</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <Row
            key={row.id}
            data={row}
            openRows={openRows}
            onToggle={handleToggle}
            depth={0}
          />
        ))}
      </TableBody>
    </Table>
  );
};

const CollapsableTableExample = () => {
  const rows: RowData[] = [
    {
      id: 1,
      name: "Liet-Kynes",
      role: "VP of Arrakis",
      newBusinessQuota: "$400,000",
      booked: "$30,000",
      children: [
        {
          id: 4,
          name: "Alia Atreides",
          role: "NA Commercial",
          newBusinessQuota: "$200,000",
          booked: "$20,000",
          children: [],
        },
        {
          id: 7,
          name: "Thufir Hawat",
          role: "Manager",
          newBusinessQuota: "$30,000",
          booked: "$10,000",
          children: [
            {
              id: 9,
              name: "Duncan Idaho",
              role: "Associate",
              newBusinessQuota: "$10,000",
              booked: "$4,000",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Dr. Wellington Yueh",
      role: "Manager",
      newBusinessQuota: "$200,000",
      booked: "$15,000",
      children: [],
    },
    {
      id: 3,
      name: "Irulan Corrino",
      role: "Associate",
      newBusinessQuota: "$100,000",
      booked: "$10,000",
      children: [],
    },
  ];

  return (
    <div>
      <CollapsableTable rows={rows} />
    </div>
  );
};

export default CollapsableTableExample;
