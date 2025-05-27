import { fetchWeatherApi } from 'openmeteo';

export interface AirQualityData {
    current: {
        time: Date;
        europeanAqi: number | null;
        uvIndex: number | null;
    };
    hourly: {
        time: Date[];
        europeanAqi: number[] | null;
    };
}

export async function getAirQualityData(latitude: number, longitude: number): Promise<AirQualityData> {
    const params = {
        latitude: [latitude],
        longitude: [longitude],
        hourly: ["european_aqi"],
        current: ["european_aqi", "uv_index"]
    };
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Basic error handling: check if response is undefined or null
    if (!response) {
        throw new Error("No response received from Air Quality API");
    }

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const hourly = response.hourly();

    const buildTimeArray = (obj: any) =>
        [...Array((Number(obj.timeEnd()) - Number(obj.time())) / obj.interval())].map(
            (_, i) => new Date((Number(obj.time()) + i * obj.interval() + utcOffsetSeconds) * 1000)
        );

    if (!current) {
        throw new Error("No current data received from Air Quality API");
    }

    return {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            europeanAqi: current.variables(0)?.value() ?? null,
            uvIndex: current.variables(1)?.value() ?? null,
        },
        hourly: {
            time: hourly ? buildTimeArray(hourly) : [],
            europeanAqi:
                hourly &&
                    hourly.variables(0) &&
                    hourly.variables(0)!.valuesArray() !== null
                    ? Array.from(hourly.variables(0)!.valuesArray() as Float32Array)
                    : null,
        },
    };
}