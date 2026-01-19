package com.featureflags.controller;

import com.featureflags.dto.FeatureFlagRequest;
import com.featureflags.dto.FeatureFlagResponse;
import com.featureflags.dto.ToggleFlagRequest;
import com.featureflags.service.FeatureFlagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flags")
public class FeatureFlagController {

    private final FeatureFlagService featureFlagService;

    public FeatureFlagController(FeatureFlagService featureFlagService) {
        this.featureFlagService = featureFlagService;
    }

    @PostMapping
    public ResponseEntity<FeatureFlagResponse> createFeatureFlag(@RequestBody FeatureFlagRequest request) {
        FeatureFlagResponse response = featureFlagService.createFeatureFlag(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<FeatureFlagResponse>> getAllFeatureFlags() {
        return ResponseEntity.ok(featureFlagService.getAllFeatureFlags());
    }

    @PatchMapping("/{key}")
    public ResponseEntity<FeatureFlagResponse> toggleFeatureFlag(
            @PathVariable String key,
            @RequestBody ToggleFlagRequest request) {
        FeatureFlagResponse response = featureFlagService.toggleFeatureFlag(key, request.getEnabled());
        return ResponseEntity.ok(response);
    }
}
