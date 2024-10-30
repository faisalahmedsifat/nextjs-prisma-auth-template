import SignupUseCase from "@/server/actions/auth/signup-usecase";

export function SignUp() {
  return (
    <form
      action={async (formData) => {
        "use server";
        console.log("formData", formData);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await SignupUseCase({ email, password });
        // await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
