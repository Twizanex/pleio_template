import React from "react"
import { Link } from "react-router"
import { graphql } from "react-apollo"
import { connect } from "react-redux"
import gql from "graphql-tag"
import { showModal } from "../lib/actions"

class TopMenu extends React.Component {
    constructor(props) {
        super(props)

        this.showLoginModal = this.showLoginModal.bind(this)
    }

    showLoginModal(e) {
        e.preventDefault()
        this.props.dispatch(showModal('login'))
    }

    render() {
        let menuItems = "";
        if (this.props.data.site) {
            menuItems = this.props.data.site.menu.map((item) => {
                if (item.js) {
                    return (
                        <li key={item.guid}>
                            <Link to={item.link} title={item.title} className="navigation__link">
                                {item.title}
                            </Link>
                        </li>
                    )
                } else {
                    return (
                        <li key={item.guid}>
                            <a href={item.link} title={item.title} className="navigation__link">
                                {item.title}
                            </a>
                        </li>
                    )
                }
            })
        }

        let userMenu = "";
        if (this.props.data.viewer && this.props.data.viewer.loggedIn) {
            userMenu = (
                <ul className="navigation__actions">
                    <li><a href="#" title="Bookmarks" className="navigation__action ___bookmarks"><span>Bookmarks</span></a></li>
                    <li><a href="#" title="Zoeken" data-search-trigger className="navigation__action ___search"></a></li>
                    <li>
                        <a href="#" title="Account" className="navigation__action ___account">
                            <span>Sarah Hendriks</span>
                        </a>
                    </li>
                </ul>
            )
        } else {
            userMenu = (
                <ul className="navigation__actions">
                    <li><a href="#" title="Zoeken" data-search-trigger className="navigation__action ___search"></a></li>
                    <li>
                        <a href="#" title="Account" className="navigation__action ___account">
                            <span>Sarah Hendriks</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={this.showLoginModal}>Login</a>
                    </li>
                </ul>
            )
        }

        return (
            <nav className="navigation">
                <div className="container">
                    <div data-navigation-wrapper className="navigation__wrapper">
                        <div className="mobile-navigation__close"><span data-mobile-nav-trigger className="icon icon-cross"></span></div>
                        <div className="mobile-navigation__search">
                            <form action="#">
                                <label htmlFor="mobile-navigation-search">Zoeken</label>
                                <input id="mobile-navigation-search" placeholder="Zoeken" name="searchQuery" />
                            </form>
                        </div>
                        <a href="#skip-navigation" title="Volg deze link om de navigatie over te slaan" className="skip-navigation__link">
                            Rechtstreeks naar content
                        </a>
                        <ul className="navigation__links">
                            <li>
                                <Link to="/activity" title="Home" className="navigation__link ___home ___is-active">Home</Link>
                            </li>
                            {menuItems}
                            <li className="navigation__dropdown ___mobile"><a href="#" title="Meer" className="navigation__link ___dropdown">Meer</a>
                                <div className="submenu ___dropdown">
                                    <div data-nav-back className="submenu__back">Terug</div>
                                    <ul className="submenu__list">
                                        <li className="submenu__list-subject submenu__list-item">
                                            <a href="#" title="Over">Over</a>
                                            <a href="#" title="Spelregels">Spelregels</a>
                                            <a href="#" title="Algemene voorwaarden">Algemene voorwaarden</a>
                                            <a href="#" title="Privacy">Privacy</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        {userMenu}
                        <a href="#" title="Pleio" className="navigation__link ___pleio">
                            Pleio
                        </a>
                    </div>
                    <div className="mobile-navigation__bar">
                        <div data-mobile-nav-trigger data-mega-nav-trigger className="mobile-navigation__trigger"></div><a href="/" className="mobile-navigation__home"></a>
                        <ul className="mobile-navigation__actions">
                            <li><a href="#" title="Bookmarks" className="mobile-navigation__action ___bookmarks"></a></li>
                            <li><a href="#" title="Zoeken" data-search-trigger className="mobile-navigation__action ___search"></a></li>
                            <li><a href="#" title="Account" className="mobile-navigation__action ___account"></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const stateToProps = (state) => {
    return {
        modal: state.modal
    }
}

const WithQuery = gql`
    query {
        site {
            menu {
                guid
                title
                link
                js
            }
        }
        viewer {
            loggedIn
        }
    }
`;

export default connect(stateToProps)(graphql(WithQuery)(TopMenu));