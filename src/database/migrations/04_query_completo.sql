BEGIN; -- Inicia bloque atómico

-- Paso 1: Insertar usuario aprendiz pendiente de verificación
INSERT INTO users (id, email, password_hash, role, is_verified) 
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'aprendiz.adso@misena.edu.co',
    '$2a$12$k9L2m4n6p8q0r2t4v6x8.z0a2c4e6g8i0k2m4n6p8q0r2t4v6x8z0',
    'user',
    FALSE
);

-- Paso 2: Emitir token con expiración calculada a 24 horas exactas
INSERT INTO verification_tokens (user_id, token, expires_at)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    encode(gen_random_bytes(32), 'hex'), -- 64 caracteres hexadecimales
    NOW() + INTERVAL '24 hours'
);

COMMIT; 