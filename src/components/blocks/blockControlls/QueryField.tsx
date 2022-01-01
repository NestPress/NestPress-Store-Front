// TODO
// https://www.npmjs.com/package/gql-query-builder

interface Props {
  keyName: string;
  res: any;
  block: any
}
export const QueryField: React.FC<Props> = ({ keyName, res, block }) => {
  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }
  return (
    <> 
      <div className="border-b mb-1 pb-px" >
        <span>example:</span> 
        <span
          onClick={e=>update(`query getPosts(
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
}`)} 
          className="text-indigo-600 cursor-pointer hover:underline pl-1">getPosts</span> 
      <span
          onClick={e=>update(`query getPostBySlug(
      $slug:String!
    ){
    getPostBySlug(
      slug: $slug
    ){
      id
      createdAt
      title
    }
  }`)} 
          className="text-indigo-600 cursor-pointer hover:underline pl-1">getPostBySlug</span> 
        <span 
          onClick={e=>update(``)} 
          className="text-indigo-600 cursor-pointer hover:underline pl-1">getCustomers</span> 
      </div>
      <textarea
        onChange={e => {
          res({ key: keyName, value: e.target.value, mutation: false })
         
        }}
        onBlur={e => {
          res({ key: keyName, value: e.target.value, mutation: true })
        }}
        /* TODO fix type */
        // @ts-ignore: Unreachable code error
        rows="3"
        className="col-span-3 border p-1 w-full"
        value={block?.attrs[keyName]}
      />
      <div>After change query <span className="text-indigo-600 cursor-pointer hover:underline" onClick={e=>window.location.reload(false)}>restart app</span> to refetch all components. (We working to fix this :)</div>
    </>
  );
};

