import React from 'react'
import Fade from '@material-ui/core/Fade';
import problems from '../../components/Problems/Problems'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './styles.css'
import * as PIXI from 'pixi.js'

import aquarium_sand from '../../images/quizImages/aquarium_sand.png'
import sponge from '../../images/quizImages/sponge.png'
import can from '../../images/quizImages/can.png'
import chips from '../../images/quizImages/chips.png'
import devils_ivy from '../../images/quizImages/devils_ivy.png'
import extinguishers from '../../images/quizImages/extinguishers.png'
import fern from '../../images/quizImages/fern.png'
import hydrogen_peroxide from '../../images/quizImages/hydrogen_peroxide.png'
import soda from '../../images/quizImages/soda.png'
import sport_drink from '../../images/quizImages/sport_drink.png'
import vinegar from '../../images/quizImages/vinegar.png'
import counter from '../../images/quizImages/counter.png'

export default class ProblemPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            piclist: [devils_ivy, fern, soda, sport_drink, extinguishers, aquarium_sand, chips, can, vinegar, hydrogen_peroxide, sponge],
            checked: false,
            checked2: false,
            progressValue: 0,
            isGameOver: false,
            isClear: false,
            quizNum: 0,
            app: undefined,
            sizeAdjust: 0,
        }
    }
    setupPixi = () => {
        let appheight, appweight, background_size
        if (window.innerWidth <= 1366){
            appweight = 1280
            appheight = 720
            background_size = 1.5
        } else if (window.innerWidth === 1440){
            appweight = 1440
            appheight = 810
            background_size = 1.33
        } else if (window.innerWidth <= 1600){
            appweight = 1600
            appheight = 900
            background_size = 1.2
        } else if (window.innerWidth <= 3840){
            appweight = 1920
            appheight = 1080
            background_size = 1
        }
        this.setState({ sizeAdjust: background_size })
        const mycanvas = document.getElementById("progressbar")
        const mycanvasWidth = document.getElementById('progressbar').offsetWidth + 650 / background_size
        const mycanvasHeight = document.getElementById('progressbar').offsetHeight + 160 / background_size
        
        let app = new PIXI.Application({
            view: mycanvas,
            width: appweight,
            height: appheight,  
            antialias: true,
            transparent: true,
            resolution: 1
        });
        
        this.setState({ app: app })
        var graphics = new PIXI.Graphics();
        let value = 0
        graphics.beginFill(0xf55142);
        app.stage.addChild(graphics);
        graphics.x = mycanvasWidth
        graphics.y = mycanvasHeight
        graphics.drawRect(0, -50 / background_size, 500 / background_size, this.state.progressValue)
        app.ticker.speed = 1
        app.ticker.add(() => {
            graphics.clear()
            graphics.beginFill(0xf55142);
            graphics.x = mycanvasWidth
            graphics.y = mycanvasHeight
            if (this.state.progressValue < -22100 / background_size){
                var delay = function(s){
                    return new Promise(function(resolve, reject){
                        setTimeout(resolve,s); 
                    });
                };
                delay().then(() => {
                    app.ticker.stop()
                    return delay(800)
                }).then(() => {
                    this.setState({ checked: false })
                    this.setState({ checked2: false })
                    return delay(1000)
                }).then(() => {
                    this.setState({ isGameOver: true })
                    this.setState({ checked: true })
                    this.setState({ checked2: true })
                })
            }
            let nextNum = this.state.progressValue
            this.setState({ progressValue: nextNum - 0.55 / background_size})
            // console.log(this.state.progressValue)
            graphics.drawRect(0, -50 / background_size, 500 / background_size, nextNum / 36.83)
        })

        // add background to stage...
        const background = PIXI.Sprite.from(counter);
        background.width = 10000 / background_size
        background.height = 1100 / background_size
        app.stage.addChild(background);
    }
    componentDidMount(){
        var that = this;
        this.setupPixi()
		setTimeout(function() {
            that.show();
        }, that.props.wait);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
	show() {
        var that = this
		var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        delay().then(function(){
            that.setState({checked: true})
            that.setState({checked2: true})
        })
    }
    toggleAnswer = (percentage) => {
        let delay = (s) => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, s); 
            });
        };
        delay().then(() => {
            let nextNum = this.state.progressValue
            nextNum -= percentage * 1000 / this.state.sizeAdjust
            this.setState({ progressValue: nextNum })
            return delay(800)
        }).then(() => {
            this.setState({ checked: false })
            return delay(800);
        }).then(() => {
            if (this.state.quizNum < 4){
                let nextProblem = this.state.quizNum + 1
                this.setState({ quizNum: nextProblem })
            }
        }).then(() => {
            this.setState({ checked: true })
        })
    }
    toggleFinalAnswer = (percentage) => {
        var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        delay().then(() => {
            let nextNum = this.state.progressValue
            nextNum -= percentage * 1000 / this.state.sizeAdjust
            // console.log(nextNum)
            return nextNum
        }).then((nextNum) => {
            this.setState({ progressValue: nextNum })
            // console.log(this.state.progressValue)
            return delay(1000)
        }).then(() => {
            this.state.app.ticker.stop()
        })
        if (this.state.progressValue < -22100 / this.state.sizeAdjust){
            delay().then(() => {
                this.setState({ isGameOver: true })
                return delay(800)
            }).then(() => {
                this.setState({ checked: false })
                this.setState({ checked2: false })
                return delay(1000)
            }).then(() => {
                this.setState({ checked: true })
                this.setState({ checked2: true })
            })
        } else {
            delay().then(() => {
                return delay(800)
            }).then(() => {
                this.setState({ checked: false })
                this.setState({ checked2: false })
                return delay(1000)
            }).then(() => {
                this.setState({ isClear: true })
            }).then(() => {
                this.setState({ checked: true })
                this.setState({ checked2: true })
            })
        }
    }
    toggleAgain = () => {
        window.location.reload();
    }
    render(){
        if (this.state.isGameOver) {
            return(
                <Fade in={this.state.checked} timeout={800}>
                    <div className="descriptionText">
                        <h1 style={{marginTop: "25vh", marginBottom: "5vh"}}>GameOver</h1>
                        <button onClick={this.toggleAgain} style={{marginRight: "3vw"}}>重新挑戰？</button>
                        <a href=""><button>回首頁</button></a>
                    </div>
                </Fade>
            )
        }
        else if (this.state.isClear && !this.state.isGameOver){
            return(
                <div>
                    <Fade in={this.state.checked} timeout={800}>
                        <div className="descriptionText">
                            <h1 style={{marginTop: "25vh", marginBottom: "5vh"}}>成功過關！</h1>
                            <button onClick={this.toggleAgain} style={{marginRight: "3vw"}}>再玩一次？</button>
                            <a href=""><button>回首頁</button></a>
                        </div>
                    </Fade>
                </div>
            )
        }
        else if (this.state.quizNum < problems.length - 1){
            return(
                <div>
                    <Fade in={this.state.checked} timeout={800}>
                        <div className="problem">
                            <div className="questiontextcontainer">
                                <div className="question">
                                    <h2>{problems[this.state.quizNum]['title']}</h2>
                                </div>
                            </div>
                            <div className="select">
                                <button onClick={this.toggleAnswer.bind(this, problems[this.state.quizNum]["options"][0]["percentage"])} id="button"><img src={this.state.piclist[problems[this.state.quizNum]["options"][0]["image"]]}/></button>
                                <button onClick={this.toggleAnswer.bind(this, problems[this.state.quizNum]["options"][1]["percentage"])} id="button"><img src={this.state.piclist[problems[this.state.quizNum]["options"][1]["image"]]}/></button>
                            </div>
                        </div>
                    </Fade>
                    <Fade in={this.state.checked2} timeout={800}>
                        <div>
                            <div>
                                <canvas id="progressbar"></canvas>
                            </div>
                        </div>
                    </Fade>
                </div>
            )
        }
        else if (this.state.quizNum === 4){
            return(
                <div>
                    <Fade in={this.state.checked} timeout={800}>
                        <div className="problem">
                            <div className="questiontextcontainer">
                                <div className="question">
                                    <h2>{problems[this.state.quizNum]['title']}</h2>
                                </div>
                            </div>
                            <div className="select">
                                <button onClick={this.toggleFinalAnswer.bind(this, problems[this.state.quizNum]["options"][0]["percentage"])} id="finalbutton"><img src={this.state.piclist[problems[this.state.quizNum]["options"][0]["image"]]}/></button>
                                <button onClick={this.toggleFinalAnswer.bind(this, problems[this.state.quizNum]["options"][1]["percentage"])} id="finalbutton"><img src={this.state.piclist[problems[this.state.quizNum]["options"][1]["image"]]}/></button>
                                <button onClick={this.toggleFinalAnswer.bind(this, problems[this.state.quizNum]["options"][2]["percentage"])} id="finalbutton"><img src={this.state.piclist[problems[this.state.quizNum]["options"][2]["image"]]}/></button>
                            </div>
                        </div>
                    </Fade>
                    <Fade in={this.state.checked2} timeout={800}>
                        <div>
                            <div>
                                <canvas id="progressbar"></canvas>
                            </div>
                        </div>
                    </Fade>
                </div>
            )
        }
    }
}