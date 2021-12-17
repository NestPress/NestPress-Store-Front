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