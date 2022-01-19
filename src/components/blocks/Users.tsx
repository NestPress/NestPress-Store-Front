/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://tailwindcss-custom-forms.netlify.app/
import { useMutation } from "@apollo/client";

import { Upload } from "components/nestpress";

import { CREATE_ASSET } from "components/blocks/gql/composer";

export const Users: React.FC = () => {
  const [createAsset] = useMutation(CREATE_ASSET);
  const createFile = (file) => {
    createAsset({ variables: { input: [{ file }] } });
  };

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        {/*<FiFile />*/}
        <span className="ml-2">Assets</span>
      </div>
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          {/*<FiAnchor />*/}
          <span className="ml-2">Upload new asset</span>
        </div>
        <Upload res={createFile} />
      </div>
    </div>
  );
};
