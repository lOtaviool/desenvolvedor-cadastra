import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useGetProducts() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["product-list"],
    queryFn: () => api.getProducts(),
    staleTime: 4000,
  });

  return { data, isLoading: isFetching, isError };
}
