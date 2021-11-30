import Image from 'next/image';
import Table from './Table';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import formatOutput from '@/utils/formatOutput';

interface ABCTableProps {
  table: { [key: string]: any[] };
}

function ABCTable({ table }: ABCTableProps) {
  // const headerOrder = [
  //   'step',
  //   'currentPriceParsed',
  //   'currentSupplyParsed',
  //   'amountInParsed',
  //   'tributeCollectedParsed',
  //   'amountOutParsed',
  //   'newPriceParsed',
  //   'slippage',
  // ];

  return (
    <Table
      header={
        <>
          <TableHeader
            headerText="tx"
            size="s"
            tooltipText="See the order in which simulated buy and sell transactions (tx) are processed on the ABC simulator."
          />
          <TableHeader
            headerText="reserve"
            tooltipText="The amount of wxDAI currently held as collateral in the ABC simulator. This amount backs the value of the TEC token."
          />
          <TableHeader
            headerText="total supply"
            tooltipText="The total amount of TEC currently in circulation."
          />
          <TableHeader
            headerText="price"
            size="s"
            tooltipText="The price of the TEC token, in wxDAI, at the beginning of the transaction."
          />
          <TableHeader
            headerText="amount in"
            tooltipText="If the amount in is wxDAI this transaction is a BUY order.  If the amount in is TEC then the transaction is a SELL order."
          />
          <TableHeader
            headerText="tribute"
            tooltipText="The amount of funds, in wxDAI, taken from the order and sent to the Common Pool. This is a determined using the parameters Entry &amp; Exit Tribute."
          />
          <TableHeader
            headerText="amount out"
            tooltipText="If the amount out is wxDAI this transaction is a SELL order.  If the amount out is TEC then this transaction is a BUY order."
          />
          <TableHeader
            headerText="new price"
            tooltipText="The updated price of the TEC token, in wxDAI, resulting from the transaction."
          />
          <TableHeader
            headerText="price slippage"
            tooltipText={
              <span>
                The TEC token price fluctuates based on the size of buys and
                sells along the curve. The <i>price slippage</i> is the relative
                difference between the <b>Current Price</b> and the{' '}
                <b>average price</b> of TEC that was bought or sold.
              </span>
            }
          />
        </>
      }
      content={table.step?.map((elem, index) => (
        <TableRow>
          <TableCell
            content={
              <div className="flex gap-1 justify-right items-center">
                <span className="w-3">{table.step[index]}</span>
                <Image
                  src={`/icons/arrow_${table.amountInParsed[index].type}.svg`}
                  height="16"
                  width="16"
                />
              </div>
            }
            size="s"
            // tooltipColumn
          />
          <TableCell
            content={`${table.currentBalanceParsed[index]} wxDAI`}
            tooltipColumn
          />
          <TableCell
            content={formatOutput(table.currentSupplyParsed[index])}
            tooltipColumn
          />
          <TableCell
            content={formatOutput(table.currentPriceParsed[index])}
            size="s"
            tooltipColumn
          />
          <TableCell
            content={`${formatOutput(
              table.amountInParsed[index].amount,
              '',
              table.amountInParsed[index].currency
            )} ${table.amountInParsed[index].currency}`}
            tooltipColumn
          />

          <TableCell
            content={formatOutput(table.tributeCollectedParsed[index])}
            tooltipColumn
          />
          <TableCell
            content={formatOutput(
              table.amountOutParsed[index],
              'amountOutParsed'
            )}
            tooltipColumn
          />
          <TableCell
            content={formatOutput(table.newPriceParsed[index])}
            tooltipColumn
          />
          <TableCell content={table.slippage[index]} tooltipColumn />
        </TableRow>
      ))}
    />
  );
}

export default ABCTable;
