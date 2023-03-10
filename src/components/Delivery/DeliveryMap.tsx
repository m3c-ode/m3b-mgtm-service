import { Divider, Space } from 'antd';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { ClientData } from '../../types/clients';
import { DeliveryData } from '../../types/deliveries';
import { UserData } from '../../types/users';
import Dashboard from '../Dashboard';
import styles from './styles.module.scss';

type Props = {
    deliveryData: DeliveryData;
    clientData: ClientData;
    userData: UserData | string;
};

const DeliveryMap = ({ deliveryData, clientData, userData }: Props) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const { fromAddress, toAddress } = deliveryData!;

    useEffect(() => {
        // Initialize the directions service
        const directionsService = new google.maps.DirectionsService();

        // Create a new map object
        // if (mapRef.current) {
        const map = mapRef.current && new google.maps.Map(mapRef!.current, {
            center: { lat: 49.2827, lng: -123.1207 },
            zoom: 12,
        });
        //     setMap(map);
        // }

        // Create a new directions renderer
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
        });

        // Calculate the directions between the two addresses
        directionsService.route(
            {
                origin: fromAddress as string,
                destination: toAddress as string,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    console.log("🚀 ~ file: DeliveryMap.tsx:51 ~ useEffect ~ result:", result);
                    setDirections(result);
                } else {
                    console.error(`Failed to get directions: ${status}`);
                }
            }
        );

        return () => {
            // Clean up the map and directions renderer
            directionsRenderer.setMap(null);
            setMap(null);
        };
    }, [fromAddress, toAddress]);

    return (
        <div>
            <Dashboard>
                <div>
                    <h2>Delivery map</h2>
                    <Divider />
                </div>
                <div>
                    {/* <Space direction='vertical'> */}
                    <div>
                        <label className={styles.label} htmlFor="">From: </label><span>{deliveryData.fromAddress}</span>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="">To: </label><span>{deliveryData.toAddress}</span>
                    </div>
                    {/* </Space> */}
                </div>
                <div>MAP</div>
                <div ref={mapRef} style={{ height: "500px" }}></div>
                {directions && (
                    <div>
                        <h2>Directions:</h2>
                        <Divider />
                        <p>Distance: {directions.routes[0].legs[0].distance?.text}</p>
                        <p>Duration: {directions.routes[0].legs[0].duration?.text}</p>
                        <Divider />
                        <ul>
                            {directions.routes[0].legs[0].steps.map((step, index) => (
                                <li dangerouslySetInnerHTML={{ __html: step.instructions }} key={index}></li>
                                // <li key={index}>{step.instructions}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Dashboard>
        </div>
    );
};

export default DeliveryMap;