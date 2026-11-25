import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DartsAddNewPage = () => {
    const [ShowModal, SetShowmodal] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const HandleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`https://darts.sulla.hu/darts`, {
                name: event.target.elements.name.value,
                birth_date: event.target.elements.birth_date.value,
                world_ch_won: event.target.elements.world_ch_won.value,
                profile_url: event.target.elements.profile_url.value,
                image_url: event.target.elements.image_url.value
            });
            SetShowmodal(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5">
            {ShowModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Sikeres hozzáadás!</h5>
                            </div>
                            <div className="modal-body">
                                A Darts játékos adatait sikeresen hozzáadtuk!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={() => navigate("/")}>
                                    Rendben
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white text-center fw-bold">
                            Új dartsozó felvitele
                        </div>
                        <div className="card-body p-4">
                            {imageUrl && (
                                <div className="text-center mb-4">
                                    <img
                                        src={imageUrl}
                                        alt="Előnézet"
                                        className="rounded shadow-sm"
                                        style={{ maxHeight: "140px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            <form onSubmit={HandleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Darts játékos neve</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Pl. Michael van Gerwen"
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Születési dátum</label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Nyert világbajnokságok</label>
                                        <input
                                            type="number"
                                            name="world_ch_won"
                                            className="form-control"
                                            min="0"
                                            defaultValue="0"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Profil URL</label>
                                    <input
                                        type="url"
                                        name="profile_url"
                                        className="form-control"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Kép URL</label>
                                    <input
                                        type="text"
                                        name="image_url"
                                        className="form-control"
                                        placeholder="https://..."
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-end gap-2">
                                    <Link to="/" className="btn btn-secondary">
                                        Vissza
                                    </Link>
                                    <button type="submit" className="btn btn-success">
                                        Hozzáadás
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};