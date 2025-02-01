import Link from "next/link";

const Home = () => {
  return (
      <div className={"text-center mt-28"}>
        <h1 className={"font-bold text-3xl"}>Welcome!</h1>
        <h2 className={"text-2xl font-semibold text-gray-700 mt-4"}>You need to log in to use this app.</h2>
          <div className={"grid grid-cols-2 gap-y-2 gap-x-24 mt-4"}>
              <div className={"text-right"}>
                <Link href={"/account/register"}><button className={"text-white bg-black p-5 rounded w-28"}>Register</button></Link>
              </div>
          <div className={"text-left"}>
              <Link href={"/account/login"}><button className={"text-white bg-black p-5 rounded w-28"}>Log in</button></Link>
          </div>
          </div>
      </div>
  );
};

export default Home;