import MoonLoader from "react-spinners/MoonLoader"
// import PulseLoader from "react-spinners/PulseLoader"
// import BarLoader from "react-spinners/BarLoader"

export default function Spinner(props) {

    const { isLoading } = props

    return (
        <div className="absolute top-1/4 -translate-y-3/4 left-1/2 -translate-x-1/2">
            <MoonLoader
                size={70}
                loading={isLoading}
                color="#fbfbfb"
                speedMultiplier={0.5}
            />
            {/* <PulseLoader
                color="#fbfbfb"
                loading={isLoading}
                margin={20}
                size={20}
                speedMultiplier={0.75}
            /> */}
            {/* <BarLoader
                loading={isLoading}
                color="#fbfbfb"
                height={2}
                width={200}
            /> */}
        </div>
    )
}