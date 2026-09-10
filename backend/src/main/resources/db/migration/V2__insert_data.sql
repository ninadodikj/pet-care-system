-- USERS
INSERT INTO users (created_at, updated_at, name, surname, email, username, password, role)
VALUES
    (NOW(), NOW(), 'Nina', 'Dodik', 'nina@example.com', 'nina', 'nina', 'ROLE_USER'),
    (NOW(), NOW(), 'Alex', 'Alex', 'alex@example.com', 'alex', 'alex', 'ROLE_USER'),
    (NOW(), NOW(), 'Ana', 'Vet', 'ana@example.com', 'ana.vet', 'ana', 'ROLE_VETERINARIAN');


-- PETS
INSERT INTO pets (created_at, updated_at, name, species, breed, gender, birth_date, weight, owner_id)
VALUES
    (NOW(), NOW(), 'Rex', 'Dog', 'French Bulldog', 'MALE', '2022-05-10', 12.5, 1),
    (NOW(), NOW(), 'Luna', 'Cat', 'British Shorthair', 'FEMALE', '2021-08-20', 4.8, 1),
    (NOW(), NOW(), 'Max', 'Dog', 'Golden Retriever', 'MALE', '2020-03-15', 28.4, 2);


-- APPOINTMENTS
INSERT INTO appointments (created_at, updated_at, date, time, reason, status, notes, pet_id)
VALUES
    (NOW(), NOW(), '2026-09-15', '10:00:00',
     'Regular check-up', 'SCHEDULED', 'Annual health examination', 1),

    (NOW(), NOW(), '2026-09-18', '14:30:00',
     'Vaccination', 'SCHEDULED', 'Rabies vaccination', 2),

    (NOW(), NOW(), '2026-09-20', '11:00:00',
     'Dental check-up', 'FINISHED', 'Dental examination completed', 3);