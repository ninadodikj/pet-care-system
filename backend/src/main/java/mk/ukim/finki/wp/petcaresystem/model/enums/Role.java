package mk.ukim.finki.wp.petcaresystem.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_USER,
    ROLE_VETERINARIAN ;

    @Override
    public String getAuthority() {
        return name();
    }
}
