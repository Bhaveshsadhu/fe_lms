import React from 'react'
import { Routes, Route } from "react-router-dom"
import { DashBoardPage, HomePage } from "../pages"


const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<HomePage />}></Route>

            {/* Private Page */}
            <Route path="/user" element={<DashBoardPage />}></Route>
        </Routes>
    )
}

export default AppRoutes