/*
query getPosts(
      $query: String
      $limit: Int
      $offset: Int
      $filter: PostsFilter
    ) {
    getPosts(
      filter:$filter,
      query:$query,
      offset:$offset,
      limit:$limit
    ) {
    list, {
      id,
      slug,
      title,
      postType
    }
  }
}

filter.postType.eq  => Post  
*/




/*
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
      customType
    }
  }

input.postType => Post
input.customType => cokolwiek
*/