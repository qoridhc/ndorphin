package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointDeleteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.service.interfaces.UserService;
import com.web.ndolphin.util.LogUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "사용자 컨트롤러", description = "사용자 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Jenkins 테스트", description = "Jenkins 서버 테스트를 위한 API입니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "성공적으로 응답했습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/jenkins-test")
    public ResponseEntity<ResponseDto> test() {
        return ResponseDto.success();
    }

    // ====== User CRUD ======
    @Operation(summary = "사용자 조회", description = "ID로 사용자를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "사용자 정보 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto> getUser(
        @Parameter(description = "조회할 사용자의 ID", required = true) @PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.getUser(userId);

        return response;
    }

    @Operation(summary = "사용자 삭제", description = "ID로 사용자를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "사용자 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseDto> deleteUser(
        @Parameter(description = "삭제할 사용자의 ID", required = true) @PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.deleteUser(userId);

        return response;
    }

    @Operation(summary = "사용자 수정", description = "ID로 사용자를 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "사용자 수정 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @PutMapping("/{userId}")
    public ResponseEntity<ResponseDto> updateUser(
        @Parameter(description = "수정할 사용자의 ID", required = true) @PathVariable("userId") Long userId,
        @Parameter(description = "수정할 사용자 정보", required = true) @RequestPart(name = "request") UserUpdateRequestDto updateDto,
        @Parameter(description = "사용자 프로필 이미지 (선택 사항)") @RequestPart(name = "file", required = false) MultipartFile profileImage
    ) {

        ResponseEntity<ResponseDto> response = userService.updateUser(userId, updateDto, profileImage);

        return response;
    }

    @Operation(summary = "사용자 프로필 이미지 삭제", description = "ID로 사용자의 프로필 이미지를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "프로필 이미지 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/image/{userId}")
    public ResponseEntity<ResponseDto> deleteProfile(
        @Parameter(description = "프로필 이미지를 삭제할 사용자의 ID", required = true) @PathVariable("userId") Long userId) {
        ResponseEntity<ResponseDto> response = userService.deleteProfile(userId);
        return response;
    }


    @GetMapping("/nickname-check")
    @Operation(summary = "닉네임 중복 확인",
        description = "닉네임의 중복 여부를 확인합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "사용 가능한 닉네임"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })

    public ResponseEntity<ResponseDto> checkNickName(
        @Parameter(description = "확인할 닉네임", required = true)
        @RequestParam("nickName") String nickName
    ) {

        LogUtil.info("checkNickName" + nickName);

        ResponseEntity<ResponseDto> response = userService.checkNickName(nickName);
        return response;
    }

    // ====== Favorite CRUD ======
    @Operation(summary = "즐겨찾기 조회", description = "사용자의 즐겨찾기를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "즐겨찾기 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "즐겨찾기를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<ResponseDto> getFavoritesByUserId(
        @Parameter(description = "조회할 사용자의 ID", required = true) @PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = userService.getFavorites(userId);

        return response;
    }

    @Operation(summary = "즐겨찾기 추가", description = "새로운 즐겨찾기를 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "즐겨찾기 추가 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{userId}/favorites")
    public ResponseEntity<ResponseDto> addFavorite(
        @Parameter(description = "추가할 즐겨찾기 정보", required = true) @RequestBody FavoriteRequestDto favoriteRequestDto) {

        ResponseEntity<ResponseDto> response = userService.addFavorite(favoriteRequestDto);

        return response;
    }

    @Operation(summary = "즐겨찾기 삭제", description = "기존 즐겨찾기를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "즐겨찾기 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "즐겨찾기를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{userId}/favorites/{boardId}")
    public ResponseEntity<ResponseDto> removeFavorite(
        @Parameter(description = "삭제할 사용자의 ID", required = true) @PathVariable Long userId,
        @Parameter(description = "삭제할 보드의 ID", required = true) @PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = userService.removeFavorite(userId, boardId);

        return response;
    }

    // ====== nPoint CRUD ======
    @Operation(summary = "nPoint 추가", description = "새로운 nPoint를 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "nPoint 추가 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{userId}/npoint")
    public ResponseEntity<ResponseDto> addNPoint(
        @Parameter(description = "추가할 사용자의 ID", required = true) @PathVariable Long userId,
        @Parameter(description = "추가할 nPoint 정보", required = true) @RequestBody NPointRequestDto nPointRequestDto) {

        ResponseEntity<ResponseDto> response = userService.addNPoint(userId, nPointRequestDto);

        return response;
    }

    @Operation(summary = "nPoint 삭제", description = "기존 nPoint를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "nPoint 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "nPoint를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{userId}/npoint")
    public ResponseEntity<ResponseDto> deleteNPoint(
        @Parameter(description = "삭제할 사용자의 ID", required = true) @PathVariable Long userId,
        @Parameter(description = "삭제할 nPoint 정보", required = true) @RequestBody NPointDeleteRequestDto nPointDeleteRequestDto) {

        ResponseEntity<ResponseDto> response = userService.deleteNPoint(userId,
            nPointDeleteRequestDto);

        return response;
    }

}
