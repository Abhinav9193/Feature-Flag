package com.featureflags.controller;

import com.featureflags.dto.FeatureFlagResponse;
import com.featureflags.service.FeatureFlagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/flags")
public class PublicFlagController {

    private final FeatureFlagService featureFlagService;

    public PublicFlagController(FeatureFlagService featureFlagService) {
        this.featureFlagService = featureFlagService;
    }

    @GetMapping
    public ResponseEntity<List<FeatureFlagResponse>> getActiveFlags() {
        return ResponseEntity.ok(featureFlagService.getActiveFlags());
    }
}
