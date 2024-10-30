import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-around">
        <SignIn />
        <SignUp />
      </div>
    </main>
  );
}
