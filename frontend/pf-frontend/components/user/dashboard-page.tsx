"use client";

import LogoutButton from "components/auth/logout-button";
import { fetchUserDetails } from "data/user";
import { useEffect, useState } from "react";
import { User } from "types/user";

export const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails()
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>You Must Be Logged In to Access This Page</div>;

    return (
        <div>
            <div>
                <h1>Welcome, {user.firstname}</h1>
                <p>your account number,{user.userPin}</p>
            </div>

            <div>
                <LogoutButton />
            </div>
        </div>
    );
};
