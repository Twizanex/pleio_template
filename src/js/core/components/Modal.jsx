import React from "react"
import { connect } from "react-redux"
import classNames from "classnames"
import { hideModal } from "../../lib/actions"
import { browserHistory } from "react-router"

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.onScroll = this.onScroll.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    componentDidMount() {
        this.refs.modal.addEventListener("scroll", this.onScroll)
    }

    componentWillUnmount() {
        this.refs.modal.removeEventListener("scroll", this.onScroll)
    }

    onScroll(e) {
        if (!this.props.onScroll) {
            return
        }

        this.props.onScroll(e)
    }

    onClose(e) {
        if (e) {
            e.preventDefault()
        }

        if (this.props.noParent) {
            browserHistory.push("/")
        } else {
            this.props.dispatch(hideModal())
        }
    }

    render() {
        let steps = ""
        if (this.props.steps) {
            steps = (
                <span>
                    {this.props.steps[0]}/{this.props.steps[1]}
                </span>
            )
        }

        let modal = ""
        if (this.props.small) {
            modal = (
                <div className="modal__wrapper">
                    <div className="modal__background" onClick={this.onClose} />
                    <div className="modal__box">
                        <h3 className="modal__title">
                            {this.props.title}
                            &nbsp;{steps}
                        </h3>
                        {this.props.children}
                    </div>
                </div>
            )
        } else if (this.props.full) {
            modal = (
                <div className="modal__wrapper">
                    <div className="modal__box">
                        <div className="container relative">
                            <h3 className="modal__title">
                                {this.props.title}
                            </h3>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            modal = (
                <div className="modal__wrapper">
                    <div className="modal__background" onClick={this.onClose} />
                    <div className="modal__box">
                        <h3 className="modal__title">
                            {this.props.title}
                            &nbsp;{steps}
                        </h3>
                        {this.props.children}
                    </div>
                </div>
            )
        }

        return (
            <div id={this.props.id} ref="modal" tabIndex="0" className={classNames({"modal":true, "___full":this.props.full, "___blue":this.props.isBlue, "___small": this.props.small, "___is-open": this.props.modal == this.props.id || this.props.noParent})}>
                <div className="modal__close" onClick={this.onClose} />
                {modal}
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        modal: state.modal
    }
}

export default connect(stateToProps)(Modal)