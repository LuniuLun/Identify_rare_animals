import Home from "../pages/Home/index.js"
import DetailAnimal from "../pages/DetailAnimal/index.js"
import Seek from "../pages/Seek/index.js"
import Admin from "../pages/Admin/index.js";
import Login from "../pages/Login/index.js";
import Profile from "../pages/Profile/index.js";
import { HeaderOnly } from "../layouts/index.js";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/detailAnimal", component: DetailAnimal },
    { path: "/seek", component: Seek },
    { path: "/login", component: Login, layout: HeaderOnly },
    { path: "/profile", component: Profile },
];

const privateRoutes = [    
    { path: "/admin", component: Admin },
];

export { publicRoutes, privateRoutes };
