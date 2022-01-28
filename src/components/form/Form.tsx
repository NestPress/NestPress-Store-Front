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
  const pAttrs = parseBlockAttrs(attrs)
// console.log(pAttrs)
  /* init */
  const [active, setActive] = useState(true);
  const router = useRouter()
  if(active && attrs?.initActions && attrs?.initActions?.length>0){ 
    if(pAttrs){
      runCommands(attrs.initActions, router, pAttrs);
    }
    setActive(false)
  }

  /* mutation */
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

          runCommands(attrs.successActions, router, pAttrs);
        },
        update: (cache) => {
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPostTaxonomyValues" });
        },
      });
    }
  } catch (error) {}

  return (
    <form
      className={`block ${attrs.classes}`}
      onSubmit={(e) => {
        e.preventDefault();
        // const processedAttrs = getFromStore({store:"display", ref:`blocks.${attrs.index}.attrs`})
        // store form input data
        setToStore({
            store: "forms",
            ref: `${attrs.refName}`,
            data: pAttrs.variables,
          });

       console.log(pAttrs.variables)
        
        try { if (attrs.mutation) {
            formMutation({
              variables: pAttrs.variables
            }).catch((error) => {
              if (attrs.successActions) {
                console.log('error')
                runCommands(attrs.errorActions, router, attrs);
              }
            });
          }
        } catch (error) {}

        if (!attrs.mutation && attrs.successActions) {
          runCommands(attrs.successActions, router, attrs);
        }
      }}
    >
      {children}
    </form>
  );
});
export default Form;
