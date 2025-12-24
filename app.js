document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Menggerakkan orb cahaya mengikuti mouse
    const orb = document.getElementById('orb-1');
    if(orb) {
        const speed = 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    }
});

window.addEventListener('scroll', function() {
    const scrollValue = window.scrollY;

    // 1. Parallax untuk Hero Section
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const systemTags = document.querySelector('.system-status-tags');
    
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollValue * 0.4}px)`;
        heroTitle.style.opacity = 1 - (scrollValue / 700);
    }
    if (heroSubtitle) {
        heroSubtitle.style.transform = `translateY(${scrollValue * 0.2}px)`;
    }
    if (systemTags) {
        systemTags.style.transform = `translateY(${scrollValue * -0.1}px)`;
    }

    // 2. Parallax untuk About Section
    const aboutSection = document.querySelector('.about-section');
    const profileImg = document.querySelector('.profile-img-container');
    if (aboutSection) {
        // Gerakan naik sedikit lebih lambat dari scroll (efek mengambang)
        let speed = 0.05;
        let offset = (scrollValue - aboutSection.offsetTop) * speed;
        aboutSection.style.transform = `translateY(${offset}px)`;
    }
    if (profileImg) {
        profileImg.style.transform = `translateY(${(scrollValue - aboutSection.offsetTop) * 0.1}px) rotate(${scrollValue * 0.02}deg)`;
    }

    // 3. Parallax untuk Terminal Section
    const terminalFrame = document.querySelector('.terminal-main-frame');
    if (terminalFrame) {
        let speed = 0.08;
        let offset = (scrollValue - terminalFrame.offsetTop) * speed;
        terminalFrame.style.transform = `translateY(${offset}px)`;
    }

    // 4. Parallax untuk Analytics/Chart Section
    const chartSection = document.querySelector('.analytics-section');
    if (chartSection) {
        let speed = -0.05; // Bergerak berlawanan arah untuk variasi
        let offset = (scrollValue - chartSection.offsetTop) * speed;
        chartSection.style.transform = `translateY(${offset}px)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Terminal Utama (Infinite Log)
    startInfiniteTerminal();

    // 2. Inisialisasi Alert System (Pesan Merah Mengerikan)
    startWarningTerminal();

    // 3. Inisialisasi Statistik (Hex Stream & Jam)
    startAdvancedStats();
});

// --- FUNGSI TERMINAL UTAMA (Tengah) ---
function startInfiniteTerminal() {
  
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    // Di dalam fungsi startInfiniteTerminal atau startWarningTerminal
function updateTerminal(container, newLine) {
    container.appendChild(newLine);
    
    // Pastikan container tidak membengkak tinggi layarnya
    if (container.children.length > 15) {
        container.removeChild(container.children[0]);
    }

    // Paksa scroll tetap di bawah di dalam container saja, 
    // bukan menaikkan window browser
    container.scrollTop = container.scrollHeight;
}

    const commands = [
        "FETCHING_NODE_DATA...",
        "HANDSHAKE_ESTABLISHED",
        "ENCRYPTING_HEX_0x" + Math.random().toString(16).slice(2, 10),
        "RELAYING_THROUGH_PROXY_88.1.0",
        "DECRYPTING_HASH_" + Math.random().toString(36).substring(7).toUpperCase(),
        "NETWORK_LINK_ACTIVE",
        "EXECUTING_VOID_SCRIPT..."
    ];

    setInterval(() => {
        const line = document.createElement('div');
        line.style.color = "#888";
        line.style.marginBottom = "4px";
        const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
        
        line.innerHTML = `<span style="color:#fff">[${timestamp}]</span> >> ${commands[Math.floor(Math.random() * commands.length)]}`;
        
        terminalOutput.appendChild(line);
        if (terminalOutput.children.length > 12) {
            terminalOutput.removeChild(terminalOutput.children[0]);
        }
    }, 100);
}

// --- FUNGSI ALERT SYSTEM (Kanan - Teks Merah) ---
function startWarningTerminal() {
    const warnOutput = document.getElementById('warning-log');
    if (!warnOutput) return;

    const warnings = [
        "[CRITICAL] ROOT_ACCESS_GRANTED",
        "[ALERT] FIREWALL_DISSOLVED",
        "[!] ENCRYPTION_NULLIFIED",
        "[!] DATABASE_EXFILTRATION_100%",
        "[!] SYSTEM_OWNERSHIP_LOST",
        "[FATAL] KERNEL_PANIC_INITIATED",
        "[!] TOTAL_PRIVACY_COMPROMISED"
    ];

    setInterval(() => {
        const line = document.createElement('div');
        const randomWarn = warnings[Math.floor(Math.random() * warnings.length)];
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        
        line.innerHTML = `<span style="opacity: 0.5;">[${time}]</span> ${randomWarn}`;
        warnOutput.appendChild(line);

        if (warnOutput.children.length > 8) {
            warnOutput.removeChild(warnOutput.children[0]);
        }
    }, 200);
}

