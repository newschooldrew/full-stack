import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import formFields from './formFields'
import * as actions from '../../actions'
import {withRouter} from 'react-router-dom'

const SurveyFormReview = ({history, onCancel, formValues, submitSurvey}) => {
    
    const reviewFields = _.map(formFields,({name,label}) =>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    
    return (
        <div>
            <h5>Confirm Your Entries</h5>

            <div>
                {reviewFields}
            </div>

            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>

            <button
                // adding in function to make sure it doesnt  
                // execute until user clicks on it
                onClick={() => submitSurvey(formValues,history)}
                className="green white-text btn-flat right"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state){
    return{
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
