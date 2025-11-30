"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";


export default function Map() {
    const [pos, setPos] = useState<[number, number] | null>(null);

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

    return (
        <>
            <MapContainer
                center={pos ?? [34.6937, 135.5023]} // 大阪駅
                zoom={13}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pos && <Marker position={pos} icon={myIcon} />}
            </MapContainer>
        </>
    )
}
