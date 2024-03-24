import React, { useEffect } from "react";
import { getActivities } from "../api/api";

export default function Activities () {

useEffect(() => {
getActivities().then((data) => {
    console.log(data);
})
}, [])




    return (
        <div className="container">
            
        </div>
    )
}