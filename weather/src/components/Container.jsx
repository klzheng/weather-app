export default function Container({children}) {
    return (
        <div 
            className="flex flex-col items-center w-128 mx-auto my-10 bg-black bg-opacity-30  rounded-xl backdrop-blur-md shadow-dark border border-slate-900 border-opacity-5 "
        >
            {children}
        </div>
    )
}