/* TODO fix type */
// @ts-ignore
// @ts-nocheck

// TODO
// https://www.npmjs.com/package/gql-query-builder
import { pushToStore, useApp, getFromStore , setToStore} from "store";
import { useState } from "react";
import { useLazyQuery, gql } from '@apollo/client';
import { buildVariables } from "components/blocks/helpers/blocks"

interface Props {
  keyName: string;
  res: any;
  block: any
}
export const QueryField: React.FC<Props> = ({ keyName, res, block }) => {
     
  const targeter = useApp((state) => state.custom.activeTargeter);
  const QUERY_GQL = targeter.attrs.query ? gql `${targeter.attrs.query}` : gql `query {a: Boolean}`
  const qres = {}
  // targeter.attrs.variables ? qres.variables = buildVariables(targeter.attrs.variables) : null
  const [ myQuery, { queryLoading, data } ] = useLazyQuery(QUERY_GQL, {variables:buildVariables(targeter.attrs.variables)}) ;  

  if (data) {
    setToStore({store:"queries", ref:`${targeter.attrs.refName || targeter.attrs.id}`, data:data})
  }

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }
  return (
    <> 
      <div className="py-1" >
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
          className="text-indigo-600 cursor-pointer hover:underline pl-1">getPost</span> 
        <span 
          onClick={e=>update('')} 
          className="text-indigo-600 cursor-pointer hover:underline pl-1">clear</span> 
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
      <div className="border-b py-1">
        After change <span className="text-indigo-600 cursor-pointer hover:underline" 
        onClick={e=>myQuery()}>restart query</span> to refetch components.</div>
    </>
  );
};

