import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { getDataByIdAPI, updateData } from "../services/allApi";

function EditModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(setEditData);
    

    const { id } = useParams();
    const navigate = useNavigate();

    // State for form data
    const [editdata, setEditData] = useState({
        condition: "",
        doctor: "",
        description: "",
        date: "",
        file: null
    });

    

    // Fetch data by ID on component mount
    useEffect(() => {
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            const response = await getDataByIdAPI(id);
            const fetchedData = response.data;
            // console.log(fetchedData);


            if (fetchedData) {
                setEditData({
                    condition: fetchedData.condition || "",
                    doctor: fetchedData.doctor || "",
                    description: fetchedData.description || "",
                    date: fetchedData.date || "",
                    file: null, // File will remain empty initially
                });
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    // Handle input change for controlled components
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev)=>({ 
            ...prev,
             [name]: value 
        }));
    };

    // Handle file input separately
    const handleFileChange = (e) => {
        setEditData({ ...editdata, file: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("condition", editdata.condition);
            formData.append("doctor", editdata.doctor);
            formData.append("description", editdata.description);
            formData.append("date", editdata.date);
            if (editdata.file) {
                formData.append("file", editdata.file);
            }

            // Call API to update data
            await updateData(id, formData);
            console.log("Data Updated:", formData);
            handleClose();
            fetchDetails();
            window.location.reload();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const inputStyle = {
        border: "1px solid #dcdcdc",
        borderRadius: "4px",
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} centered contentClassName="bg-white">
                <Modal.Header closeButton className="bg-primary">
                    <Modal.Title className="text-white">Edit Health Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="condition" className="form-label">Health Condition</label>
                            <input
                                type="text"
                                className="form-control"
                                id="condition"
                                name="condition"
                                value={editdata.condition}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="doctor" className="form-label">Doctor's Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="doctor"
                                name="doctor"
                                value={editdata.doctor}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={editdata.description}
                                onChange={handleChange}
                                rows="3"
                                required
                                style={inputStyle}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={editdata.date}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Upload File</label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                style={inputStyle}
                            />
                        </div>

                        <div className="text-end">
                            <button className="btn btn-danger me-2" type="button">
                                <FontAwesomeIcon icon={faTrashCan} color="#ffffff" />
                            </button>
                            <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditModal;