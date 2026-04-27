'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useTranslation } from "react-i18next";

// Dynamic import to avoid SSR issues with react-globe.gl
const Globe = dynamic(() => import('react-globe.gl').then((mod) => mod.default), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
    ),
});

export default function Model() {
    const { t } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
    const [countries, setCountries] = useState({ features: [] });

    // Golden glowing city-light points on major financial hubs
    const pointsData = useMemo(() => [
        { lat: 40.7, lng: -74.0, size: 0.6, color: '#fbbf24' },
        { lat: 34.05, lng: -118.24, size: 0.5, color: '#f59e0b' },
        { lat: 41.88, lng: -87.63, size: 0.4, color: '#fbbf24' },
        { lat: 51.51, lng: -0.13, size: 0.55, color: '#fbbf24' },
        { lat: 48.86, lng: 2.35, size: 0.45, color: '#f59e0b' },
        { lat: 35.68, lng: 139.69, size: 0.5, color: '#fbbf24' },
        { lat: 22.32, lng: 114.17, size: 0.55, color: '#f59e0b' },
        { lat: 1.35, lng: 103.82, size: 0.45, color: '#fbbf24' },
        { lat: -23.55, lng: -46.63, size: 0.5, color: '#f59e0b' },
        { lat: 19.43, lng: -99.13, size: 0.4, color: '#fbbf24' },
        { lat: 25.2, lng: 55.27, size: 0.5, color: '#f59e0b' },
        { lat: 28.61, lng: 77.21, size: 0.45, color: '#fbbf24' },
        { lat: 39.9, lng: 116.4, size: 0.5, color: '#f59e0b' },
        { lat: 31.23, lng: 121.47, size: 0.55, color: '#fbbf24' },
        { lat: -33.87, lng: 151.21, size: 0.4, color: '#f59e0b' },
        { lat: 55.75, lng: 37.62, size: 0.45, color: '#fbbf24' },
        { lat: 37.57, lng: 126.98, size: 0.4, color: '#f59e0b' },
        { lat: 43.65, lng: -79.38, size: 0.35, color: '#fbbf24' },
    ], []);

    // Golden arcs connecting financial centers
    const arcsData = useMemo(() => [
        { startLat: 40.7, startLng: -74.0, endLat: 51.51, endLng: -0.13, color: ['#fbbf2488', '#f59e0b44'] },
        { startLat: 51.51, startLng: -0.13, endLat: 35.68, endLng: 139.69, color: ['#f59e0b88', '#fbbf2444'] },
        { startLat: 35.68, startLng: 139.69, endLat: 22.32, endLng: 114.17, color: ['#fbbf2488', '#d9770644'] },
        { startLat: 22.32, startLng: 114.17, endLat: 1.35, endLng: 103.82, color: ['#f59e0b88', '#fbbf2444'] },
        { startLat: 40.7, startLng: -74.0, endLat: -23.55, endLng: -46.63, color: ['#fbbf2488', '#f59e0b44'] },
        { startLat: 25.2, startLng: 55.27, endLat: 28.61, endLng: 77.21, color: ['#d9770688', '#fbbf2444'] },
        { startLat: 34.05, startLng: -118.24, endLat: 35.68, endLng: 139.69, color: ['#fbbf2488', '#f59e0b44'] },
        { startLat: 48.86, startLng: 2.35, endLat: 25.2, endLng: 55.27, color: ['#f59e0b88', '#d9770644'] },
    ], []);

    // Stable random spike data (computed once)
    const spikeData = useMemo(() =>
        [...Array(50)].map(() => ({
            lat: (Math.random() - 0.5) * 140,
            lng: (Math.random() - 0.5) * 360,
            alt: Math.random() * 0.3 + 0.08,
        })), []
    );

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (globeRef.current) {
                const globe = globeRef.current;
                globe.controls().autoRotate = true;
                globe.controls().autoRotateSpeed = 0.4;
                globe.controls().enableZoom = false;

                // Add warm golden ambient + directional lights to the scene
                const scene = globe.scene();
                if (scene && !scene.userData.lightsAdded) {
                    // Remove default lights
                    scene.children
                        .filter((c): c is THREE.Light => (c as THREE.Light).isLight)
                        .forEach((l) => scene.remove(l));

                    // Warm golden ambient
                    const ambient = new THREE.AmbientLight('#fbbf24', 0.3);
                    scene.add(ambient);

                    // Key light - warm gold from top-right
                    const keyLight = new THREE.DirectionalLight('#ffb347', 1.2);
                    keyLight.position.set(200, 150, 100);
                    scene.add(keyLight);

                    // Fill light - softer amber from left
                    const fillLight = new THREE.DirectionalLight('#f59e0b', 0.4);
                    fillLight.position.set(-150, 50, 100);
                    scene.add(fillLight);

                    // Rim light - bright gold from behind
                    const rimLight = new THREE.DirectionalLight('#fcd34d', 0.6);
                    rimLight.position.set(0, 0, -200);
                    scene.add(rimLight);

                    scene.userData.lightsAdded = true;
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[80vh] md:h-[900px] lg:h-screen overflow-hidden flex items-center justify-center bg-[#050208]">
            {/* Deep warm dark background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 60% 50%, rgba(30, 15, 0, 0.6) 0%, rgba(5, 2, 8, 1) 70%)'
            }} />

            {/* Subtle golden ambient glow behind the globe */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at 55% 45%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)'
            }} />

            {/* The 3D Globe */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[5%]">
                <Globe
                    ref={globeRef}
                    backgroundColor="rgba(0,0,0,0)"

                    // Warm golden atmosphere halo
                    atmosphereColor="#f59e0b"
                    atmosphereAltitude={0.18}
                    showAtmosphere={true}

                    // Real earth night texture as the base
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

                    // Golden hex polygons overlaying landmasses
                    hexPolygonsData={countries.features}
                    hexPolygonResolution={3}
                    hexPolygonMargin={0.4}
                    hexPolygonColor={() => {
                        const colors = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#fcd34d'];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }}
                    hexPolygonAltitude={0.012}

                    // Golden glowing points on cities
                    pointsData={pointsData}
                    pointAltitude={0.01}
                    pointColor="color"
                    pointRadius="size"
                    pointResolution={12}

                    // Golden connection arcs
                    arcsData={arcsData}
                    arcColor="color"
                    arcDashLength={0.4}
                    arcDashGap={0.2}
                    arcDashAnimateTime={3000}
                    arcStroke={0.3}

                    // Solid dark globe core with warm emissive
                    globeMaterial={
                        new THREE.MeshStandardMaterial({
                            color: '#0a0500',
                            emissive: '#1a0a00',
                            emissiveIntensity: 0.4,
                            roughness: 0.3,
                            metalness: 0.7,
                            transparent: false,
                        })
                    }

                    // Golden rays shooting from the surface
                    customLayerData={spikeData}
                    customThreeObject={(d: { lat: number, lng: number, alt: number }) => {
                        const h = d.alt * 80;
                        const geometry = new THREE.CylinderGeometry(0.08, 0.4, h, 4);
                        geometry.translate(0, h / 2, 0);
                        const material = new THREE.MeshBasicMaterial({
                            color: new THREE.Color('#fbbf24'),
                            transparent: true,
                            opacity: 0.5,
                        });
                        return new THREE.Mesh(geometry, material);
                    }}
                    customThreeObjectUpdate={(obj: THREE.Object3D, d: { lat: number, lng: number, alt: number }) => {
                        if (globeRef.current) {
                            const coords = globeRef.current.getCoords(d.lat, d.lng, 0);
                            if (coords) {
                                Object.assign(obj.position, coords);
                                obj.lookAt(new THREE.Vector3(0, 0, 0));
                                obj.rotateX(Math.PI / 2);
                            }
                        }
                    }}

                    width={dimensions.width}
                    height={dimensions.height}
                />
            </div>

            {/* Foreground UI Overlay */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute left-[5%] lg:left-[8%] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8 max-w-xl pointer-events-auto"
            >
                <div className="space-y-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-[2px] mb-6"
                        style={{ background: 'linear-gradient(to right, #fbbf24, transparent)' }}
                    />
                    <h1 className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] leading-[1.05] text-white">
                        {t("globe.heading1")}<br />
                        <span className="text-amber-300">{t("globe.heading2")}</span>
                    </h1>
                </div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start group relative flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-md overflow-hidden"
                    style={{
                        background: 'rgba(30, 15, 0, 0.7)',
                        border: '1px solid rgba(251, 191, 36, 0.25)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative text-lg font-medium text-amber-100">{t("globe.contactBtn")}</span>
                    <span className="relative text-xl text-amber-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">&#8593;</span>
                </motion.button>
            </motion.div>

            {/* Golden floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => {
                    const top = `${(i * 37 + 13) % 100}%`;
                    const left = `${(i * 53 + 7) % 100}%`;
                    const size = ((i * 7 + 3) % 4) + 1;
                    const opacity = ((i * 11 + 5) % 7) / 10 + 0.2;
                    const delay = (i * 0.3) % 4;
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                top,
                                left,
                                width: `${size}px`,
                                height: `${size}px`,
                                backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#fcd34d',
                                boxShadow: `0 0 ${size * 3}px ${size}px rgba(251, 191, 36, 0.4)`,
                            }}
                            animate={{
                                opacity: [opacity * 0.3, opacity, opacity * 0.3],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 3 + (i % 3),
                                repeat: Infinity,
                                delay,
                                ease: 'easeInOut',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}