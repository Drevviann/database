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

document.addEventListener('DOMContentLoaded', () => {
    // ... kode yang sudah ada ...

    const mainTerminal = document.getElementById('terminal-output');
    const warningTerminal = document.getElementById('warning-log');
    const buttons = document.querySelectorAll('.ctrl-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.innerText.trim();
            
            // Efek visual klik
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 100);

            if (cmd === "OVERRIDE") {
                addLog(mainTerminal, ">> MANUAL_OVERRIDE_INITIATED...", "#fff");
                addLog(mainTerminal, ">> BYPASSING_SECURITY_LAYERS_01_TO_64", "#888");
                addLog(warningTerminal, "[!] PROTOCOL_7_BYPASSED", "#ff4444");
            } 
            else if (cmd === "PURGE") {
                addLog(mainTerminal, ">> PURGING_TEMP_MEMORY_BLOCKS...", "#fff");
                addLog(mainTerminal, ">> 0x88FF_DELETED | 0x112A_DELETED", "#888");
                addLog(warningTerminal, "[!] CACHE_FLUSH_SUCCESSFUL", "#ff4444");
            }
            else if (cmd === "SILENCE") {
                addLog(mainTerminal, ">> SILENCING_INBOUND_ALERTS...", "#fff");
                addLog(warningTerminal, "[!] ALARMS_DISABLED_BY_USER", "#ff4444");
            }
            else if (cmd === "SHUTDOWN") {
                addLog(mainTerminal, ">> TERMINATING_ALL_SYSTEM_PROCESSES...", "#ff4444");
                // Efek dramatis: layar bergetar atau teks hilang
                document.body.style.filter = "invert(1)";
                setTimeout(() => document.body.style.filter = "none", 200);
                addLog(warningTerminal, "[FATAL] SYSTEM_SHUTDOWN_SEQUENCE_START", "#ff0000");
            }
        });
    });
});

// Fungsi pembantu untuk menambah log secara manual
function addLog(container, text, color) {
    if (!container) return;
    const line = document.createElement('div');
    line.style.color = color;
    line.innerHTML = `[${new Date().toLocaleTimeString('en-GB')}] ${text}`;
    container.appendChild(line);
    
    // Auto-scroll ke bawah
    container.scrollTop = container.scrollHeight;
    
    // Batasi jumlah baris agar tidak berat
    if (container.children.length > 15) {
        container.removeChild(container.children[0]);
    }
}

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

function initBloombergLogic() {
    const marketTbody = document.getElementById('bbg-market-data');
    const inputField = document.getElementById('bbg-input');
    const newsContainer = document.getElementById('user-news-feed');

    // 1. Fill Market Data (Bikin 12 baris agar penuh)
    const assets = ["AAPL", "TSLA", "BTC", "ETH", "GOLD", "OIL", "US10Y", "USD/JPY", "NVDA", "AMZN", "MSFT", "GOOGL"];
    
    function updateMarket() {
        if (!marketTbody) return;
        marketTbody.innerHTML = '';
        assets.forEach(asset => {
            const bid = (Math.random() * 500).toFixed(2);
            const ask = (parseFloat(bid) + 0.15).toFixed(2);
            marketTbody.innerHTML += `
                <tr>
                    <td>${asset}</td>
                    <td>${bid}</td>
                    <td>${ask}</td>
                    <td style="color: #8B0000">${(Math.random()*50).toFixed(1)}M</td>
                </tr>
            `;
        });
    }

    // 2. LocalStorage News Logic
    let savedNews = JSON.parse(localStorage.getItem('bbg_user_news')) || [];
    function renderNews() {
        if(!newsContainer) return;
        newsContainer.innerHTML = '';
        savedNews.forEach(item => {
            const div = document.createElement('div');
            div.className = 'user-msg-item';
            div.innerHTML = `<span class="msg-time">${item.time}</span><span class="msg-body">${item.text}</span>`;
            newsContainer.prepend(div);
        });
    }

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && inputField.value.trim() !== "") {
            const newEntry = {
                time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                text: inputField.value.toUpperCase()
            };
            savedNews.push(newEntry);
            if (savedNews.length > 15) savedNews.shift();
            localStorage.setItem('bbg_user_news', JSON.stringify(savedNews));
            inputField.value = "";
            renderNews();
        }
    });

    setInterval(updateMarket, 2000);
    updateMarket();
    renderNews();
}

document.addEventListener('DOMContentLoaded', () => {
    initBloombergLogic();
});

function initBloombergAnalytics() {
    const ctx = document.getElementById('bbgLineChart').getContext('2d');
    
    // Generate data awal (100 poin) agar tidak kosong saat start
    let dataPoints = Array.from({length: 100}, () => Math.floor(Math.random() * 50) + 150);
    let labels = Array.from({length: 100}, (_, i) => i);

    // Fungsi menghitung Moving Average sederhana
    const calculateMA = (data, period) => {
        return data.map((val, index) => {
            if (index < period) return null;
            const sum = data.slice(index - period, index).reduce((a, b) => a + b, 0);
            return sum / period;
        });
    };

    const bbgChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'PRICE',
                    data: dataPoints,
                    borderColor: '#FFB900',
                    borderWidth: 1.5,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'MA-20',
                    data: calculateMA(dataPoints, 20),
                    borderColor: '#8B0000',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { 
                    grid: { color: '#111' },
                    ticks: { color: '#444', font: { size: 8 } }
                }
            },
            animation: { duration: 0 }
        }
    });

    // Update secara real-time
    setInterval(() => {
        const nextPrice = dataPoints[dataPoints.length - 1] + (Math.random() * 10 - 5);
        dataPoints.push(nextPrice);
        dataPoints.shift();
        
        bbgChart.data.datasets[0].data = dataPoints;
        bbgChart.data.datasets[1].data = calculateMA(dataPoints, 20);
        bbgChart.update();
    }, 1000);
}

// Tambahkan panggilannya di DOMContentLoaded Anda
document.addEventListener('DOMContentLoaded', () => {
    initBloombergAnalytics();
});

function renderNews() {
    if(!newsContainer) return;
    newsContainer.innerHTML = '';
    
    // Urutkan dari yang lama ke baru agar seperti chat normal
    savedNews.forEach(item => {
        const div = document.createElement('div');
        div.className = 'user-msg-item';
        div.innerHTML = `<span class="msg-time">${item.time}</span><span class="msg-body">${item.text}</span>`;
        newsContainer.appendChild(div); // Gunakan appendChild agar pesan baru di bawah
    });

    // Auto scroll ke bawah setelah render
    newsContainer.scrollTop = newsContainer.scrollHeight;
}

function initBloombergClock() {
    const clockElement = document.getElementById('bbg-clock');
    
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            // Format jam ala Bloomberg: HH:MM:SS (24 jam)
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            clockElement.innerText = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
}

// Pastikan dipanggil di dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initBloombergClock();
    // fungsi lainnya...
});

