# 🔮 Pixify PDF Alchemy

**Pixify PDF Alchemy** is a modern and intuitive web application that transforms your PDF workflow. Whether you need to convert images into PDFs, merge multiple documents, or extract text from files — Pixify makes it effortless.

🌐 **Live Demo**: [pixifypdf.netlify.app](https://pixifypdf.netlify.app/)

---

## ✨ Features

### 📸 Image to PDF Converter
- Upload and preview multiple image files (JPEG, PNG, GIF, WebP)
- Convert images into a single PDF document
- Batch conversion support (up to 20 images)

### 📎 PDF Merger
- Combine up to 10 PDF documents into one
- Drag-and-drop or click-to-select interface
- Preview files before merging

### 📝 PDF Text Extractor
- Extract and view text from PDF files
- Copy extracted content to clipboard
- Export text as a `.txt` file

---

## ⚙️ Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **UI**: Tailwind CSS + Shadcn/UI
- **PDF Handling**: [`pdf-lib`](https://pdf-lib.js.org/)
- **Routing & State**:
  - React Router
  - Tanstack React Query

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v16+ recommended)
- npm or bun (whichever you prefer)

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/LahiruZaM/Pixify.git

# Navigate to the project directory
cd pixify-pdf-alchemy

# Install dependencies
npm install

# Start the dev server
npm run dev
