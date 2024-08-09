package com.web.ndolphin.dto.npoint.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NPointDeleteRequestDto {

    @NotNull(message = "삭제할 pointId 가 null입니다.")
    private Long pointId;
}
