import Spinner from "./Spinner";

export default function Container({children, isLoading}) {
    return (
        <div 
            className={"flex flex-col items-center 2xs:w-96 xs:w-112 sm:w-128  bg-black bg-opacity-40 rounded-3xl backdrop-blur-md shadow-dark border border-slate-900 border-opacity-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-5  2xs:my-28 xs:my-28 sm:my-12 xl:my-0 transition-all 2xs:mx-10 xs:mx-auto" + (isLoading ? " h-172 " : "  ")}
        >
            {isLoading ? <Spinner/> : children}
        </div>
    )
}