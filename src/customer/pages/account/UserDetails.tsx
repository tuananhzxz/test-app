import React from 'react';

const UserDetails = () => {
    // Sample user data (you can replace this with actual data from props or context)
    const user = {
        fullName: "Do Tuan Anh",
        email: "tanhhhhh@example.com",
        phone: "+84 123 456 789"
    };

    return (
        <div className="p-5 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">Thông tin người dùng</h2>
            <div className="mb-3">
                <strong>Họ và tên:</strong>
                <p>{user.fullName}</p>
            </div>
            <div className="mb-3">
                <strong>Email:</strong>
                <p>{user.email}</p>
            </div>
            <div className="mb-3">
                <strong>Số điện thoại:</strong>
                <p>{user.phone}</p>
            </div>
        </div>
    );
}

export default UserDetails;