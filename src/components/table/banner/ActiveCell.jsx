import moment from 'moment';

export default function ActiveCell({ value }) {
  const activeFrom = value ? moment(value).utc().format('YYYY-MM-DD') : '-';
  return <div className="flex items-center">{activeFrom}</div>;
}
