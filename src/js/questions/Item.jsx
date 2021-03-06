import React from "react"
import { graphql } from "react-apollo"
import { connect } from "react-redux"
import { Link } from "react-router"
import gql from "graphql-tag"
import CommentList from "../core/components/CommentList"
import Edit from "../core/Edit"
import Delete from "../core/Delete"
import { showModal } from "../lib/actions"
import AddComment from "../core/containers/AddComment"
import SocialShare from "../core/components/SocialShare"
import NotFound from "../core/NotFound"
import showDate from "../lib/showDate"
import RichTextView from "../core/components/RichTextView"
import LikeAndBookmark from "../core/components/LikeAndBookmark"
import Document from "../core/components/Document"

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.onEdit = () => this.props.dispatch(showModal("edit"))
        this.onDelete = () => this.props.dispatch(showModal("delete"))
        this.toggleAddComment = () => this.setState({showAddComment: !this.state.showAddComment})
        this.closeAddComment = () => this.setState({showAddComment: false})

        this.state = {
            showAddComment: false
        }
    }


    render() {
        let { entity, viewer } = this.props.data

        if (!entity) {
            // Loading...
            return (
                <div></div>
            )
        }

        if (entity.status == 404) {
            return (
                <NotFound />
            )
        }

        let edit = ""
        if (entity.canEdit) {
            edit = (
                <div className="button__text article-action ___edit-post" onClick={this.onEdit}>
                    Bewerken
                </div>
            );
        }

        let featuredImage = ""
        if (entity.featuredImage) {
            featuredImage = (
                <div style={{backgroundImage: "url(" + entity.featuredImage + ")"}} className="lead ___content">
                    <div className="lead__justify">
                    <div className="container">
                    </div>
                    </div>
                </div>
            )
        }

        let actions
        if (entity.canComment) {
            actions = (
                <div className="article-actions__buttons">
                    <div className="article-actions__justify">
                        <div title="Schrijf een reactie" className="button article-action ___comment" onClick={this.toggleAddComment}>
                            Schrijf een reactie
                        </div>
                        {edit}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Document title={entity.title} />
                {featuredImage}
                <section className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                                <article className="article">
                                    <div className="article-author ___margin-bottom">
                                        <Link to={entity.owner.url} style={{backgroundImage: "url(" + entity.owner.icon + ")"}} className="article-author__picture"></Link>
                                        <div className="article-author__justify">
                                            <Link to={entity.owner.url} className="article-author__name">
                                                {entity.owner.name}
                                            </Link>
                                            <div className="article-author__date">
                                                {showDate(entity.timeCreated)}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="article__title">{entity.title}</h3>
                                    <RichTextView richValue={entity.richDescription} value={entity.description} />
                                    <LikeAndBookmark like={false} bookmark={true} viewer={viewer} entity={entity} />
                                    <div className="article-actions">
                                        <SocialShare />
                                        {actions}
                                    </div>
                                </article>
                                <AddComment viewer={viewer} isOpen={this.state.showAddComment} object={entity} onSuccess={this.closeAddComment} refetchQueries={["QuestionsItem"]} />
                                <CommentList comments={entity.comments} canVote={true} />
                                <Edit title="Vraag wijzigen" entity={entity} subtype="question" />
                                <Delete title="Vraag verwijderen" entity={entity} subtype="question" refetchQueries={["InfiniteList", "QuestionTopicCard"]} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const QUERY = gql`
    query QuestionsItem($guid: String!) {
        viewer {
            guid
            loggedIn
            user {
                guid
                name
                icon
                url
            }
        }
        entity(guid: $guid) {
            guid
            status
            ... on Object {
                title
                description
                richDescription
                accessId
                timeCreated
                featuredImage
                canEdit
                tags
                isBookmarked
                canBookmark
                canComment
                owner {
                    guid
                    username
                    name
                    icon
                    url
                }
                comments {
                    guid
                    description
                    canEdit
                    timeCreated
                    hasVoted
                    canVote
                    votes
                    owner {
                        guid
                        username
                        name
                        icon
                        url
                    }
                }
            }
        }
    }
`;

export default connect()(graphql(QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                guid: ownProps.params.guid
            }
        }
    }
})(Item));