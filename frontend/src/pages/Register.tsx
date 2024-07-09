import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useCreateNewUserMutation } from "../generated/graphql-types";
import { useContext } from "react";

const Register = () => {
  const [createUser] = useCreateNewUserMutation();
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson: any = Object.fromEntries(formData.entries());

        createUser({
          variables: formJson,
          onCompleted: (data: { createUser: string }) => {
            console.log("completed");
            localStorage.setItem("token", data.createUser);
            userInfo.refetch();
            navigate("/");
          },
          onError: (err: unknown) => {
            console.log("error ", err);
          },
        });
      }}
    >
      <label>
        email:
        <input
          className="text-field"
          name="email"
          defaultValue={"alice@gmail.com"}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          className="text-field"
          name="password"
          defaultValue={"test"}
        />
      </label>
      <br />
      <button className="button">Register</button>
    </form>
  );
};

export default Register;