// --- FUNGSI STATISTIK (Kiri) ---
function startAdvancedStats() {
    const hexContainer = document.getElementById('hex-stream');
    const clockContainer = document.getElementById('system-clock');

    if (clockContainer) {
        setInterval(() => {
            clockContainer.innerText = new Date().toLocaleTimeString('en-GB');
        }, 1000);
    }

    if (hexContainer) {
        setInterval(() => {
            const hex = Math.random().toString(16).toUpperCase().slice(2, 10);
            const line = document.createElement('div');
            line.innerText = `0x${hex}`;
            hexContainer.appendChild(line);
            if (hexContainer.children.length > 10) hexContainer.removeChild(hexContainer.children[0]);
        }, 500);
    }
}

function initCandleChart() {
    const ctx = document.getElementById('candleChart').getContext('2d');
    
    let lastClose = 50;
    // Membuat 150 data awal agar langsung padat saat halaman terbuka
    let candleCount = 150; 
    let initialData = Array.from({ length: candleCount }, () => generateCandle());

    function generateCandle() {
        const open = lastClose;
        const close = open + (Math.random() - 0.5) * 8;
        const high = Math.max(open, close) + Math.random() * 3;
        const low = Math.min(open, close) - Math.random() * 3;
        lastClose = close;
        return { o: open, h: high, l: low, c: close };
    }

    const candleChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array(candleCount).fill(''),
            datasets: [
                {
                    label: 'Wick',
                    data: initialData.map(d => [d.l, d.h]),
                    backgroundColor: '#ffffff',
                    barThickness: 1, // Garis sumbu sangat tipis
                },
                {
                    label: 'Body',
                    data: initialData.map(d => [d.o, d.c]),
                    backgroundColor: (ctx) => {
                        const raw = ctx.dataset.data[ctx.dataIndex];
                        if (!raw) return '#fff';
                        // Hollow Candle Logic: Putih solid jika naik, Transparan jika turun
                        return raw[1] >= raw[0] ? '#ffffff' : 'rgba(0,0,0,0)'; 
                    },
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    barThickness: 4, // Lilin dibuat lebih ramping agar muat banyak (seperti MT5)
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { 
                    display: false, 
                    stacked: true,
                    grid: { display: false }
                },
                y: {
                    stacked: false,
                    position: 'right', // Angka di sebelah kanan seperti MT5
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#666', font: { size: 8 } }
                }
            },
            animation: { duration: 0 }
        }
    });

    // Update terus-menerus setiap 800ms
    setInterval(() => {
        const next = generateCandle();
        
        candleChart.data.datasets[0].data.push([next.l, next.h]);
        candleChart.data.datasets[0].data.shift();
        
        candleChart.data.datasets[1].data.push([next.o, next.c]);
        candleChart.data.datasets[1].data.shift();
        
        candleChart.update();

        // Update footer stats
        document.getElementById('open-val').innerText = next.o.toFixed(2);
        document.getElementById('high-val').innerText = next.h.toFixed(2);
        document.getElementById('vol-val').innerText = (Math.random() * 5000).toFixed(0);
    }, 800);
}



document.addEventListener('DOMContentLoaded', () => {
    initCandleChart(); // Jalankan candle chart
});

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 2000); // Pastikan tidak ada fungsi pengetikan teks di sini
});

function startHeroTerminal() {
    const heroLog = document.getElementById('hero-log');
    if (!heroLog) return;

    const logs = [
        "> INITIALIZING_CORE...",
        "> LOADING_INTERFACE",
        "> SYNCING_GLOBAL_NODE",
        "> SECURITY_LEVEL: HIGH",
        "> ACCESS_GRANTED",
        "> WELCOME_OPERATOR"
    ];

    let i = 0;
    setInterval(() => {
        const line = document.createElement('div');
        line.innerText = logs[i % logs.length];
        heroLog.appendChild(line);
        
        if (heroLog.children.length > 4) {
            heroLog.removeChild(heroLog.children[0]);
        }
        i++;
    }, 1500);
}

// Pastikan dipanggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    startHeroTerminal();
    // Fungsi lainnya tetap berjalan...
});