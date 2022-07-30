import { Tooltip, Button } from "@mantine/core";

export default function TooltipWrapper({ children, tooltip }) {
  return <Tooltip label={tooltip}>{children}</Tooltip>;
}

