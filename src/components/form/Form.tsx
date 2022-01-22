/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
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
const Form: React.FC<Props> = ({ attrs, children }) => {
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const blocks = useApp((state) => state.display.blocks) || [];
  const setStore = useApp((state) => state.setStore);
  const addAction = useActions((state) => state.addAction);
  const form = getNestedChildren(blocks, attrs.id);
  attrs = parseBlockAttrs(attrs);

  

  getFromStore({ ref: attrs.refName, store: "forms" })
    ? null
    : setStore({
        store: "forms",
        ref: attrs.refName,
        data: buildFormOutput(form),
      });

  /* mutation */
  try {
    if (attrs.mutation) {

      const MUTATION = attrs.mutation
        ? gql`
            ${attrs.mutation}
          `
        : ``;
      const [formMutation, { data, loading, error }] = useMutation(MUTATION, {
        onCompleted(data) {
          setToStore({
            store: "forms",
            ref: `${attrs.refName}.response`,
            data: data,
          });
          // setToStore({
          //   store: "custom",
          //   ref: `tick`,
          //   data: Math.floor(Math.random() * 9999),
          // });
          runCommands(attrs.successActions, router);
        },
        update: (cache) => {
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPostTaxonomyValues" });
        },
      });
    }
  } catch (error) {
    addAction({ type: "error", key: "submitForm", value: error });
  }

  const mergeDeep = (target, source) => {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], mergeDeep(target[key], source[key]))
    }
    Object.assign(target || {}, source)
    return target
  }

  return (
    <form
      className={`block ${attrs.classes}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!attrs.mutation && attrs.successActions) {
          runCommands(attrs.successActions, router);
        }
        try {
          if (attrs.mutation) {
            formMutation({
              variables: mergeDeep(
                JSON.parse(JSON.stringify(getFromStore({store:"forms", ref:attrs.refName}))), 
                JSON.parse(JSON.stringify(buildVariables(attrs.consts))), 
                ),
            }).catch((error) => {
              addAction({
                type: "error",
                key: "submitForm",
                value: error.message,
              });
            });
          }
        } catch (error) {}
      }}
    >
      {children}
    </form>
  );
};
export default Form;
