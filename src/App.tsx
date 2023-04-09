import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicPage from "./components/public-page/public-page";
import PostPage from "./components/post-page/post-page";
import { AdminPage } from "./components/admin-page/admin-page";
import { Layout } from "./shared/layout/layout";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='' element={<PublicPage/>} />
                    <Route path='admin' element={<AdminPage/>} />
                    <Route path='post/:id' element={<PostPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}