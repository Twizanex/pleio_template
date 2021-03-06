import React from "react"
import { Link } from "react-router"
import { getClassFromTags } from "../../lib/helpers"
import classnames from "classnames"
import NewsCard from "../../news/components/Card"
import BlogCard from "../../blog/components/Card"
import QuestionCard from '../../questions/components/Card'

export default class Card extends React.Component {
    constructor(props) {
        super(props)

        this.renderNews = this.renderNews.bind(this)
        this.renderBlog = this.renderBlog.bind(this)
        this.renderQuestion = this.renderQuestion.bind(this)
    }

    render() {
        if (!this.props.entity) {
            return (
                <div></div>
            )
        }

        switch (this.props.entity.object.subtype) {
            case "news":
                return this.renderNews()
            case "blog":
                return this.renderBlog()
            case "question":
                return this.renderQuestion()
            default:
                return (
                    <div></div>
                )
        }
    }

    renderNews() {
        const activity = this.props.entity
        const { object } = activity

        return (
            <NewsCard entity={this.props.entity.object} inActivityFeed={true} />
        )
    }

    renderBlog() {
        return (
            <BlogCard entity={this.props.entity.object} inActivityFeed={true} />
        )
    }

    renderQuestion() {
        return (
            <QuestionCard entity={this.props.entity.object} inActivityFeed={true} />
        )
    }
}