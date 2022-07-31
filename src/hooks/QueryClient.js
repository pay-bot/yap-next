import { useQueryClient } from '@tanstack/react-query';

export default function QueryClient() {
  const queryClient = useQueryClient();
  return queryClient;
}
