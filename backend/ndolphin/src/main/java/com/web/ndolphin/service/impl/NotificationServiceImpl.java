package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Notification;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.dto.notification.response.CheckNotificationResposeDto;
import com.web.ndolphin.dto.notification.response.NotificationResponseDto;
import com.web.ndolphin.mapper.NotificationMapper;
import com.web.ndolphin.repository.NotificationRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.NotificationService;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ResponseDto> create(Long userId, NotificationRequestDto dto) {

        try {
            User user = userRepository.findByUserId(userId);
            User writer = userRepository.findByUserId(dto.getWriterId());

            if (user == null) {
                return ResponseDto.databaseError();
            }

            Notification notification = NotificationMapper.toEntity(user, writer, dto);

            notificationRepository.save(notification);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<ResponseDto> selectAllByUserId(Long userId) {

        try {
            List<Notification> notifications = notificationRepository.findAllByUserId(userId);

            // 알림이 있는 경우, isRead 값을 true로 업데이트합니다.
            if (!notifications.isEmpty()) {
                for (Notification notification : notifications) {
                    notification.setRead(true); // isRead를 true로 설정
                }
                notificationRepository.saveAll(notifications); // 변경된 알림 목록을 저장
            }

            List<NotificationResponseDto> responseList = NotificationMapper.toDtoList(notifications);

            ResponseDto<List<NotificationResponseDto>> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                responseList
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteAllByUserId(Long userId) {

        try {

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist : " + userId));

            notificationRepository.deleteAllByUser_UserId(userId);

            return ResponseDto.success();
        } catch (IllegalArgumentException e) {
            return ResponseDto.databaseError(e.getMessage());
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }


    @Override
    public ResponseEntity<ResponseDto> checkUnReadNotifications(Long userId) {

        try {
            boolean existUnReadNotification = notificationRepository.existsByUserIdAndIsReadFalse(userId);

            CheckNotificationResposeDto response = new CheckNotificationResposeDto(existUnReadNotification);

            ResponseDto<CheckNotificationResposeDto> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                response
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

}
