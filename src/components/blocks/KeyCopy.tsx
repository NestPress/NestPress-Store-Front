/* TODO fix type */
// @ts-ignore
// @ts-nocheck

interface Props {
  res: any
}

export const KeyCopy: React.FC = ({ res }) => {
  return(
    <>
   <div className="p-2 bg-green-600 text-white border-b">
      Blocks copyied!
    </div>
    <div className="p-2 border-b text-sm">Select target block to paste inside (Ctrl+v)</div>
    </>
  )
}