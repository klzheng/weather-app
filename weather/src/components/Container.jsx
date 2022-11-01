export default function Container({children}) {
    return (
        <div 
            className="flex flex-col items-center w-128 mx-auto bg-black bg-opacity-30 rounded-xl backdrop-blur-md shadow-dark border border-slate-900 border-opacity-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        >
            {children}
        </div>
    )
}