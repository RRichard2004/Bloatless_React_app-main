import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function EditPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const currentUrl = window.location.href;
    const desiredPart = currentUrl.split("/")[4];
    const [formData, setFormData] = useState({
        id: 0,
        hostname: "",
        location: "",
        minimum_nights: "",
        price: 0,
    });
    
    useEffect(() => {
        setLoading(true);
        axios.get("https://nodejs.sulla.hu/data/" + desiredPart)
          .then((response) => {
            setData(response.data);
            
          setFormData({
            hostname: response.data.hostname,
            location: response.data.location,
            minimum_nights: response.data.minimum_nights,
            price: response.data.price
        });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setLoading(false);
          });
    }, []);
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("https://nodejs.sulla.hu/data/" + desiredPart);
        console.log(formData);
        try {
            const response = await axios.put("https://nodejs.sulla.hu/data/" + desiredPart, formData);
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2>Edit Page for {data.hostname}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="hostname">
                            <Form.Label>HostName</Form.Label>
                            <Form.Control type="text" placeholder={data.hostname} 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder={data.location} 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="minimum_nights">
                            <Form.Label>Minimum Nights</Form.Label>
                            <Form.Control type="text" placeholder={data.minimum_nights} 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control type="number" placeholder={data.price} 
                onChange={handleChange}
 />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Modify
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
}
