import React from 'react'
import Fade from '@material-ui/core/Fade';
import './styles.css'
import bg from '../../images/bg.png'
import homepage from '../../images/homepage.png'

export default class StartPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            checked: false,
        }
    }
    componentDidMount(){
        document.body.style.backgroundImage = `url(${bg})`
        document.body.style.backgroundColor = "initial"
        document.body.style.backgroundRepeat = "initial"
        document.body.style.backgroundPosition = "initial"
        document.body.style.backgroundSize = "initial"
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
            that.setState({checked: true})
        })
	}
    render(){
        return (
            <div>
                <Fade in={this.state.checked} timeout={2000}>
                    <div id="startPage">
                        <h2 id="title">監測CO2與在地環境連結的探究與實作環境教育推動計畫</h2>
                        <div className="pageButton">
                            <a style={{margin: "1rem"}} href="#/quiz"><button id="startButton">吸O2密室逃脫</button></a>
                            <a style={{margin: "1rem"}} href="#/climate"><button id="startButton">進入氣候變遷介紹</button></a>
                            {/* <a href="140.120.182.150/#/quiz"><button id="title">進入 CO2 小遊戲</button></a>
                            <a href="140.120.182.150/#/climate"><button id="title">進入氣候變遷介紹</button></a> */}
                        </div>
                    </div>
                </Fade>
            </div>
        )
    }
}