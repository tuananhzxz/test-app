import React, { useEffect, useState }    from 'react';
import UserAddressCard from "./UserAddressCard";
import { useAppDispatch } from '../../../state/Store';
import { Address as AddressType } from '../../../types/UserType';
import { getUserProfile } from '../../../state/customer/AuthSliceCus';

const Address = () => {
    const dispatch = useAppDispatch();
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    useEffect(() => {
        dispatch(getUserProfile(localStorage.getItem('token') || '')).then((user : any) => {
            setAddresses(user.payload.addresses);
        });
    }, [dispatch]);
    
    return (
        <div className="space-y-5">
            {addresses.map((address, index) => <UserAddressCard key={index} address={address} />)}
        </div>
    );
}

export default Address;