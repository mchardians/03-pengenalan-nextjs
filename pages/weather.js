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
        <div className={"min-h-screen bg-[#f5f5f5] py-12 px-4"}>
            <div className="max-w-3xl mx-auto">
                <h1 className={"text-5xl font-black text-black mb-16 text-center underline decoration-wavy underline-offset-8"} style={{ textDecorationColor: "#000" }}>Cuaca Saat Ini</h1>
                <div className="mb-10 border-4 border-black p-6 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Masukkan nama kota"
                            className="flex-1 border-4 border-black text-black p-3 bg-white text-lg font-bold focus:outline-none"
                        />
                        <button
                            onClick={fetchWeather}
                            className="bg-black text-white font-bold text-lg py-3 px-8 border-4 border-black hover:bg-white hover:text-black transition-colors duration-200"
                        >
                            Cari
                        </button>
                    </div>
                </div>
                {loading && (
                    <div className="border-4 border-black p-6 bg-[#ffde59] text-center font-bold text-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-8 w-8 mr-3 border-t-4 border-black rounded-full" viewBox="0 0 24 24"></svg>
                            Loading...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="border-4 border-black p-6 bg-[#ff9f9f] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black mb-2">Error</h2>
                        <p className="font-bold border-l-4 border-black pl-3">{error}</p>
                    </div>
                )}

                {weather && !loading && (
                    <div
                        className={`border-4 border-black  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}
                    >
                        <div className="bg-yellow-400 text-white p-4">
                            <h2 className="text-3xl font-black">
                                {weather.name}, {weather.sys.country}
                            </h2>
                        </div>

                        {/* Weather Content */}
                        <div className="p-6">
                            {/* Weather Icon and Description */}
                            <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
                                <div className="bg-white border-4 border-black p-2 w-24 h-24 flex items-center justify-center">
                                    <img
                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                        className="w-20 h-20 "
                                    />
                                </div>
                                <p className="text-2xl font-black text-black capitalize">{weather.weather[0].description}</p>
                            </div>

                            {/* Weather Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="border-4 border-black p-4 bg-white">
                                    <p className="text-lg text-black font-black">Suhu</p>
                                    <p className="text-3xl text-black font-black">{Math.round(weather.main.temp)}°C</p>
                                </div>

                                <div className="border-4 border-black p-4 bg-white">
                                    <p className="text-lg text-black font-black">Kelembaban</p>
                                    <p className="text-3xl text-black font-black">{weather.main.humidity}%</p>
                                </div>

                                <div className="border-4 border-black p-4 bg-white">
                                    <p className="text-lg text-black font-black">Kecepatan Angin</p>
                                    <p className="text-3xl text-black font-black">{weather.wind.speed} m/s</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border-4 border-black p-4 bg-white">
                                    <p className="text-lg text-black font-black">Terasa Seperti</p>
                                    <p className="text-2xl text-black font-black">{Math.round(weather.main.feels_like)}°C</p>
                                </div>

                                <div className="border-4 border-black p-4 bg-white">
                                    <p className="text-lg text-black font-black">Tekanan</p>
                                    <p className="text-2xl text-black font-black">{weather.main.pressure} hPa</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-black text-white p-4 text-center">
                            <p className="font-bold">Diperbarui pada: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;