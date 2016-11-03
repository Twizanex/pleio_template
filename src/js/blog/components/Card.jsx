import React from "react"
import { Link } from "react-router"
import { getClassFromTags } from "../../lib/helpers"
import classnames from "classnames"
import showDate from "../../lib/showDate"
import Likes from "../../core/components/Likes"
import Bookmark from "../../bookmarks/components/Bookmark"

export default class Card extends React.Component {
    render() {
        const { guid, featuredImage, title, excerpt, timeCreated, tags, owner } = this.props.entity

        let featured
        if (featuredImage) {
            featured = (
                <Link to={`/blog/${guid}`} style={{backgroundImage: "url(" + featuredImage + ")"}} className="card-blog-post__image" />
            )
        }

        return (
            <div className="card-blog-post">
                <Link to={`/profile/${owner.username}`} title={owner.name} style={{backgroundImage: "url(" + owner.icon + ")"}} className="card-blog-post__picture"></Link>
                <div className="card-blog-post__post">
                    <div className="card-blog-post__meta">
                        <Link to={`/profile/${owner.username}`} className="card-blog-post__user">
                            {owner.name}
                        </Link>

                        { tags.length > 0 ? ( <span>&nbsp;over&nbsp;</span> ) : "" }
                        <a href="#" className="card-blog-post__subject">
                            {tags}
                        </a>

                        <div href="#" className="card-blog-post__date">
                            {showDate(timeCreated)}
                        </div>
                    </div>

                    {featured}

                    <Link to={`/blog/${guid}`} className="card-blog-post__title">
                        {title}
                    </Link>

                    <div className="card-blog-post__content">
                        {excerpt}
                    </div>
                </div>

                <div className="card-blog-post__actions">
                    <Likes entity={this.props.entity} />
                    <Bookmark entity={this.props.entity} />
                </div>
            </div>
       )
    }
}