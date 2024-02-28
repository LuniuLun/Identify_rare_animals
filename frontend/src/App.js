import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
// import Home from './pages/Home';
// import Following from './pages/Following';
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts/index";
import Admin from "./pages/Admin";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <Route path='/' element={<Home />}/>
                    <Route path='/following' element={<Following />}/> */}
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component; //chuyen tu component sang element
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path='/admin' element={<Admin />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
