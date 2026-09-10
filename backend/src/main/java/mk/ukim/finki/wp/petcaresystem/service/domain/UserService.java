package mk.ukim.finki.wp.petcaresystem.service.domain;

import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> findByUsername(String username);

    User register(User user);

    User login(String username, String password);

    Optional<User> findById(Long id);
}
