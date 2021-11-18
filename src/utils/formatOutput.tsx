const formatOutput = (output, header?: string, currency?: string) => {
  if (header === 'step') {
    return output;
  }
  const wxDAIFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const TECFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (header === 'amountInParsed' || header === 'amountOutParsed') {
    const outputParts = output.match(/[a-z]+|[^a-z]+/gi);
    if (outputParts[1] === 'TEC') {
      return `${TECFormatter.format(outputParts[0]).toLocaleString()} ${
        outputParts[1]
      }`;
    }
    return `${wxDAIFormatter.format(outputParts[0]).toLocaleString()} ${
      outputParts[1]
    }`;
  }
  if (typeof output === 'string' && !Number(output)) {
    return output;
  }
  if (currency === 'TEC') {
    return TECFormatter.format(output);
  }
  return wxDAIFormatter.format(output);
};

export default formatOutput;
