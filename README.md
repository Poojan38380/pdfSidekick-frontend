# PDFSidekick - Frontend

A modern web application that allows users to upload PDF documents and ask questions about their content using AI-powered natural language processing.

![PDFSidekick Banner](public/logo.png)

## Overview

PDFSidekick is a full-stack application that provides an intuitive interface for users to:

- Upload PDF documents
- View and manage their document library
- Ask questions about the content of their PDFs
- Get AI-powered answers extracted from the document content

The frontend communicates with a dedicated backend service that handles document processing, storage, and natural language processing.

## Technology Stack

- **Framework**: Next.js 15.3.0 with App Router
- **Language**: TypeScript
- **UI Components**: Custom components using Radix UI primitives
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **API Communication**: Server Actions for secure backend interactions
- **PDF Handling**: react-pdf for document viewing/rendering
- **File Upload**: react-dropzone for drag-and-drop file handling
- **Data Fetching**: React Server Components and Server Actions

## Features

- **Secure Authentication**: User login and registration system
- **Dashboard Interface**: Clean, responsive dashboard to manage documents
- **PDF Management**:
  - Upload PDFs with title and description
  - View upload and processing status
  - Browse and search personal document library
- **PDF Viewer**: Built-in PDF viewer with question-answering capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing Updates**: Status indicators for document processing

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Backend API service (see related backend repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pdfsidekick-frontend.git
   cd pdfsidekick-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root with:

   ```env
   BACKEND_URL=http://localhost:8000
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure

```
├── app/                  # Application code using Next.js App Router
│   ├── (home)/           # Public home page
│   ├── dashboard/        # Dashboard and PDF management
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                  # Utility libraries and helpers
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── prisma/               # Database schema and migrations
├── services/             # Backend service integrations
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Development

### Adding New Features

1. Create components in the `components/` directory
2. Add pages in the appropriate directories under `app/`
3. Use Server Actions in `app/*/actions/` for data fetching/mutation

### Styling

This project uses Tailwind CSS for styling. Configure the theme in `tailwind.config.ts`.

## Deployment

The application can be deployed to Vercel or any platform supporting Next.js:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Environment Variables

- `BACKEND_URL`: URL of the backend API service
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `NEXTAUTH_URL`: Your application's base URL

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

[MIT License](LICENSE)

## Related Projects

- [PDFSidekick Backend](https://github.com/Poojan38380/pdfSidekick-backend) - Backend API service
