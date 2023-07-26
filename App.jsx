import React from "react"
import Spline from '@splinetool/react-spline'
import Main from './components/Main'
import Start from './components/Start'

export default function App(){

    const [startQuiz, setStartQuiz] = React.useState(false)

    function changeScreen(){
        setStartQuiz(true)
      }
           

    return (
        <main>
            {startQuiz ? <Main /> :<Start handleClick={changeScreen} /> }
            <Spline className="spline" scene="https://prod.spline.design/NgI04v1-QyGZajmx/scene.splinecode" />
    
        </main>
    )
}




