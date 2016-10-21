import React from "react"
import InfiniteList from "../components/InfiniteList"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

const Query = gql`
    query InfiniteList($offset: Int!, $limit: Int!, $tags: [String!], $subtype: String!) {
        entities(offset: $offset, limit: $limit, tags: $tags, subtype: $subtype) {
            total
            entities {
                guid
                ... on Object {
                    title
                    tags
                }
            }
        }
    }
`

const withQuery = graphql(Query)
export default withQuery(InfiniteList)