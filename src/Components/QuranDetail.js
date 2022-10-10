import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function QuranDetail() {
  const params = useParams();

  let [quran, setQuran] = useState({});
  let [ayat, setAyat] = useState([]);
  let [loading, setLoading] = useState(false);
  let [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getQuran() {
      let request = await fetch(
        `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${params.id}.json`
      );
      if (!request.ok) {
        setLoading(false);
        setNotFound(true);
      }
      let response = await request.json();

      setAyat(response.verses);
      setQuran(response);
      setLoading(false);
    }

    getQuran();
  }, [params]);

  if (notFound) {
    return <h1 className="text-center mt-5">Halaman Tidak ada</h1>;
  }

  return (
    <section className="detail">
      <div className="container">
        <div className="row">
          {loading && (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              <div className="col">
                <p style={{ fontSize: "30px" }} className="mt-3">
                  {" "}
                  {quran.name}
                </p>
                <p className="mt-3" style={{ fontSize: "20px" }}>
                  {" "}
                  {quran.number_of_ayah} Ayat
                  <Link to={"/"} className="ms-2 text-decoration-none">
                    Back to home
                  </Link>
                </p>
              </div>

              {ayat.map((item) => {
                return (
                  <div className="card mb-4 border-top-0 border-end-0 border-start-0" key={item.number}>
                    <div className="card-body">
                      <h5 className="card-title text-end mb-3"> {item.text} </h5>
                      <p className="card-text">
                        {item.translation_id}
                      </p>
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
