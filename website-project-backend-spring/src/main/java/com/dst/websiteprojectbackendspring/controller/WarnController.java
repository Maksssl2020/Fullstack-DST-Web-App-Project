package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.warn.WarnDTO;
import com.dst.websiteprojectbackendspring.model.warn.WarnRequest;
import com.dst.websiteprojectbackendspring.service.warn.WarnServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/warns")
@RequiredArgsConstructor
public class WarnController {

    private final WarnServiceImpl warnService;

    @GetMapping("/{userId}/get-non-reads")
    public ResponseEntity<List<WarnDTO>> findALlUserNonReadWarns(@PathVariable Long userId) {
        return ResponseEntity.ok(warnService.findAllNonReadUserWarns(userId));
    }

    @GetMapping("/{userId}/get-all")
    public ResponseEntity<List<WarnDTO>> findALlUserWarns(@PathVariable Long userId) {
        return ResponseEntity.ok(warnService.findAllUserWarns(userId));
    }

    @PostMapping("/{userId}/send-warn")
    public ResponseEntity<HttpStatus> saveWarn(@PathVariable Long userId, @RequestBody WarnRequest warnRequest) {
        warnService.saveWarn(userId, warnRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
