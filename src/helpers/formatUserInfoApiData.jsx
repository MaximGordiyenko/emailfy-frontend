export const formatUserInfoApiData = (apiData) => {
  // Utility function to format amount
  const formatAmount = (value) => (value ? `$${value}` : '-');

  // Calculate discount and official amounts
  const discount = 20;
  const official = apiData?.amount - discount;

  return [
    {
      key: '1',
      label: 'Name',
      children: apiData?.name,
    },
    {
      key: '2',
      label: 'Role',
      children: apiData?.role.charAt(0).toUpperCase() + apiData?.role.slice(1),
    },
    {
      key: '3',
      label: 'Product',
      children: apiData?.product,
    },
    {
      key: '4',
      label: 'Billing',
      children: apiData?.billing,
    },
    {
      key: '5',
      label: 'Date',
      children: apiData?.updatedAt,
    },
    {
      key: '6',
      label: 'Amount',
      children: formatAmount(apiData?.amount),
    },
    {
      key: '7',
      label: 'Discount',
      children: formatAmount(discount),
    },
    {
      key: '8',
      label: 'Official',
      children: formatAmount(official),
    },
  ];
};
