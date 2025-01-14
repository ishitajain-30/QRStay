# QRStay

**QRStay** is a streamlined **Digital Guest Onboarding System** designed to simplify the process of guest registration for hotels. With features for administrators and guests, QRStay ensures a smooth, paperless experience by leveraging unique QR codes for hotel-specific guest forms.

---

## 🌟 Features

### 🏢 Main Admin Panel
- **Hotel Management**:
  - Add new hotels with details:
    - Hotel Name
    - Address
    - Logo (file upload)
  - View all registered hotels in a table with columns:
    - Hotel Name | Address | Logo | Actions
- **QR Code Generation**:
  - Generate a unique QR code for each hotel.
  - QR codes link directly to hotel-specific landing pages.

---

### 📋 Guest Landing Panel
- Displays hotel details:
  - Name, Logo, Address.
- Guest information form includes:
  - Full Name
  - Mobile Number
  - Address
  - Purpose of Visit (Business, Personal, Tourist)
  - Stay Dates (From and To)
  - Email ID
  - ID Proof Number
- Post-submission:
  - A "Thank You" page is displayed.
  - Guest details are securely saved in the database.

---

### 🔑 Guest Admin Panel
- Displays all guest details in a table for the respective hotel.
- Provides actions to:
  - **Edit** guest information.
  - **View** guest details with a **Print** option.

---

## 🛠️ Technical Details

### Backend
- **Node.js** with **Express.js** for routing.
- **MongoDB** for secure data storage.

### Frontend
- Built using a free admin template.
- Rendering pages with **React.js**.
- Responsive design powered by **TailwindCSS**.

### Additional Features
- **QR Code Generation**: Powered by the `qrcode` library in Node.js.
- **Form Validation**: Ensures data integrity with client-side and server-side validation.
- **Printing Support**: Enables printing guest details using JavaScript's `window.print()` method.
- **Authentication**: Simple login functionality for Main Admin and Guest Admin panels.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** installed on your system.
- **MongoDB** setup and running.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ishitajain-30/qrstay.git
2. Navigate to the project directory:
   ```bash
   cd qrstay
3. Install dependencies:
   ```bash
   npm install

### Running the Applicaion

1. Start the backend server:
   ```bash
   npm run dev
2. Start the frontend server:
   ```bash
   npm run dev
3. Access the application at: http://localhost:5173/
