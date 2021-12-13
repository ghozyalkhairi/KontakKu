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

autoKontak();
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

cariButton.addEventListener("click", () => {
  switch (true) {
    case cariNama.value === "":
      hasilNama.textContent = "Gagal, Input nama kosong!";
      hasilNama.classList.add("warning");
      hasilArea.appendChild(hasilNama);
      break;
    default:
      hasilNama.remove();
      let namaCari = cariNama.value.toLowerCase();
      cariNama.value = "";
      cariNama.focus();
      if (daftarKontak.length === 0) {
        hasilNama.textContent = "Kontak anda kosong!";
        hasilNama.classList.add("warning");
        hasilArea.appendChild(hasilNama);
      } else {
        for (let i = 0; i < daftarKontak.length; i++) {
          if (namaCari === daftarKontak[i].nama.namaDepan.toLowerCase()) {
            hasilNama.textContent = `Nomor ${daftarKontak[i].nama.namaDepan} ${daftarKontak[i].nama.namaBelakang} adalah ${daftarKontak[i].nomorHape}`;
            hasilNama.classList.remove("warning");
            hasilArea.appendChild(hasilNama);
            break;
          } else {
            hasilNama.textContent = "Kontak tidak ditemukan";
            hasilNama.classList.add("warning");
            hasilArea.appendChild(hasilNama);
          }
        }
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
  for (let i = 0; i < daftarKontak.length; i++) {
    if (namaDepanInput === daftarKontak[i].nama.namaDepan.toLowerCase()) {
      namaSama = true;
      break;
    } else {
      namaSama = false;
    }
  }
}

function autoKontak() {
  const listKontak = document.createElement("p");
  jumlahKontak.textContent = daftarKontak.length;
  for (let c = 0; c < daftarKontak.length; c++) {
    listKontak.textContent = `${daftarKontak[c].nama.namaDepan} ${daftarKontak[c].nama.namaBelakang}: ${daftarKontak[c].nomorHape}`;
    kontakArea.appendChild(listKontak);
  }
}
