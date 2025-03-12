import React from "react";
import { useState } from "react";

function Home({ count, setCount }) {

        return (
            <div>
                <h1>Home Page</h1>
                <p>Welcome to our application!</p>
                <div className="card">
                    <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                        count is {count}
                    </button>
                </div>
            </div>
        );
    }
export default Home;
