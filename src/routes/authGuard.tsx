import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/type";
import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({ children }: { children: React.ReactElement }) {
    const token = localStorage.getItem("token") || "";
    const pathname = useLocation().pathname;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // neu co token thi kiem tra ko thi thoi
    if (token) {
        const decoded: JwtPayload = jwtDecode(token);

        // Lấy thời gian hiện tại (tính bằng giây)
        const currentTime = Date.now() / 1000;

        // So sánh thời gian hết hạn với thời gian hiện tại
        if (decoded?.exp < currentTime) {
            localStorage.clear()
            return <Navigate to="/login" replace={true} />;
        }
    }

    if (token && (pathname == "/login" || pathname == "/")) {
        return <Navigate to="/auth/dashboard" replace={true} />
    } else if (!token && (pathname.includes("/auth"))) {
        return <Navigate to="/login" replace={true} />
    } else {
        return children
    }
}

export default AuthGuard;