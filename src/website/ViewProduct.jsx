import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import './ViewProduct.css'; 

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="spinner-container">
      <Spinner animation="border" />
    </div>
  );

  if (!product) return <h2 className="text-center mt-5">Product not found.</h2>;

  return (
    <Container className="view-product-container">
      <Card className="view-product-card">
        <Card.Img variant="top" src={product.images?.[0]} alt={product.title} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <Card.Text><strong>Category:</strong> {product.category?.name}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewProduct;
