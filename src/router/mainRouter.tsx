
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "../components/HomeScreen";

export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen />
    }
])