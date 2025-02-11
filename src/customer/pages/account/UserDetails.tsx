import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { getUserProfile } from '../../../state/customer/AuthSliceCus';

const UserDetails = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            dispatch(getUserProfile(token));
        }
    },[dispatch])

    return (
        <div className="p-5 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Thông tin người dùng</h2>
            <div className="mb-3">
                <strong>Họ và tên:</strong>
                <p>{user?.fullName}</p>
            </div>
            <div className="mb-3">
                <strong>Email:</strong>
                <p>{user?.email}</p>
            </div>
            <div className="mb-3">
                <strong>Số điện thoại:</strong>
                <p>{user?.phone}</p>
            </div>
        </div>
    );
}

export default UserDetails;