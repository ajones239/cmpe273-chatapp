import React from "react";

const Home = () => { 

    var t = "";
    // fetch("http://localhost:8000/api/image/test.jpg", {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'},
    //     credentials: 'include' //for fetching cookies
    // }).then(res => {
    //     res.json().then(data => ({
    //         name: name,
    //         data: data
    //     })
    // ).then(response => {
    //     t = response.data;
    // }));
    let iterator = fetch("http://localhost:8000/api/image/test.jpg", {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include' //for fetching cookies
    });
    iterator.then(res => res.json())
            .then(dat => {t = dat.data;});
    return(
        <div>
            <h2>{'Please Login to view content.'} </h2>
            <img src={`data:image/png;base64,${t}`}/>
        </div>
    );
};

export default Home;
