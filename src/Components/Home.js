import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

export default function Home() {
  let [quran, setQuran] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getQuran() {
      let request = await fetch(
        `https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json`
      );
      let response = await request.json();
      setQuran(response);
      setLoading(false);
    }

    getQuran();
  }, []);

  return (
    <section className="inti mt-5">
      <ScrollToTop smooth width="30" height="30" color="blue" />
      <div className="container">
        <div className="row">
          <div className="mb-5">
            <input
              className="form-control"
              type="text"
              placeholder="Cari Surat..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading && (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              {quran
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                    return val;
                  }else {
                    return false;
                  }
                })

                .map((item) => {
                  return (
                    <div className="col-md-4" key={item.number_of_surah}>
                      <div className="card mb-5">
                        <div className="card-body">
                          <p className="number"> {item.number_of_surah} </p>
                          <h5 className="card-title">
                            {" "}
                            {item.name} ({item.name_translations.ar}){" "}
                          </h5>
                          <p
                            className="card-text"
                            style={{ fontWeight: "600", fontStyle: "italic" }}
                          >
                            "{item.name_translations.id}"
                          </p>
                          <h6 className="card-subtitle mb-4 text-muted">
                            {" "}
                            {item.number_of_surah} Ayat | {item.type}{" "}
                          </h6>
                          <Link to={`/quranDetail/${item.number_of_surah}`} className="detail">
                            Baca Surah
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
