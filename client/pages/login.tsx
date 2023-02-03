import { NextPage, GetServerSideProps } from "next";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/react";

interface IProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: NextPage<IProps> = ({ providers }) => {
  const { name, id } = providers?.google as ClientSafeProvider;
  return (
    <div className="mt-16 mx-6 flex flex-col h-screen items-center justify-center">
      <div className="mb-8">
        <img src="/google.png" alt="Google image" className="w-64" />
      </div>
      <button
        className="bg-[#ea4335] text-[20px] text-white px-6 py-2 rounded-full"
        onClick={() => {
          signIn(id, { callbackUrl: "/" });
        }}
      >
        Login with {name}
      </button>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
