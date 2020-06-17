import React from 'react'
import './styles.css'
import earthMap from '../../images/climateImages/map.png'
import button from '../../images/climateImages/button.png'
import button_over from '../../images/climateImages/button_over.png'
import button_press from '../../images/climateImages/button_press.png'
import * as PIXI from 'pixi.js'
import climateData from '../../components/ClimateData/ClimateData'

import america from '../../images/climateImages/america.png'
import australia from '../../images/climateImages/australia.png'
import brazil from '../../images/climateImages/brazil.png'
import center_asia from '../../images/climateImages/center_asia.png'
import europe from '../../images/climateImages/europe.png'
import iceland from '../../images/climateImages/iceland.png'
import india from '../../images/climateImages/india.png'
import kenya from '../../images/climateImages/kenya.png'
import russia from '../../images/climateImages/russia.png'
import taiwan from '../../images/climateImages/taiwan.png'

import america_pic from '../../images/climateImages/areaImages/America.jpg'
import arab_pic from '../../images/climateImages/areaImages/Arab.jpg'
import australia_pic from '../../images/climateImages/areaImages/Australia.jpg'
import brazil_pic from '../../images/climateImages/areaImages/Brazil.jpg'
import europe_pic from '../../images/climateImages/areaImages/Europe.jpg'
import iceland_pic from '../../images/climateImages/areaImages/Iceland.jpg'
import india_pic from '../../images/climateImages/areaImages/India.jpg'
import kenya_pic from '../../images/climateImages/areaImages/Kenya.jpg'
import russia_pic from '../../images/climateImages/areaImages/Russia.jpg'
import taiwan_pic from '../../images/climateImages/areaImages/Taiwan.jpg'

import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import { matchPath } from 'react-router-dom'

