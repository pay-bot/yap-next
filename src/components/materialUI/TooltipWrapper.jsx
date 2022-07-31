import Tooltip from '@mui/material/Tooltip';

export default function TooltipWrapper({ children, tooltip }) {
  return <Tooltip title={tooltip}>{children}</Tooltip>;
}
