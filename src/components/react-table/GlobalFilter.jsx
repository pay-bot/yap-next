import React from 'react';
import { useAsyncDebounce } from 'react-table';

export default function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((val) => {
    setGlobalFilter(val || undefined);
  }, 200);

  return (
    <div className="w-fit">
      <label className="flex items-baseline gap-x-2 bg-white">
        <span className="text-gray-700">Search: </span>
        <input
          type="text"
          className="rounded-md border border-gray-300 px-2 py-1 shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </label>
    </div>
  );
}
