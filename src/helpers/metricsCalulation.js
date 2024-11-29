export const mapMetrics = (data, metricsMapping) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []; // Return an empty array if data is not valid
  }

  return data.flatMap((item, itemIndex) =>
    Object.keys(metricsMapping).map((key, keyIndex) => ({
      id: `${itemIndex}-${keyIndex}`, // Use index for the ID
      metric: metricsMapping[key],
      value:
        typeof item?.[key] === 'number' && key.includes('Rate')
          ? `${item[key]}%`
          : item?.[key] || 'N/A',
    })),
  );
};
