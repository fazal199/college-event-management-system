import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAdmin = () => {
  const role = useSelector((state: any) => state.auth?.userData?.data?.role);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (role != "admin" || !isLogin) navigate("/");
  }, []);
};

const useUser = () => {
  const role = useSelector((state: any) => state.auth?.userData?.data?.role);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (role != "user" || !isLogin) navigate("/");
  }, []);
};

const useOrganiser = () => {
  const role = useSelector((state: any) => state.auth?.userData?.data?.role);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (role != "organiser" || !isLogin) navigate("/");
  }, []);
};

export { useAdmin, useUser, useOrganiser };
