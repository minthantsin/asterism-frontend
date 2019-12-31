import React from 'react'
import { connect } from 'react-redux'
import { update_plot_note, set_current_plot_note, update_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class EditPlotNote extends React.Component{
  
  state = {
    text: this.props.currentPlotNote.text,
    redirectBoolean: false,
    errors: []
}

editPlotNoteSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedPlotNote = await fetch (`http://localhost:3000/plot_notes/${this.props.currentPlotNote.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({plot_note: {
              plot_id: this.props.currentPlot.id,
              text: this.state.text
          }})
        })
    let editedPlotNote = await rawEditedPlotNote.json()
    
    if (editedPlotNote.errors) {
      this.setState({
        errors: editedPlotNote.errors
      })
    } else {
    this.props.update_plot_note(editedPlotNote)
    this.props.set_current_plot_note(editedPlotNote)
    this.props.update_plot(this.props.currentPlot)
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

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.editPlotNoteSubmitted }>
          <br></br>
      <label  htmlFor="edit_plot_note">NOTE</label>
      <br></br>
      <textarea  
          style={{width: "80%", height: "300px"}}
          id="edit_plot_note" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
          <br></br><br></br>
      <input type="submit" />
  </form>
    } else{
      return < Redirect to={`/stories/${this.props.currentStory.id}`} />
    }
  }
    
    render(){
      return(
        <div style={{textAlign: "center"}}>
        {this.conditionalRender()}
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
        currentStory: state.currentStory,
        currentPlotNote: state.currentPlotNote,
        currentPlot: state.currentPlot
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_plot: (plot) => {
          dispatch(update_plot(plot))
      },
      update_plot_note: (plotNote) => {
          dispatch(update_plot_note(plotNote))
      },
      set_current_plot_note: currentPlotNote => {
        dispatch(set_current_plot_note(currentPlotNote))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlotNote)