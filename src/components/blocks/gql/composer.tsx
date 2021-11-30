import { gql } from '@apollo/client';



/* gql */
export const CREATE_BLOCK = gql`
  mutation createBlock(
    $input: CreateBlockInput!
  ){
    createBlock(
      input: $input
    ){
      id
      block
      parentId
      attrs
      post
    }
  }
`
export const CREATE_POST = gql`
  mutation createPost(
    $input: CreatePostInput!
  ){
    createPost(
      input: $input
    ){
      id
      slug
      title
      postType
    }
  }
`

export const FILTER_POSTS = gql`
  query getPosts(
      $query: String
      $limit: Int
      $offset: Int
      $filter: PostsFilter
    ) {
  getPosts(filter:$filter,query:$query,offset:$offset,limit:$limit) {
    list, {
      id,
      title
    }
  }
}
`