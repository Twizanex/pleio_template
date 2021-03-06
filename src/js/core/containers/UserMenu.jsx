import React from "react"
import { graphql } from "react-apollo"
import { connect } from "react-redux"
import { showModal } from "../../lib/actions"
import { Link } from "react-router"
import NavigationSearch from "../../search/components/NavigationSearch"

class UserMenu extends React.Component {
    constructor(props) {
        super(props)

        this.toggleSearch = this.toggleSearch.bind(this)
        this.showModal = (id) => {
            this.props.dispatch(showModal(id))
        }
    }

    toggleSearch() {
        document.body.classList.toggle("navigation-search-open")
        setTimeout(() => {
            this.refs.search.getWrappedInstance().focus()
        }, 100)
    }

    render() {
        if (!this.props.viewer) {
            return (
                <div></div>
            )
        }

        let userMenu = (<ul className="navigation__actions"></ul>);

        if (this.props.viewer.loggedIn) {
            return (
                <ul className="navigation__actions">
                    <li>
                        <Link to="/bookmarks" onClick={this.props.onClick} title="Bewaard" className="navigation__action ___bookmarks">
                            <span>Bewaard</span>
                        </Link>
                    </li>
                    <li>
                        <a onClick={this.toggleSearch} title="Zoeken" className="navigation__action ___search"></a>
                        <NavigationSearch ref="search" />
                    </li>
                    <li>
                        <Link to={"/profile/" + this.props.viewer.user.username} onClick={this.props.onClick} title="Account" className="navigation__action ___account">
                            <div style={{backgroundImage: "url('" + this.props.viewer.user.icon + "')"}} className="navigation__picture"></div>
                            <span>{this.props.viewer.user.name}</span>
                        </Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navigation__actions">
                    <li>
                        <a onClick={this.toggleSearch} title="Zoeken" className="navigation__action ___search"></a>
                        <NavigationSearch ref="search" />
                    </li>
                    <li>
                        <a onClick={() => {this.props.onClick(); this.showModal('login');}} title="Inloggen" className="navigation__action ___login">
                            Inloggen
                        </a>
                    </li>
                    <li>
                        <a onClick={() => {this.props.onClick(); this.showModal('register');}} title="Registeren" className="navigation__action ___register">
                            Registeren
                        </a>
                    </li>
                </ul>
            )
        }
    }
}

const stateToProps = (state) => {
    return {
        modal: state.modal
    }
}

export default connect(stateToProps)(UserMenu)