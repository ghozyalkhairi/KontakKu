const cariNama = document.querySelector(".cari"),
  tambahNama = document.querySelector(".tambahnama"),
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

const daftarKontak = [];

const keterangan = document.createElement("p");

let namaSama;

navMenu.style.display = "none";
hasilNama.style.fontStyle = "italic";
jumlahKontak.textContent = daftarKontak.length;

introButton.addEventListener("click", function () {
  introArea.style.display = "none";
  navMenu.style.display = "flex";
  tambahArea.style.display = "flex";
});

navigasiTambah.addEventListener("click", function () {
  tambahArea.style.display = "flex";
  hasilArea.style.display = "none";
  sectionKontak.style.display = "none";
  hasilNama.remove();
});

navigasiTambah.addEventListener("mouseover", function () {
  keterangan.textContent = " Tambah";
  navigasiTambah.appendChild(keterangan);
});

navigasiTambah.addEventListener("mouseout", function () {
  navigasiTambah.removeChild(keterangan);
});

navigasiCari.addEventListener("click", function () {
  tambahArea.style.display = "none";
  hasilArea.style.display = "flex";
  sectionKontak.style.display = "none";
});

navigasiCari.addEventListener("mouseover", function () {
  keterangan.textContent = " Cari";
  navigasiCari.appendChild(keterangan);
});

navigasiCari.addEventListener("mouseout", function () {
  navigasiCari.removeChild(keterangan);
});

navigasiDaftar.addEventListener("click", function () {
  tambahArea.style.display = "none";
  hasilArea.style.display = "none";
  sectionKontak.style.display = "flex";
  hasilNama.remove();
});

navigasiDaftar.addEventListener("mouseover", function () {
  keterangan.textContent = " Daftar";
  navigasiDaftar.appendChild(keterangan);
});

navigasiDaftar.addEventListener("mouseout", function () {
  navigasiDaftar.removeChild(keterangan);
});

tambahButton.addEventListener("click", function () {
  switch (true) {
    case tambahNama.value === "":
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
      let checkNama = tambahNama.value.toLowerCase();
      checkIfSama(checkNama);
      if (namaSama === true) {
        hasilNama.textContent = "Gagal, nama kontak itu sudah ada!";
        hasilNama.classList.add("warning");
        tambahArea.appendChild(hasilNama);
        tambahNama.value = "";
        tambahNomor.value = "";
        tambahNama.focus();
      } else {
        let namaBaru = tambahNama.value;
        let nomorBaru = tambahNomor.value;
        let kontakBaru = { nama: namaBaru, nomor: nomorBaru };
        daftarKontak.push(kontakBaru);
        tambahNama.value = "";
        tambahNomor.value = "";
        tambahNama.focus();
        autoKontak();
        hasilNama.textContent = "Kontak berhasil ditambah";
        hasilNama.classList.remove("warning");
        tambahArea.appendChild(hasilNama);
      }
  }
});

function checkIfSama(namaInput) {
  for (let i = 0; i < daftarKontak.length; i++) {
    if (namaInput === daftarKontak[i].nama.toLowerCase()) {
      namaSama = true;
      break;
    } else {
      namaSama = false;
    }
  }
}

cariButton.addEventListener("click", function () {
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
          if (namaCari === daftarKontak[i].nama.toLowerCase()) {
            hasilNama.textContent = `Nomor ${daftarKontak[i].nama} adalah ${daftarKontak[i].nomor}`;
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

resetButton.addEventListener("click", function () {
  daftarKontak.splice(0, daftarKontak.length);
  jumlahKontak.textContent = daftarKontak.length;
  kontakArea.innerHTML = "";
});

function autoKontak() {
  const listKontak = document.createElement("p");
  jumlahKontak.textContent = daftarKontak.length;
  for (let c = 0; c < daftarKontak.length; c++) {
    listKontak.textContent = `${daftarKontak[c].nama}: ${daftarKontak[c].nomor}`;
    kontakArea.appendChild(listKontak);
  }
}
