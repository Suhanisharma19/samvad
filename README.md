# Samvaad - Every gesture has a voice

Samvaad is a modern web application that converts sign language to text in real-time using advanced AI technology. The platform aims to break communication barriers between sign language users and others by providing instant translation and text-to-speech capabilities.

## Features

- Real-time sign language detection and translation
- Text-to-speech conversion
- Interactive recording studio with pause/resume functionality
- Comprehensive sign language learning resources
- Modern, responsive UI with accessibility features
- User authentication and profile management

## Tech Stack

- React 18 with TypeScript
- Material-UI for component library
- Tailwind CSS for styling
- React Router for navigation
- React Webcam for video capture
- Web Speech API for text-to-speech

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/samvaad.git
cd samvaad
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
samvaad/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Application entry point
├── public/            # Static assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape Samvaad
- Special thanks to the sign language community for their feedback and support 