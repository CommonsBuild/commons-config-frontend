const formatOutput = (output, header?: string) => {
  if (header === 'step') {
    return output;
  }
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
  if (typeof output === 'string' && !Number(output)) {
    return output;
  }
  return formatter.format(output);
};

export default formatOutput;
