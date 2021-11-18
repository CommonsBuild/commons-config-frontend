import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import formatOutput from '@/utils/formatOutput';

interface ConvictionVotingTableProps {
  timePeriod?: string;
  table: { [key: string]: (number | string)[] };
}

function ConvictionVotingTable({
  timePeriod,
  table,
}: ConvictionVotingTableProps) {
  return (
    <Table
      header={
        <>
          <TableHeader headerText="Proposal" size="m" />
          <TableHeader headerText="requested amount (wxdai)" size="l" />
          <TableHeader headerText="common pool (wxdai)" size="l" />
          <TableHeader headerText="effective supply (tec)" size="l" />
          <TableHeader
            headerText={`min tokens needed to pass in ${
              timePeriod || '2 weeks'
            } (tec)`}
            size="l"
          />
        </>
      }
      content={table.amountInCommonPool?.map((elem, index) => (
        <TableRow>
          <TableCell content={index + 1} size="m" />
          <TableCell
            content={formatOutput(table.requestedAmount[index])}
            size="l"
          />
          <TableCell
            content={formatOutput(table.amountInCommonPool[index])}
            size="l"
          />
          <TableCell
            content={formatOutput(table.totalEffectiveSupply[index], '', 'TEC')}
            size="l"
          />
          <TableCell
            content={formatOutput(table.tokensToPassIn2Weeks[index], '', 'TEC')}
            size="l"
          />
        </TableRow>
      ))}
    />
  );
}

export default ConvictionVotingTable;
