/* eslint-disable react/no-unknown-property */
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Alamat absolut, bukan relatif. Alamat relatif akan dicari dari rute yang
// sedang dibuka, sehingga di /id dan /en model kartu gagal dimuat.
const cardGLB = "/assets/lanyard/card.glb";
const lanyard = "/assets/lanyard/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  // Titik gantung tali. Nilainya harus berada di atas tepi layar (atau sedikit
  // di atasnya) supaya tali tampak menempel di paling atas, bukan mengambang.
  anchorY?: number;
  // Amplitudo ayunan titik gantung dalam satuan dunia. Titik gantungnya bergerak
  // sangat pelan mengelilingi posisi aslinya, jadi talinya selalu tampak hidup
  // walau tidak ada yang menyentuhnya, dan kartunya bisa ditarik kapan saja.
  ayun?: number;
  // Geseran mendatar untuk seluruh rangkaian gantungan (titik gantung, tali, dan
  // kartu) dalam satuan dunia. Dipakai untuk menaruh kartu di sebelah judul,
  // sekaligus menjaga talinya tetap tegak lurus di bawah titik gantung.
  geserX?: number;
}

export default function Lanyard({
  position = [0, 0, 17],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  anchorY = 4,
  geserX = 0,
  ayun = 0.09
}: LanyardProps) {
  return (
    <div className="relative z-[0] w-full h-full flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        // Rotasi nol ditulis apa adanya, bukan tanpa nilai. Tanpa rotasi, kamera
        // otomatis diarahkan memandang titik nol, sehingga kamera yang digeser
        // ke samping justru berputar dan isi layar kembali ke tengah. Dengan
        // rotasi nol kamera memandang lurus ke depan, jadi geseran mendatar
        // benar benar menggeser isi layar.
        camera={{ position, fov, rotation: [0, 0, 0] }}
        dpr={[1, 1.5]}
        style={{ touchAction: "pan-y" }}
        gl={{ alpha: transparent, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band anchorY={anchorY} geserX={geserX} ayun={ayun} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  anchorY: number;
  geserX: number;
  ayun: number;
}

// Panjang tali dan letak awal rangkaian gantungan.
//
// Rantai fisika dibiarkan lahir dalam keadaan sudah menggantung tegak, tepat di
// bawah titik gantungnya. Bentangan mendatar seperti pada contoh aslinya membuat
// kartu tampak masuk dari samping dan sempat melintasi judul sebelum jatuh ke
// tempatnya. Karena kartu bisa ditarik tarik, bentuk awalnya harus sudah benar.
const PANJANG_SIMPUL = 1;
// Jarak dari titik pegang ke titik berat kartu. Kartu digantung dari klip di
// bagian atasnya, jadi jarak ini yang menentukan di mana badannya berada.
const TINGGI_PEGANGAN = 1.45;
// Kemiringan awal yang kecil: kartunya langsung mengayun pelan lalu berhenti,
// tanpa bergeser mendatar sama sekali.
const TILT_AWAL = 0.16;
const KARTU_AWAL: [number, number, number] = [
  0,
  -3 * PANJANG_SIMPUL - TINGGI_PEGANGAN * Math.cos(TILT_AWAL),
  -TINGGI_PEGANGAN * Math.sin(TILT_AWAL)
];

function Band({ maxSpeed = 50, minSpeed = 0, anchorY, geserX, ayun }: BandProps) {
  // Using "any" for refs since the exact types depend on Rapier's internals
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  // Melepas penarikan kartu. Penangkapan penunjuk bisa saja sudah dilepas
  // peramban, misalnya saat sentuhan berubah menjadi guliran halaman, jadi
  // pelepasannya tidak boleh membuat gagal.
  const lepasTarik = useCallback((e?: any) => {
    try {
      e?.target?.releasePointerCapture?.(e?.pointerId);
    } catch {
      // Sudah dilepas peramban, tidak ada yang perlu dikerjakan.
    }
    drag(false);
  }, []);

  // Pelepasan tarikan tidak boleh bergantung pada penunjuk yang masih berada di
  // atas kartu. Saat kartu ditarik cepat lalu dilepas di tempat lain, peristiwa
  // lepas tidak pernah sampai ke kartu, dan karena kartu yang dipegang
  // dipindahkan secara kinematik, kartunya akan menempel pada penunjuk terus
  // tanpa bisa dilepas sampai halaman dimuat ulang. Persis itulah yang membuat
  // kartunya terasa tidak bisa dimainkan.
  //
  // Karena itu, selama kartu dipegang, peristiwa lepas juga didengar langsung
  // dari jendela. Dengan begitu pelepasan tetap tercatat walau penunjuknya sudah
  // jauh dari kartu, walau jendelanya kehilangan fokus, dan walau peramban
  // mengambil alih sentuhan untuk menggulir halaman.
  useEffect(() => {
    if (!dragged) return;

    const lepas = () => lepasTarik();

    window.addEventListener('pointerup', lepas);
    window.addEventListener('pointercancel', lepas);
    window.addEventListener('blur', lepas);

    return () => {
      window.removeEventListener('pointerup', lepas);
      window.removeEventListener('pointercancel', lepas);
      window.removeEventListener('blur', lepas);
    };
  }, [dragged, lepasTarik]);

  useFrame((state, delta) => {
    // Titik gantungnya bergerak sangat pelan, dan karena kartunya tergantung pada
    // tali, seluruh rangkaian ikut berayun seperti ada yang menyentuhnya. Ini yang
    // membuat talinya tetap terlihat hidup tanpa perlu menambah tenaga pada
    // kartunya, sehingga kartunya tetap ringan ditarik ke arah mana pun.
    if (fixed.current) {
      const waktu = state.clock.elapsedTime;
      fixed.current.setNextKinematicTranslation({
        x: geserX + Math.sin(waktu * 0.55) * ayun,
        y: anchorY,
        z: Math.cos(waktu * 0.37) * ayun * 0.7
      });
    }
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        const posisi = ref.current.translation();
        // Titik ayun dipakai ulang di setiap frame, dan sekali terkena nilai
        // tidak sah ia akan menyebar ke seluruh tali. Karena itu nilainya
        // diperiksa dulu: bila tidak sah, titik ayun diambil ulang dari posisi
        // yang sebenarnya. Tanpa ini satu frame yang gagal membuat tali hilang
        // selamanya, sehingga kartunya tampak menggantung tanpa tali.
        if (!ref.current.lerped || !Number.isFinite(ref.current.lerped.x) || !Number.isFinite(posisi.x)) {
          ref.current.lerped = new THREE.Vector3().copy(posisi);
        }
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      // Bentuk tali baru dikirim ke layar setelah dipastikan semua titiknya
      // sah. Bila ada satu saja yang tidak, gambar tali sebelumnya dibiarkan
      // utuh, jadi talinya tidak pernah berubah menjadi rangkaian tak terlihat.
      const titikTali = curve.getPoints(32);
      const taliSah = titikTali.every(
        p => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)
      );
      if (taliSah) band.current.geometry.setPoints(titikTali);
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[geserX, anchorY, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={'kinematicPosition' as RigidBodyProps['type']}
        />
        <RigidBody
          position={[0, -PANJANG_SIMPUL, 0]}
          ref={j1}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -PANJANG_SIMPUL * 2, 0]}
          ref={j2}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -PANJANG_SIMPUL * 3, 0]}
          ref={j3}
          {...segmentProps}
          type={'dynamic' as RigidBodyProps['type']}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={KARTU_AWAL}
          rotation={[TILT_AWAL, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={lepasTarik}
            onPointerCancel={lepasTarik}
            onPointerDown={(e: any) => {
              // Kartu bisa ditarik dengan tetikus maupun dengan jari. Di layar
              // sentuh, kanvas memakai `touch-action: pan-y`, jadi usapan tegak
              // tetap menggulir halaman, sedangkan usapan mendatar di atas
              // kartu menariknya. Bila peramban mengambil alih sentuhannya untuk
              // menggulir, penarikan dilepas lewat onPointerCancel supaya kartu
              // tidak tertinggal menempel pada jari.
              if (!card.current) return;
              try {
                e.target.setPointerCapture?.(e.pointerId);
              } catch {
                // Ada peramban yang menolak menangkap penunjuk yang belum dikenalnya.
                // Kartunya tetap bisa ditarik selama penunjuknya masih di atasnya.
              }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            {/* Bidang tak terlihat yang memperluas area pegang kartu. Bidang ini
                tidak menulis warna maupun kedalaman, jadi tidak terlihat sama
                sekali, tetapi tetap bisa dikenai sorotan penunjuk. Gunanya supaya
                orang yang menyentuh beberapa puluh piksel di luar tepi kartu,
                misalnya pada klip di atasnya, tetap bisa menarik kartunya.
                Bidang ini diletakkan pada rangkaian yang sama dengan kartunya,
                jadi besar dan letaknya ikut mengikuti kartu di semua ukuran
                layar. */}
            <mesh position={[0, 1.2, 0.08]}>
              <planeGeometry args={[0.95, 1.45]} />
              <meshBasicMaterial colorWrite={false} depthWrite={false} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
