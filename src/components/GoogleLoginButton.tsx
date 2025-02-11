import { FaGoogle } from "react-icons/fa";
import * as actions from "@/actions";

const GoogleLoginButton = () => {
  return (
    <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5" onClick={actions.signInWithGoogle}>
      <FaGoogle className=" mr-2" />
      <span>Login or Register</span>
    </button>
  );
};

export default GoogleLoginButton;
