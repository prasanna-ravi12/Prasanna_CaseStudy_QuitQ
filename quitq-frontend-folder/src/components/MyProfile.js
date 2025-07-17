
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { FaSignOutAlt, FaUser, FaBoxOpen, FaHome, FaArrowLeft } from 'react-icons/fa';
import UserNavbar from "./user_navbar";
import { toast } from 'react-toastify';

export default function MyProfile() {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState({});

  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/api/users/${email}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [email]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axiosInstance.put(`/api/users/${email}`, user)
      .then(() => {
        setEditMode(false);
        toast.success("Profile updated!");
        setShowModal(false);
      })
      .catch(err => console.error(err));
  };

  const toggleFaq = (index) => {
  setFaqOpen((prev) => ({
    ...prev,
    [index]: !prev[index]
  }));
};


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    toast.success("Logout successful!");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your QuitQ account permanently?")) {
      try {
        await axiosInstance.delete(`/api/users/${email}`);
        toast.success("Your QuitQ account has been deleted.");
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        console.error("Error deleting account:", err);
        toast.error("Error deleting account. Please try again later.");
      }
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>

      <UserNavbar />

      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#ffe4ec' }}>
        {/* Sidebar */}
        <div className="p-4 sidebar-animate" style={{ width: '280px', backgroundColor: '#f8bbd0' }}>
          <Card className="text-center border-0 bg-transparent mb-3">
            <Card.Body>
              <FaUser size={40} className="mb-2 text-dark" />
              <Card.Title className="mb-0">Hello,</Card.Title>
              <Card.Subtitle className="fw-bold">{user.name}</Card.Subtitle>
            </Card.Body>
          </Card>

          <hr />

          <div className="d-grid gap-2 sidebar-buttons">
            <Button variant="outline-dark" onClick={() => setShowModal(true)}>
              <FaUser className="me-2" /> My Profile
            </Button>
            <Button variant="outline-dark" onClick={() => navigate('/finalorder')}>
              <FaBoxOpen className="me-2" /> My Orders
            </Button>
            <Button variant="outline-dark" onClick={() => navigate('/usercategory')}>
              <FaHome className="me-2" /> Back To Home
            </Button>
            <Button variant="danger" className="mt-5" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {/* <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              alt="avatar"
              style={{ width: '140px', height: '140px' }}
            />
            <h4 className="mt-3">{user.name}</h4>
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              className="rounded-pill mt-3 px-4"
            >
              👁 View Personal Details
            </Button>
          </div> */}
          <div className="text-center mt-4">
  <img
    src={
      user.gender?.toLowerCase() === 'female'
        ? 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png' // female avatar
        : 'https://cdn-icons-png.flaticon.com/512/147/147144.png'   // default male avatar
    }
    alt="profile-avatar"
    style={{
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '5px solid #e91e63',
      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease',
    }}
  />
  <h4 className="mt-3 fw-bold">{user.name}</h4>
  <Button
    variant="primary"
    onClick={() => setShowModal(true)}
    className="rounded-pill mt-3 px-4"
  >
    👁 View Personal Details
  </Button>
</div>


          <hr style={{ borderColor: '#f8bbd0' }} />

          {/* <div className="mt-5" style={{ color: '#880e4f' }}>
            <h5>FAQs</h5>
        
              <p><strong>What happens when I update my email address (or mobile number)?</strong><br />
     Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
   <p><strong>When will my QuitQ account be updated with the new email address (or mobile number)?</strong><br />
     It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
   <p><strong>What happens to my existing QuitQ account when I update my email address (or mobile number)?</strong><br />
     Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
   <p><strong>Does my Seller account get affected when I update my email address?</strong><br />
     QuitQ has a "single sign-on" policy. Any changes will reflect in your Seller account also.</p>
          </div> */}
          <div className="mt-5" style={{ color: '#880e4f' }}>
  <h5 className="mb-4">FAQs</h5>

  {[
    {
      question: "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).",
    },
    {
      question:
        "When will my QuitQ account be updated with the new email address (or mobile number)?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
    },
    {
      question:
        "What happens to my existing QuitQ account when I update my email address (or mobile number)?",
      answer:
        "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.",
    },
    {
      question: "Does my Seller account get affected when I update my email address?",
      answer:
        'QuitQ has a "single sign-on" policy. Any changes will reflect in your Seller account also.',
    },
  ].map((item, index) => (
    <div key={index} className="mb-3">
      <div
        onClick={() => toggleFaq(index)}
        style={{
          cursor: 'pointer',
          backgroundColor: '#fce4ec',
          padding: '10px 15px',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        {item.question}
      </div>
      {faqOpen[index] && (
        <div
          style={{
            padding: '10px 15px',
            marginTop: '5px',
            backgroundColor: '#fff0f5',
            borderRadius: '8px',
            borderLeft: '4px solid #e91e63',
            transition: 'max-height 0.3s ease',
          }}
        >
          {item.answer}
        </div>
      )}
    </div>
  ))}
</div>


          <div className="mt-4 text-end">
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              <i className="fas fa-trash-alt me-2"></i> Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Personal Info */}
      <Modal show={showModal} centered animation onHide={() => setShowModal(false)} dialogClassName="zoom-modal">
        <Modal.Header>
          <Button variant="light" onClick={() => setShowModal(false)} className="me-3">
            <FaArrowLeft />
          </Button>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!editMode}
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!editMode}
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label><br />
              <Form.Check
                inline type="radio" label="Male" name="gender" value="Male"
                checked={user.gender?.toLowerCase() === 'male'}
                onChange={handleChange} disabled={!editMode}
              />
              <Form.Check
                inline type="radio" label="Female" name="gender" value="Female"
                checked={user.gender?.toLowerCase() === 'female'}
                onChange={handleChange} disabled={!editMode}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={user.address}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>

            {editMode ? (
              <Button variant="success" onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✨ Custom CSS Styles */}
      <style>{`
        .sidebar-buttons button {
          opacity: 0;
          animation: fadeInUp 0.5s ease forwards;
        }

        .sidebar-buttons button:nth-child(1) { animation-delay: 0s; }
        .sidebar-buttons button:nth-child(2) { animation-delay: 0.2s; }
        .sidebar-buttons button:nth-child(3) { animation-delay: 0.4s; }
        .sidebar-buttons button:nth-child(4) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .zoom-modal .modal-dialog {
          animation: zoomIn 0.3s ease;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
          .faq-answer {
  transition: all 0.3s ease;
}

      `}</style>
    </div>
  );
}
