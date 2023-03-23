import { Button, Divider, Space } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCheck } from 'react-icons/ai';
import { updateDeliveryInfo } from '../../pages/api/services';
import { ClientData } from '../../types/clients';
import { DeliveryData, DeliveryStatusEnums } from '../../types/deliveries';
import { UserData } from '../../types/users';
import Dashboard from '../Dashboard';
import styles from './styles.module.scss';


type Props = {
    deliveryData: DeliveryData;
    clientData: ClientData;
};

const DeliveryMap = ({ deliveryData, clientData }: Props) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const [isDelivered, setIsDelivered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { fromAddress, toAddress } = deliveryData!;

    const processDelivery = async () => {
        // Update delivery status
        setIsLoading(true);
        try {
            const res = await updateDeliveryInfo(deliveryData._id!, { ...deliveryData, status: DeliveryStatusEnums.Delivered });
            if (res.status === 200) {
                // toast.success("Delivery update successful");
                setIsLoading(false);
                setIsDelivered(true);
                // router.push('/dashboard/deliveries');
            };
        } catch (error: any) {
            console.log('error processing delivery', error);
            setIsLoading(false);
            toast.error(error.response.data.message);
        }
    };

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
                    <h2 className={styles.title}>Delivery map</h2>
                    <Divider />
                </div>
                <div>
                    {/* <Space direction='vertical'> */}
                    <div>
                        <label className={styles.label} htmlFor="">From: </label><span>{directions ? directions.routes[0].legs[0].start_address : deliveryData.fromAddress}</span>
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="">To: </label><span>{directions ? directions.routes[0].legs[0].end_address : deliveryData.toAddress}</span>
                    </div>
                    {/* </Space> */}
                </div>
                <div ref={mapRef} style={{ height: "500px" }}></div>
                {directions && (
                    <>
                        <div>
                            <h2 className={styles.directions}>Directions:</h2>
                            <Divider />
                            <p className={styles.route}>Distance: {directions.routes[0].legs[0].distance?.text}</p>
                            <p className={styles.route}>Duration: {directions.routes[0].legs[0].duration?.text}</p>
                            <Divider />
                            <ul>
                                {directions.routes[0].legs[0].steps.map((step, index) => (
                                    <li dangerouslySetInnerHTML={{ __html: step.instructions }} key={index}></li>
                                    // <li key={index}>{step.instructions}</li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            type='primary'
                            onClick={processDelivery}
                            className={styles.completeButton}
                            icon={isDelivered && <AiOutlineCheck />}
                            loading={isLoading}
                        >
                            {!isDelivered ? " Complete Delivery" : " Delivery Completed!"}
                        </Button>
                    </>
                )}

            </Dashboard>
        </div>
    );
};

export default DeliveryMap;