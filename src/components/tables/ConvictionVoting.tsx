import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface ConvictionVotingTableProps {
  table: { [key: string]: (number | string)[] };
}

function ConvictionVotingTable({ table }: ConvictionVotingTableProps) {
  const scenarioTableVariables = [
    { id: 'totalEffectiveSupply', header: 'Effective supply (TEC)' },
    { id: 'amountInCommonPool', header: 'Common Pool (wxDAI)' },
    { id: 'requestedAmount', header: 'Requested Amount (wxDAI)' },
    { id: 'minTokensToPass', header: 'Minimum Tokens Needed (TEC)' },
    {
      id: 'tokensToPassIn2Weeks',
      header: 'Tokens Needed To Pass (TEC)',
    },
  ];
  return (
    <Table
      header={
        <>
          <TableHeader
            headerText="variables"
            size="xl"
            tooltipText="Take note of these variables as we simulate some of the requirements for successfully passing a funding request."
          />
          <TableHeader
            headerText="scenario 1"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
          <TableHeader
            headerText="scenario 2"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
          <TableHeader
            headerText="scenario 3"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
          <TableHeader
            headerText="scenario 4"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
          <TableHeader
            headerText="scenario 5"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
          <TableHeader
            headerText="scenario 6"
            size="l"
            tooltipText="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          />
        </>
      }
      content={scenarioTableVariables.map((elem) => (
        <TableRow>
          <TableCell content={elem.header} size="xl" />
          {table[elem.id]?.map((row) => (
            <TableCell
              bold={elem.id === 'requestedAmount'}
              content={row.toLocaleString('en-us')}
              size="l"
            />
          ))}
        </TableRow>
      ))}
    />
  );
}

export default ConvictionVotingTable;
