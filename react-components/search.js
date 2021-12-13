const el = React.createElement;

const searchInput = () => {
  const daftarKontak = JSON.parse(localStorage.getItem("kontak") || "[]");
  const [cari, setCari] = React.useState("");
  return (
    <React.Fragment>
      <input
        type="text"
        style={{ width: "100%", padding: "1em 0.5em" }}
        className="cari"
        placeholder="Masukkan nama"
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        required
      />
      {daftarKontak
        .filter((item) => {
          if (!cari) return false;
          if (
            item.nama.namaDepan.toLowerCase().includes(cari.toLowerCase()) ||
            item.nama.namaBelakang.toLowerCase().includes(cari.toLowerCase())
          ) {
            return true;
          }
        })
        .map((item) => (
          <p style={{ fontStyle: "italic" }} key={item.nomorHape}>
            {item.nama.namaDepan} {item.nama.namaBelakang} : {item.nomorHape}
          </p>
        ))}
    </React.Fragment>
  );
};

const react = document.querySelector(".react");
ReactDOM.render(el(searchInput), react);
