import React, { lazy, Suspense } from 'react'
import { Route, Navigate, Routes } from "react-router-dom";
import { selectSigndIn } from "./features/UserSlice";
import { useSelector } from "react-redux";
import Blogs from './components/Blogs';
const Home = lazy(() => import("./pages/Home"))


const App = (props) => {

    const isSignedIn = useSelector(selectSigndIn);

    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
            {isSignedIn && <Blogs />}
        </Suspense>
    )
}


export default App
