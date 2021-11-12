import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TaoVotingTableProps {
  table: { [key: string]: number[] };
}

const rowName = [
  'Time to vote on proposals',
  'Time to review a delegated vote',
  'Time to execute a passing proposal',
];

function TaoVotingTable({ table }: TaoVotingTableProps) {
  return (
    <Table
      header={
        <>
          <TableHeader headerText="quiet ending extensions" size="xl" />
          <TableHeader bold={false} headerText="no extension" size="xl" />
          <TableHeader bold={false} headerText="with 1 extension" size="xl" />
          <TableHeader bold={false} headerText="with 2 extensions" size="xl" />
        </>
      }
      content={
        table ? (
          Object.keys(table).map((elem, index) => (
            <TableRow>
              <TableCell bold content={rowName[index]} size="xl" />
              <TableCell content={table[elem][0]} size="xl" />
              <TableCell content={table[elem][1]} size="xl" />
              <TableCell content={table[elem][2]} size="xl" />
            </TableRow>
          ))
        ) : (
          <></>
        )
      }
    />
  );
}

export default TaoVotingTable;
