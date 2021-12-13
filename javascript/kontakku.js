const cariNama = document.querySelector(".cari"),
  tambahNama = document.querySelector(".tambahnamadepan"),
  tambahBelakang = document.querySelector(".tambahbelakang"),
  tambahNomor = document.querySelector(".tambahnomor"),
  cariButton = document.querySelector(".tombolcari"),
  tambahButton = document.querySelector(".tomboltambah"),
  tambahArea = document.querySelector(".tambahkontak"),
  introButton = document.querySelector(".tombolmasuk"),
  resetButton = document.querySelector(".kosongkan");

const hasilNama = document.createElement("p"),
  hasilArea = document.querySelector(".carikontak"),
  jumlahKontak = document.querySelector(".jumlah"),
  navMenu = document.querySelector("nav");

const sectionKontak = document.querySelector(".daftarkontak"),
  kontakArea = document.querySelector(".listkontak"),
  introArea = document.querySelector(".intro");

const navigasiTambah = document.querySelector(".linktambah"),
  navigasiCari = document.querySelector(".linkcari"),
  navigasiDaftar = document.querySelector(".linkdaftar");

let daftarKontak = JSON.parse(localStorage.getItem("kontak") || "[]");

const keterangan = document.createElement("p");

let namaSama;
class Kontak {
  constructor(namaDepan, namaBelakang, nomorHape) {
    this.nama = {
      namaDepan: namaDepan,
      namaBelakang: namaBelakang,
    };
    this.nomorHape = nomorHape;
  }
}

navMenu.style.display = "none";
hasilNama.style.fontStyle = "italic";
jumlahKontak.textContent = daftarKontak.length;

introButton.addEventListener("click", () => {
  introArea.style.display = "none";
  navMenu.style.display = "flex";
  tambahArea.style.display = "flex";
});

navigasiTambah.addEventListener("click", () => {
  tambahArea.style.display = "flex";
  hasilArea.style.display = "none";
  sectionKontak.style.display = "none";
  hasilNama.remove();
});

navigasiTambah.addEventListener("mouseover", () => {
  keterangan.textContent = " Tambah";
  navigasiTambah.appendChild(keterangan);
});

navigasiTambah.addEventListener("mouseout", () => {
  navigasiTambah.removeChild(keterangan);
});

navigasiCari.addEventListener("click", () => {
  tambahArea.style.display = "none";
  hasilArea.style.display = "flex";
  sectionKontak.style.display = "none";
});

navigasiCari.addEventListener("mouseover", () => {
  keterangan.textContent = " Cari";
  navigasiCari.appendChild(keterangan);
});

navigasiCari.addEventListener("mouseout", () => {
  navigasiCari.removeChild(keterangan);
});

navigasiDaftar.addEventListener("click", () => {
  tambahArea.style.display = "none";
  hasilArea.style.display = "none";
  sectionKontak.style.display = "flex";
  hasilNama.remove();
});

navigasiDaftar.addEventListener("mouseover", () => {
  keterangan.textContent = " Daftar";
  navigasiDaftar.appendChild(keterangan);
});

navigasiDaftar.addEventListener("mouseout", () => {
  navigasiDaftar.removeChild(keterangan);
});

tambahButton.addEventListener("click", () => {
  switch (true) {
    case tambahNama.value === "" || tambahBelakang.value === "":
      hasilNama.textContent = "Gagal, Input nama kosong!";
      hasilNama.classList.add("warning");
      tambahArea.appendChild(hasilNama);
      tambahNama.focus();
      break;
    case tambahNomor.value === "":
      hasilNama.textContent = "Gagal, Input nomor kosong!";
      hasilNama.classList.add("warning");
      tambahArea.appendChild(hasilNama);
      tambahNomor.focus();
      break;
    default:
      namaSama = false;
      let checkNamaDepan = tambahNama.value.toLowerCase();
      checkIfSama(checkNamaDepan);
      if (namaSama === true) {
        hasilNama.textContent =
          "Gagal, kontak dengan nama depan tersebut sudah ada!";
        hasilNama.classList.add("warning");
        tambahArea.appendChild(hasilNama);
        tambahNama.value = "";
        tambahBelakang.value = "";
        tambahNomor.value = "";
        tambahNama.focus();
      } else {
        let namaBaru = tambahNama.value;
        let namaBelakangBaru = tambahBelakang.value;
        let nomorBaru = tambahNomor.value;
        let kontakBaru = new Kontak(namaBaru, namaBelakangBaru, nomorBaru);
        daftarKontak.push(kontakBaru);
        localStorage.setItem("kontak", JSON.stringify(daftarKontak));
        tambahNama.value = "";
        tambahBelakang.value = "";
        tambahNomor.value = "";
        tambahNama.focus();
        autoKontak();
        hasilNama.textContent = "Kontak berhasil ditambah";
        hasilNama.classList.remove("warning");
        tambahArea.appendChild(hasilNama);
      }
  }
});

resetButton.addEventListener("click", () => {
  daftarKontak.splice(0, daftarKontak.length);
  jumlahKontak.textContent = daftarKontak.length;
  kontakArea.innerHTML = "";
  localStorage.removeItem("kontak");
});

function checkIfSama(namaDepanInput) {
  daftarKontak.map((kontak) => {
    if (namaDepanInput === kontak.nama.namaDepan.toLowerCase()) {
      namaSama = true;
    } else {
      namaSama = false;
    }
  });
}

function autoKontak() {
  kontakArea.innerHTML = "";
  jumlahKontak.textContent = daftarKontak.length;
  daftarKontak.map((kontak) => {
    const listKontak = document.createElement("p");
    listKontak.textContent = `${kontak.nama.namaDepan} ${kontak.nama.namaBelakang}: ${kontak.nomorHape}`;
    kontakArea.appendChild(listKontak);
  });
}

autoKontak();
