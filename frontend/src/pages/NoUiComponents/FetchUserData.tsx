import { useInternet } from '@/contexts/InterStatusWrapper';
import { getData } from '@/lib/react-query/apiFunctions';
import { setAuth } from '@/lib/redux/slices/authSlice';
import { checkForErrors } from '@/lib/utils';
import { get } from 'http';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FetchUserData = () => {


    const dispatch = useDispatch();
    const { isInterConnected } = useInternet();
    const isLogin = useSelector((state: any) => state.auth?.isLogin);

    //fetching user data
    const fetchUserData = async () => {

     
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken)
            return;

        try {
            const response = await getData({ endpoint: "/api/auth/user" });
    
            dispatch(setAuth({ isLogin: true, userData: response.data }));

        } catch (error: any) {
            checkForErrors(error?.response?.data, isInterConnected, "something went wrong while fetching user data! place:FetchUserData", error.message, false);

        }

    }
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>

        </>
    )
}

export default FetchUserData
