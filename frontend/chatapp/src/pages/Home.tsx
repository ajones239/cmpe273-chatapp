import React from "react";

const Home = (props: {name: string}) => { 

    
    return(
        <div>
            <h2>{props.name ? 'Hi ' + props.name + '!': 'You are not logged in'} </h2>
        </div>
    );
};

export default Home;