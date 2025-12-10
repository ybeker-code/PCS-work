export default function DisplayWeather(props) {

    const { location, imgSrc, temperature, description } = props.weather
    return (
        <div>
            <div>The weather in <span id="location">{location}</span></div>
            <img id="icon" src={`https://openweathermap.org/img/w/${imgSrc}.png`} />
            <div><span id="temperature">{temperature}</span> and <span id="description">{description}</span></div>
        </div>
    )
}