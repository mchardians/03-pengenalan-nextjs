import { useState, useEffect } from "react";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Malang");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/weather?city=${city}`);

            if (!res.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const data = await res.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        // <div className={"min-h-screen bg-gray-100 p-8"}>
        //     <div className="max-w-6xl mx-auto">
        //         <Header />
        //         <LocationSearch />
        //         <CurrentWeather />
        //         <WeatherDetails />
        //     </div>
        // </div>
        <div>
            <h1>Cuaca Saat Ini</h1>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Masukkan nama kota"
                />
                <button onClick={fetchWeather}>Cari</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {weather && (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png}alt={weather.weather[0].description`}/>
                        <p>{weather.weather[0].description}</p>
                    </div>
                    <p>Suhu: {weather.main.temp}°C</p>
                    <p>Kelembaban: {weather.main.humidity}%</p>
                    <p>Kecepatan Angin: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

const Header = () => {
    return (
        <div className="mb-8 bg-blue-200 border-2 border-black p-6 rounded-lg">
            <h1 className="text-4xl text-black font-bold mb-2">Informasi Cuaca</h1>
            <p className="text-lg text-black">Memuat informasi cuaca dari berbagai wilayah dalam 3 jam terakhir.</p>
        </div>
    )
}

const LocationSearch = () => {
    return (
        <div className={"mb-8"}>
            <form className={"flex flex-col sm:flex-row gap-4"}>
                <input
                    type="text"
                    placeholder="Masukkan nama kota..."
                    className="w-full h-12 px-4 bg-white border-2 border-black rounded-lg focus:outline-none text-black focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-emerald-100 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
                <button type="submit" className="h-12 px-8 bg-amber-200 rounded-lg hover:bg-amber-300 border-2 border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-amber-400 text-black font-bold">
                    Cari
                </button>
            </form>
        </div>
    )
}

const CurrentWeather = () => {
    return (
        <div className={"bg-blue-200 border-2 border-black rounded-lg p-6 mb-8"}>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="mb-6 md:mb-0">
                    <h2 className={"text-3xl text-black font-bold mb-2"}>
                        Mojokerto, ID
                    </h2>
                    <p className="text-lg text-black">
                        {new Date().toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            weekday: "long",
                            day: "numeric",
                        })}
                    </p>
                    <div className="mt-4 flex items-center">
                        <div className="mr-4">
                            <i className="fas fa-sun text-yellow-500 text-5xl"></i>
                        </div>
                        <div>
                            <p className="text-5xl text-black font-bold">33°C</p>
                            <p className="text-xl text-black capitalize">Cuaca Cerah</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white border-2 border-black p-4 rounded-lg">
                    <div className="text-center">
                        <p className="text-lg text-black">Terasa seperti</p>
                        <p className={"text-3xl text-black font-bold"}>33°C</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const WeatherDetails = () => {
    return (
        <div className={"mb-8"}>
            <h2 className={"text-2xl text-black font-bold mb-4"}>Detail Cuaca</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DetailCard />
                <DetailCard />
            </div>
        </div>
    )
}

const DetailCard = () => {
    return (
        <div className={"bg-white border-2 border-black rounded-lg p-4 transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"}>
            <div className={"flex items-center gap-3 mb-2"}>
                <i className="fas fa-droplet text-black text-2xl"></i>
                <h3 className={"text-black font-bold"}>Kelembapan</h3>
            </div>
            <p className="text-2xl text-black font-bold">70%</p>
        </div>
    )
}

export default Weather;