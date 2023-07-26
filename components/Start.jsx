import React from 'react'

export default function Start(props){
     
    return (
        <div className="start-screen">
    <h1>Earn Your Ticket Back to Earth!</h1>
            <p>Greetings, space voyager! Prove you're one of us and not an alien by acing this cosmic quiz. Answer at least 3 out of 5 questions correctly to secure your ticket back to Earth. The countdown to your return starts now! Good luck on this out-of-this-world challenge!"</p>
            <button className="start-btn" onClick={props.handleClick}>Start</button>
        </div>
    )
}