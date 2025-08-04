const grupList = [
  { grup: "GRUP 1", petugas: "AGUS PURBOYONO, AGUS SUHERMAN, ALI IMRON, BUDI BAGUS SANTOSO, DASUKI, SUBCHAN" },
  { grup: "GRUP 2", petugas: "AGUNG TRIARSO, AHMAD JAUHARUL FARID, ALI FATAH, RISTANTO ARIS SAPUTRO, UMAR SADLI, WIDODO" },
  { grup: "GRUP 3", petugas: "MARIYO, RAGIL SANTOSO, RIZKI AGUNG UTOMO, SUWITO, SUYANTONO" },
  { grup: "GRUP 4", petugas: "AMIN SETYONO, FAIZIN, GIANTO ZAINI, KOZIN, SUGIYANTO, YUSUF LUKMAN HAKIM" },
  { grup: "GRUP 5", petugas: "HARTOPO, MUHAMMAD AGUS, NUR AZIS, TRI SUTRISNO, MUJIYONO, NUR HIDAYAT, BUDIYONO, LUKMAN HAKIM" },
  { grup: "GRUP 6", petugas: "KUSNADI, PAULUS IRAWAN, ROS HARMANTO, SARJO, YOGA" },
  { grup: "GRUP 7", petugas: "ARIS SAMITIO, HARNO, PURWANTO, SOLEKAN, SUJONO" },
  { grup: "GRUP 8", petugas: "BENNY, JOKO MBAK YANA, MOCH ALY MAS AD, NGALI, SLAMET, SUPRIYADI" }
];

// Tanggal acuan awal: Sabtu, 2 Agustus 2025 = GRUP 6
const tanggalAwal = new Date("2025-08-02");
const indexAwalGrup = 5;

function formatTanggalHariIni() {
  const hariList = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const bulanList = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const now = new Date();
  const hari = hariList[now.getDay()];
  const tanggal = `${hari}, ${now.getDate()} ${bulanList[now.getMonth()]} ${now.getFullYear()}`;
  return { hari, tanggal, now };
}

function hitungGrupUntukTanggal(tanggalSekarang) {
  const msPerHari = 1000 * 60 * 60 * 24;
  const selisihHari = Math.floor((tanggalSekarang - tanggalAwal) / msPerHari);
  const grupKe = (indexAwalGrup + selisihHari) % grupList.length;
  return grupList[(grupKe + grupList.length) % grupList.length];
}

function buatCaption(hari, tanggal, grup, petugas) {
  return `Yth. Warga RT 009 / RW 007,

🔔 Sebagai pengingat, berikut jadwal jaga malam:

📅 ${tanggal}
⏰ Jam 23.00 - 02.00 WIB

👥 ${grup}
👮 Petugas: ${petugas}

Catatan:
Apabila berhalangan hadir, mohon berkoordinasi dengan tim jaga masing-masing. Terima kasih atas kerja samanya.

📄 Link Aplikasi Jimpitan Digital:
https://ertesembilanerwetujuh.github.io/ertesembilanerwetujuh/

📊 Data Jimpitan (Real Time):
https://docs.google.com/spreadsheets/d/1yo72Gy8H6UftklRiRzaKQ5BcOVZETuTWAa3E8sJ1mW0/edit?usp=sharing

📝 Data Absensi (Real Time):
https://docs.google.com/spreadsheets/d/19LAbbYf9ATFf3TEOSUc2xBvLoU9BbNs7Hm0Uqb5YVbQ/edit?usp=sharing

Terima kasih atas partisipasinya 🙏
Hormat kami,
Seksi Keamanan 🥷🏼`;
}

document.addEventListener("DOMContentLoaded", () => {
  const { hari, tanggal, now } = formatTanggalHariIni();
  const data = hitungGrupUntukTanggal(now);

  // Tampilkan ke halaman
  document.getElementById("tanggal").textContent = tanggal;
  document.getElementById("grup").textContent = data.grup;
  document.getElementById("petugas").textContent = `Petugas: ${data.petugas}`;

  const caption = buatCaption(hari, tanggal, data.grup, data.petugas);
  document.getElementById("caption").value = caption;

  // Tombol Salin
  document.getElementById("copyBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(caption).then(() => {
      alert("Caption berhasil disalin ✅");
    });
  });

  // Tombol Download
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const captureElement = document.getElementById("captureArea");
    const status = document.getElementById("statusDownload");

    if (status) {
      status.textContent = '🔄 Sedang memproses...';
    }

    html2canvas(captureElement).then(canvas => {
      const link = document.createElement("a");
      link.download = "jadwal-ronda.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      if (status) {
        status.textContent = '✅ Gambar berhasil diunduh!';
      }
    }).catch(() => {
      if (status) {
        status.textContent = '❌ Gagal mengunduh gambar.';
      }
    });
  });
});

const captureArea = document.getElementById("captureArea");

document.getElementById("downloadBtn").addEventListener("click", function () {
  const captureArea = document.getElementById("captureArea");

  html2canvas(captureArea).then(canvas => {
    const link = document.createElement("a");
    link.download = "jadwal-ronda.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).catch(error => {
    console.error("Gagal membuat gambar:", error);
  });
});
