import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function EditPage() {
    const [data, setData] = useState();
    const currentUrl = window.location.href;
    const desiredPart = currentUrl.split("/")[4];
    const [formData, setFormData] = useState({
        id: 0,
        hostname: "",
        location: "",
        minimum_nights: "",
        price: 0,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("https://nodejs.sulla.hu/data/" + desiredPart);
        console.log(formData);
        try {
            const response = await axios.post("https://nodejs.sulla.hu/data", formData);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    function handleChange(event) {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        console.log(formData);
    }

    return (
        <div className="container pt-5">

                <div>
                    <h2 className="mb-5 ">Create new hotel</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="hostname">
                            <Form.Label>HostName</Form.Label>
                            <Form.Control type="text" placeholder="hostname" 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Location" 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="minimum_nights">
                            <Form.Label>Minimum Nights</Form.Label>
                            <Form.Control type="text" placeholder="Minimum Nights"
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control type="number" placeholder="Price ($)"
                onChange={handleChange}
 />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Post
                        </Button>
                    </Form>
                </div>
        </div>
    );
}
