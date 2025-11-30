"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";


export default function Map() {
    const [pos, setPos] = useState<[number, number] | null>(null);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((p) => {
            setPos([p.coords.latitude, p.coords.longitude]);
        });
    }, []);

    return (
        <>
            <MapContainer
                center={pos ?? [34.6937, 135.5023]} // 大阪駅あたり
                zoom={13}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pos && <Marker position={pos} />}
            </MapContainer>
        </>
    )
}
