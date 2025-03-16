<h1 align="center">Secure-Store</h1>

Secure-Store is a privacy-focused, end-to-end encrypted password manager designed with a zero-trust architecture. It ensures that your sensitive credentials remain secure and accessible only to you. Built with a Go backend and a Vite-powered React web extension, Secure-Store leverages `libsodium` for advanced cryptographic security.

## Features

- **End-to-End Encryption**: All stored passwords are encrypted client-side using `libsodium` before being sent to the server.
- **Zero-Trust Architecture**: The server never has access to your plaintext passwords; only the client can decrypt them.
- **Go Backend**: A lightweight and secure backend for handling user authentication and storage.
- **Vite + React Web Extension**: A fast and modern UI to manage your credentials conveniently in your browser.
- **Secure Key Management**: Utilizes modern cryptographic principles to ensure strong password security.
<!-- - **Cross-Platform**: Works on all major browsers with seamless synchronization. -->

## Installation

### Backend (Go Server)

```sh
# Clone the repository
git clone https://github.com/anandukch/secure-store.git
cd secure-store

cd backend

# run server
make server-dev

# using docker in dev mode
make docker compose -f docker-compose.dev.yml up --build
```

### Web Extension (Vite + React)

```sh
cd extension

# Install dependencies
npm run dev:chrome
```

## Security

Secure-Store follows industry best practices:

- Uses `libsodium` for encryption (AES-GCM, XChaCha20-Poly1305)
- Strong client-side key derivation using Argon2
- Secure authentication with token-based access
- Regular security updates

## Contribution Guidelines

We welcome contributions from developers passionate about security and privacy. Here’s how you can contribute:

1. **Fork the Repository**: Start by forking the project on GitHub.
2. **Create a Feature Branch**: Work on your contributions in an isolated branch.
3. **Write Clean, Secure Code**: Follow best security practices when implementing new features.
4. **Submit a Pull Request**: Once your code is tested and verified, submit a PR for review.

<!-- For more details, check our [CONTRIBUTING.md](CONTRIBUTING.md). -->

<!-- ## Community & Support

- Join our **Discord** or **Slack** for discussions and support.
- Follow us on **Twitter** for updates and announcements.
- Report issues or feature requests on **GitHub Issues**. -->

## License

This project is licensed under the MIT License.
