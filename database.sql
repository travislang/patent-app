CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR (20) UNIQUE NOT NULL,
    "password" VARCHAR (255) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "signature_name" VARCHAR(70),
    "registration_number" VARCHAR(10),
    "phone_number" VARCHAR(20),
    "firm_name" VARCHAR(70),
    "uspto_customer_number" VARCHAR(9),
    "deposit_account_number" VARCHAR(9),
    "active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "application" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "applicant_name" VARCHAR(60),
    "status" VARCHAR(50),
    "last_checked_date" DATE,
    "status_date" DATE,
    "application_number" VARCHAR(20),
    "title" VARCHAR(100),
    "inventor_name" VARCHAR(60),
    "inactive" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "office_action" (
    "id" SERIAL PRIMARY KEY,
    "application_id" INTEGER REFERENCES "application",
    "response_due_date" DATE,
    "response_sent_date" DATE,
    "status_id" INTEGER REFERENCES "status"
);

CREATE TABLE "status" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR(30),
    "color" VARCHAR(10)
);

CREATE TABLE "rejection_reason" (
    "id" SERIAL PRIMARY KEY,
    "reason" VARCHAR(30)
);

CREATE TABLE "strategy" (
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR(100)    
);

CREATE TABLE "template" (
    "id" SERIAL PRIMARY KEY,
    "strategy_id" INTEGER REFERENCES "strategy",
    "name" VARCHAR(60),
    "content" VARCHAR(1000)
);

CREATE TABLE "issue" (
    "id" SERIAL PRIMARY KEY,
    "office_action_id" INTEGER REFERENCES "office_action",
    "rejection_reason_id" INTEGER REFERENCES "rejection_reason",
    "claims" VARCHAR(30),
    "need_peer_approval" BOOLEAN DEFAULT FALSE,
    "need_client_approval" BOOLEAN DEFAULT FALSE,
    "peer_approved" BOOLEAN DEFAULT FALSE,
    "client_approved" BOOLEAN DEFAULT FALSE,
    "template_id" INTEGER REFERENCES "template",
    "comment" VARCHAR(255),
    "comment_peer_review" VARCHAR(255),
    "comment_client_review" VARCHAR(255)
);

CREATE TABLE "field_code" (
    "id" SERIAL PRIMARY KEY,
    "code" VARCHAR(20),
    "description" VARCHAR(100)
);
