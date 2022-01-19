/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { gql, useMutation } from "@apollo/client";
// import { useMessage } from 'store/messageStore'
import { UserState } from "store/userStore";
interface Props {
  className?: string;
}
const LOGOUT = gql`
  mutation logout {
    logout {
      success
    }
  }
`;
export const LogoutLink: React.FC<Props> = ({ className }) => {
  /* mutation */
  const [addLogout, { data, loading, error }] = useMutation(LOGOUT, {
    onCompleted(data) {
      UserState.removeToken();
      useMessage.setState({
        active: true,
        title: "CurrentUser logout success",
        type: "success",
      });
    },
    optimisticResponse() {
      // useMessage.setState({ active: false })
    },
  });
  return (
    <span
      className={`cursor-pointer ${className} hover:underline`}
      onClick={(e) => {
        e.preventDefault();
        addLogout({});
      }}
    >
      Logout
    </span>
  );
};
