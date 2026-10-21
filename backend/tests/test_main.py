
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


def test_hash_endpoint_rejects_empty_text():
    response = client.post("/hash", json={"text": ""})

    assert response.status_code == 422


def test_hash_endpoint_rejects_text_over_1000_characters():
    response = client.post("/hash", json={"text": "a" * 1001})

    assert response.status_code == 422


def test_hash_endpoint_rejects_missing_text():
    response = client.post("/hash", json={})

    assert response.status_code == 422


def test_hash_endpoint_rejects_non_string_text():
    response = client.post("/hash", json={"text": 123})

    assert response.status_code == 422
