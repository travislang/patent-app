CREATE DATABASE "patent_app";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR (20) UNIQUE NOT NULL,
    "password" VARCHAR (255) NOT NULL,
    "is_admin" BOOLEAN DEFAULT FALSE,
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
    "filed_date" DATE,
    "last_checked_date" DATE,
    "status_date" DATE,
    "application_number" VARCHAR(20),
    "title" VARCHAR(100),
    "inventor_name" VARCHAR(60),
    "examiner_name" VARCHAR(60),
    "group_art_unit" VARCHAR(10),
    "docket_number" VARCHAR(20),
    "confirmation_number" VARCHAR(5),
    "inactive" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "status" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR(30),
    "color" VARCHAR(10)
);

CREATE TABLE "office_action" (
    "id" SERIAL PRIMARY KEY,
    "application_id" INTEGER REFERENCES "application",
    "uspto_mailing_date" DATE,
    "response_sent_date" DATE,
    "uspto_status" VARCHAR(50),
    "status_id" INTEGER REFERENCES "status"
);

CREATE TABLE "template_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(80),
    "section" VARCHAR(50)
);

CREATE TABLE "template" (
    "id" SERIAL PRIMARY KEY,
    "type_id" INTEGER REFERENCES "template_type",
    "template_name" VARCHAR(60),
    "content" TEXT,
    "user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "issue" (
    "id" SERIAL PRIMARY KEY,
    "office_action_id" INTEGER REFERENCES "office_action",
    "template_type_id" INTEGER REFERENCES "template_type",
    "claims" VARCHAR(30),
    "template_id" INTEGER REFERENCES "template"
);

CREATE TABLE "response_text" (
    "id" SERIAL PRIMARY KEY,
    "issue_id" INTEGER REFERENCES "issue",
    "text" TEXT
);

CREATE TABLE "field_code" (
    "id" SERIAL PRIMARY KEY,
    "code" VARCHAR(20),
    "description" VARCHAR(100)
);

-- The following command makes the initial user account, which is necessary
-- because the register route only allows authenticated users.
-- The initial account is username admin and password admin.
-- Be sure to edit this account to change BOTH the username and password.
-- DO NOT leave this account unmodified on a live server.
INSERT INTO "user" ("user_name", "password", "is_admin")
VALUES
('admin', '$2b$10$jGgyR6x7KyoQwowqxJHGlujj2KpUssCzzIjmKIAzJ3itZ8P55MOE.', 'true'), --pw admin

-- Populate values for status
INSERT INTO "status" ("status") VALUES ('Pending'), ('Inactive'), ('Active');

-- Populate template types 
INSERT INTO "template_type" ("type", "section")
VALUES
('Claim Rejection - § 101', 'issue'),
('Claim Rejection - § 102', 'issue'),
('Claim Rejection - § 103', 'issue'),
('Claim Rejection - § 112', 'issue'),
('Double Patenting', 'issue'),
('Objections to the Drawings', 'issue'),
('Objections to the Claims', 'issue'),
('Objections to the Specification', 'issue'),
('Claim Interpretation', 'issue'),
('Allowable Subject Matter', 'issue'),
('Interview Summary', 'amendment'),
('Drawings Amendments', 'amendment'),
('Claims Amendment', 'amendment'),
('Specification Amendments', 'amendment'),
('Coversheet Introduction', 'header'),
('Header', 'header'),
('Remarks Introduction', 'header'),
('Conclusion', 'footer');

-- Populate tempaltes
INSERT INTO "template" ("type_id", "template_name", "content")
VALUES
( (SELECT "id" FROM "template_type" WHERE "type"='Claim Rejection - § 103'),
    '209 Rejection § 103',
    'In the Office Action, claim{claim(s)is/are} rejected under 35 U.S.C. § 103 '
    'as allegedly being unpatentable over the referenced publications. Neither '
    'the correctness of the characterizations of this reference and the '
    'pending application nor the sufficiency of the rejection is conceded. '
    'This rejection is respectfully traversed. Reconsideration and allowance '
    'of claim{claim(s)} is respectfully requested.'
),
( (SELECT "id" FROM "template_type" WHERE "type"='Claim Rejection - § 103'),
    '209 Rejection § 103 Based On Interview',
    'As discussed during the interview, the independent claims have been amended '
    'with subject matter related to the aforementioned references. For at least '
    'the foregoing reasons, it is respectfully submitted that all of the independent '
    'claims are in condition for allowance. Based at least on their respective '
    'dependence from the independent claims, any dependent claims are also allowable. '
    'Accordingly, it is respectfully requested that all outstanding rejections of '
    'the claims be withdrawn and that claim{claims(s)} be allowed.'
),
( (SELECT "id" FROM "template_type" WHERE "type"='Claim Rejection - § 103'),
    '209 Rejection § 103 Incorporate Allowable Subject Matter',
    'Do not use this template'
),
( (SELECT "id" FROM "template_type" WHERE "type"='Claim Rejection - § 103'),
    '209 Rejection § 103 AMD',
    'Nonetheless, independent claim{claim(s)is/are} amended to recite "***." '
    'Applicant respectfully asserts that the reference does not teach or suggest '
    'this element. Accordingly, claim{claim(s)is/are} allowable over the reference, '
    'as well as any claims that are dependent thereon.'
);