import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Order status',
    message: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value ? '' : `${name} is required.`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3005/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Form submitted:", formData);
          alert("Form submitted successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "Order status",
            message: "",
          });
        } else {
          console.error("Form submission failed:", response.statusText);
          alert("Form submission failed. Please try again.");
        }
      }
      catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred during form submission. Please try again.");
      }
      console.log('Form submitted:', formData);
    }
  };


  return (
    <div className="container my-4">

      <div className="row">
        <div className="col-lg-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputFirstName" className="form-label">
                Firstname *
              </label>
              <input name="firstName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.firstName} type="text"
                onChange={handleChange}
              />
              <span className="text-danger">{errors.firstName}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputFirstName" className="form-label">
                LastName *
              </label>
              <input type="Firstname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.lastName}</span>

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputFirstName" className="form-label">
                Email *
              </label>
              <input type="Firstname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.email}</span>

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                phone
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Subject *
              </label>
              <select class="form-select form-select-lg mb-3" aria-label="Large select example" name="subject"
                value={formData.subject}
                onChange={handleChange}>

                <option value="Order status">Order status</option>
                <option value="Refund Request">Refund Request </option>
                <option value="Job Application">Job Application</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputFirstName" className="form-label">
                Message *
              </label>
              <textarea
                className="form-control"
                id="exampleInputMessage"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.message}</span>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="button" className="btn btn-outline-primary">
                Clear
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
