import Spinner from "./Spinner";

export default function Container({ children, isLoading }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={
          "flex flex-col items-center justify-center 2xs:w-76 xs:w-112 sm:w-128 bg-black bg-opacity-40 rounded-3xl backdrop-blur-md shadow-dark border border-slate-900 border-opacity-5 py-5 my-5  transition-all 2xs:mx-auto xs:mx-auto" +
          (isLoading ? " h-172 " : "  ")
        }
      >
        {isLoading ? <Spinner /> : children}
      </div>
    </div>
  );
}
