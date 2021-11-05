import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import formatOutput from '@/utils/formatOutput';

function MilestoneTable({ data }) {
  return (
    <Table
      header={
        <>
          <TableHeader headerText="tec token price (wxdai)" size="xl" />
          <TableHeader headerText="reserve balance (wxdai)" size="xl" />
          <TableHeader headerText="total token supply (wxdai)" size="xl" />
        </>
      }
      content={data.balance?.map((elem, index) => {
        if (index % 4 === 0 || index === 26) {
          return (
            <TableRow>
              <TableCell content={data.price[index].toFixed(2)} size="xl" />
              <TableCell
                content={formatOutput(data.balance[index])}
                size="xl"
              />
              <TableCell content={data.supply[index].toFixed(2)} size="xl" />
            </TableRow>
          );
        }
        return <></>;
      })}
    />
  );
}

export default MilestoneTable;
