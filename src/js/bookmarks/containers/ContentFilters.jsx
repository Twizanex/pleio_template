import React from "react"
import Select from "../../core/components/Select"
import { categoryOptions } from "../../lib/filters"

const subtypeOptions = {
    blog: "Blogberichten",
    news: "Nieuwsberichten",
    question: "Forumberichten",
    all: "Alle soorten"
}

const extendedCategoryOptions = Object.assign({}, categoryOptions, {
    mine: "Mijn categorieën",
    all: "Alle categorieën"
})

export default class ContentFilters extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subtype: "all",
            category: "all"
        }

        this.onChangeFilter = this.onChangeFilter.bind(this)
        this.onChangeSubtype = this.onChangeSubtype.bind(this)
    }

    onChangeFilter(name, value) {
        let newFilter = Object.assign(this.state, {
            [name]: value
        })

        this.setState(newFilter)

        const tagsArray = Object.keys(newFilter)
            .map(key => newFilter[key])
            .filter((value) => value !== "all")

        if (this.props.onChangeTags) {
            this.props.onChangeTags(tagsArray)
        }
    }

    onChangeSubtype(name, value) {
        this.setState({
            subtype: value
        })

        if (this.props.onChangeSubtype) {
            this.props.onChangeSubtype(value)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-4 col-lg-3">
                    <Select name="subtype" options={subtypeOptions} onChange={this.onChangeSubtype} value={this.state.subtype} className="selector ___margin-bottom-mobile" />
                </div>
                <div className="col-sm-4 col-lg-3">
                    <Select name="category" options={extendedCategoryOptions} onChange={this.onChangeFilter} value={this.state.category} className="selector" />
                </div>
                {this.props.children}
            </div>
        )
    }
}