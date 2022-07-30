import { useQueryClient } from 'react-query';

export default function QueryClient() {
  const queryClient = useQueryClient();
  return queryClient;
}
