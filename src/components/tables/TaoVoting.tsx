import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TaoVotingTableProps {
  table: { [key: string]: number[] };
}

const rowName = [
  { name: 'Time to vote on proposals', id: 'timeVote' },
  { name: 'Time to review a delegated vote', id: 'timeReview' },
  { name: 'Time to execute a passing proposal', id: 'timeExecute' },
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
          rowName.map((elem) => (
            <TableRow>
              <TableCell bold content={elem.name} size="xl" />
              <TableCell content={table?.[elem.id]?.[0]} size="xl" />
              <TableCell content={table?.[elem.id]?.[1]} size="xl" />
              <TableCell content={table?.[elem.id]?.[2]} size="xl" />
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
