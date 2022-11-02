import { useCallback, useEffect, useState } from "react"
import moment from "moment"
import bgCloudy from "../assets/bg-cloudy.mp4"
import bgCloudy2 from "../assets/bg-cloudy-2.mp4"
import bgClear from "../assets/bg-clear.mp4"
import bgClear2 from "../assets/bg-clear-2.mp4"
import bgClear3 from "../assets/bg-clear-3.mp4"
import bgFog from "../assets/bg-fog.mp4"
import bgFog2 from "../assets/bg-fog-2.mp4"
import bgRain from "../assets/bg-rain.mp4"
import bgRain2 from "../assets/bg-rain-2.mp4"
import bgRain4 from "../assets/bg-rain-4.mp4"
import bgSnow2 from "../assets/bg-snow-2.mp4"
import bgSnow3 from "../assets/bg-snow-3.mp4"
import bgSnow4 from "../assets/bg-snow-4.mp4"
import bgHail from "../assets/bg-hail.mp4"
import bgThunderstorm from "../assets/bg-thunderstorm.mp4"
import bgNight from "../assets/bg-night.mp4"
import bgNight2 from "../assets/bg-night-2.mp4"


export default function Background({ children, data }) {

    const [bg, setBg] = useState("")
    const hour = moment(moment()).local().format("HH")
    const nightTime = (hour >= 18 || hour <= 4)

    const getBackgroundImg = useCallback((weatherCode) => {
        if ((weatherCode === 1101 || weatherCode === 1001) && nightTime) {
            setBg(bgNight2)
        } else if (weatherCode === 1101) {
            setBg(bgCloudy)
        } else if (weatherCode === 1001) {
            setBg(bgCloudy2)
        } else if ((weatherCode === 1000 || weatherCode === 1100 || weatherCode === 1101) && nightTime) {
            setBg(bgNight)
        } else if (weatherCode === 1000) {
            setBg(bgClear)
        } else if (weatherCode === 1100) {
            setBg(bgClear2)
        } else if (weatherCode === 1101) {
            setBg(bgClear3)
        } else if (weatherCode === 2000) {
            setBg(bgFog)
        } else if (weatherCode === 2100) {
            setBg(bgFog2)
        } else if (weatherCode === 4000 || weatherCode === 4200 || weatherCode === 6000 || weatherCode === 6200) {
            setBg(bgRain2)
        } else if (weatherCode === 4001 || weatherCode === 6001) {
            setBg(bgRain)
        } else if (weatherCode === 4201 || weatherCode === 6201) {
            setBg(bgRain4)
        } else if ((weatherCode === 5000 || weatherCode === 5001 || weatherCode === 5101) && nightTime) {
            setBg(bgSnow4)
        } else if (weatherCode === 5000) {
            setBg(bgSnow2)
        } else if (weatherCode === 5001 || weatherCode === 5101) {
            setBg(bgSnow3)
        } else if (weatherCode === 5100) {
            setBg(bgSnow4)
        } else if (weatherCode >= 7000 && weatherCode <= 7102) {
            setBg(bgHail)
        } else if (weatherCode === 8000) {
            setBg(bgThunderstorm)
        } else {
            setBg(bgNight)
        }
    }, [nightTime])

    useEffect(() => {
        if (Object.keys(data).length !== 0) getBackgroundImg(data[0].values.weatherCode)
    }, [data, getBackgroundImg])

    return (
        <>
            {Object.keys(data).length !== 0 &&
                <div className={" inset-0 bg-cover text-white overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 transition-all"}>
                    <video src={bg} autoPlay loop muted className="fixed inset-0 object-cover text-white -z-10 min-h-full min-w-full" />
                    {children}
                </div>
            }
        </>
    )
}
