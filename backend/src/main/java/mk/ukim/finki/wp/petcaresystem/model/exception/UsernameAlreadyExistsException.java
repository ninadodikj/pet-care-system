package mk.ukim.finki.wp.petcaresystem.model.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username) {
        super("User with username '%s' already exists.".formatted(username));
    }

}
