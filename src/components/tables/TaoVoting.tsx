import Table from './Table';
import TableHeader from './TableHeader';

function TaoVotingTable() {
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
      content={<></>}
    />
  );
}

export default TaoVotingTable;
