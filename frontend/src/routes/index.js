import Home from "../pages/Home/index.js"
import DetailAnimal from "../pages/DetailAnimal/index.js"
import Admin from "../pages/Admin/index.js";
import Login from "../pages/Login/index.js";
import Profile from "../pages/Profile/index.js";
import { HeaderOnly } from "../layouts/index.js";
import PostAnimal from "../pages/PostAnimal/index.js";
import YourObservation from "../pages/YourObservation/index.js";
import RecognizeAnimalHistory from "../pages/RecognizeAnimalHistory/index.js";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/detailAnimal/:id", component: DetailAnimal },
    { path: "/your_observation/:id", component: YourObservation },
    { path: "/login", component: Login, layout: HeaderOnly },
    { path: "/profile", component: Profile },
    { path: "/post_animal", component: PostAnimal },,
    { path: "/recognize_animal_history", component: RecognizeAnimalHistory}
];

const privateRoutes = [    
    { path: "/admin", component: Admin },
];

export { publicRoutes, privateRoutes };
