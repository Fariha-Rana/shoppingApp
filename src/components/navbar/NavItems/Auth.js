import Link from "next/link";
import Image from "next/image";

import useAuthentication from "@/context/useAuthentication";

const Auth = () => {
  const { userData } = useAuthentication();
  
  return (
    <div className="flex items-center text-center max-[560px]:text-sm text-[1rem]">
      {userData ? (
        <p className="text-white font-mono mr-1 "> 👋Hii,{userData?.name}</p>
      ) : (
      <>
      <Link
          href="/authentication/signin"
          className="text-white mr-1 text-nowrap max-[560px]:text-[0.5rem] "
        >
          <b className="max-[560px]:text-[0.7rem] text-[0.9rem] block"> hello!👋</b>
          Sign In as Guest
        </Link>
      <div className="bg-white p-1 rounded-full">
        <Image
          width={5}
          height={5}
          alt="user logo"
          className="max-[560px]:w-3 w-6 h-auto"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACU0lEQVR4nO2XPU9UQRSGn2K1EQRDg9DKR2IhCNZKYmwg6P4XWYyWgoUWRkLpx0/QaAXrmlj6BxQ6FToiIawuWqzXnOSdZNzMnbn3RmNMeJNJbvY9Z+bM+ZyFY/xnmACWgdfAB+Crln03gQYw/jcOngVaQFZwmYEzf+LgE8A68FMbfwEeA4vyxikt+74OPJFMJp01oFb18DPAG232DbgLnC6gZzIrQMfzxmCVm7e0wa5CUBYXgI/a4y1wsozyuhQ/AyMBfkEGWgK29T0fkDPdHe31qOjhs4qfuX06wK9Eks/C1IuLCkdX30m0IpstiPsO3ATOai3ptyzHE6virFSjmPCyPZRwLint8F40xNkFejEA7IsfixlwS0JWaiG0xQ8HuGFxhzm6T8Wbt3LRlJDVdAgH4s3toYTLJBNCXfxmzIBtCY0nDAzdYlncRiK8WzEDDiXUn8Nf85KwoVuP6PAf4q7m6PYnQlTIAMODSBnej+gVMmA7EQKL417EgD3JVA5BM5KE82omxj8HLnvD6ArwQlw3pxfUEznyWy3bVPMx5FVArIxcIh5Ix8ezSA9JNqI73s1TeCnZ21UaERqfmXq+wzv9Zm5PYU6ypuNwr4j7HWY0jDre8HCPjD7ScNluOm64HSk3piiINW1io3SU6hj1xvHDMoo1LxT2ILlU4XC77SdvCpZ+mg16RnQ0Ui2ZUhhQzI+83l/6SeZQ00vG1f++yukGMKmc6NN3XZzL9q7cXvlR6uM88KrEs7xZ9PVTFmNqRJv6M9LWeq8SsyZzrvSux+Af4hcZWuMRIKzNjAAAAABJRU5ErkJggg=="
        />
      </div>
      </>
      )}
    </div>
  );
};

export default Auth;
