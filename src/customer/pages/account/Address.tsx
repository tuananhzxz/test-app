import React from 'react';
import UserAddressCard from "./UserAddressCard";

const Address = () => {
    return (
        <div className="space-y-5">
            {[...Array(5)].map((_, index) => <UserAddressCard key={index} />)}
        </div>
    );
}

export default Address;