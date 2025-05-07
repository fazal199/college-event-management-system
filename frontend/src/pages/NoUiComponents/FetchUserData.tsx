import { useInternet } from '@/contexts/InterStatusWrapper';
import { getData } from '@/lib/react-query/apiFunctions';
import { setAuth } from '@/lib/redux/slices/authSlice';
import { checkForErrors } from '@/lib/utils';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const FetchUserData = () => {


    const dispatch = useDispatch();
    const { isInterConnected } = useInternet();

    useQuery({
        queryKey: "userData",
        queryFn: () => getData({ endpoint: "/api/auth/user" }),
        onSuccess: (response) => {
            dispatch(setAuth({ isLogin: true, userData: response.data }));
        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "something went wrong while fetching user data! place:FetchUserData", error.message, false);
        },
        // to make api call only one time
        // staleTime: Infinity,
        // cacheTime: Infinity,
    },

    )


    return (
        <>

        </>
    )
}

export default FetchUserData
