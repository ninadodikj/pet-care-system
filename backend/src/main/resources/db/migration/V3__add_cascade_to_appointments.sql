ALTER TABLE appointments
DROP CONSTRAINT appointments_pet_id_fkey;

ALTER TABLE appointments
    ADD CONSTRAINT appointments_pet_id_fkey
        FOREIGN KEY (pet_id)
            REFERENCES pets(id)
            ON DELETE CASCADE;