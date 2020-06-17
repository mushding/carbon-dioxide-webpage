import React from 'react'
import Fade from '@material-ui/core/Fade';
import isStart from '../ProblemPage/ProblemPage'
import './styles.css'
import ProblemPage from '../ProblemPage/ProblemPage';

import co2_logo from '../../images/quizImages/co2_logo.png'
import quiz_background from '../../images/quizImages/quiz_background.png'

export default class QuizPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checked: false,
            isStart: false,
            isStart2: false,
        }
    }
    componentDidMount(){
        document.body.style.backgroundImage = `url(${quiz_background})`
        document.body.style.backgroundColor = "#f3c693"
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundPosition = "inherit"
        document.body.style.backgroundSize = "cover"
        var that = this;
		setTimeout(function() {
			that.show();
		}, that.props.wait);
	}
	show() {
        var that = this
		var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        delay().then(function(){
            return delay(2500)
        }).then(() => {
            that.setState({checked: true})
        })
    }
    toggleStart = () => {
        this.setState({ isStart: true })
    }
    render(){
        if (!this.state.isStart){
            return(
                <div>
                    <Fade in={this.state.checked} timeout={2000}>
                        <div className="descriptionText">
                            <div className="text">
                                <h1 style={{color: "white", marginBottom: "5%", fontSize: "2vw"}}>遊戲規則：</h1>
                                <div className="rule">
                                    <h2 style={{fontSize: "1.4vw", lineHeight: "2vw"}}>你與朋友共兩個人突然受困於一間密不通風的空間之中，空間大小約為1立方公尺目前室內的二氧化碳濃度約為1000ppm約佔空氣中0.1％比例，已知一個人一個小時排放的二氧化碳量約為0.022立方公尺，所以兩個人於空間中經過一小時約增加4.4%的二氧化碳。而暴露在二氧化碳濃度6-10%的環境中即可引起呼吸困難，當濃度到達20-30%時即會導致意識喪失、抽蓄等二氧化碳中毒現象！要怎麼運用關於二氧化碳的所有了解，在讓自己二氧化碳中毒前，順利逃脫⋯⋯。</h2>
                                </div>
                                <button className="startButton" onClick={this.toggleStart}>開始遊戲！</button>
                            </div>
                        </div>
                    </Fade>
                    <div className="logoContainer">
                        <img src={co2_logo}/>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <ProblemPage/>
                </div>
            )
        }
    }
}