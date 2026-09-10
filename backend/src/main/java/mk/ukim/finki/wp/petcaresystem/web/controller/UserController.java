package mk.ukim.finki.wp.petcaresystem.web.controller;


import mk.ukim.finki.wp.petcaresystem.model.domain.User;
import mk.ukim.finki.wp.petcaresystem.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.RegisterUserResponseDto;
import mk.ukim.finki.wp.petcaresystem.service.application.UserApplicationService;
import mk.ukim.finki.wp.petcaresystem.service.domain.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserApplicationService userApplicationService;
    private final UserService userService;

    public UserController(UserApplicationService userApplicationService, UserService userService) {
        this.userApplicationService = userApplicationService;
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<RegisterUserResponseDto> findByUsername(@PathVariable String username) {
        return userApplicationService
                .findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<RegisterUserResponseDto> me(@AuthenticationPrincipal User user) {
        return userApplicationService
                .findByUsername(user.getUsername())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(@RequestBody RegisterUserRequestDto registerUserRequestDto) {
        return userApplicationService
                .register(registerUserRequestDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> login(@RequestBody LoginUserRequestDto loginUserRequestDto) {
        return userApplicationService
                .login(loginUserRequestDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

}
