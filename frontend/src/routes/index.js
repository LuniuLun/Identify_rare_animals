import Home from "../pages/Home/index.js"
import DetailAnimal from "../pages/DetailAnimal/index.js"
import Admin from "../pages/Admin/index.js";
import Login from "../pages/Login/index.js";
import Profile from "../pages/Profile/index.js";
import { HeaderOnly } from "../layouts/index.js";
import PostAnimal from "../pages/PostAnimal/index.js";
import RecognizeAnimalResult from "../pages/RecognizeAnimalResult/index.js";
import YourObservation from "../pages/YourObservation/index.js";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/detailAnimal", component: DetailAnimal },
    { path: "/your_observation", component: YourObservation },
    { path: "/login", component: Login, layout: HeaderOnly },
    { path: "/profile", component: Profile },
    { path: "/post_animal", component: PostAnimal },
    { path: "/recognize_animal_result", component: RecognizeAnimalResult}
];

const privateRoutes = [    
    { path: "/admin", component: Admin },
];

export { publicRoutes, privateRoutes };
