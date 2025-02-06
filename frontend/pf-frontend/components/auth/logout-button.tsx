import { logoutUser } from "data/logout-user";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const handleLogout = async () => {
        const success = await logoutUser();
        if (success) {
            router.push("/auth/login");
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
