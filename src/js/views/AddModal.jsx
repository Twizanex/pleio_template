import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { hideModal } from "../lib/actions"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import Errors from "../components/Errors"
import Modal from "../components/Modal"
import RichText from "../components/RichText"
import AccessSelect from "../containers/AccessSelect"

class AddModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: null,
            title: "",
            description: "",
            accessId: null
        }

        this.onChangeTitle = (e) => this.setState({title: e.target.value})
        this.onChangeDescription = (e) => this.setState({description: e.target.value})
        this.onChangeAccessId = (name, value) => this.setState({accessId: value})
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

        this.setState({
            errors: null
        })

        this.props.mutate({
            variables: {
                input: {
                    clientMutationId: 1,
                    subtype: "news",
                    title: this.state.title,
                    description: this.state.description,
                    accessId: this.state.accessId,
                    tags: []
                }
            }
        }).then(({data}) => {
            if (this.props.onSuccess) {
                this.props.onSuccess()
            }

            this.props.dispatch(hideModal())
        }).catch((errors) => {
            this.setState({
                errors: errors
            })
        })
    }

    render() {
        return (
            <Modal id="add" title={this.props.title}>
                <form className="form" onSubmit={this.onSubmit}>
                    <label className="form__item">
                        <input type="text" placeholder="Titel" className="form__input" onChange={this.onChangeTitle} value={this.state.title} />
                    </label>
                    <label className="form__item">
                        <textarea placeholder="Beschrijving" onChange={this.onChangeDescription} value={this.state.description} />
                    </label>
                    <label className="form__item">
                        <AccessSelect className="form__input" onChange={this.onChangeAccessId} value={this.state.accessId} />
                    </label>
                    <label className="form__item">
                        <input type="text" placeholder="Tags" className="form__input" onChange={this.onChangeTags} value={this.state.tags} />
                    </label>

                    <button className="button">Toevoegen</button>
                </form>
            </Modal>
        )
    }
}

const ADD = gql`
    mutation addObject($input: addObjectInput!) {
        addObject(input: $input) {
            object {
                guid
            }
        }
    }
`
const withAdd = graphql(ADD)

export default connect()(withAdd(AddModal))