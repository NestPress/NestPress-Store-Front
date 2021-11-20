interface Props {
  attrs: any
}
const Form: React.FC<Props> = ({ attrs, children }) => {
  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      console.log('run mutation') 
    }}>
      {children}
    </form>
  );
};
export default Form