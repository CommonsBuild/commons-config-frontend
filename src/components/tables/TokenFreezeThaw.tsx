import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TokenFreezeThawTableProps {
  table: { [key: string]: number[] };
}

function TokenFreezeThawTable({ table }: TokenFreezeThawTableProps) {
  return (
    <Table
      header={
        <>
          <TableHeader
            headerText="# of weeks"
            size="xl"
            tooltipText="The amount of weeks that have passed since the Commons Upgrade."
          />
          <TableHeader
            headerText="% of tokens released"
            size="xl"
            tooltipText="The percentage of Hatchers' TEC tokens that have become liquid from the Token Thaw."
          />
          <TableHeader
            headerText="price floor of token"
            size="xl"
            tooltipText="The minimum possible price of the TEC token, assuming all liquid TEC tokens are sold."
          />
        </>
      }
      content={table?.price?.map((elem, index) => (
        <TableRow key={index}>
          <TableCell content={`${table.week[index]} weeks`} size="xl" />
          <TableCell
            content={`${Number(table.tokensReleased[index].toFixed(2)) * 100}%`}
            size="xl"
          />
          <TableCell content={`${elem.toFixed(2)} wxDAI`} size="xl" />
        </TableRow>
      ))}
    />
  );
}

export default TokenFreezeThawTable;
