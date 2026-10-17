CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email 
ON users(email);

-- Índice para acelerar la verificación de token en el link de Resend:
CREATE UNIQUE INDEX IF NOT EXISTS idx_tokens_token 
ON verification_tokens(token);

-- Índice para acelerar el borrado en cascada y JOINs:
CREATE INDEX IF NOT EXISTS idx_tokens_user_id 
ON verification_tokens(user_id);