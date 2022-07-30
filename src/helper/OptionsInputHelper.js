export function getSelectOptionNoKey(data) {
  const selectData = [];
  data?.map((item) => {
    return selectData.push({
      name: item,
      value: item,
    });
  });
  return selectData;
}

export function getSelectOptionWithKey(data) {
  const selectData = [];
  data?.map((item) => {
    return selectData.push({
      name: item.name,
      value: item.id,
    });
  });
  return selectData;
}

export function generateSelectDefault(data, option) {
  const selected = option?.filter((o) => o.value === data);
  return selected[0];
}

export function getOnChangeSelect(event, option) {
  const widgetInput = event.target.innerText;
  const widgetSelected = option?.filter((u) => u.name === widgetInput);
  console.log(widgetSelected);
  return widgetSelected[0]?.value;
}
