import React from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import quizQuestions from '../../questionnaires/quizQuestions'; // a JS object with the total list of questions for the survey. 


class Survey extends React.Component {
  constructor(props){
    super(props);

    console.log(this.props.location.state)
    
    // Information about a specific block of the Survey: 
    const block_info = {
      surveytag  : 'intro', 
     }

    this.state = {
      participant_info : this.props.location.state.participant_info,
      block_info       : block_info,
      newblock_frame   : this.props.location.state.newblock_frame, 
      questions        : quizQuestions,
    }

    console.log(this.props.location.state.participant_info)

    this.getSurveyBlock.bind(this);
    this.redirectToQuiz.bind(this); 
      
    // this._handlePressKey.bind(this);
    this._isMounted = false;
    this._handleGoBack.bind(this);   
  }


  redirectToQuiz () {
      if((this.state.participant_info.block_number <= (this.state.participant_info.TotalBlock)))
          {           
          if (this.state.newblock_frame){
          this.setState({newblock_frame : false})
          this.props.history.push({
           pathname: `/QuizBlock`,
           state: {participant_info: this.state.participant_info,
                   block_info      : this.state.block_info,
                   questions       : this.state.questions
                 }
          })}
          else
          {
            if (this._isMounted)
            {
              console.log(this.state.participant_info.block_number)
              const newblocknumber = this.state.participant_info.block_number + 1
              console.log(newblocknumber)

              this.getSurveyBlock(newblocknumber+1)
              this.setState({newblock_frame : true, participant_info : {...this.state.participant_info, block_number:newblocknumber},}) // what gets updated 
              }              
            }
          }
        }
    
    
  
  componentDidMount() { 
  this._isMounted = true;
  document.body.style.background= '#fff'; 
  this._isMounted && this.getSurveyBlock(this.state.participant_info.block_number+1);
   window.history.pushState(window.state, null, window.location.href);
    window.addEventListener('popstate', e => this._handleGoBack(e));
    window.onbeforeunload = this._handleRefresh
  }

  _handleRefresh(evt){
    return false // error message when refresh occurs
  }

  _handleGoBack(event){
    window.history.go(1);
  }

  componentWillUnmount()
  {
   this._isMounted = false;
  }  

 // Get info about the specific Survey Block: questions IDS to play on this block + entry text 
getSurveyBlock(block_number_) {

    console.log(block_number_)

    this.setState({ loading: true });

    if (block_number_===1) { // Intro: questions 1 to 7 More elegant way is to filter the question JSON for the question whith the tag "intro" 
      var surveytag_block = "intro" // intro" 
      }
    else if (block_number_===2) {
      var surveytag_block = "adulthood" 
    
    }

    else if (block_number_===3) {

      var surveytag_block = "childhood" 
    }

    else if (block_number_===4) {

        var surveytag_block = "repdevelop"
    }

    else if (block_number_===5) {
        
        surveytag_block = "health"
    }

    else {
      console.log('Error: Unknown surveytag for block',block_number_);
    }

    // react does not support the direct update of the nexted objects; you have to recreate the state  

    const { block_info }   = { ...this.state }; // recreate the current state 
    const currentState     = block_info;        // assigned it to a const 
    currentState.surveytag = surveytag_block    // change the value of the survey field 
    console.log(currentState)
    this.setState({block_info: currentState }) // insert it into a state. 
    console.log('Block_info state after update', this.state.block_info);
 }

render()
  { 
    let text
    if ((this.state.block_info.surveytag === "intro") && (this.state.newblock_frame))
    { 
      text = <div className='SurveyIntroText'> <p>Let's start with some introductory questions ... </p></div>

    return (
      <div>
      <center> 
      <div className="instructionsButtonContainer">
        <div>
          {text}           
        </div> 
        <center>
          <Button className="buttonStart" onClick={()=>this.redirectToQuiz()}>
          START
          </Button>
        </center>
      </div>
      </center> 
      </div>);
    } 

    else if ((this.state.block_info.surveytag === "adulthood")  && (this.state.newblock_frame))
    {
      text = <div className='SurveyIntroText'> <p>Adult Life.</p>
                <p>We will now ask you to answer questions about your adult life. You are asked to indicate the extent to which you agree or disagree with each of the following statements.</p> 
                <p>There are no right or wrong answers!</p>
                <p>The important thing is that your answers reflect your life experiences as closely as possible.</p></div> 
       
        return (
          <div>
          <center> 
          <div className="instructionsButtonContainer">
            <div>
              {text}           
            </div> 
            <center>
              <Button className="buttonStart" onClick={()=>this.redirectToQuiz()}>
              START
              </Button>
            </center>
          </div>
          </center>
          </div>
          );
    }
    else if ((this.state.block_info.surveytag === "childhood") && (this.state.newblock_frame))
    {
      text = <div className='SurveyIntroText'> <p>Childhood.</p>
            <p>We will now ask you to answer questions about your childhood and your life with your parents.</p>
            <p>In all of these questions, a parent refers to the person who has parental authority in the home. This can mean both biological and adoptive parents.</p> 
            <p>The information we will now ask you to report concerns the period of your life when you were younger than 12. This time includes preschool, kindergarten, and the elementary school.</p>
            <p>You are asked to indicate the extent to which you agree or disagree with each of the following statements.</p>
            <p>Again, there are no right or wrong answers! The important thing is that your answers reflect your life experiences as closely as possible.</p> 
          </div>
      
        return (
          <div>
          <center> 
          <div className="instructionsButtonContainer">
            <div>
              {text}           
            </div>
            <center>
              <Button className="buttonStart" onClick={()=>this.redirectToQuiz()}>
              START
              </Button>
            </center>
          </div>
          </center>
          </div>);
    }
    else if ((this.state.block_info.surveytag === "repdevelop") && (this.state.newblock_frame)) 
    { 
      text = <div className='SurveyIntroText'> <p>Reproductive development</p>
                <p>This section contains questions about your reproductive development: age at puberty, age at first consented sexual experience, age at birth of your first child, number of children.</p> 
                </div>
        
        return (
        <div>
        <center> 
        <div className="instructionsButtonContainer">
          <div>
            {text}           
          </div> 
            <center>
            <Button className="buttonStart" onClick={()=>this.redirectToQuiz()}>
            START
            </Button>
            </center>
          </div>
          </center>
          </div>);
      }
    else if (this.state.participant_info.block_number === this.state.participant_info.TotalBlock+1) 
    {
      text = <div className='SurveyIntroText'> <p>You finished the survey! Thank you for your participation!</p>
      <p>Please, validate your participation</p>
      </div>  
        return (
          <div>
          <center> 
          <div className="restarttraining">
              {text}  <div className="translate"/>
            </div>
          </center>
          <div>
          <Button variant="secondary" color="danger" size="sm" className="button" type="submit" onClick="location.href = 'https://app.prolific.co/submissions/complete?cc=1A496EDB'"> Click here </Button></div>
          </div>);        
    }

    else
    {
          text = '... Continue ...'
        return (
      <div>
      <center>
      <div className="SurveyIntroText">
        {text}           
      </div>
      <center>
            <Button className="button" onClick={()=>this.redirectToQuiz()}>
            &#8594;
            </Button>
            </center>
    </center>
    </div>);
    }    
  }

}

export default withRouter(Survey);