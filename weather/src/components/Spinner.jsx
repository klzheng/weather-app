import MoonLoader from "react-spinners/MoonLoader";

export default function Spinner(props) {
  const { isLoading } = props;

  return (
    <div className="absolute top-1/4 -translate-y-3/4 left-1/2 -translate-x-1/2">
      <MoonLoader
        size={70}
        loading={isLoading}
        color="#fbfbfb"
        speedMultiplier={0.5}
      />
    </div>
  );
}
