import { gql } from "@apollo/client";

/* gql */
export const CREATE_BLOCK = gql`
  mutation createBlock($input: CreateBlockInput!) {
    createBlock(input: $input) {
      id
      block
      parentId
      attrs
      order
      post
    }
  }
`;
export const CREATE_BLOCKS = gql`
  mutation createBlocks($input: CreateBlocksInput!) {
    createBlocks(input: $input) {
      id
    }
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateBlock($id: String!, $input: UpdateBlockInput!) {
    updateBlock(id: $id, input: $input) {
      id
    }
  }
`;

export const UPDATE_BLOCKS = gql`
  mutation updateBlocks($input: UpdateBlocksInput!) {
    updateBlocks(input: $input) {
      id
      order
    }
  }
`;

export const GET_BLOCKS = gql`
  query getBlocks(
    $query: String
    $limit: Int
    $offset: Int
    $filter: BlocksFilter
    $sort: JSON
  ) {
    getBlocks(
      filter: $filter
      sort: $sort
      query: $query
      offset: $offset
      limit: $limit
    ) {
      list {
        id
        parentId
        block
        attrs
        post
        order
      }
    }
  }
`;
export const DELETE_BLOCK = gql`
  mutation deleteBlock($id: String!) {
    deleteBlock(id: $id)
  }
`;
export const DELETE_BLOCKS = gql`
  mutation deleteBlocks($input: DeleteBlocksInput!) {
    deleteBlocks(input: $input) {
      id
    }
  }
`;
// --------------------------------------
// input.slug
// input.postType
// input.title
export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      slug
      title
      postType
    }
  }
`;
export const FILTER_POSTS = gql`
  query getPosts(
    $query: String
    $limit: Int
    $offset: Int
    $filter: PostsFilter
    $sort: JSON  = { slug: ASC }
  ) {
    getPosts(filter: $filter, query: $query, offset: $offset, limit: $limit, sort:$sort) {
      list {
        id
        slug
        title
        postType
      }
    }
  }
`;
export const GET_POST_BY_SLUG = gql`
  query getPostBySlug($slug: String!) {
    getPostBySlug(slug: $slug) {
      id
      createdAt
      title
    }
  }
`;
export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

// --------------------------------------

export const CREATE_ASSET = gql`
  mutation ($input: [CreateAssetInput!]!) {
    createAssets(input: $input) {
      ... on Asset {
        id
        width
        height
        source
        preview
      }
    }
  }
`;
