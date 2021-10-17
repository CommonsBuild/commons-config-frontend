import Table from './Table';
import TableHeader from './TableHeader';

function TaoVotingTable() {
  return (
    <Table
      header={
        <>
          <TableHeader
            headerText="quiet ending extensions"
            size="xl"
            tooltipText="a"
          />
          <TableHeader headerText="no extension" size="xl" tooltipText="a" />
          <TableHeader
            headerText="with 1 extension"
            size="xl"
            tooltipText="a"
          />
          <TableHeader
            headerText="with 2 extensions"
            size="xl"
            tooltipText="a"
          />
        </>
      }
      content={<></>}
    />
  );
}

export default TaoVotingTable;
