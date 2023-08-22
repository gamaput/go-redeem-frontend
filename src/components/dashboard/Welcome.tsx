import React,{useEffect} from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';


const Welcome = () => {
  // const userData = sessionStorage.getItem('userData');
  // const users = userData ? JSON.parse(userData) : null;
  // const { user } = useSelector((state:RootState) => state.auth);
  // const user,isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const userInfo = useSelector((state: RootState)=> state.auth.user)
  
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{userInfo && userInfo.name} </strong>
        (<strong>{userInfo && userInfo.role}</strong>)
      </h2>
    </div>
  );
};

export default Welcome;
