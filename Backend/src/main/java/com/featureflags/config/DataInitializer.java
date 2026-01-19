package com.featureflags.config;

import com.featureflags.entity.FeatureFlag;
import com.featureflags.repository.FeatureFlagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final FeatureFlagRepository featureFlagRepository;

    public DataInitializer(FeatureFlagRepository featureFlagRepository) {
        this.featureFlagRepository = featureFlagRepository;
    }

    @Bean
    @Profile("dev")
    public CommandLineRunner initData() {
        return args -> {
            log.info("Initializing sample data...");

            List<FeatureFlag> initialFlags = Arrays.asList(
                    FeatureFlag.builder()
                            .key("NEW_DASHBOARD")
                            .description("Enable the new dashboard layout")
                            .enabled(false)
                            .build(),
                    FeatureFlag.builder()
                            .key("BETA_CHAT")
                            .description("Enable beta chat features")
                            .enabled(false)
                            .build(),
                    FeatureFlag.builder()
                            .key("DARK_MODE")
                            .description("Enable dark mode theme")
                            .enabled(true)
                            .build()
            );

            for (FeatureFlag flag : initialFlags) {
                if (featureFlagRepository.findByKey(flag.getKey()).isEmpty()) {
                    featureFlagRepository.save(flag);
                    log.info("Created feature flag: {}", flag.getKey());
                } else {
                    log.info("Feature flag already exists: {}", flag.getKey());
                }
            }
        };
    }
}
