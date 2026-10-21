
export const learningContent = {
    "Beginner Friendly": {
        title: "Cryptography Made Simple",
        description:
            "Cryptography helps protect information so that it can be kept private, checked for changes, or used to prove who created a message.",
        examples: [
            {
                heading: "Everyday example",
                text: "Think of a locked box. Only someone with the correct key should be able to open it.",
            },
            {
                heading: "What you will learn",
                text: "Explore security concepts step by step with simple explanations and practical examples.",
            },
        ],
    },

    "Three Core Topics": {
        title: "Explore Three Core Topics",
        description:
            "CipherVault introduces three important cryptographic concepts, each designed for a different purpose.",
        examples: [
            {
                heading: "SHA-256 (Secure Hash Algorithm 2, 256-bit variant)",
                text: "SHA-256 (Secure Hash Algorithm 2, 256-bit variant) is a cryptographic hash function that maps data of any size to a 256-bit digest, commonly displayed as 64 hexadecimal characters. The same input always produces the same digest, and a small input change typically produces a very different result. It is designed to make recovering the input from its digest computationally infeasible, though collisions are possible in principle. Hashing can help check data integrity, but it does not conceal data; passwords should be protected with a dedicated password-hashing algorithm and a unique salt.",
            },
            {
                heading: "RSA (Rivest–Shamir–Adleman)",
                text: "RSA (Rivest–Shamir–Adleman) is a public-key cryptographic system built around a mathematically related key pair. The public key can be shared: it can encrypt data that only the matching private key can decrypt. This system can also support digital signatures, in which the private key signs data and the public key verifies the signature. Because it is slower than symmetric encryption and can encrypt only limited amounts of data at a time, real systems commonly use it to protect a short symmetric key rather than a large message or file. Secure implementations require modern padding, suitable key sizes, and careful protection of the private key. CipherVault demonstrates the basic encryption and decryption flow for learning; it is not a substitute for production-grade cryptographic libraries or key management.",
            },
            {
                heading: "ECC (Elliptic Curve Cryptography)",
                text: "Elliptic Curve Cryptography (ECC) is a family of public-key methods based on mathematical operations with points on elliptic curves over finite fields. Its security relies on the difficulty of deriving a private key from its public key, while offering comparatively small keys that can reduce storage and communication costs. This family is not a single algorithm: schemes such as ECDH (Elliptic Curve Diffie–Hellman) establish a shared secret, while ECDSA (Elliptic Curve Digital Signature Algorithm) and EdDSA (Edwards-curve Digital Signature Algorithm) create digital signatures. In a signature workflow, the private key signs a message and the matching public key verifies that the signature is valid, helping confirm its origin and detect changes. A signature does not encrypt or hide the message. CipherVault demonstrates signing and verification for learning; secure real-world use also requires trusted cryptographic libraries and careful key management.",
            },
        ],
    },

    "Practical Learning": {
        title: "Learn by Doing",
        description:
            "Instead of only reading definitions, you can try cryptographic operations and observe their results.",
        examples: [
            {
                heading: "Generate a hash",
                text: "Enter text and generate its SHA-256 (Secure Hash Algorithm 2, 256-bit variant) hash to see its digital fingerprint.",
            },
            {
                heading: "Try RSA",
                text: "Encrypt a message and decrypt it to understand the role of public and private keys.",
            },
            {
                heading: "Try ECC",
                text: "Sign a message and verify its signature to understand how digital signatures work.",
            },
        ],
    },

    "Future Ready": {
        title: "Connect Concepts to Real-World Security",
        description:
            "Cryptographic techniques are important building blocks in secure communication, software integrity, and digital identity.",
        examples: [
            {
                heading: "Data integrity",
                text: "Hashing can help detect whether data has changed.",
            },
            {
                heading: "Confidentiality",
                text: "Encryption can help keep information private when used correctly.",
            },
            {
                heading: "Authenticity",
                text: "Digital signatures can help verify the origin and integrity of signed data.",
            },
        ],
    },
};
