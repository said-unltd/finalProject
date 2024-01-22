import Navigation from "../component/Navigation";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    )
}