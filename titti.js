
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


function createBackgroundShapes() {
    const shapes = [];
    const geometries = [
        new THREE.TorusGeometry(3, 1, 16, 100),
        new THREE.IcosahedronGeometry(2),
        new THREE.OctahedronGeometry(2)
    ];

    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.6
        });

        const shape = new THREE.Mesh(geometry, material);
        shape.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );
        
        shapes.push({
            mesh: shape,
            rotation: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        });
        
        scene.add(shape);
    }
    return shapes;
}

const shapes = createBackgroundShapes();
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));


function animate() {
    requestAnimationFrame(animate);

    shapes.forEach(shape => {
        shape.mesh.rotation.x += shape.rotation.x;
        shape.mesh.rotation.y += shape.rotation.y;
        shape.mesh.rotation.z += shape.rotation.z;
    });

    renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


document.addEventListener('DOMContentLoaded', () => {
    try {
        gsap.registerPlugin(ScrollTrigger);

        
        ScrollTrigger.batch('.reveal-on-lava', {
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8
            }),
            start: 'top 85%'
        });

    } catch (error) {
        console.error('GSAP initialization error:', error);
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 
