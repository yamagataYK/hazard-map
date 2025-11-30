"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/lib/supabaseClient";


type LatLng = [number, number];

type HazardRow = {
    id: string;
    disaster_type: string;
    damage_level: string;
    polygon: {
        type: string;
        coordinates: any;
    };
};


export default function Map() {
    const [pos, setPos] = useState<LatLng | null>(null);

    const [areas, setAreas] = useState<HazardRow[]>([]);

    const myIcon = L.icon({
        iconUrl: "/my-location.png",
        iconSize: [30, 30],
        iconAnchor: [20, 40],

    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((p) => {
            setPos([p.coords.latitude, p.coords.longitude]);
        });
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            const { data, error } = await supabase
                .from("hazard_areas")
                .select("*");

            if (error) {
                console.error("Supabase error:", error);
                return;
            }

            console.log("hazard_areas from Supabase:", data);
            if (!data) return;

            setAreas(data as HazardRow[]);
        };

        fetchAreas();
    }, []);

    const center: LatLng = pos ?? [34.6937, 135.5023];

    const getColor = (level: string) => {
        if (level === "high") return "red";
        if (level === "medium") return "orange";
        return "yellow";
    };

    return (
        <>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pos && <Marker position={pos} icon={myIcon} />}



                {areas.map((z) => {
                    const coords = z.polygon.coordinates;

                    let ring: number[][];

                    if (Array.isArray(coords[0][0])) {
                        ring = coords[0] as number[][];
                    } else {
                        ring = coords as number[][];
                    }
                    const positions: LatLng[] = ring.map(
                        ([lng, lat]) => [lat, lng] as LatLng
                    );
                    return (
                        <Polygon
                            key={z.id}
                            positions={positions}
                            pathOptions={{
                                color: getColor(z.damage_level),
                                fillColor: getColor(z.damage_level),
                                fillOpacity: 0.4,
                            }}
                        />
                    );
                })}
            </MapContainer>
        </>
    )
}
