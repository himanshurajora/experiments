import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 10000,
            staleTime: 10000,
            refetchInterval: 1000
        }
    }
})


