const tanggal = document.getElementById("tanggal");
const subuh = document.getElementById("subuh");
const dzuhur = document.getElementById("dzuhur");
const ashar = document.getElementById("ashar");
const maghrib = document.getElementById("magrib");
const isya = document.getElementById("isya");

const getTime = () => {
    const date = new Date();
    const result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return result;
}

const clock = () => {
    const date = new Date();
    const hours = date.getHours().toString().length == 2
    ? `${date.getHours()}` : `0${date.getHours}`;
    const minutes = date.getMinutes().toString().length == 2
    ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
    const second = date.getSeconds().toString().length == 2
    ? `${date.getSeconds()}` : `0${date.getSeconds()}`;
    const result = `${hours}:${minutes}:${second}`;
    return result;
}

async function getJadwalSholat() {
    try {
        const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/1620/${getTime()}`);
        if (!res.ok) throw new Error("Invalid response");
        const data = await res.json();
        return data.data.jadwal;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

async function show_jadwal() {
    try {
        const data = await getJadwalSholat()

        tanggal.textContent = data.tanggal;
        subuh.textContent = data.subuh;
        dzuhur.textContent = data.dzuhur;
        ashar.textContent = data.ashar;
        maghrib.textContent = data.maghrib;
        isya.textContent = data.isya;

        console.log("Jadwal Sholat: ", data);
    } catch(err) {
        console.error(err);
        tanggal.textContent = "Gagal memuat jadwal"
    }
}

setInterval(() => {
    document.getElementById("clock").textContent = clock();
}, 1000);

show_jadwal()