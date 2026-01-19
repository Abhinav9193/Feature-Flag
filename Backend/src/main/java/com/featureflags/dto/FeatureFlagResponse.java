package com.featureflags.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class FeatureFlagResponse {
    private Long id;
    private String key;
    private String description;
    private boolean enabled;
    private LocalDateTime updatedAt;

    public FeatureFlagResponse() {
    }

    public FeatureFlagResponse(Long id, String key, String description, boolean enabled, LocalDateTime updatedAt) {
        this.id = id;
        this.key = key;
        this.description = description;
        this.enabled = enabled;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static FeatureFlagResponseBuilder builder() {
        return new FeatureFlagResponseBuilder();
    }

    public static class FeatureFlagResponseBuilder {
        private Long id;
        private String key;
        private String description;
        private boolean enabled;
        private LocalDateTime updatedAt;

        FeatureFlagResponseBuilder() {
        }

        public FeatureFlagResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public FeatureFlagResponseBuilder key(String key) {
            this.key = key;
            return this;
        }

        public FeatureFlagResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public FeatureFlagResponseBuilder enabled(boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        public FeatureFlagResponseBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public FeatureFlagResponse build() {
            return new FeatureFlagResponse(id, key, description, enabled, updatedAt);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeatureFlagResponse that = (FeatureFlagResponse) o;
        return enabled == that.enabled && Objects.equals(id, that.id) && Objects.equals(key, that.key) && Objects.equals(description, that.description) && Objects.equals(updatedAt, that.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, key, description, enabled, updatedAt);
    }

    @Override
    public String toString() {
        return "FeatureFlagResponse{" +
                "id=" + id +
                ", key='" + key + '\'' +
                ", description='" + description + '\'' +
                ", enabled=" + enabled +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
