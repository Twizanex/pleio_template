import React from 'react'
import TopMenu from './TopMenu'

export default class Container extends React.Component {
    render() {
        return (
            <div>
                <header className="page-layout__header">
                    <TopMenu />
                </header>
                <main id="skip-navigation" className="page-layout__main ___no-padding">
                    {this.props.children}
                </main>
            </div>
        )
    }
}