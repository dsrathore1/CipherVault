import hashlib

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200


def test_hash_endpoint_returns_correct_sha256():
    response = client.post("/hash", json={"text": "hello"})

    expected_hash = hashlib.sha256(b"hello").hexdigest()

    assert response.status_code == 200
    assert response.json()["hash"] == expected_hash


def test_hash_endpoint_returns_64_character_digest():
    response = client.post("/hash", json={"text": "CipherVault"})

    assert response.status_code == 200
    assert len(response.json()["hash"]) == 64
