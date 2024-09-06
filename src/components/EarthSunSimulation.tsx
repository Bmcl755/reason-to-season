import React, {useContext, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {AppContext} from "../contexts/AppContextProvider.tsx";
import {calculateSeason} from "../utils/calculateSeason.ts";
import {create} from "@mui/material/styles/createTransitions";

interface EarthSunSimulationProps {
    earthAxialTilt: number,
    redLineTarget?: number,
    isLanding?: boolean
}

const EarthSunSimulation: React.FC<EarthSunSimulationProps> = ({ earthAxialTilt, redLineTarget, isLanding }) => {
    const {
        currentSeason,
        earthPosition,
        setEarthPosition,
        setCurrentSeason,
        essences,
        isFoundationCompleted,
    } = useContext(AppContext);

    const mountRef = useRef<HTMLDivElement>(null);
    const earthRef = useRef<THREE.Mesh | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null);
    const orbitRef = useRef<THREE.Group>()

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, earth: THREE.Mesh, mercury: THREE.Mesh, venus: THREE.Mesh, sun: THREE.Mesh, renderer: THREE.WebGLRenderer, sunLight: THREE.PointLight;
    let loaded = false;
    let isDragging = false;
    let raycaster: THREE.Raycaster, mouse: THREE.Vector2, orbitPlane: THREE.Mesh;
    let animationId: number;
    let circleGroup: THREE.Group;

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
        loaded = true;
    };

    const init = () => {
        scene = new THREE.Scene();
        sceneRef.current = scene;

        // Set the camera aspect ratio based on the container's dimensions
        if (mountRef.current) {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        }

        renderer = new THREE.WebGLRenderer({ antialias: true });

        // Adjust renderer size to match the container
        if (mountRef.current) {
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            mountRef.current.appendChild(renderer.domElement);
        }

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000);

        {
            const geometry = new THREE.SphereGeometry(100, 32, 32);
            const starsTexture = new THREE.TextureLoader(loadingManager).load('textures/2k_stars.jpg');
            const material = new THREE.MeshBasicMaterial({
                side: THREE.BackSide,
                map: starsTexture,
            });
            const universe = new THREE.Mesh(geometry, material);
            scene.add(universe);
        }

        if (isLanding) {
            const mercuryTexture = new THREE.TextureLoader(loadingManager).load('textures/mercury.jpg')
            mercury = createSphere(0.3, 2, 0, mercuryTexture)
            mercury.position.set(-1.41, 0, 1.41)
            scene.add(mercury)

            const venusTexture = new THREE.TextureLoader(loadingManager).load('textures/venus.jpg')
            venus = createSphere(0.75/3, 3, 0, venusTexture)
            venus.position.set(3, 0, -1)
            scene.add(venus)
        }

        const earthRadius = isLanding ? 0.75/3 : 0.75

        const earthTexture = new THREE.TextureLoader(loadingManager).load('textures/2k_earth_daymap.jpg');
        earth = createSphere(earthRadius, 5, 3, earthTexture);
        earthRef.current = earth
        scene.add(earth);

        // Create the tilt axis line
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, -earthRadius*1.2, 0),
            new THREE.Vector3(0, earthRadius*1.2, 0),
        ]);

        const tiltAxisLine = new THREE.Line(lineGeometry, lineMaterial);
        earth.add(tiltAxisLine);

        const sunTexture = new THREE.TextureLoader(loadingManager).load('textures/2k_sun.jpg');
        sun = createSphere(isLanding ? 1.5/2 : 1.5, 0, 0, sunTexture);
        scene.add(sun);
        sun.rotation.z = THREE.MathUtils.degToRad(7.25);

        if (!isLanding) {
            camera.position.set(6, 4, 5);
        } else {
            camera.position.set(6, 4, 5)
        }

        camera.lookAt(new THREE.Vector3(0, 0, 0)); // Camera looks at the center

        sunLight = new THREE.PointLight(0xffffff, 4);
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight();
        scene.add(ambientLight);

        window.addEventListener('resize', onWindowResize);

        // Add raycaster and mouse
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        // Create an invisible plane at the Earth's orbit for dragging
        orbitPlane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(50, 50),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        orbitPlane.rotateX(-Math.PI / 2); // Make it horizontal
        scene.add(orbitPlane);

        // Event listeners for dragging
        if (mountRef.current) {
            mountRef.current.addEventListener('mousedown', onMouseDown);
            mountRef.current.addEventListener('mousemove', onMouseMove);
            mountRef.current.addEventListener('mouseup', onMouseUp);
        }

        const animate = () => {
            drawScene();
            animationId = requestAnimationFrame(animate);
        };

        animate();
    };

    const createSphere = (radius: number, x: number, y: number, texture: THREE.Texture) => {
        const geometry = new THREE.SphereGeometry(radius, 100, 100);
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            emissive: 0xffffdd,
            emissiveIntensity: 0,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x;
        mesh.position.y = y;
        return mesh;
    };

    function createCircle(radius: number, startAngle: number, endAngle?: number): THREE.Group {
        const circleGroup = new THREE.Group();

        const circleResolution = 100; // Number of points to represent the circle
        const angleStep = (2 * Math.PI) / circleResolution;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        // Normalize angles to [0, 2π]
        startAngle = startAngle % (2 * Math.PI);
        if (startAngle < 0) startAngle += 2 * Math.PI;

        if (endAngle !== undefined) {
            endAngle = endAngle % (2 * Math.PI);
            if (endAngle < 0) endAngle += 2 * Math.PI;
        }

        // Determine the clockwise path from startAngle to endAngle
        const isWrapped = endAngle !== undefined && endAngle < startAngle;

        for (let i = 0; i <= circleResolution; i++) {
            const angle = i * angleStep;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            vertices.push(x, 0, z);

            let color = new THREE.Color(0xffffff); // Default to white

            if (endAngle !== undefined) {
                if (isWrapped) {
                    if (angle >= startAngle || angle <= endAngle) {
                        color = new THREE.Color(0xff0000); // Red segment
                    }
                } else {
                    if (angle >= startAngle && angle <= endAngle) {
                        color = new THREE.Color(0xff0000); // Red segment
                    }
                }
            }

            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.LineBasicMaterial({ vertexColors: true });
        const line = new THREE.Line(geometry, material);
        circleGroup.add(line);

        return circleGroup;
    }

    const drawScene = () => {
        if (!loaded) return;

        const earthRotationPerFrame = 0.01;
        const sunRotationPerFrame = 0.001;

        earth.rotateY(earthRotationPerFrame)
        sun.rotateY(sunRotationPerFrame)

        if (mercury && venus) {
            mercury.rotateY(earthRotationPerFrame)
            venus.rotateY(earthRotationPerFrame)
        }

        renderer.render(scene, camera);
    };

    const onWindowResize = () => {
        if (mountRef.current) {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    };

    const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        if (!mountRef.current) return;

        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(earth);
        if (intersects.length > 0) {
            isDragging = true;
        }
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        event.preventDefault();
        if (!mountRef.current) return;

        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(orbitPlane);
        if (intersects.length > 0) {
            const intersectPoint = intersects[0].point;
            const angle = Math.atan2(intersectPoint.z, intersectPoint.x);
            setEarthPosition(THREE.MathUtils.radToDeg(angle > 0 ? angle : angle + 2*Math.PI))
        }
    };

    const onMouseUp = (event: MouseEvent) => {
        isDragging = false;
    };

    useEffect(() => {
        init();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeEventListener('mousedown', onMouseDown);
                mountRef.current.removeEventListener('mousemove', onMouseMove);
                mountRef.current.removeEventListener('mouseup', onMouseUp);
                mountRef.current.removeChild(renderer.domElement);
            }

            window.removeEventListener('resize', onWindowResize);

            cancelAnimationFrame(animationId);

            renderer.dispose();
            scene.clear();
        };
    }, []);

    function getTiltAngle(quaternion: THREE.Quaternion) {
        // this sucks but idk how else to make it work
        const euler = new THREE.Euler().setFromQuaternion(quaternion, 'ZYX');

        if (Math.abs(euler.z) < 0.00001) {
            return 0
        }

        if (euler.z < 0) {
            return euler.z + Math.PI
        }

        if (euler.z > 3.14159) {
            return 0
        }

        return euler.z;
    }

    useEffect(() => {
        if (earthRef.current) {
            // Get the current tilt angle
            const currentTilt = getTiltAngle(earthRef.current.quaternion);

            // Calculate the desired tilt angle in radians
            const desiredTilt = THREE.MathUtils.degToRad(earthAxialTilt);

            // Calculate the difference between the current and desired tilt
            let tiltDifference = desiredTilt - currentTilt;

            earthRef.current.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), tiltDifference);
        }
    }, [earthAxialTilt]);

    useEffect(() => {
        if (earthRef.current) {
            const distance = Math.sqrt(earthRef.current.position.x ** 2 + earthRef.current.position.z ** 2);
            const angle = THREE.MathUtils.degToRad(earthPosition)
            earthRef.current.position.set(distance * Math.cos(angle), 0, distance * Math.sin(angle));
        }
        const season = calculateSeason(earthPosition);
        setCurrentSeason(season);

        if (sceneRef.current) {
            const earthPositionRad = THREE.MathUtils.degToRad(earthPosition)
            const redLineTargetRad = redLineTarget ? THREE.MathUtils.degToRad(redLineTarget) : undefined
            if (orbitRef.current) {
                sceneRef.current.remove(orbitRef.current)
                orbitRef.current = undefined
            }
            orbitRef.current = createCircle(5, earthPositionRad, redLineTargetRad)
            sceneRef.current.add(orbitRef.current)
        }
    }, [earthPosition, redLineTarget]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default EarthSunSimulation;
