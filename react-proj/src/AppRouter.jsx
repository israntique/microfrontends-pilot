import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Navigation from "./Navigation";

function AppRouter({ count, setCount }) {
    return (
        <BrowserRouter>
            <div>
                <Navigation />

                <Routes>
                    <Route
                        path="/"
                        element={<Home count={count} setCount={setCount} />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
