import React from "react"
import { Link } from "react-router"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { showShortDate } from "../../lib/showDate"

class AutocompleteList extends React.Component {

    generateLink(item) {
        switch (item.subtype) {
            case "blog":
                return `/blog/${item.guid}`
            case "news":
                return `/news/${item.guid}`
            case "question":
                return `/questions/${item.guid}`
        }
    }

    closeSearch() {
        document.body.classList.remove("navigation-search-open")
    }

    render() {
        const { search } = this.props.data

        if (!search) {
            return (
                <div></div>
            )
        }

        let results

        if (search.results) {
            results = search.results.map((item, i) => (
                <li key={i}>
                    <Link to={this.generateLink(item)} onClick={this.closeSearch}>
                        <span>{showShortDate(item.timeCreated)}</span>{item.title}
                    </Link>
                </li>
            ))
        }

        return (
            <div className="col-lg-6">
                <h4 className="navigation-search-results__title">
                    {this.props.title}
                </h4>
                <ul className="navigation-search-results__list">
                    {results}
                </ul>
                <Link to={`/search?type=object&subtype=${this.props.subtype}&q=${this.props.q}`} onClick={this.closeSearch} title="Bekijk alle resultaten" className="navigation-search-results__show-all">
                    Bekijk alle resultaten
                </Link>
            </div>
        )
    }
}

const Query = gql`
    query AutocompleteList($q: String!, $type: Type, $subtype: String) {
        search(q: $q, limit: 5, type: $type, subtype: $subtype) {
            results {
                guid
                ... on Object {
                    guid
                    title
                    subtype
                    timeCreated
                }
            }
        }
    }
`;

export default graphql(Query)(AutocompleteList);