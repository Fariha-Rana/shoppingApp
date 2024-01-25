import Items from "./utils/Items";

function Desktop() {
  return (
    <div className="bg-gray-900 hidden w-full min-[900px]:flex min-[900px]:justify-center min-[900px]:items-center min-[800px]:gap-8 lg:text-[1rem] text-[0.7rem] py-4">
      <Items/>
    </div>
  );
}

export default Desktop;
