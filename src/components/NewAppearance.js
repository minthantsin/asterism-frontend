import React from 'react'
import { connect } from 'react-redux'
import { set_appearance, update_scene} from '../redux/actions'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput } from '../assets/StyledComponents'


class NewAppearance extends React.Component{

    state = {
        character_name: "",
        redirectBoolean: false,
        errors: []
    }
    
    newCharacterSubmitted = async (event) => {
        event.preventDefault()
        console.log(this.props.currentScene)
        console.log(this.state)
        let rawAppearance = await fetch ('http://localhost:3000/appearances', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({appearance: {
                scene_id: this.props.currentScene.id,
                character_id: this.props.currentStory.characters.find(character => character.name === this.state.character_name).id
            }})
          })
          let appearance = await rawAppearance.json()
          if (appearance.errors) {
            this.setState({
              errors: appearance.errors
            })
          } else {
        this.props.set_appearance(appearance)
        this.props.update_story(this.props.currentStory)
        this.setState({
          redirectBoolean: true
        })
          }
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
           return <Redirect to={`/stories/${this.props.currentStory.id}`} />} 
           else {
           return <section style={{textAlign: "center"}}>
              <h2 >ADD CHARACTER</h2>
              <br></br>
              <form onSubmit={ this.newCharacterSubmitted }>
                <select 
                onChange={ this.onChange /* for controlled form input status */ } 
                name="character_name"
                value={ this.state.character_name  /* for controlled form input status */ }
                >
                  <option>Select Character:</option>
                {this.props.currentStory.characters.map (character => <option>{character.name}</option>)}
                </select>
                      <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />              </form>
              </section>}
      }

    render(){
        return(
          <>
         {this.renderOrRedirect()}
         </>
        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_scene: (scene) => {
            dispatch(update_scene(scene))
        },
        set_appearance: (appearance) => {
            dispatch(set_appearance(appearance))
        }
    }
  }


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentScene: state.currentScene,
        currentPlot: state.currentPlot
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(NewAppearance)
