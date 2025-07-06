import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'; 
import axios from 'axios';
import { ProductCountContext } from './ProductCountContext';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(ProductCountContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAdd = (product) => {
    addToCart(product); // This will persist to Firestore and update context
  };

  return (
    <div className="home-wrapper">
      <Container>
        <div className="product-grid">
          {loading ? (
            <h4 className="text-center">Loading products...</h4>
          ) : (
            products.map((prod) => (
              <Card key={prod.id} className="product-card">
                <Card.Img variant="top" src={prod.images?.[0]} alt={prod.title} />
                <Card.Body>
                  <Card.Title>{prod.title}</Card.Title>
                  <Card.Text>{prod.description.slice(0, 100)}...</Card.Text>
                </Card.Body>
                <ListGroup variant="flush" className="card-borderless-list">
                  <ListGroup.Item>Price: ${prod.price}</ListGroup.Item>
                  <ListGroup.Item>Category: {prod.category?.name}</ListGroup.Item>
                </ListGroup>
                <Card.Body className="d-flex justify-content-between">
                  <Button onClick={() => navigate(`/viewproduct/${prod.id}`)}>
                    View
                  </Button>
                  <Button className="add-to-cart-btn" onClick={() => handleAdd(prod)}>
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
