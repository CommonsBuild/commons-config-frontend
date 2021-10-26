const formatOutput = (output, header?: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (header === 'amountInParsed' || header === 'amountOutParsed') {
    const outputParts = output.match(/[a-z]+|[^a-z]+/gi);
    return `${formatter.format(outputParts[0]).toLocaleString()} ${
      outputParts[1]
    }`;
  }
  return Number(output)?.toLocaleString('en-us');
};

export default formatOutput;
