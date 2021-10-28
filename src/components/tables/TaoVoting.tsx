import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TaoVotingTableProps {
  table: { [key: string]: number };
}

function TaoVotingTable({ table }: TaoVotingTableProps) {
  return (
    <Table
      header={
        <>
          <TableHeader headerText="quiet ending extensions" size="xl" />
          <TableHeader headerText="no extension" size="xl" />
          <TableHeader headerText="with 1 extension" size="xl" />
          <TableHeader headerText="with 2 extensions" size="xl" />
        </>
      }
      content={
        <TableRow>
          <TableCell
            content="Total amount of time to complete a vote"
            size="xl"
          />
          <TableCell content={table.noExtension} size="xl" />
          <TableCell content={table.firstExtension} size="xl" />
          <TableCell content={table.secondExtension} size="xl" />
        </TableRow>
      }
    />
  );
}

export default TaoVotingTable;
