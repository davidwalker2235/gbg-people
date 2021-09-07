import {QueryClient} from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000,
        },
        mutations: {
            // mutation options
        },
    },
});

export {
    queryClient
};
