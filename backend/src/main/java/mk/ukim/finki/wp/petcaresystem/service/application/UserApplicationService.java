package mk.ukim.finki.wp.petcaresystem.service.application;


import mk.ukim.finki.wp.petcaresystem.model.dto.LoginUserRequestDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.LoginUserResponseDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.RegisterUserRequestDto;
import mk.ukim.finki.wp.petcaresystem.model.dto.RegisterUserResponseDto;

import java.util.Optional;

public interface UserApplicationService {
    Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto);

    Optional<RegisterUserResponseDto> findByUsername(String username);

}

