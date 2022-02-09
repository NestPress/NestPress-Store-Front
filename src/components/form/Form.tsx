/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo, useState } from "react";
import { parseBlockAttrs, buildFormOutput } from "helpers";
import { gql, useMutation } from "@apollo/client";
import { getFromStore, useApp, useActions, setToStore, pushToStore } from "store";
import {
  getNestedChildren,
  buildVariables,
} from "components/blocks/helpers/blocks";
import { useRouter } from "next/router";
import { runCommands } from "helpers";

interface Props {
  attrs: any;
}
const Form: React.FC<Props> = memo(({ attrs, children }) => {
 

  // Interploate attributes
  const pAttrs = parseBlockAttrs(attrs)
  const router = useRouter()
  const [submit, setSubmit] = useState(false);

  // console.log('init form',pAttrs.variables)

  /* 
    MUTATION 

  */
  try { if (attrs.mutation) {
      const MUTATION = pAttrs.mutation ? gql`${pAttrs.mutation}` : ``;
      const [formMutation, { data }] = useMutation(MUTATION, {
        onCompleted(data) {
          setToStore({
            store: "forms",
            ref: `${attrs.refName}.response`,
            data: data,
          });
          setToStore({
            store: "custom",
            ref: `mutationTick`,
            data: Math.floor(Math.random() * 9999),
          });
          runCommands(pAttrs.successActions, router, pAttrs);
        },
        update: (cache) => {
          // TODO add this to form params
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPostBySlug" });
          cache.evict({ id: "ROOT_QUERY", fieldName: "getRelatedPosts" });
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPostTaxonomyValues" });
        },
      });
    }
  } catch (error) {}
  
  /* 
    SUBMIT

  */
  if(submit){
    // console.log('submit',pAttrs)
    setToStore({
      store: "forms",
      ref: `${attrs.refName}`,
      data: pAttrs.variables,
    });
    
    try { if (attrs.mutation) {
      formMutation({
        variables: pAttrs.variables
      }).catch((error) => {
        if (attrs.successActions) {
            console.log('error')
            runCommands(pAttrs.errorActions, router, attrs);
          }
        });
      }
    } catch (error) {}
    setSubmit(false)
  }

  return (
    <form
      className={`block ${attrs.classes}`}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmit(true)
        runCommands(pAttrs.initActions, router, pAttrs);
      }}
    >
      {children}
    </form>
  );
});
export default Form;
  