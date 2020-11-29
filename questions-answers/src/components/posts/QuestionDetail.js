import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as questionActions from "../../redux/actions/questionActions"
import alertifyjs from "alertifyjs"
import Answers from "./Answers"
import AddAnswer from "./AddAnswer"
import Cookies from "universal-cookie"

class QuestionDetail extends Component {
    componentDidMount() {
        this.props.actions.getQuestion(this.props.match.params.id)
    }

    componentDidUpdate() {
        if (!this.props.questionResponse.success)
            alertifyjs.error(this.props.questionResponse)
    }

    render() {
        return (
            <div>
                { this.props.questionResponse.data.title }
                <hr />
                <p>{ this.props.questionResponse.data.questionText }</p>
                <p>{ this.props.questionResponse.data.date }</p>
                <br />
                <h3>Answers</h3>
                <hr />
                <Answers getData={{
                    type: "question",
                    id: this.props.match.params.id
                }} />
                {
                    new Cookies().get("access_token") && 
                        <div>
                            <hr />
                            <AddAnswer questionId={this.props.match.params.id} />
                        </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      questionResponse: state.questionReducer
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getQuestion: bindActionCreators(questionActions.getQuestion, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)