export default class ClimatePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            placenum: 0,
            pagenum: 0,
            picList: [iceland, europe, center_asia, kenya, india, russia, taiwan, australia, america, brazil],
            areaList: [iceland_pic, europe_pic, arab_pic, kenya_pic, india_pic, russia_pic, taiwan_pic, australia_pic, america_pic, brazil_pic],
            textchecked: true,
            placechecked: false,
            resolution: 1,
        }
    }
    componentDidMount(){
        let appheight, appweight
        console.log(window.innerWidth, window.innerHeight)
        if (window.innerWidth <= 1366){
            appweight = 1280
            appheight = 720
        } else if (window.innerWidth === 1440){
            appweight = 1440
            appheight = 810
        } else if (window.innerWidth <= 1600){
            appweight = 1600
            appheight = 900
        } else if (window.innerWidth <= 3840){
            appweight = 1920
            appheight = 1080
        }
        const mycanvas = document.getElementById("maps")
        const app = new PIXI.Application({
            view: mycanvas,
            width: appweight,
            height: appheight,  
            antialias: true,
            transparent: true,
        });
        document.body.appendChild(app.view);

        const background = PIXI.Sprite.from(earthMap);
        // create a background...
        background.width = appweight
        background.height = appheight

        // add background to stage...
        app.stage.addChild(background);

        // create some textures from an image path
        const textureButton = PIXI.Texture.from(button);
        const textureButtonOver = PIXI.Texture.from(button_over);
        const textureButtonPress = PIXI.Texture.from(button_press);

        const buttons = [];
        let buttonPositions = [
            80, 250,
            500, 330,
            330, 500,
            320, 600,
            500, 520,
            600, 240,
            730, 500,
            800, 800,
            1500, 440,
            1600, 700
        ];
        if (window.innerWidth <= 1366){
            for(let i = 0; i < buttonPositions.length; i++){
                buttonPositions[i] = buttonPositions[i] / 1.5
            }
        } else if (window.innerWidth === 1440) {
            for(let i = 0; i < buttonPositions.length; i++){
                buttonPositions[i] = buttonPositions[i] / 1.33
            }
        } else if (window.innerWidth <= 1600){
            for(let i = 0; i < buttonPositions.length; i++){
                buttonPositions[i] = buttonPositions[i] / 1.2
            }
        }
        console.log(window.innerWidth, window.innerHeight)
        for (let i = 0; i < buttonPositions.length; i++) {
            const button = new PIXI.Sprite(textureButton);
            
            button.anchor.set(0.5);
            // if (window.innerWidth < 1300 && window.innerHeight < 750){
            //     button.x = buttonPositions[i * 2];
            //     button.y = buttonPositions[i * 2 + 1];
            // } else {
            //     this.setState({ resolution: 1.3 })
            //     button.x = buttonPositions[i * 2] * this.state.resolution;
            //     button.y = buttonPositions[i * 2 + 1] * this.state.resolution;
            // }
            button.x = buttonPositions[i * 2];
            button.y = buttonPositions[i * 2 + 1];
            button.scale.set(0.007)
        
            // make the button interactive...
            button.interactive = true;
            button.buttonMode = true;
        
            button
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
                .on('pointerdown', onButtonDown)
                .on('pointerup', onButtonUp)
                .on('pointerupoutside', onButtonUp)
                .on('pointerover', onButtonOver)
                .on('pointerout', onButtonOut);
        
            // add it to the stage
            app.stage.addChild(button);
        
            // add button to array
            buttons.push(button);

        }
        const that = this
        function onButtonDown() {
            this.isdown = true;
            this.texture = textureButtonPress;
            this.alpha = 1;
            var delay = function(s){
                return new Promise(function(resolve, reject){
                    setTimeout(resolve,s); 
                });
            };
            if (this.x === buttonPositions[0] && this.y === buttonPositions[1]){
                delay().then(() => {
                    that.setState({ placenum: 0 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[2] && this.y === buttonPositions[3]) {
                delay().then(() => {
                    that.setState({ placenum: 1 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[4] && this.y === buttonPositions[5]) {
                delay().then(() => {
                    that.setState({ placenum: 2 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[6] && this.y === buttonPositions[7]) {
                delay().then(() => {
                    that.setState({ placenum: 3 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[8] && this.y === buttonPositions[9]) {
                delay().then(() => {
                    that.setState({ placenum: 4 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[10] && this.y === buttonPositions[11]) {
                delay().then(() => {
                    that.setState({ placenum: 5 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[12] && this.y === buttonPositions[13]) {
                delay().then(() => {
                    that.setState({ placenum: 6 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[14] && this.y === buttonPositions[15]) {
                delay().then(() => {
                    that.setState({ placenum: 7 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[16] && this.y === buttonPositions[17]) {
                delay().then(() => {
                    that.setState({ placenum: 8 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            } else if (this.x === buttonPositions[18] && this.y === buttonPositions[19]) {
                delay().then(() => {
                    that.setState({ placenum: 9 })
                    return delay(500)
                }).then(() => {
                    that.setState({ placechecked: true })
                })
            }
        }
        
        function onButtonUp() {
            this.isdown = false;
            if (this.isOver) {
                this.texture = textureButtonOver;
            } else {
                this.texture = textureButton;
            }
        }
        
        function onButtonOver() {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = textureButtonOver;
        }
        
        function onButtonOut() {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = textureButton;
        }
    }
    nextPage = () => {
        var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        if (this.state.pagenum + 1 < climateData[this.state.placenum]["text"].length){
            delay().then(() => {
                this.setState({ textchecked: false })
                // return delay(1000)
            }).then(() => {
                let tmp = this.state.pagenum + 1
                this.setState({ pagenum: tmp })
            }).then(() => {
                this.setState({ textchecked: true })
            })
        }
    }
    lastPage = () => {
        var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        if (this.state.pagenum - 1 >= 0){
            delay().then(() => {
                this.setState({ textchecked: false })
                // return delay(1000)
            }).then(() => {
                let tmp = this.state.pagenum - 1
                this.setState({ pagenum: tmp })
            }).then(() => {
                this.setState({ textchecked: true })
            })
        }
    }
    exitPage = () => {
        var delay = function(s){
            return new Promise(function(resolve, reject){
                setTimeout(resolve,s); 
            });
        };
        delay().then(() => {
            this.setState({ placechecked: false })
            return delay(1000)
        }).then((nextNum) => {
            this.setState({ pagenum: 0 })
        })
    }
    render(){
        let textButton;
        if (this.state.pagenum == 0){
            textButton = <div><button className="normalButton" onClick={this.nextPage}><ArrowForwardIosIcon/></button></div>
        } else if (this.state.pagenum == climateData[this.state.placenum]["text"].length - 1){
            textButton = <div><button className="normalButton" onClick={this.exitPage}><CloseIcon/></button><button className="normalButton" onClick={this.lastPage}><ArrowBackIosIcon/></button></div>
        } else {
            textButton = <div><button className="normalButton" onClick={this.nextPage}><ArrowForwardIosIcon/></button><button className="normalButton" onClick={this.lastPage}><ArrowBackIosIcon/></button></div>
        }
        return(
            <div>
                <div className="homeButton">
                    <a href=""><HomeIcon style={{ color: "#402418" }}/></a>
                </div>
                {/* <div className="climateText">
                    <h1 style={{color: "#894d34", fontSize: "4rem"}}>應 變 氣 候 !</h1>
                </div> */}
                <Fade in={this.state.placechecked} timeout={1000}>
                    <div className="datacanvas">
                        <div className="mapcontainer">
                            <img src={this.state.picList[this.state.placenum]} width="600vw"></img>
                        </div>
                        <div className="textcontainer">
                            {/* <Grow in={this.state.textchecked} timeout={1000} style={{ transformOrigin: '0 0 0' }}> */}
                                <div>
                                    <h2 className="sourceText">{climateData[this.state.placenum]["source"]}</h2>
                                    <img src={this.state.areaList[this.state.placenum]}/>
                                    <h2>{climateData[this.state.placenum]["text"][this.state.pagenum]}</h2>
                                    <div style={{textAlign: "right"}}>
                                        {textButton}
                                    </div>
                                </div>
                            {/* </Grow> */}
                        </div>
                    </div>
                </Fade>
            </div>
        )
    }
}