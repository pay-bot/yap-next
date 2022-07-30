export default function FeatureCell({ value, column, row }) {
  console.log('feat', row.original[column.featureAccessor]);
  const feat = [];
  row.original[column.featureAccessor].map((data) => {
    return feat.push(data.name);
  });
  return <div className="flex">{feat.join('-')}</div>;
}
