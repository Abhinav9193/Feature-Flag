package com.featureflags.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "feature_flags")
public class FeatureFlag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flag_key", unique = true, nullable = false)
    private String key;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public FeatureFlag() {
    }

    public FeatureFlag(Long id, String key, String description, boolean enabled, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.key = key;
        this.description = description;
        this.enabled = enabled;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (key != null) {
            key = key.toUpperCase();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (key != null) {
            key = key.toUpperCase();
        }
    }

    // Getters and Setters
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Builder Pattern
    public static FeatureFlagBuilder builder() {
        return new FeatureFlagBuilder();
    }

    public static class FeatureFlagBuilder {
        private Long id;
        private String key;
        private String description;
        private boolean enabled;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        FeatureFlagBuilder() {
        }

        public FeatureFlagBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public FeatureFlagBuilder key(String key) {
            this.key = key;
            return this;
        }

        public FeatureFlagBuilder description(String description) {
            this.description = description;
            return this;
        }

        public FeatureFlagBuilder enabled(boolean enabled) {
            this.enabled = enabled;
            return this;
        }

        public FeatureFlagBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public FeatureFlagBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public FeatureFlag build() {
            return new FeatureFlag(id, key, description, enabled, createdAt, updatedAt);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeatureFlag that = (FeatureFlag) o;
        return enabled == that.enabled && Objects.equals(id, that.id) && Objects.equals(key, that.key) && Objects.equals(description, that.description) && Objects.equals(createdAt, that.createdAt) && Objects.equals(updatedAt, that.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, key, description, enabled, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "FeatureFlag{" +
                "id=" + id +
                ", key='" + key + '\'' +
                ", description='" + description + '\'' +
                ", enabled=" + enabled +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
