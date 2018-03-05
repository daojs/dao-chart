export const lineScale = (resultMin, resultMax, dataMin, dataMax, data) => {
  const a = (resultMax - resultMin) / (dataMax - dataMin);
  const b = resultMin - (a * dataMin);

  return (a * data) + b;
};
