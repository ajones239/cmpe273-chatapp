import React from "react";
import logo from './images/chatlogo.png';

const Home = () => { 

    const Style = {
        body:{
            alignContent: "Center",
            backgroundColor: 'Purple',
            paddingTop: 250,
            paddingBottom: 300,
            paddingLeft: 800,
        },

        h2:{
            alignContent: "Center",
            paddingTop: 30,
            paddingLeft: 40,
            text: "bold",

        },
    }
    return(
        <div style={Style.body}>
           <img src={logo} alt="Logo"/>

            <h2 style={Style.h2}>
                {'Please Login to Chat...'} 
            </h2>
        </div>
    );
};

export default Home;
