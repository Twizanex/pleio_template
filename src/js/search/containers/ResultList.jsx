import React from "react"
import { Link } from "react-router"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { showShortDate } from "../../lib/showDate"
import InfiniteList from "../components/InfiniteList"

const Query = gql`
    query ResultList($q: String!, $type: Type, $subtype: String, $offset: Int, $limit: Int) {
        search(q: $q, offset: $offset, limit: $limit, type: $type, subtype: $subtype) {
            total
            totals {
                subtype
                total
            }
            entities {
                guid
                ... on Object {
                    guid
                    title
                    url
                    featuredImage
                    subtype
                    tags
                    timeCreated
                    isBookmarked
                    canBookmark
                    commentCount
                    hasVoted
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

export default graphql(Query)(InfiniteList);