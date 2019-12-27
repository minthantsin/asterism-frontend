import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { set_content } from '../redux/actions'
import NavBar from './NavBar'
import LoginContainer from './LoginContainer'
import FragmentsContainer from './FragmentsContainer'
import NewFragment from '../components/NewFragment'
import EditFragment from '../components/EditFragment'
import StoriesContainer from './StoriesContainer'
import NewStory from '../components/NewStory'
import EditStory from '../components/EditStory'
import StoryDetail from '../components/StoryDetail'
import AccountContainer from './AccountContainer'

class MainContainer extends React.Component{

    isUser = () => {
       return !!localStorage.user_id ? <Redirect to="/stories" /> : <Redirect to="/login"/>
    }

<<<<<<< HEAD
    getUserData = async () => {
        if(!!this.props.isLoaded){
            let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
=======
    componentDidMount = async () => {
        if (!!localStorage.user_id) {
        let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
>>>>>>> auth
            method: "GET",
            headers: {
              "Authorization": localStorage.token,
              "Content-Type": "application/json"
                 }})
        let data = await rawData.json()
<<<<<<< HEAD
        console.log(data)
        this.props.set_content(data)
        } 
    }

    // componentDidMount = async () => {
    // //    if(this.props.token){
    // //        this.getUserData()
    // //    }
    // let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
    //     method: "GET",
    //     headers: {
    //       "Authorization": localStorage.token,
    //       "Content-Type": "application/json"
    //          }})
    // let data = await rawData.json()
    // this.props.set_content(data)
    // console.log(data)
    // }

    componentDidMount = () => {
        this.getUserData()
=======
        this.props.set_content(data)
        console.log(data)}
>>>>>>> auth
    }

    render(){return(
        <>
        <Router>
        <NavBar />
            <Switch>
                    <Route exact path="/fragments" >
                        < FragmentsContainer />
                    </Route>

                    <Route exact path='/fragments/new' >
                        <NewFragment />
                    </Route>

                    <Route exact path='/fragments/edit' >
                        <EditFragment />
                    </Route>

                    <Route exact path="/stories" >
                        < StoriesContainer/>
                    </Route>

                    <Route exact path="/stories/new" >
                        < NewStory />                    
                    </Route>

                    <Route exact path="/stories/edit">
                        <EditStory />
                    </Route>

                    <Route exact path="/stories/:id" >
                        <StoryDetail />}
                    </Route>

                    <Route path="/login" >
                        {!!this.props.token ? <Redirect to="/stories"/> : <LoginContainer />}

                    </Route>

                    <Route exact path="/account">
                        <AccountContainer/>    
                    </Route> 

                    <Route exact path='/'> 
                        {this.isUser()}
                    </Route>
                </Switch>
            </Router>
        </>
    )}
}


const mapStateToProps = (state) => {
    return {
      token: state.token,
      user_id: state.user_id,
      load: state.load
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return {
        set_content: ({stories, fragments, username}) => {
            dispatch(set_content({stories, fragments, username}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)