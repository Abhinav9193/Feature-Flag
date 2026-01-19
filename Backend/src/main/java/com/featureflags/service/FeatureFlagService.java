package com.featureflags.service;

import com.featureflags.dto.FeatureFlagRequest;
import com.featureflags.dto.FeatureFlagResponse;
import com.featureflags.entity.FeatureFlag;
import com.featureflags.exception.FeatureFlagException;
import com.featureflags.exception.ResourceNotFoundException;
import com.featureflags.repository.FeatureFlagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeatureFlagService {

    private static final Logger log = LoggerFactory.getLogger(FeatureFlagService.class);

    private final FeatureFlagRepository featureFlagRepository;

    public FeatureFlagService(FeatureFlagRepository featureFlagRepository) {
        this.featureFlagRepository = featureFlagRepository;
    }

    @Transactional
    @CacheEvict(value = "active_flags", allEntries = true)
    public FeatureFlagResponse createFeatureFlag(FeatureFlagRequest request) {
        log.info("Creating feature flag with key: {}", request.getKey());
        
        if (featureFlagRepository.findByKey(request.getKey().toUpperCase()).isPresent()) {
            throw new FeatureFlagException("Feature flag with key '" + request.getKey() + "' already exists");
        }

        FeatureFlag featureFlag = FeatureFlag.builder()
                .key(request.getKey())
                .description(request.getDescription())
                .enabled(Boolean.TRUE.equals(request.getEnabled()))
                .build();

        FeatureFlag savedFlag = featureFlagRepository.save(featureFlag);
        return mapToResponse(savedFlag);
    }

    @Transactional(readOnly = true)
    public List<FeatureFlagResponse> getAllFeatureFlags() {
        return featureFlagRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    @CacheEvict(value = "active_flags", allEntries = true)
    public FeatureFlagResponse toggleFeatureFlag(String key, boolean enabled) {
        log.info("Toggling feature flag '{}' to {}", key, enabled);
        
        FeatureFlag featureFlag = featureFlagRepository.findByKey(key.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Feature flag not found with key: " + key));

        featureFlag.setEnabled(enabled);
        FeatureFlag updatedFlag = featureFlagRepository.save(featureFlag);
        return mapToResponse(updatedFlag);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "active_flags")
    public List<FeatureFlagResponse> getActiveFlags() {
        log.info("Fetching active feature flags (Not cached)");
        return featureFlagRepository.findAll().stream()
                .filter(FeatureFlag::isEnabled)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FeatureFlagResponse mapToResponse(FeatureFlag featureFlag) {
        return FeatureFlagResponse.builder()
                .id(featureFlag.getId())
                .key(featureFlag.getKey())
                .description(featureFlag.getDescription())
                .enabled(featureFlag.isEnabled())
                .updatedAt(featureFlag.getUpdatedAt())
                .build();
    }
}
