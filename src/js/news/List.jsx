import React from "react"
import { connect } from "react-redux"
import { showModal } from "../lib/actions"
import ContentHeader from "../core/components/ContentHeader"
import InfiniteList from "../core/containers/InfiniteList"
import Card from "./components/Card"
import ContentFilters from "../core/containers/ContentFilters"
import AddButton from "../core/containers/AddButton"
import Document from "../core/components/Document"
import Add from "../core/Add"

class List extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeCanWrite = (canWrite) => this.setState({canWrite})
        this.onChangeFilter = (tags) => this.setState({ tags })
        this.onClickAdd = (e) => this.props.dispatch(showModal('add'))

        this.state = {
            tags: []
        }
    }

    render() {
        return (
            <div className="page-container">
                <Document title="Nieuws" />
                <ContentHeader>
                    <h3 className="main__title">
                        Nieuws
                    </h3>
                    <ContentFilters page="news" onClickAdd={this.onClickAdd} onChange={this.onChangeFilter} value={this.state.tags}>
                        <AddButton subtype="news" onClick={this.onClickAdd} />
                    </ContentFilters>
                </ContentHeader>
                <section className="section ___grey ___grow">
                    <InfiniteList childClass={Card} subtype="news" offset={0} limit={20} tags={this.state.tags} />
                </section>
                <Add title="Nieuws toevoegen" subtype="news" featuredImage={true} refetchQueries={["InfiniteList"]} />
            </div>
        )
    }
}

export default connect()(List)