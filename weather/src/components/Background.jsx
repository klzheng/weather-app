export default function Background({children}) {
    return (
        <div className="bg-background fixed inset-0 bg-cover text-white overflow-y-auto">
            {children}
        </div>
    )
}