/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { parseBlockAttrs } from "helpers";
import { gql, useMutation } from "@apollo/client";
import { useBlocks, getFromStore, useApp, useActions, setToStore } from "store";
import {
  getNestedChildren,
  buildFormOutput,
  buildVariables,
} from "components/blocks/helpers/blocks";
import { useRouter } from "next/router";
import { runCommands } from "helpers";

interface Props {
  attrs: any;
}
const Form: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter();
  const blocks = useBlocks((state) => state.blocks);
  const setStore = useApp((state) => state.setStore);
  const addAction = useActions((state) => state.addAction);
  const form = getNestedChildren(blocks, attrs.id);

  attrs = parseBlockAttrs(attrs);

  getFromStore({ ref: attrs.refName, store: "forms" })
    ? null
    : setStore({
        store: "forms",
        ref: attrs.refName,
        data: { ...buildFormOutput(form), ...buildVariables(attrs.consts) },
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
          console.log("complete:", data);
          setToStore({
            store: "forms",
            ref: `${attrs.refName}.response`,
            data: data,
          });
          runCommands(attrs.successActions, router);
        },
        update: (cache) => {
          cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
        },
      });
    }
  } catch (error) {
    addAction({ type: "error", key: "submitForm", value: error });
  }

  return (
    <form
      className={`block ${attrs.classes}`}
      onSubmit={(e) => {
        console.log("try send");
        e.preventDefault();
        if (attrs.mutation && attrs.successActions) {
          console.log("run first");
          runCommands(attrs.successActions, router);
        }
        try {
          if (attrs.mutation) {
            formMutation({
              variables: getFromStore({ ref: attrs.refName, store: "forms" }),
            }).catch((error) => {
              console.log("form error", error.message);
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
});
export default Form;
